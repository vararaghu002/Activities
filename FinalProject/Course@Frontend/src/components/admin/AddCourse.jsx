import { Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { AddCourseContainer, StyledButton,StyledForm } from "../styles/AddCour";
import axios from "axios";
function AddCourse() {
  const navigate = useNavigate();

  const handleFinish = async (values) => {
    try {
      const res = await axios.post("http://localhost:8080/courses/add",values,{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });

      if (res.status==200) {
        navigate("/");
      } else {
        console.error("Failed to add course");
      }
    } catch (err) {
      console.error("Error adding course:", err);
    }
  };

  return (
    <AddCourseContainer>
      <StyledForm layout="vertical" onFinish={handleFinish}>
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
          rules={[
            { required: true, message: "Please input the course description" },
          ]}
        >
          <Input.TextArea placeholder="Enter course description" />
        </Form.Item>
        <Form.Item
          label="Tutor"
          name="tutor"
          rules={[
            { required: true, message: "Please input the tutor name" },
          ]}
        >
          <Input placeholder="Enter tutor name" />
        </Form.Item>
        <Form.Item
          label="Enrolled Students"
          name="enrolledStudents"
          rules={[
            {
              required: true,
              message: "Please input the number of enrolled students",
            },
          ]}
        >
          <Input type="number" placeholder="Enter number of students" />
        </Form.Item>
        <Form.Item
          label="Language"
          name="language"
          rules={[
            { required: true, message: "Please select the course language" },
          ]}
        >
          <Input placeholder="Enter course language" />
        </Form.Item>
        <Form.Item
          label="Price"
          name="price"
          rules={[
            { required: true, message: "Please input the course price" },
          ]}
        >
          <Input type="number" placeholder="Enter price" prefix="₹" />
        </Form.Item>
        <Form.Item
          label="Image URL"
          name="image"
          rules={[
            { required: true, message: "Please input the image URL" },
          ]}
        >
          <Input placeholder="Enter image URL" />
        </Form.Item>
        <Form.Item
          label="Rating"
          name="rating"
          rules={[
            { required: true, message: "Please input the course rating" },
          ]}
        >
          <Input type="number" step="0.1" placeholder="Enter course rating" />
        </Form.Item>
        <Form.Item>
          <StyledButton htmlType="submit">Add Course</StyledButton>
        </Form.Item>
      </StyledForm>
    </AddCourseContainer>
  );
}

export default AddCourse;
