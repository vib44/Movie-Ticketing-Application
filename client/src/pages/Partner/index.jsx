import React from 'react'
import TheatreListPartner from "./TheatreListPartner"
import { Tabs } from 'antd';

function Partner() {
    const items = [

  {
    key: '1',
    label: 'Theatres',
    children: <TheatreListPartner/>,
  }
];
  return <Tabs defaultActiveKey="1" items={items}/>
  
}

export default Partner