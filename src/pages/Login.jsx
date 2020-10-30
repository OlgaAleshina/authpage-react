import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { loginRequest } from '../API.js';


export const Login = () => {
  const { register, handleSubmit, errors } = useForm();

  const history = useHistory();
  const dispatch = useDispatch();


  const handleLogin = async (user) => {

    try {
      const response = await loginRequest(user);
      localStorage.setItem("token", response.data.token);
      dispatch({ type: "SET_IS_AUTH" });
      history.push("/home")
    }
    catch (err) { console.log(err); }

  };

  const handleRegister = () => {
    history.push("/register");
  }
  return (

    <Form className="container col-6 p-5" onSubmit={handleSubmit(handleLogin)}>
      <Form.Group controlId="email"  >
        <Form.Control type="email" placeholder="Enter email" name="email" ref={register({ required: true })} />
        {errors.email && <span>This field is required</span>}
      </Form.Group>

      <Form.Group controlId="password">
        <Form.Control type="password" placeholder="Password" name="password" ref={register({ required: true })} />
        {errors.password && <span>This field is required</span>}
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
      });

 */