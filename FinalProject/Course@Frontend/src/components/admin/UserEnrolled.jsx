import { useEffect,useState,memo} from "react";
import axios from "axios";

function UserEnrolled({course}){
    const [val,setVal]=useState([]);
    console.log(course.id);
   useEffect(()=>{
    async function fetchData(){
    const res=await axios.get(`http://localhost:8080/courses/usersEnrolled/${course.id}`,{
        headers:{
            Authorization:`Bearer ${localStorage.getItem('token')}`
        }
    })
    console.log(res.data);
    setVal(res.data);
}
    fetchData();

   },[course.id])
    return(
      <h3><strong>Number of Students Enrolled : </strong>{val}</h3>
    )
}
export default memo(UserEnrolled);