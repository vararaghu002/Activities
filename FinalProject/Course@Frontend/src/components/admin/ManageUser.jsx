import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DeleteProfile from "../DeleteProfile";
import EditProfile from "../EditProfile";
import { Container,UserList,UserCard,UserId,ActionButtons,AddUserButton} from "../styles/man";
import axios from "axios";

function ManageUser() {
  const navigate = useNavigate();
  const [value, setValue] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await axios.get("http://localhost:8080/users/all", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
      setValue(res.data);
    }
    fetchData();
  }, []);

  return (
    <Container>
      <AddUserButton onClick={() => navigate("/signup")}>
        Add New Student
      </AddUserButton>
      <UserList>
        {value.map((val) => (
          <UserCard key={val.id}>
            <UserId>{val.fname} {val.lname}</UserId>
            <ActionButtons>
              <EditProfile details={val} st={false} />
              <DeleteProfile details={val} />
            </ActionButtons>
          </UserCard>
        ))}
      </UserList>
    </Container>
  );
}

export default ManageUser;
