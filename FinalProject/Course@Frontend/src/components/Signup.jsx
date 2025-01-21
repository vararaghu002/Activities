import React, { useState } from "react";
import { Button, Form, Input, DatePicker, Card,message } from "antd";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const SignupContainer = styled.div`
  max-width: 500px;
  margin: 50px auto;
`;

const StyledButton = styled(Button)`
  width: 100%;
  background-color: #1890ff;
  color: white;
  border: none;
  &:hover {
    background-color: #40a9ff;
  }
`;

const Signup = () => {
  const queryClient=useQueryClient();
  const navigate = useNavigate();

  const {mutateAsync}=useMutation({
     mutationFn:async(values)=>{
      const res = await axios.post("http://localhost:8080/users/register",values, {
              headers: {
                "Content-Type": "application/json",
              }
     });
     return res.data;
  },
  onSuccess: () => {
    message.success("Registered successfully");
    queryClient.invalidateQueries(["courses"])
    navigate("/login");
  },
})
  const onFinish=(values)=>{
    mutateAsync(values);
  }
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <SignupContainer>
      <Card title="Register" bordered>
        <Form
          name="signup"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input placeholder="Enter Username" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Please enter a valid email address!" },
            ]}
          >
            <Input placeholder="Enter Email" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: "Please input your password!" },
              {
                pattern:
                  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                message:
                  "Password must be at least 6 characters long, contain at least one letter, one number, and one special character!",
              },
            ]}
          >
            <Input.Password placeholder="Enter Password" />
          </Form.Item>

          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            dependencies={["password"]}
            rules={[
              { required: true, message: "Please confirm your password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The two passwords do not match!")
                  );
                },
              }),
            ]}
          >
            <Input.Password placeholder="Confirm Password" />
          </Form.Item>

          <Form.Item
            label="First Name"
            name="fname"
            rules={[{ required: true, message: "Please input your first name!" }]}
          >
            <Input placeholder="Enter First Name" />
          </Form.Item>

          <Form.Item
            label="Last Name"
            name="lname"
            rules={[{ required: true, message: "Please input your last name!" }]}
          >
            <Input placeholder="Enter Last Name" />
          </Form.Item>
          {localStorage.getItem('role')=='ADMIN'?<>
                <Form.Item
                    label="Role"
                    name="role"
                    rules={[{ required: true, message: 'Please input your role!' }]}
                >
                    <Input placeholder="Enter Role (e.g., user or admin)" />
                </Form.Item>
                </>:<></>}
          <Form.Item
            label="Phone"
            name="phone"
            rules={[
              { required: true, message: "Please input your phone number!" },
              {
                pattern: /^[0-9]{10}$/,
                message: "Please enter a valid 10-digit phone number!",
              },
            ]}
          >
            <Input placeholder="Enter Phone Number" />
          </Form.Item>

          <Form.Item
            label="Date of Birth"
            name="dob"
            rules={[{ required: true, message: "Please select your date of birth!" }]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            label="About Me"
            name="aboutme"
            rules={[
              { required: true, message: "Please input information about yourself!" },
            ]}
          >
            <Input.TextArea placeholder="Enter About Yourself" />
          </Form.Item>

          <Form.Item>
            <StyledButton htmlType="submit">
              Sign Up
            </StyledButton>
          </Form.Item>
        </Form>
      </Card>
    </SignupContainer>
  );
};

export default Signup;
