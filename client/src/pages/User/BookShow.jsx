//total seats layout- gray out booked seats, show available the rest
//on click on available seats- book the seat.

import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getSingleMovie } from '../../backend/movie';
import { Button, Divider, Space, Card, Row, Col, Image, Typography, Tag, Input, message } from 'antd'
import moment from 'moment'
import { getAllTheatresAndShows, getShow } from '../../backend/show';
import { createCheckoutSession } from '../../backend/booking';
import { useSelector } from 'react-redux';

const { Title, Text } = Typography

function BookShow() {

    const params = useParams()
    const { userData } = useSelector((state) => state.user)
    const COLUMNS = 10;
    const navigate = useNavigate();
    const [show, setShow] = useState(null)
    const [selectedSeats, setSelectedSeats] = useState([])

    const [loading, setLoading] = useState(false)

    const fetchShow = async () => {
        try {
            const res = await getShow({ showId: params.id })
            console.log(`${params.id} ${res.data}`)
            if (res && res.success && res.data)
                setShow(res.data)

            else if (typeof res === "string")
                message.error(res);

            else
                message.error("Failed to load show details")
        }

        catch (error) {
            console.log("Error getting show", error)
            message.error("Error loading show details")
        }
    }

    useEffect(() => {
        fetchShow()
    }, [])


    const handleSeatClick = (seatNumber) => {
        console.log(seatNumber)
        if (isSeatBooked(seatNumber)) return;

        //de-select
        if (isSeatSelected(seatNumber)) {
            setSelectedSeats(selectedSeats.filter((seat) => seat !== seatNumber))
        }

        //select
        else {
            setSelectedSeats(selectedSeats => [...selectedSeats, seatNumber])
        }
    }

    const isSeatBooked = (seatNumber) => {

        return show?.bookedSeats?.includes(seatNumber) || false

    }

    const isSeatSelected = (seatNumber) => {

        return selectedSeats.includes(seatNumber) || false;
    }

    const getSeatStyle = (seatNumber) => {
        if (isSeatBooked(seatNumber)) {
            // console.log(isSeatBooked(seatNumber))
            return {
                backgroundColor: "#d9d9d9",
                cursor: "not-allowed",
                color: "#8c8c8c"
            }
        }

        if (isSeatSelected(seatNumber)) {
            //  console.log(isSeatSelected(seatNumber))
            return {
                backgroundColor: "#1890ff",
                cursor: "pointer",
                color: "#ffffff"
            }
        }
        return {
            backgroundColor: "#f0f0f0",
            cursor: "pointer"

        }
    }

    const totalPrice = selectedSeats.length * (show?.ticketPrice || 0)
    const handleBooking = async () => {
        console.log("Selected seats length",selectedSeats.length)
        if (selectedSeats.length === 0) {
            message.warning("Please select seat to proceed")
            return
        }
        if (!userData || !userData._id) {
            message.error("Please login to book tickets")
            navigate("/login")
            return
        }

        setLoading(true)

        try {
            const response = await createCheckoutSession({
                amount: totalPrice,
                userId: userData._id,
                showId: show._id,
                seats: selectedSeats,
                showName: show.movie?.title || "Movie",
                customerName: userData.name || "",
                customerEmail: userData.email || "",
            })

            console.log("BookShow response=",response)
            if (response.success && response.data.url) {
                //Redirect to Stripe checkout
                window.location.href = response.data.url;
            }

            else {
                message.error(response.message || "Failed to initiate payment")
                setLoading(false)
            }
        } catch (error) {
            console.error("Error inbooking:", error)
            message.error("Failed to initiate payment")
            setLoading(false)
        }
    }

    if (!show)
        return <div style={{ padding: 20 }}>Loading...</div>
      const totalSeats = show.totalSeats || 0;
    return (
        <div style={{ padding: 20, maxWidth: 1200, margin: "0 auto" }}>Book Show
            <Card>
                <div style={{ marginBottom: 24 }}>
                    <Title level={2}>
                        {show.movie?.title || "Movie"}
                    </Title>

                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                        <div>
                            <Text><strong>Theatre: </strong></Text>
                            <Text>{show.theatre?.name || "N/A"}</Text>
                        </div>
                        <div>
                            <Text><strong>Address: </strong></Text>
                            <Text>{show.theatre?.address || "N/A"}</Text>
                        </div>
                        <div>
                            <Text><strong>Date </strong></Text>
                            <Text>{moment(show.date).format("DD-MM-YYYY ")}</Text>
                        </div>
                        <div>
                            <Text><strong>Time </strong></Text>
                            <Text>{show.time}</Text>
                        </div>
                        <div>
                            <Text><strong>Price </strong></Text>
                            <Text>{show.ticketPrice}</Text>
                        </div>
                    </div>
                </div>

                <Divider />

                <div style={{
                    textAlign: "center", marginBottom: "30",
                    padding: "10px 0", backgroundColor: "#f0f0f0",
                    borderRadius: 4
                }}>
                    <Text strong level={3}>SCREEN</Text>
                </div>

                {/*seats ui*/}
                <div style={{ marginBottom: "24" }}>
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: `repeat(${COLUMNS}, 1fr)`
                        , gap: 8,
                        marginBottom: 20
                    }}>

                        {Array.from({ length: totalSeats }, (_, index) => {
                            const seatNumber = index + 1;
                            return (<Button
                                onClick={() => handleSeatClick(seatNumber)}
                                disabled={isSeatBooked(seatNumber)}
                                key={seatNumber + "seatNo"}
                                style={{
                                    ...getSeatStyle(seatNumber),
                                    height: 40,
                                    minWidth: 40,
                                    padding: 0,
                                    border: "1px solid #d9d9d9"
                                }}
                            >{seatNumber}</Button>)
                        })}
                    </div>
                </div>
                {/* lEGENDS */}
                <div style={{ marginBottom: "24", textAlign: "center" }}>
                    <Space size="large">
                        <Space>
                            <div style={{
                                width: 20,
                                height: 20,
                                backgroundColor: "#f0f0f0",
                                border: "1px solid #d9d9d9",
                            }} />
                            <Text> Available</Text>
                        </Space>
                        <Space>
                            <div style={{
                                width: 20,
                                height: 20,
                                backgroundColor: "#1890ff",

                            }} />
                            <Text> Selected</Text>
                        </Space>
                        <Space>
                            <div style={{
                                width: 20,
                                height: 20,
                                backgroundColor: "#f0f0f0",

                            }} />
                            <Text> Booked</Text>
                        </Space>
                    </Space>
                </div>

                <Divider />
                {/*booking summary*/}
                <div style={{ marginBottom: "24" }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: 16, width: "100%" }}>
                        <div>
                            <Text strong> Seats Selected:</Text>
                            <Text> {selectedSeats.length > 0 ? selectedSeats.sort((a, b) => a - b).join(",") : "None"}</Text>
                        </div>
                        <div>

                            <Text strong> Total Seats Selected:</Text>
                            <Text> {selectedSeats.length}</Text>
                        </div>
                        <div >
                            <Text strong> Total Price:</Text>
                            <Text style={{fontSize:18, color: "#1890ff"}}> ₹{totalPrice}</Text>
                        </div>
                    </div>
                </div>

                {/*book button*/}
                <Button type="primary" size="large" 
                onClick={handleBooking}
                loading={loading} 
                style={{height:50, fontSize:16}}
                disabled={selectedSeats.length === 0 || loading}>

                    {loading? "Processing...":"Pay with Stripe"}
                </Button>
                </Card>
        </div>
    )
}
export default BookShow