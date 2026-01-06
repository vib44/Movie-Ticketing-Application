//total seats layout- gray out booked seats, show available the rest
//on click on available seats- book the seat.

import {useState, useEffect} from 'react'
import {useParams , useNavigate} from 'react-router-dom'
import { getSingleMovie } from '../../backend/movie';
import {Button,Divider, Space,Card, Row, Col, Image, Typography, Tag, Input, message} from 'antd'
import moment from 'moment'
import { getAllTheatresAndShows,getShow } from '../../backend/show';

const {Title, Text}= Typography

const BookShow = () => {
  
  const COLUMNS=10;
  const navigate = useNavigate();
  const [show, setShow]= useState(null)
  const [selectedSeats, setSelectedSeats]= useState([])
  const {id}= useParams();
  const[loading,setLoading]=useState(false)
  const[totalPrice, setTotalPrice]=useState(0)
  console.log("Show id",id)
  
useEffect(()=>{
const fetchShow= async()=>{
    try {
        const res= await getShow({id:id})
        setShow(res.data)
        console.log("res.data",res.data)
        console.log("Show is",show)
    } catch (error) {
        console.log("Error getting show",error)
    }
    }
if(id) fetchShow();
},[id])

const getSeats=()=>{
    let cols=10;
    const totalSeats=show?.totalSeats;
    let rows= Math.ceil(totalSeats/cols)
}

const handleSeatClick=(seatNumber)=>
{
    console.log(seatNumber)
    if(isSeatBooked(seatNumber)) return;
    
    //de-select
    if(isSeatSelected(seatNumber))
    {
        setSelectedSeats(selectedSeats.filter((seat)=> seat!==seatNumber))
    }

    //select
    else
    {
        setSelectedSeats(selectedSeats=>[...selectedSeats,seatNumber])
    }

    setTotalPrice(totalPrice=>selectedSeats.length*show?.ticketPrice)
}
 
const isSeatBooked=(seatNumber)=>{

    return show?.bookedSeats?.includes(seatNumber) || false

}

const isSeatSelected=(seatNumber)=>{

    return selectedSeats.includes(seatNumber) || false;
}

const getSeatStyle=(seatNumber)=>{
    if(isSeatBooked(seatNumber))
    {   console.log(isSeatBooked(seatNumber))
        return{
            backgroundColor: "#d9d9d9",
            cursor: "not-allowed",
            color: "#8c8c8c"
             }}

     if(isSeatSelected(seatNumber))
       { console.log(isSeatSelected(seatNumber))
         return{
            backgroundColor: "#1890ff",
            cursor: "pointer",
            color: "#ffffff"
             }}
              console.log(`isSeatBooked= ${isSeatBooked(seatNumber)} isSeatSelected= ${isSeatSelected(seatNumber)} `)
    return {
        backgroundColor: "#f0f0f0",
        cursor: "pointer"
      
    }  
}


const handleBooking=async()=>{

}

return(
     <div style={{padding:24, maxWidth: 1200, margin: "0 auto"}}>Book Show
     <Card>
        <div style={{marginBottom: 24}}>
     <Title level={2}>
        {show?.movie?.title}
     </Title>

     <div style={{display: "flex", flexDirection: "column" , gap:8}}>
        <div>
            <Text><strong>Theatre </strong></Text>
            <Text>{show?.theatre?.name}</Text>
        </div>
        <div>
            <Text><strong>Date </strong></Text>
            <Text>{moment(show?.date).format("DD-MM-YYYY ")}</Text>
        </div>
        <div>
            <Text><strong>Time </strong></Text>
            <Text>{show?.time}</Text>
        </div>
        <div>
            <Text><strong>Price </strong></Text>
            <Text>{show?.ticketPrice}</Text>
        </div>
     </div>
     </div>
     </Card>
     <Divider/>
     {/*screen ui*/}

     <div style={{textAlign: "center", marginBottom: "30px"}}>
        <Title strong level={3}>SCREEN</Title>
     </div>

     {/*seats ui*/}
     <div style={{marginBottom: "24px"}}>
        <div style={{display: "grid",
         gridTemplateColumns:`repeat(${COLUMNS}, 1fr)`
         , gap:8,
            marginBottom: 20 }}>

            {Array.from({length: 100},(_,index)=>
            {
                const seatNumber= index+1;
                return <Button
                onClick={()=>handleSeatClick(seatNumber)}
                disabled={isSeatBooked(seatNumber)}
                key={seatNumber+"seatNo"}
                style={{
                    ...getSeatStyle(seatNumber),
                    height: 40,
                    minWidth: 40,
                    padding: 2,
                    border: "solid 1px #cacaca"
                }}
                >{seatNumber}</Button>
            })}
        </div>

        {/* lEGENDS */}
        <div style={{marginBottom: "24px"}}>
            <Space size={"large"}>
                <div style={{
                    width: 20,
                    height: 20,
                    backgroundColor: "#f0f0f0",
                    border: "solid 1px #d9d9d9",
                }}/>
                    <Text> Available</Text>
            </Space>
             <Space>
                <div style={{
                    width: 20,
                    height: 20,
                    backgroundColor: "#f0f0f0",
                    
                }}/>
                    <Text> Booked</Text>
            </Space>
        </div>

        <Divider/>
        {/*booking summary*/}
        <div style={{ marginBottom:"24px", textAlign:"center"}}>
            <div style={{display: "flex", flexDirection: "column", gap:12, width: "100%"}}>

                <Text strong> Seats Selected:</Text>
                <Text> {selectedSeats.length>0?selectedSeats.sort((a,b)=>a-b).join(","): "None"}</Text>
            </div>
             <div style={{display: "flex", flexDirection: "column", gap:12, width: "100%"}}>

                <Text strong> Total Seats Selected:</Text>
                <Text> {selectedSeats.length}</Text>
            </div>
              <div style={{display: "flex", flexDirection: "column", gap:12, width: "100%"}}>

                <Text strong> Total Price:</Text>
                <Text> {totalPrice}</Text>
            </div>
        </div>
     </div>

     {/*book button*/}
    <Button type="primary" size="large" onClick={handleBooking}
        loading={loading} disabled={selectedSeats.length===0 || loading}>

            Book Now
        </Button>
</div>
)
}
export default BookShow