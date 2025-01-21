import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Table,TableHeader,TableRow,TableCell,CancelButton } from "../styles/MyCour";
import axios from "axios";

function MyCourse() {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(
          `http://localhost:8080/users/courses_enrolled/${localStorage.getItem( "userId" )}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setCourses(res.data);
      } catch (err) {
        console.error("Error fetching courses:", err);
      }
    }
    fetchData();
  }, []);

  async function cancelEnroll(courseId) {
    try {
      const res = await axios.delete(
        `http://localhost:8080/users/cancelEnroll/${localStorage.getItem("userId")}/${courseId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (res.status==200) {
        setCourses((prevCourses) =>
          prevCourses.filter((course) => course.id !== courseId)
        );
      } else {
        console.log("Failed to cancel enrollment");
      }
    } catch (err) {
      console.error("Error canceling enrollment:", err);
    }
  }

  return (
    <Table>
      <thead>
        <tr>
          <TableHeader></TableHeader>
          <TableHeader>Course Name</TableHeader>
          <TableHeader>Price</TableHeader>
          <TableHeader>Action</TableHeader>
        </tr>
      </thead>
      <tbody>
        {courses.map((course) => (
          <TableRow key={course.id}>
            <TableCell></TableCell>
            <TableCell>{course.title}</TableCell>
            <TableCell>&#8377;{course.price}</TableCell>
            <TableCell>
              <CancelButton onClick={() => cancelEnroll(course.id)}>
                Cancel Enrollment
              </CancelButton>
            </TableCell>
          </TableRow>
        ))}
      </tbody>
    </Table>
  );
}

export default MyCourse;
