const express = require("express")
const Booking = require("../models/booking_model")
const Show = require("../models/show_models.js")
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)
const isAuth = require("../middlewares/authMiddleware.js")
const { requiredUser } = require("../middlewares/roleMiddleware.js")

const { addBookings, updateBooking, deleteBooking,
    getAllBookings, getBookingById } = require("../controllers/booking_controllers")

const BookingRouter = express.Router();

//Create Stripe Check out session (User only)
BookingRouter.post("/create-checkout-session", isAuth, requiredUser, async (req, res) => {
    try {
        const { amount, userId, showId, seats, showName,
            customerName, customerEmail, customerAddress } = req.body

        //Security : Users can only create bookings for themselves
        if (userId !== req.userId)
return res.send({
    success: false,
    message: "Access denied. You can only create bookings for yourself."
})
if (!amount || amount <= 0)
    return res.send({
        success: false,
        message: "Invalid Amount"
    })

//Create a pending booking record
const booking = new Booking({
    show: showId,
    user: userId,
    seats: seats,
    totalAmount: amount,
    status: "pending"

})
await booking.save();

//Prepare customer information for Indian Regulations
const customerInfo = {}
if (customerName)
    customerInfo.customer_email = customerEmail

//Create Stripe checkout session with customer information
const session = await stripe.checkout.session.create({
    payment_method_types: ["card"],
    line_items: [
        {
            price_data: {
                currency: "inr",
                product_data: {
                    name: `Movie Ticket - ${showName || "Booking"}`,
                    description: `Seats: ${seats.sort((a, b) => a - b).join(",")}`
                },
                unit_amount: amount * 100, //Stripe expects amounts in paise 
            },
            quantity: 1
        }
    ],
    mode: "payment",
    customer_email: customerEmail,
    billing_address_collection: "required",//required for Indian regulations
    shipping_address_collection: {
        allowed_countries: ["IN"]
    },//India only
    success_url: `${process.env.CLIENT_URL || "http://localhost:5173"}/bookshow/${showId}`,
    metadata: {
        bookingId: booking._id.toString(),
        showId: showId,
        userId: userId,
        seats: JSON.stringify(seats),
        customerName: customerName || "",
    }
})
console.log(session.url)
console.log(session.id)

//Update booking with session Id
booking.stripeSessionId = session.id;
await booking.save()

res.send({
    success: true,
    message: "Checkout session created",
    data: {
        sessionId: session.id,
        url: session.url,
    }
})
    } catch (error) {
    console.error("Error creating Stripe session:", error);
    res.send({
        success: false,
        message: error.message || "Failed to create checkout session",
    })
}
}
)
//Verify payment and confirm booking (User only)
bookingRouter.post("/verify-payment", isAuth, requiredUser, async (req, res) => {
    try {
        const { sessionId } = req.body;
        console.log("HERE verify-payment");

        //Retrieve the session from Stripe
        const session = await stripe.checkout.sessions.retrieve(sessionId)
       
        if (session.payment_status !== "paid")
            return res.send({
                success: false,
                message: "Payment not completed",
            })

            //Find booking
            const booking=await Booking.findById(session.metadata.bookingId)
            console.log("Booking : ",booking)
            if(!booking)
            {
                return res.send({
                    success: false,
                    message: "Booking not found",
                })
            }

            //Check if already completed
            if(booking.status="completed"){
                console.log("Completed Booking : ",booking)

                return res.send({
                    success: true,
                    message: "Booking already confirmed",
                    data: booking,
                })
            }

        //Check if seats are still available
        const show=await Show.findById(booking.show)
        if(!show)
        {
                console.log("Booking 157 :",booking);

            return res.send({
                success: false,
                message: "Show not found",
            })
        }

        //Check if any of the selected seats are already booked
        const conflictingSeats=booking.seats.filter((seat)=>
        show.bookedSeats.include(seat));

        if(conflictingSeats.length>0)
        {
            console.log("Booking for Conflicting Seats: ",booking)
            booking.status="failed"
            await booking.save();
            return res.send({
                success:false,
                message: `Seats ${conflictingSeats.join(",")} are already booked`,
            })
        }

        //Update booking
        booking.stripePaymentIntentId=session.payment_intent;
        booking.status="completed"
        console.log("Updated Booking : ",booking)

        await booking.save();
        console.log("Saved Booking : ",booking)

        //Update show's bookedSeats array
        show.bookedSeats=[...show.bookedSeats, ...booking.seats];
        await show.save();

        //Populate booking data before sending response
        const populatedBooking= await Booking.findById(booking._id)
        .populate("show")
        .populate({
            path:"show",
            populate: [{path: "movie"},{path: "theatre"}],
        })

        console.log("Populated Booking : ",populatedBooking)

        res.send({
            success:true,
            message: "Payment verified and booking confirmed",
            data: populatedBooking,
        })
    }
    catch (error) {
        console.log("Error verifying payment: ",error);
        console.log("error booking")

        res.send({
            success: false,
            message: error.message || "Failed to verify payment",

        })
    }
})

//Get user bookings (Authenticated - users can see their own)
bookingRouter.post("/get-user-bookings",isAuth, async(req,res)=>{
    try{
        const {userId}=req.body;
        const authenticatedUserId=req.userId;

        //Security : Users can only see their own bookings, Admins can see any
        if(req.userRole==="user" && userId!==authenticatedUserId)
        {
            return res.send({
                success: false,
                message: "Access denied. You can only view your own bookings.",
            })
        }

        const bookings=await Booking.find({user:userId})
        .populate("show")
        .populate({
            path: "show",
            populate: [{path: "movie"},{path:"theatre"}],
        })
        .sort({createdAt:-1});

        res.send({
            success:true,
            message: "Bookings fetched successfully",
            data: bookings,
        })
    }
    catch(error)
    {
        console.error("Error fetching bookings: ", error)
        res.send({
            success: false,
            message: error.message || "Failed to fetch bookings"
        })
    }
})
/*
//create a Booking

BookingRouter.post("/add", addBookings)

//update
BookingRouter.put("/update", updateBooking)

//delete
BookingRouter.delete("/delete/:id", deleteBooking)

//get all Bookings
BookingRouter.post("/get-all-theatres-by-movie", getAllBookings)

//get Booking by id
BookingRouter.post('/get-Booking-by-id', getBookingById)

//get all Bookings by owners

BookingRouter.post("/get-all-Bookings-by-owners", async (req, res) => {
    try {
        const response = await Booking.find({ owner: req.body.owner })
        res.send({
            success: true,
            message: "All Bookings fetched successfully",
            data: response
        })
    } catch (error) {
        console.log("Fetch thetares error", error)
        res.send({
            success: false,
            message: "Something went wront. Unable to fetch Bookings",
        })
    }
})

//get all Bookings for a partner

BookingRouter.post("/get-all-Bookings", async (req, res) => {
    try {
        const allBookings = await Booking.find({ theatre: req.body.theatreId })
            .populate("movie").populate("theatre");
        res.send({
            success: true,
            message: "All Bookings fetched successfully",
            data: allBookings
        })
    } catch (error) {
        res.send({
            success: false,
            message: `Not able to fetch Bookings ${error}`
        })
    }
})*/

module.exports = BookingRouter;