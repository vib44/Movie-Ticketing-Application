import React from 'react'
import MovieList from "./MovieList"
import TheatreList from "./TheatreList"
import { Tabs } from 'antd';

function Admin() {
    const items = [
  {
    key: '1',
    label: 'Movies',
    children: <MovieList/>,
  },
  {
    key: '2',
    label: 'Theatres',
    children: <TheatreList/>,
  }
];
  return <Tabs defaultActiveKey="1" items={items}/>
  
}

export default Admin