import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerRequest } from "../API.js";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


export const Register = () => {

  let history = useHistory();
  const dispatch = useDispatch();


  const [user, setUser] = useState(
    {
      email: "",
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

  const handleAdd = async (e) => {
    e.preventDefault();

    try {
      const response = await registerRequest(user);
      localStorage.setItem("token", response);
      dispatch({ type: "SET_IS_AUTH" });
      history.push("/home")
    }
    catch (err) { console.log(err); }



  };


  return (

    <Form className="container col-6 p-5" onSubmit={handleAdd}>
      <Form.Group controlId="email">
        <Form.Control type="email" placeholder="Enter email" value={user.email} onChange={handleInput} />
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

/* registerRequest(user)
       .then(res => localStorage.setItem("token", res))
       .then(() => dispatch({ type: "SET_IS_AUTH" }))
       .then(() => history.push("/home"))
       .catch(err => {
         console.log(err);

       })*/