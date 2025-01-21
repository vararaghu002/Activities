import {Form, Input, message} from 'antd';
import { jwtDecode } from 'jwt-decode';
import { Link,useNavigate } from 'react-router-dom';
import {  StyledButton,StyledForm,AddLoginContainer} from './styles/AddCour';
import axios from 'axios';

function Login(){
    const navigate=useNavigate();
    const onFinish=async(values)=>{
        try{
            const res=await axios.post(" http://localhost:8080/users/login",values,{
                headers:{
                "Content-Type":"application/json",
                }},
            );
            if(res.status==200){
                const token=res.data;
                localStorage.setItem("token",token);
                const username=jwtDecode(token).sub;
                console.log(`${username}`);
                const newuser= await axios.get(`http://localhost:8080/users/profile/username/${username}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
                const user=newuser.data;
                localStorage.setItem('userId',user.id);
                localStorage.setItem('username',user.username);
                localStorage.setItem('role',user.role);
                localStorage.setItem('fname',user.fname);
                localStorage.setItem('lname',user.lname);
                return navigate("/");
            }
            else{
                message.error("Invalid username or password.");
            }
        }
        catch(err){
            message.error("Invalid username or password.");
        }
    }
   const onFinishFailed=(errorInfo)=>{
        console.log('Failed:',errorInfo);
    }
return(
    <AddLoginContainer>
        <StyledForm onFinishFailed={onFinishFailed} onFinish={onFinish}>
            <Form.Item label="Username" name="username"rules={[{required: true,message:'please input your username!'}]} >
                <Input placeholder="Enter Username" />
            </Form.Item>
            <Form.Item label="Password" name="password" rules={[{required:true,message:"please input your password"}]}>
                <Input.Password placeholder='Enter Password'/>
            </Form.Item>
            <div style={{display:'flex',justifyContent:'center'}}>
                <div>
                <Form.Item label={null}>
                    <StyledButton htmlType='submit'>Log In</StyledButton>
                </Form.Item>
                </div>
                <div style={{padding:"5px",marginLeft:"10px"}}>
                    <Link to="/signup">Sign Up</Link>
                </div>
            </div> 
        </StyledForm>
        </AddLoginContainer>
    );
}
export default Login;