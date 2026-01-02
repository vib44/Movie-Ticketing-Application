//total seats layout- gray out booked seats, show available the rest
//on click on available seats- book the seat.

import {useState, useEffect} from 'react'
import {useParams , useNavigate} from 'react-router-dom'
import { getSingleMovie } from '../../backend/movie';
import {Button,Rate, Card, Row, Col, Image, Typography, Tag, Input} from 'antd'
import moment from 'moment'
import { getAllTheatresAndShows,getShow } from '../../backend/show';

const {Title}= Typography

const BookShow = () => {
  
  const navigate = useNavigate();
  const [show, setShow]= useState(null)
  const [date, setDate]= useState(moment().format("YYYY-MM-DD"))
  const {id}= useParams();
  const[theatres,setTheatres]=useState([])
  console.log("Show id",id)
  
useEffect(()=>{
const fetchShow= async()=>{
    try {
        const res= await getShow(id)
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
 
/*useEffect(()=>{
    const fetchAllTheatresAndShows= async()=>
    {
        try {
            const res=await getAllTheatresAndShows({movie: id,date: date})
            setTheatres(res.data)
        } 
        catch (error) {
            console.log("Error showing theatres for movie shows", error)
        }
    }
    fetchAllTheatresAndShows();
},[date])

const handleDateChange=(ev)=>{
    const dateSelected= ev.target.value
    console.log(dateSelected)
    setDate(dateSelected)
    navigate(`/singleMovie/${id}?date=${dateSelected}`)
}
if(!movie)
        return <div>Loading....</div>;

return (
<div>
    <Card>
        <Row gutter={16}> 
            <Col xs={24} sm={16}>
            <Image src={movie.posterPath} alt={movie.title}
             style={{width: "100%", borderRadius: 8 , height: "500px"}}/>
            </Col>
            
            <Col xs={24} sm={16}>
            <Title level={4}>{movie.title}</Title>
            </Col>

             <Col xs={24} sm={16}>
             <Tag style={{marginBottom : 4}}>{movie.genre}</Tag>
            
             <span style ={{marginLeft: 8}}>
                {movie.rating? <Rate allowHalf count={10} disabled value={movie.rating}/>  : null}
            
             </span>

             <p style={{marginBottom: 12}}>{movie.description}</p>
             <strong >Release Date:</strong>
             <span> {moment(movie.releaseDate).format("DD-MM-YYYY")}</span>
             <div>
                <strong> Movie Language: </strong>
                <span>{movie.language}</span>
             </div>
              <div>
                <strong> Movie Duration: </strong>
                <span>{movie.duration} mins</span>
             </div>
              <div style={{marginTop: 16}}>
                <Button type="primary">Book Tickets</Button>
             </div>
             <div className="d-flex">
                <label>Choose date:</label>
                <Input type="date" value={date} onChange={handleDateChange}/>
             </div>
            </Col>
        </Row>
    </Card>

    {(theatres && theatres.length>0 )?
    (theatres.map((theatre)=>
        {
        return (
        <div key={theatre._id}>
            <Row gutter={24} key={theatre._id}>
                <Col xs={{span : 24}} lg={{span: 8}}>
                <h3>{theatre.name}</h3>
                <strong>Address: </strong>
                <p>{theatre.address}</p>
                <Col xs={{span:24}} lg={{span:16}}>
                <ul className="show-ul">
                    {theatre.shows.sort((a,b)=>moment(a.time,"HH:mm")-moment(b.time,"HH:mm"))
                    .map((singleShow)=>(
                        <li key={singleShow._id} onClick={()=>navigate(`/bookshow/${singleShow._id}`)}>
                            {moment(singleShow.time,"HH:mm").format("hh:mm A")}</li>
                    ))
                    }
                    
                </ul>
                </Col>
                </Col>
                </Row>
                </div>
                );
        })
    ): null}
</div>
)}*/
return <div>Book SHow</div>
}
export default BookShow