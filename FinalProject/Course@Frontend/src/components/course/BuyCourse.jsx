import { Button, Modal,message} from "antd";
import { useState,memo} from "react";
import { useNavigate } from "react-router-dom";
import { Table,TableHeader,TableRow,TableCell } from "../styles/MyCour";
function BuyCourse({course}){
    const navigate=useNavigate();
    const [open,setOpen]=useState(false);
    function handleBuy(){
      if(localStorage.getItem('userId')==null){
         navigate('/login')
      }
        setOpen(true);
    }
    async function handleOk(){
        const res=await fetch(`http://localhost:8080/users/courses_enrolled/${localStorage.getItem('userId')}/${course.id}`,{
           method:"POST",
           headers:{
            'Authorization':`Bearer ${localStorage.getItem('token')}`,
            'content-Type':'application/json'
           }
        })
        console.log(res);
      if (res.status ==409) {
            message.error(`Already enrolled in ${course.title}`);
        }
        if(res.status==403){
          message.error(`You cannot enroll in more than 5 courses`);
        } 
        else if (res.ok) {
            message.success("Enrolled successfully");
        }
        navigate('/')
      }
    function handleCancel(){
        setOpen(false)
    }
    return(
        <>
        <Button type='primary' onClick={handleBuy}>BuyCourse</Button>
        <Modal
        title='Buy the course'
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
        centered
        okText='Enroll Now'
        >
           <Table>
              <thead>
                 <TableHeader style={{paddingLeft:'50px'}}>Course Name</TableHeader>
                 <TableHeader style={{paddingLeft:'50px'}}>Price</TableHeader>
              </thead>
              <tbody>
                 <TableRow>
                    <TableCell style={{paddingLeft:'50px'}}>{course.title}</TableCell>
                    <TableCell style={{paddingLeft:'50px'}} >&#8377; {course.price}</TableCell>
                 </TableRow>
              </tbody>
           </Table>
        </Modal>
        </>
       )
}
export default memo(BuyCourse);