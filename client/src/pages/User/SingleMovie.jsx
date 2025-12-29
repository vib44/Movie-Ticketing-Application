import {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import { getSingleMovie } from '../../backend/movie';
import {Card, Row, Col, Image, Typography} from 'antd'

const {Title}= Typography

const SingleMovie = () => {
    
  const [movie, setMovie]= useState(null)
  const {id}= useParams();
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
  
if(!movie)
        return <div>Loading....</div>;

return <>
<div>
    <Card>
        <Row gutter={16}> 
            <Col>
            <Image src={movie.posterPath} alt={movie.title}/>
            </Col>
            <Col>
            <Title>{movie.title}</Title>
            </Col>
        </Row>
    </Card>
</div>
  </>
}

export default SingleMovie