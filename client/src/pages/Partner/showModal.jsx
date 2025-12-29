import React from 'react'
import {Modal, Table, message,Button, Form, Row , Col, Input} from "antd"
import {useState, useEffect} from "react"
import { getAllTheatresByOwner } from '../../backend/theatre'
import { getAllMovies } from '../../backend/movie'
import { ArrowLeftOutlined} from "@ant-design/icons"
import { getShows, addShows } from '../../backend/show'

const ShowModal = ({isModalOpen,
  setIsModalOpen,
  selectedTheatre,
  setSelectedtheatre}) => {

    const[movies,setMovies]=useState([])
    const[shows,setShows]=useState([])
    const[view,setView]=useState("table")
    
    //get data for all movies
    const getData= async()=>
    {
        try {
           const allMovies= await getAllMovies();
           if(allMovies.success)
                setMovies(allMovies.data) 
            else
                message.error(allMovies.error)
            
            const allShowsResponse = await getShows()
            setShows(allShowsResponse.data)
            if(allShowsResponse.success)
                console.log(allShowsResponse)
            else
                console.log("error in shows")
        } 
        
        catch (error)
         {
            message.error(error.message)
        }
    }

    useEffect(()=>
    {
        getData()
    }, [])

    const handleCancel=()=>
    {
        setIsModalOpen(false)
    }

    const onFinish=async(values)=>
    {
        try {
            const response= await addShows(values)
            console.log(response)
            if(response.success)
              message.success(response.success)
            else
               message.error("Cannot show details.Please try again")
            
        } 
        catch (error) {
         console.log("Add shows error",error)
         message.error("Cannot add show, please try again later")   
        }
    }
const tableHeadings=[
{
title: "Show Name",
dataIndex: "name",
key: "name"
},
{
title: "Show Date",
dataIndex: "date",
key: "date"
},
{
title: "Show Time",
dataIndex: "time",
key: "time"
},{
title: "Ticket Price",
dataIndex: "ticketPrice",
key: "tickePrice"
},
{
title: "Total Seats",
dataIndex: "totalSeats",
key: "totalSeats"
},
{
title: "Movie",
dataIndex: "movie",
render: (record,value)=>
{
    return record.movie.title;
}
},
{
title: "Theatre",
dataIndex: "theatre",
key: "theatre"
},
]
  return (
    <Modal open={isModalOpen} width={1200} onCancel={handleCancel}>
        <h3>
            {view==='table'? "list of shows" : view==="form"?
            "Add show" : "Edit show"}
        </h3>
        {view==="table"?(
            <><Button onClick={()=>{setView("form")}}>Add show</Button>
                <Table columns={tableHeadings} />
        </>) : null}

        {view==="form"?(
            <> <Form layout="vertical" style={{width:"100%"}} initialValues={" "} onFinish={onFinish}>
    <Row gutter={ {xs: 8, sm: 16, md: 24, lg: 32} }  >
            
            <Col span={8}>
            <Form.Item label="Show name" name="name"
             rules={[{requires: true, message: "Show name is required"}]}>
            <Input id="name" placeholder='Enter Show name' type="text"/>
            </Form.Item>
            </Col>

             <Col span={8}>
            <Form.Item label="Show Date" name="date" 
            rules={[{requires: true, message: "Show date is required"}]}>
            <Input id="date" placeholder='Enter Show date' type="date"/>
            </Form.Item>
            </Col>

            
             <Col span={8}>            
            <Form.Item label="Show Time" name="time"
             rules={[{requires: true, message: "Show time is required"}]}>
            <Input id="time" placeholder='Enter Show time' type="time"/>
            </Form.Item>
            </Col>

             <Col span={8}>            
            <Form.Item label="Movie Name" name="movie">
            <Select id="movie" placeholder='Enter movie name' 
            style={{width:"100v" , height: "45px"}} 
            options={movies.map((movie)=>({
                key: movie._id,
                label: movie.title,
                value: movie._id}))
            }
                />
            </Form.Item>
            </Col>

            <Col span={8}>            
            <Form.Item label="Total Seats" name="totalSeats">
            <Input id="totalSeats" placeholder='Enter total seats' type="number"/>
            </Form.Item>
            </Col>
          
            <Col span={8}>            
            <Form.Item label="Ticket Price" name="ticketPrice">
            <Input id="ticketPrice" placeholder='Enter ticket price' type="number"/>
            </Form.Item>
            </Col>

        </Row>

        <Form.Item>

            <Button block htmlType='submit'
            style={{fontSize: "1rem" , fontWeight: "600"}}>
                <ArrowLeftOutlined/>Go Back
            </Button>

            <Button className="mt-3" block htmlType="submit" type="primary">
                {view==="form"? "Add show": "Edit show"}
            </Button>
        </Form.Item>
        </Form>
        </>) : null}
        </Modal>
  )
}

export default ShowModal