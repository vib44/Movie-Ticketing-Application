import React from 'react'
import {Table, Button} from "antd"
import { EditOutlined, DeleteOutlined ,PlusOutlined} from "@ant-design/icons";
import {useEffect, useState} from "react"
import {getAllTheatres, deleteTheatre} from "../../backend/theatre";
import moment from "moment";
import TheatreForm from "./TheatreForm"

const TheatreListPartner = () => {
    const[theatres,setTheatres]=useState(null)
    const[isModalOpen, setIsModalOpen]= useState(false)
    const [formType, setFormType]= useState("add")
    const [selectedTheatreData, setSelectedTheatreData]=useState(null)
    const getTheatres= async()=>
    {
        try{
        const response= await getAllTheatres();
        console.log(response.data, "TheatreListPartner")
        setTheatres(response.data)
        }
        catch(error)
        {
            console.log("TheatreListPartner error", error)
        }

    }

    useEffect(()=>{getTheatres()}, [])

    const tableHeadings = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: "name",
    
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: "address"
    
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email'
  },
  {
    title: 'Phone Number',
    dataIndex: 'phone',
    key: "phone"
  },
  {
    title: 'Status',
    dataIndex: 'isActive',
    key: "isActive",
    render: (value,record,index)=>
    {
      if(record.isAtcive) return "Approved"
      return "Pending/Blocked"
    }
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
            setSelectedTheatreData(record)
            }}><EditOutlined /></Button>

          <Button onClick={()=>
            {setIsModalOpen(false)
            setFormType("delete")
            setSelectedTheatreData(record)
            deleteTheatre(selectedTheatreData)}}>
              <DeleteOutlined /></Button>

              <Button><PlusOutlined/></Button>
        </div>
      )
    }
  }

];
  return <>
  <div className="justify-content-end d-flex">

        <Button type="primary" onClick={()=>{ 
          setIsModalOpen(true)
          setSelectedTheatreData(null)
          setFormType("add")} } >Add Theatre</Button>
    </div>
    <Table dataSource={theatres} columns={tableHeadings}/> 
    {isModalOpen? (
      <TheatreForm isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}
      selectedTheatreData={selectedTheatreData} formType={formType}
      setSelectedTheatreData={setSelectedTheatreData} setFormType={setFormType}/>)
      : null}
  </>
}
export default TheatreListPartner