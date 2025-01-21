import { Button, Modal, Form,Input} from "antd";
import {useState,memo} from 'react';
import axios from "axios";
function UpdateCourse({course}){
    const [open,setOpen]=useState(false);
    const [form]=Form.useForm();
    function openModal(){
        setOpen(true);
    }
    function handleCancel(){
        setOpen(false);
    }
    function handleOk(){
        form.submit();
    }
    const handleFinish=async(values)=>{
        console.log(course.id);
        const res=await axios.put(`http://localhost:8080/courses/update/${course.id}`,values,{
            headers:{
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
        }
    )
    setOpen(false);
    }
   return(
    <>
    <Button type='primary' onClick={openModal}>UpdateCourse</Button>
    <Modal 
    title="Update Course Details"
    open={open}
    onOk={handleOk}
    onCancel={handleCancel}
    centered
    >
        <Form
           form={form}
           layout="vertical"
           onFinish={handleFinish}
           initialValues={course}
           >
              <Form.Item
                 label="Title"
                 name="title"
                 rules={[{ required: true, message: "Please input the course title" }]}
               >
             <Input placeholder="Enter course title" />
             </Form.Item>
             <Form.Item
        label="Description"
        name="description"
        rules={[{ required: true, message: "Please input the course description" }]}
      >
        <Input.TextArea placeholder="Enter course description" rows={4} />
      </Form.Item>
      <Form.Item
        label="Tutor"
        name="tutor"
        rules={[{ required: true, message: "Please input the tutor name" }]}
      >
        <Input placeholder="Enter tutor name" />
      </Form.Item>
      <Form.Item
        label="Enrolled Students"
        name="enrolledStudents"
        rules={[{ required: true, message: "Please input the number of enrolled students" }]}
      >
        <Input type="number" placeholder="Enter number of students" />
      </Form.Item>
      <Form.Item
        label="Language"
        name="language"
        rules={[{ required: true, message: "Please select the course language" }]}
      >
        <Input placeholder="Enter course language" />
      </Form.Item>
      <Form.Item
        label="Price"
        name="price"
        rules={[{ required: true, message: "Please input the course price" }]}
      >
        <Input type="number" placeholder="Enter price" prefix="₹" />
      </Form.Item>
      <Form.Item
        label="Image URL"
        name="image"
        rules={[{ required: true, message: "Please input the image URL" }]}
      >
        <Input placeholder="Enter image URL" />
      </Form.Item>
      <Form.Item
        label="Rating"
        name="rating"
        rules={[{ required: true, message: "Please input the course rating" }]}
      >
        <Input type="number" step="0.1" placeholder="Enter course rating" />
      </Form.Item>
           </Form>
    </Modal>
    </>
   )
}
export default memo(UpdateCourse);