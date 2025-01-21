import { Button } from "antd"
import {  useNavigate } from "react-router-dom"
import axios from "axios";
import { memo } from "react";

function DeleteProfile({details}){
          const navigate=useNavigate();
    const deleteProfile=async()=>{
             const res=await axios.delete(`http://localhost:8080/users/delete/${details.id}`,{
                headers:{
                    'Authorization':`Bearer ${localStorage.getItem('token')}`,
                     'Content-Type':'application/json',
                }
             })
             navigate('/');
    }
    return(
        <Button onClick={deleteProfile}>Delete</Button>
    )
}
export default memo(DeleteProfile);