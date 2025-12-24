import React from 'react'
import MovieList from "./MovieList"
import TheatreList from "./TheatreList"
import { Tabs } from 'antd';

function Admin() {
    const items = [
  {
    key: '1',
    label: 'Tab 1',
    children: <MovieList/>,
  },
  {
    key: '2',
    label: 'Tab 2',
    children: <TheatreList/>,
  }
];
  return <Tabs defaultActiveKey="1" items={items}/>
  
}

export default Admin