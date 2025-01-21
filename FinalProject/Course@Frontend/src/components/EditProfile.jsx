import { Button ,Form,Modal,Input,message} from "antd";
import { useState,memo } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
function EditProfile({details}){
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm(); 
  const navigate=useNavigate();

  const showModal = () => {
    setOpen(true);
  };

  const{mutateAsync}=useMutation({
    mutationFn:
    async({id,values})=>{
        await axios.put(`http://localhost:8080/users/update/${id}`, values,{
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
              'Content-Type': 'application/json',
            },
          })
    },
    onSuccess:()=>{
        message.success("Profile updated Succesfully!");
        navigate('/');
    },
});
  const handleFinish=async(values)=>{
      mutateAsync({id:details.id,values})
  }
  const handleOk = () => {
    form.submit();
  };

  const handleCancel = () => {
    setOpen(false);
  };
    return(
        <>
        <Button onClick={showModal} >
         Update Profile
        </Button>
        <Modal
        title=" Update Profile"
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
        centered
        okText={"Update"}
    >
         <Form
            form={form} 
            layout="vertical" 
            initialValues={{ remember: true }} 
            onFinish={handleFinish}
            >
                <Form.Item
                label="First Name"
                name="fname"
                rules={[{ required: true,message:'Please input the first name!'}]}
                initialValue={details.fname}
            >
                <Input style={{ width: '100%' }} placeholder="Enter First Name" />
            </Form.Item>

            <Form.Item
                label="Last Name"
                name="lname"
                rules={[{ required: true,message:'Please input the last name!'}]}
                initialValue={details.lname}
            >
                <Input style={{ width: '100%' }} placeholder="Enter Last Name" />
            </Form.Item>
            
            <Form.Item
                label="Username"
                name="username"
                rules={[{ required: true,message:'Please input the username!'}]}
                initialValue={details.username}
            >
                <Input style={{ width: '100%' }} placeholder="Enter Username" />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true,message:'Please input the password!'},{
                  pattern: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                  message: 'Password must be at least 6 characters long, contain at least one letter, one number, and one special character!',
                }]}
            >
                <Input.Password style={{ width: '100%' }} placeholder="Enter Password" />
            </Form.Item>
            <Form.Item
                    label="Confirm Password"
                    name="confirmPassword"
                    dependencies={['password']}
                    rules={[
                        { required: true, message: 'Please confirm your password!' },
                        ({ getFieldValue }) => ({
                            validator(_,value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(
                                    new Error('The two passwords do not match!')
                                );
                            },
                        }),
                    ]}
                >
                    <Input.Password placeholder="Confirm Password" />
                </Form.Item>

            <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true,message:'Please input the email!'},{ type: 'email', message: 'Please enter a valid email address!' }]}
                initialValue={details.email}
            >
                <Input style={{ width: '100%' }} placeholder="Enter Email" />
            </Form.Item>

            <Form.Item
                label="Phone"
                name="phone"
                rules={[{ required: true,message:'Please input the phone number!'},{ 
                  pattern: /^[0-9]{10}$/, 
                  message: 'Please enter a valid 10-digit phone number!' 
                }]}
                initialValue={details.phone}
            >
                <Input style={{ width: '100%' }} placeholder="Enter Phone Number" />
            </Form.Item>
            {localStorage.getItem('role')=='ADMIN'?<Form.Item
                    label="Role"
                    name="role"
                    rules={[{ required: true, message: 'Please input your role!' }]}
                >
                    <Input placeholder="Enter Role (e.g., user or admin)" />
                </Form.Item>:<></>}

            <Form.Item
                label="About Me"
                name="aboutme"
                rules={[{ required: true,message:'Please input about yourself!'}]}
                initialValue={details.aboutme}
            >
                <Input.TextArea style={{ width: '100%' }} placeholder="Enter About Yourself" />
            </Form.Item>
            </Form>
        </Modal>
   </>
    )
   
}
export default memo(EditProfile);