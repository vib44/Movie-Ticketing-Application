import React from 'react'
import {Form, Button, Modal, Input, Select, Row, Col} from "antd"

const MovieForm = ({isModalOpen, setIsModalOpen}) => {
    const handleClose=()=>
    {
        setIsModalOpen(false)
    }

  return <>
   <Modal
   width={800}
        title="Basic Modal"
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={isModalOpen}
        //onOk={handleOk}
        onCancel={handleClose}
      >
        <Form layout="vertical" style={{width:"100%"}} initialValues={""}>
    <Row gutter={ {xs: 8, sm: 16, md: 24, lg: 32} }>
            <Col span={24}>
            <Form.Item label="Movie name" name="title" rules={[{requires: true, message: "Movie name is required"}]}>
            <Input placeholder='Enter movie name' type="text"/>
            </Form.Item>
            </Col>
             <Col span={24}>
            <Form.Item label="Description" name="description" rules={[{requires: true, message: "Movie name is required"}]}>
            <Input placeholder='Enter movie description' type="text"/>
            </Form.Item>
            </Col>
            <Row>
             <Col span={8}>            
            <Form.Item label="Movie Duration in minutes" name="duraton"
             rules={[{requires: true, message: "Movie duration is required"}]}>
            <Input placeholder='Enter movie duration' type="Number"/>
            </Form.Item>
            </Col>

    
             <Col span={8}>            
            <Form.Item label="Release Date" name="releaseDate"
             rules={[{requires: true, message: "Movie release date is required"}]}>
            <Input placeholder='Enter movie release date' type="Date"/>
            </Form.Item>
            </Col>

            <Col span={8}>

            <Form.Item label="Movie Genre" name="genre"
             rules={[{requires: true, message: "Movie genre is required"}]}>
            <Select placeholder="Select Genre" options={[
                { label: "Action", value: "Action" },
                      { label: "Comedy", value: "Comedy" },
                      { label: "Romance", value: "Romance" },
                      { label: "Thriller", value: "Thriller" },
                      { label: "Horror", value: "Horror" },
                      { label: "Mystery", value: "Mystery" },
                      { value: "Action", label: "Action" },
                      { value: "Comedy", label: "Comedy" },
                      { value: "Horror", label: "Horror" },
                      { value: "Love", label: "Love" },
                      { value: "Patriot", label: "Patriot" },
                      { value: "Bhakti", label: "Bhakti" },
                      { value: "Thriller", label: "Thriller" },
                      { value: "Mystery", label: "Mystery" },
            ]}/>
            </Form.Item>
            </Col>

            <Col span={8}>

            <Form.Item label="Movie Language" name="language"
             rules={[{requires: true, message: "Movie language is required"}]}>
            <Select placeholder="Select Language" options={[
                {label: "Hindi", value: "Hindi"},
                {label: "Kannada", value: "Kannada"},
                {label: "Telugu", value: "Telugu"},
                {label: "Malayalam", value: "Malayalam"},
                {label: "Tamil", value: "Tamil"},
            ]}/>
            </Form.Item>
            </Col>
            
            <Col span={8}>            
            <Form.Item label="Poster Path" name="posterPath"
             rules={[{requires: true, message: "Movie Poster Path is required"}]}>
            <Input placeholder='Enter URL for poster'/>
            </Form.Item>
            </Col>

            </Row>
        </Row>
        <Form.Item>
            <Button block type="primary"
            htmlType='submit'
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

export default MovieForm