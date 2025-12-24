import React, { useEffect, useState } from "react";
import { getAllMovies } from "../backend/movie.js"
import { getCurrentUser } from "../backend/auth";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../redux/userSlice";
import NavBar from "../components/Navbar.jsx";
import MovieCard from "../components/MovieCard.jsx"
const Home = () => {

  const [movies, setMovies]= useState(null)
  
  const fetchMovies=async()=>{ 
    const movies= await getAllMovies(); 
    setMovies(movies.data)
  }
  
  useEffect(()=>{fetchMovies()}, []);

  return (
    <>
      <NavBar/>
      <div
      style={{
        padding: 20,
        display: "flex",
        justifyContent:"space-between"
      }}>
      {movies && movies.map((movieObj,index)=> 
      <MovieCard key={movieObj._id}{...movieObj}/>)}
    </div>
    </>
  );
};

export default Home;