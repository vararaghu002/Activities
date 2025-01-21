import { useParams } from "react-router-dom";
import UpdateCourse from "./UpdateCourse";
import DeleteCourse from "./DeleteCourse";
import BuyCourse from "./BuyCourse";
import { CourseDetailsContainer ,Image,Title,ActionContainer,Paragraph}from "../styles/CourDet";
import UserEnrolled from "../admin/UserEnrolled";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

function CourseDetails() {
  const { id } = useParams();

  const{data:value,isLoading,error}=useQuery({
    queryKey:['value',id],
    queryFn:
    async() => {
        const res = await axios.get(
          `http://localhost:8080/courses/coursedetails/${id}`
        )
        return res.data;
  }});
  if(isLoading) return <div>isLoading...</div>
  if(error) return <div>{error.message}</div>

  return (
    <CourseDetailsContainer>
      <Image src={value.image}  />
      <Title>{value.title}</Title>
      <Paragraph>
         {value.description || "No description available."}
      </Paragraph>
      <br></br>
      <Paragraph>
        <strong>Instructor :</strong> {value.tutor|| "N/A"}
      </Paragraph>
      <Paragraph>
        <strong>Language :</strong> {value.language || "English"}
      </Paragraph>
      <Paragraph >
        <strong>Rating :</strong> {value.rating || "No Rating"} 
      </Paragraph>
      {localStorage.getItem("role") === "ADMIN" ? (
          <>
      <Paragraph>
              <UserEnrolled course={value} />
       </Paragraph></>):<></>}
      <ActionContainer>
        {localStorage.getItem("role") === "ADMIN" ? (
          <>
            <Paragraph>
              <UpdateCourse course={value} />
            </Paragraph>
            <Paragraph>
              <DeleteCourse course={value} />
            </Paragraph>
          </>
        ) : (
          <Paragraph>
            <BuyCourse course={value} />
          </Paragraph>
        )}
      </ActionContainer>
    </CourseDetailsContainer>
  );
}

export default CourseDetails;
