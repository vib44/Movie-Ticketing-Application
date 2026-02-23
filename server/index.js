const express=require("express");
const app=express();
const dbConfig=require("./dbConfig.js")
const dotEnv= require("dotenv")
const cors= require("cors")
const cookieParser= require("cookie-parser")
const rateLimit=require('express-rate-limit')
const mongoSanitize=require('express-mongo-sanitize') //a standalone module that sanitizes inputs against query selector injection attacks:
const path = require("path");
const clientBuildPath = path.join(__dirname, "../client/build");
console.log(clientBuildPath);

app.use(express.static(clientBuildPath));
app.get("*", (req, res) => {
 res.sendFile(path.join(clientBuildPath, "index.html"));
});

dotEnv.config();
dbConfig.connectDb()

const userRoutes=require("./routes/user_route.js")
const movieRoutes= require("./routes/movie_route.js")
const theatreRoutes= require("./routes/theatre_route.js")
const showRoutes=require("./routes/show_route.js")
const bookingRoutes=require("./routes/booking_route.js")


const limiter=rateLimit({
    windowMs: 15*60*1000, //15minutes
    limit: 100, //Limit each IP to 100 requests per `window`(here,per 15 minutes).
    message: "Too many requests , please try again later"
})

app.use(limiter)
// By default, $ and . characters are removed completely from user-supplied input in the following places:
// - req.body
// - req.params
// - req.headers
// - req.query

// To remove data using these defaults:
app.use(mongoSanitize())
//Register webhook route with raw body parser BEFORE express.json()
//This ensures the webhook receives raw body for signature verification

app.post("/api/booking/webhook",
    express.raw({type:"application/json"}),
    async(req,res)=>{
        //Import webhook handler
        const stripe=require("stripe")(process.env.STRIPE_SECRET_KEY)
        const Booking=require("./models/booking_models.js")
        const Show=require("./models/show_models.js")

        const sig=req.headers["stripe-signature"]
        const webhookSecret=process.env.STRIPE_WEBHOOK_SECRET

        if(!webhookSecret)
        {
            console.error("STRIPE WEBHOOK SECRET IS NOT SET")
            return res.status(400).send("Webhook secret not configured")
        }
        let event;

        try {
            //Verify webhook signature
            event=stripe.webhooks.constructEvent(req.body,sig,webhookSecret)
        } catch (error) {
            console.error("Webhook signature verification failed",error.message)
            return res.status(400).send(`Webhook Error: ${error.message}`)
        }

        //Handle the event
        try {
            if(event.type==="checkout.session.completed")
                {
                    const session=event.data.object;

                    //Only process if payment was successful
                    if(session.payment_status==="paid")
                    {
                        const bookingId=session.metadata?.bookingId

                        if(!bookingId)
                        {
                            console.error("No bookingId found in session metadata")
                            return res.status(400).send("No bookingId in metadata")
                        }

                        //Find the booking
                        const booking=await Booking.findById(bookingId)
                        if(!booking){
                            console.error(`Booking not found: ${bookingId}`)
                            return res.status(404).send("Booking not found")
                        }

                        //Check if already completed
                        if(booking.status==="completed")
                            return res.json({received: true})

                        //Check if seats are still available
                        const show=await Show.findById(booking.show)
                        if(!show){
                            booking.status="failed"
                            await booking.save();
                            return res.status(400).send("Show not found")
                        }

                        //Check if any of the selected seats are already booked
                        const conflictingSeats=booking.seats.filter((seat)=>
                             show.bookedSeats.includes(seat)
                        )

                        if(conflictingSeats.length>0)
                        {
                            booking.status="failed"
                            await booking.save();
                            console.error(`Seats ${conflictingSeats.join(",")} are already booked`)
                            return res.status(400).send(`Seats ${conflictingSeats.join(",")} are
                            already booked`)
                        }

                        //Update Booking
                        booking.stripePaymentIntentId=session.payment_intent;
                        booking.status="completed"
                        await booking.save()

                        //Update show's bookedSeats array
                        show.bookedSeats=[...show.bookedSeats,...booking.seats]
                        await show.save()

                        console.log(`Booking ${bookingId} confirmed via webhook`)
                    }
                    else
                    {
                        console.log(`Payment not completed for 
                            session ${session.id},status:
                            ${session.payment_status}`)
                    }
                }

                //Return a response to acknowlledge receipt of the event
                res.json({received: true})
            
        } catch (error) {
            console.error("Error processing webhook:",error)
            res.status(500).send("Webhook processing failed")
        }
    }    
)
app.use(express.json())

app.use(
 cors({
   origin: process.env.CLIENT_URL,
   methods: ["GET", "POST", "PUT", "DELETE"],
   allowedHeaders: ["Content-Type", "Authorization"],
 })
);

app.use(cookieParser())
app.use("/api/auth",userRoutes)
app.use("/api/movie",movieRoutes)
app.use("/api/theatre",theatreRoutes)
app.use("/api/show",showRoutes)
app.use("/api/booking",bookingRoutes)

//Render automatically injects a PORT variable for you.
app.listen(process.env.PORT || 8001,()=>
{
    console.log("Server started...")
})