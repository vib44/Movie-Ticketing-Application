const Booking = require("../models/booking_model")
const addBookings=async(req,res)=>
{
    try {
        const newBooking= new Booking(req.body);
        await newBooking.save()
        console.log(newBooking)
        res.send(
            {
                success: true,
                message: "New Booking added",
                data: newBooking
            }
        )
    } catch (error) {
        res.send(
            {
                success: false,
                message: error.message,
            })
    }
}

const updateBooking=async(req,res)=>
{
    try {
       // const BookingId= req.params.id;
       const BookingUpdated= await Booking.findByIdAndUpdate(req.body.BookingId,req.body)
       res.send(
            {
                success: true,
                message: "Booking Updated successfully",
                data: BookingUpdated
            }
        )
    } catch (error) {
        res.status(500).send(
            {
                success: false,
                message: "Failed to update Booking",
            }
        )}
}

const deleteBooking=async(req,res)=>
{
    try {
        //const BookingId= req.params.id;
        await Booking.findByIdAndDelete(req.body.BookingId)
       res.send(
            {
                success: true,
                message: "Booking Deleted successfully",
              
            }
        )
    } catch (error) {
        res.status(500).send(
            {
                success: false,
                message: "Failed to delete Booking",
            }
        )}
}

//get all Bookings & theatres for a movie
const getAllBookings=async(req,res)=>
{
    try {
        const {movie, date}=req.body
        const allBookings= await Booking.find({movie, date}).populate("theatre").populate("movie");
        
        console.log("allBookings",allBookings)
       //map Bookings with unique theatres
        let uniqueTheatres=[]
        allBookings.forEach((Booking)=>{
            let isTheatre= uniqueTheatres.find((theatre)=>
            theatre._id===Booking.theatre._id)

        if(!isTheatre)
        {
            let BookingsofThisTheatre= allBookings.filter((BookingObj)=>
                BookingObj.theatre._id==Booking.theatre._id
            )
            uniqueTheatres.push({
                ...Booking.theatre._doc,
                Bookings: BookingsofThisTheatre
            })
        } })
       res.send(
            {
                success: true,
                message: "Bookings fetched successfully",
                data: uniqueTheatres
            }
        )
    } catch (error) {
        res.status(500).send(
            {
                success: false,
                message: "Failed to fetch Booking",
            }
        )}
}
//get details of a Booking by Id
const getBookingById=async(req,res)=>
{
    try {
        
        const Booking= await Booking.findById(req.body.id)
        .populate("theatre")
        .populate("movie")
       res.send(
            {
                success: true,
                message: `Booking fetched successfully`,
                data: Booking
            }
        )
    } catch (error) {
        res.status(500).send(
            {
                success: false,
                message: "Failed to fetch Booking",
            }
        )}
}
module.exports={ addBookings, updateBooking, deleteBooking, getAllBookings, getBookingById}