import React from 'react'
import {Table, Button} from "antd"
import {useEffect, useState} from "react"
import {getAllMovies} from "../../backend/movie";
import moment from "moment";

const MovieList = () => {
    const[movies,setMovies]=useState([])
    const getMovies= async()=>
    {
        try{
        const response= await getAllMovies();
        console.log(response.data, "MovieList")
        setMovies(response.data)
        }
        catch(error)
        {
            console.log("MovieList error", error)
        }

    }

    useEffect(()=>{getMovies()}, [])

    const tableHeadings = [
  {
    title: 'Poster',
    dataIndex: 'poster',
    render: (value,record,index)=>
    {
        return <img src={record.posterPath} height={100} width={100}/>
    },
  },
  {
    title: 'Title',
    dataIndex: 'title',
    
  },
  {
    title: 'Description',
    dataIndex: 'description',
    
  },
  {
    title: 'Language',
    dataIndex: 'language',
  },
  {
    title: 'Genre',
    dataIndex: 'genre',
  },
  {
    title: 'ReleaseDate',
    dataIndex: 'releaseDate',
    render : (value,record)=>
    {
        return moment(record.releaseDate).format("MM-DD-YYYY")
    }
  },
  {
    title: 'Duration',
    dataIndex: 'duration',
  },
  {
    title: 'Ratings',
    dataIndex: 'rating',
  }
];
  return <>
  <div className="justify-content-end d-flex">

        <Button type="primary">Add Movie</Button>
    </div>
    <Table dataSource={movies} columns={tableHeadings}/> 
  </>
}
export default MovieList