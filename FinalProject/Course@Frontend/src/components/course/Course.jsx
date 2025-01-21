import { Container,Header, CoursesWrapper,CourseCard,Price} from "../styles/cour";
import ReactStars from "react-rating-stars-component";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
function Course() {

  const{data:courses,isLoading,error}=useQuery({
    queryKey:['courses'],
    queryFn:async() => {
      const res = await axios.get("http://localhost:8080/courses/all");
      return res.data;
    }
  });
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error loading courses: {error.message}</div>;
  }

  return (
    <Container>
      <Header>Explore Courses</Header>
      <CoursesWrapper>
        {courses.map((course) => {
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
  );
}

export default Course;
