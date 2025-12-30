import {useState, useEffect} from 'react'
import {useParams , useNavigate} from 'react-router-dom'
import { getSingleMovie } from '../../backend/movie';
import {Button,Rate, Card, Row, Col, Image, Typography, Tag, Input} from 'antd'
import moment from 'moment'
import { getAllTheatresAndShows } from '../../backend/show';

const {Title}= Typography

const SingleMovie = () => {
  
  const navigate = useNavigate();
  const [movie, setMovie]= useState(null)
  const [date, setDate]= useState(moment().format("YYYY-MM-DD"))
  const {id}= useParams();
  const[theatres,setTheatres]=useState([])
  console.log("movieId",id)
  
useEffect(()=>{
const fetchMovie= async()=>{
    try {
        const res= await getSingleMovie(id)
        setMovie(res.data)
        console.log("res.data",res.data)
        console.log("Movie setMovie",movie)
    } catch (error) {
        console.log("Error getting movie",error)
    }
    }
if(id) fetchMovie();
},[id])
 
useEffect(()=>{
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

return <>
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

    

</div>
  </>
}

export default SingleMovie