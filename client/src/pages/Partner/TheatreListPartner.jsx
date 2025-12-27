import React from 'react'
import {Table, Button, message} from "antd"
import { EditOutlined, DeleteOutlined ,PlusOutlined} from "@ant-design/icons";
import {useEffect, useState} from "react"
import {getAllTheatres, deleteTheatre, getAllTheatresByOwner} from "../../backend/theatre";
import {getCurrentUser} from "../../backend/auth";
import TheatreForm from "./TheatreForm"
import {useDispatch, useSelector} from "react-redux"
import { setUserData } from "../../redux/userSlice";
import ShowModal from './showModal';

const TheatreListPartner = () => {
    const[theatres,setTheatres]=useState(null)
    const[isModalOpen, setIsModalOpen]= useState(false)
    const [formType, setFormType]= useState("add")
    const [selectedTheatreData, setSelectedTheatreData]=useState(null)
    const {userData}= useSelector((state)=>state.user)
    const dispatch= useDispatch();
    const [isDeleteModalOpen,setIsDeleteModalOpen]=useState(false)
    const [isShowModalOpen,setIsShowModalOpen]=useState(false)
    
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
            {setIsDeleteModalOpen(true)
            setSelectedTheatreData(record)
            }}>
              <DeleteOutlined /></Button>

              <Button onClick={()=>
            {setIsShowModalOpen(true)
            setSelectedTheatreData(record)
            }}><PlusOutlined/>Shows</Button>
        </div>
      )
    }
  }

];
const getData=async(userId)=>
{
    try 
    {
        const ownerId=userId || userData?._id
        if(!ownerId)
           { message.error("User data not available. Please Login")
            return;
        }   
    const response= await getAllTheatresByOwner({owner:ownerId})
        if(response && response.success)
            {
            const allTheatres= response.data || [];
            setTheatres(allTheatres)
                }
        else
            message.error(response?.message||"Something went wrong fetching owner")
    }
         catch (error) {
            message.error(response?.message||"Something went wrong fetching owner")
    }
}

useEffect(()=>{
    (async()=>
    {
        const user=await getCurrentUser();
        dispatch(setUserData(user|| null))
        if(user)
        {
            getData(user._id)
        }
    })()
},[])
  return <>
  <div >

        <Button type="primary" onClick={()=>{ 
          setIsModalOpen(true)
          setSelectedTheatreData(null)
          setFormType("add")} } >Add Theatre</Button>
    
    <Table dataSource={theatres} columns={tableHeadings}/> 
    
    {isModalOpen? (
      <TheatreForm isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}
      selectedTheatreData={selectedTheatreData} formType={formType}
      setSelectedTheatreData={setSelectedTheatreData} setFormType={setFormType}
      getData={getData}/>)
      : null}

      {isShowModalOpen? <ShowModal isModalOpen={isShowModalOpen} 
      setIsModalOpen={setIsShowModalOpen}
      selectedTheatreData={selectedTheatreData}
      setSelectedTheatreData={setSelectedTheatreData}/> : null}
  </div>
  </>
}
export default TheatreListPartner