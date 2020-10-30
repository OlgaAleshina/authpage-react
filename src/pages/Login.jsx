import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { loginRequest } from '../API.js';


export const Login = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [user, getUser] = useState(
    {
      email: "",
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


  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await loginRequest(user);
      localStorage.setItem("token", response);
      dispatch({ type: "SET_IS_AUTH" });
      history.push("/home")
    }
    catch (err) { console.log(err); }


  };
  const handleRegister = () => {
    history.push("/register");
  }
  return (

    <Form className="container col-6 p-5" onSubmit={handleLogin}>
      <Form.Group controlId="email"  >
        <Form.Control type="email" placeholder="Enter email" value={user.email} onChange={handleInput} />
      </Form.Group>

      <Form.Group controlId="password">
        <Form.Control type="password" placeholder="Password" value={user.password} onChange={handleInput} />
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

/*loginRequest(user)
      .then(res => { localStorage.setItem("token", res) })
      .then(() => dispatch({ type: "SET_IS_AUTH" }))
      .then(() => history.push("/home"))
      .catch(err => {
        console.log(err);
      });*/