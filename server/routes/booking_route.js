const express= require("express")
const Booking = require("../models/booking_model")
const { addBookings, updateBooking, deleteBooking,
     getAllBookings, getBookingById}= require("../controllers/booking_controllers")


const BookingRouter= express.Router();

//create a Booking

BookingRouter.post("/add",addBookings)

//update
BookingRouter.put("/update",updateBooking)

//delete
BookingRouter.delete("/delete/:id",deleteBooking)

//get all Bookings
BookingRouter.post("/get-all-theatres-by-movie",getAllBookings)

//get Booking by id
BookingRouter.post('/get-Booking-by-id',getBookingById)

//get all Bookings by owners

BookingRouter.post("/get-all-Bookings-by-owners", async(req,res)=>
{
    try {
        const response= await Booking.find({owner: req.body.owner})
        res.send({
            success:true,
            message: "All Bookings fetched successfully",
            data: response
        })
    } catch (error) {
        console.log("Fetch thetares error",error)
        res.send({
            success:false,
            message: "Something went wront. Unable to fetch Bookings",
        })
    }
})

//get all Bookings for a partner

BookingRouter.post("/get-all-Bookings",async(req,res)=>
{
    try {
        const allBookings=await Booking.find({theatre: req.body.theatreId})
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
})

module.exports= BookingRouter;