import {useState, useEffect} from "react";
import {useHistory} from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import API from "../utils/API.js";


const Login =() => {
  let history = useHistory();

  const [user, getUser] = useState(
    {email:"",
    password: ""
  }
  )

  const handleInput = (e) => {
    const { id, value } = e.target;
    getUser((prevState) => ({
        ...prevState,
        [id]: value
    }));
};


const handleLogin =(e) =>{
  e.preventDefault();
 
  API.post('/api/login', user)
    .then(res=>  localStorage.setItem("token", res))
    .then(history.push("/home"))
    .catch(err=>{
      console.log(err); 
     })    
}


const handleRegister =() => {
  history.push("/register");
}
    return (
        
<Form className="container col-6 p-5" onSubmit={handleLogin}>
  <Form.Group controlId="email"  >
    <Form.Control type="email" placeholder="Enter email" value={user.email} onChange={handleInput} />
</Form.Group>

  <Form.Group controlId="password">
     <Form.Control type="password" placeholder="Password" value={user.password} onChange={handleInput}/>
  </Form.Group>
  
  <Button variant="primary" type="submit">
    Login
  </Button>
  <Button variant="light" onClick={handleRegister}>
    Register
  </Button>
</Form>

    )
};
 
export default Login;