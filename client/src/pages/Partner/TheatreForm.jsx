import {useEffect} from 'react'
import {message, Form, Button, Modal, Input, Select, Row, Col} from "antd"
import { addTheatres, updateTheatre, deleteTheatre } from '../../backend/theatre'
import { useSelector ,useDispatch} from 'react-redux'
import { getCurrentUser } from '../../backend/auth'
import { setUserData } from '../../redux/userSlice'

const TheatreForm = ({isModalOpen, setIsModalOpen, 
    formType, setFormType,getData,
    selectedTheatreData, setSelectedTheatreData}) => {
    
        const handleClose=()=>
    {
        setIsModalOpen(false)
    }

    const { userData } = useSelector((state)=> state.user)
    const dispatch= useDispatch();
    const getUserData=async()=>
    {
        try {
            const user= await getCurrentUser();
            dispatch(setUserData(user))
        } catch (error) {
            console.log("user data error",error)
        }
    }

    useEffect(()=>{
        getUserData()
    },[])

    const onFinish=async (values)=>
        {
    try
    {    console.log(userData , formType)
        if(!userData)
             {
                 message.error("No user found. Please login")
                 return;
             }
        let response= null 
        if(formType==="add")
        {
            values.owner=userData._id
            console.log(values)
            response= await addTheatres(values)
        }

            else
        {
            values.theatreId=selectedTheatreData._id
            response= await updateTheatre(values)
        }
        if(response && response.success)
            {
                message.success(response.message);
                if(getData)
                    getData();
                setIsModalOpen(false) 
            }
        else
                message.error(response.error)    
        } 
        catch (error) {
            message.error(error)
        }
    console.log(values); 
}
  return <>
   <Modal width={800} title="Basic Modal" closable={{ 'aria-label': 'Custom Close Button' }}
        open={isModalOpen} onCancel={handleClose} >

        <Form layout="vertical" style={{width:"100%"}} initialValues={selectedTheatreData} onFinish={onFinish}>
    <Row gutter={ {xs: 8, sm: 16, md: 24, lg: 32} }  >
            
            <Col span={24}>
            <Form.Item label="Theatre name" name="name" rules={[{requires: true, message: "Theatre name is required"}]}>
            <Input id="name" placeholder='Enter Theatre name' type="text"/>
            </Form.Item>
            </Col>

             <Col span={24}>
            <Form.Item label="Theatre Address" name="address" rules={[{requires: true, message: "Theatre name is required"}]}>
            <Input id="address" placeholder='Enter Theatre address' type="text"/>
            </Form.Item>
            </Col>

            
             <Col span={12}>            
            <Form.Item label="Theatre Email" name="email"
             rules={[{requires: true, message: "Theatre Email is required"}]}>
            <Input id="email" placeholder='Enter Theatre Email' type="email"/>
            </Form.Item>
            </Col>

            <Col span={12}>            
            <Form.Item label="phone" name="phone">
            <Input id="phone" placeholder='Enter Theatre phone number' type="text"/>
            </Form.Item>
            </Col>
    
        </Row>

        <Form.Item>

            <Button block type="primary" htmlType='submit'
            style={{fontSize: "1rem" , fontWeight: "600"}}>
                Submit
            </Button>

            <Button className="mt-3" block>
                Cancel
            </Button>
        </Form.Item>
        </Form>
        </Modal>
        </>

}

export default TheatreForm