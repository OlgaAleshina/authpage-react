import {useState, useEffect} from "react";
import {useHistory} from "react-router-dom";
import API from "../utils/API.js";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


const Register =() => {
  let history = useHistory();
  //const [isError, setIsError] = useState(false);

  const [user, setUser] = useState(
    {email:"",
    password: ""
  }
  )

  const handleInput = (e) => {
    const { id, value } = e.target;
    setUser((prevState) => ({
        ...prevState,
        [id]: value
    }));
};

const handleAdd = (e) => {
  e.preventDefault();
  API.post('/api/register', user)
  .then(res=>  localStorage.setItem("token", res))
  .then(history.push("/home"))
  //console.log(res))
  .catch(err=>{
   console.log(err); 
    
  })
  
};


    return (
        
        <Form className="container col-6 p-5" onSubmit={handleAdd}>
  <Form.Group controlId="email">
    <Form.Control type="email" placeholder="Enter email" value={user.email} onChange={handleInput}/>
</Form.Group>

  <Form.Group controlId="password">
     <Form.Control type="password" placeholder="Password" value={user.password} onChange={handleInput} />
  </Form.Group>
  
  <Button variant="primary" type="submit">
    Save
  </Button>
  
</Form>

    )
};
 
export default Register;