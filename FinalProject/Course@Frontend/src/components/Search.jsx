import { useState,useEffect} from "react";
import { useParams } from "react-router-dom";
import { Container,CoursesWrapper,CourseCard,Price } from "./styles/cour";
import ReactStars from "react-rating-stars-component";
import axios from "axios";
function Search(){
    const {query}=useParams();
    const[searchRes,setSearchRes]=useState([]);
    useEffect(()=>{
    async function getProduct(){
        const res=await axios.get(`http://localhost:8080/courses/search?keyword=${query}`)
        setSearchRes(res.data)
    }
    getProduct();
    },[query]);
    return (
        <Container>
      <CoursesWrapper>
        {searchRes.map((course) => {
          return (
            <CourseCard to={`/course/${course.id}`} key={course.id}>
              <img src={course.image} alt={course.title} />
              <h1>{course.title}</h1>
              <div >{course.tutor}</div>
              <ReactStars 
                count={5} 
                value={course.rating} 
                size={24} 
                edit={false} 
                activeColor="#ffd700" 
              />
              <Price>&#8377;{course.price}</Price>
            </CourseCard>
          );
        })}
      </CoursesWrapper>
    </Container>
    )
}
export default Search