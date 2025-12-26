import React from 'react'
import {Table, Button} from "antd"
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import {useEffect, useState} from "react"
import {getAllMovies, deleteMovie} from "../../backend/movie";
import moment from "moment";
import MovieForm from "./MovieForm"

const MovieList = () => {
    const[movies,setMovies]=useState([])
    const[isModalOpen, setIsModalOpen]= useState(false)
    const [formType, setFormType]= useState(null)
    const [selectedMovieData, setSelectedMovieData]=useState(null)
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
  },
   {
    title: 'Actions',
    render: (value, record, index)=>
    {
      return (
        <div className="d-flex gap-10">
          
          <Button onClick={()=>{
            setIsModalOpen(true)
            setFormType("edit")
            setSelectedMovieData(record)
            }}><EditOutlined /></Button>
          <Button onClick={()=>
            {setIsModalOpen(false)
            setFormType("delete")
            setSelectedMovieData(record)
            deleteMovie(selectedMovieData)}}><DeleteOutlined /></Button>
        </div>
      )
    }
  }

];
  return <>
  <div className="justify-content-end d-flex">

        <Button type="primary" onClick={()=>{ 
          setIsModalOpen(true)
          setSelectedMovieData(null)
          setFormType("add")} } >Add Movie</Button>
    </div>
    <Table dataSource={movies} columns={tableHeadings}/> 
    {isModalOpen? (
      <MovieForm isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}
      selectedMovieData={selectedMovieData} formType={formType}
      setSelectedMovieData={setSelectedMovieData} setFormType={setFormType}/>)
      : null}
  </>
}
export default MovieList