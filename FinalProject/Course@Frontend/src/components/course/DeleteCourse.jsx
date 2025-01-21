import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { memo } from "react";
function DeleteCourse({course}){
    const navigate=useNavigate();
    async function handleDelete(){
        const res=await axios.delete(`http://localhost:8080/courses/delete/${course.id}`,{
            headers:{
                'Authorization':`Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
        })
       navigate("/")
    }
    return(
        <Button type='primary' onClick={handleDelete}>DeleteCourse</Button>
       )
}
export default memo(DeleteCourse);