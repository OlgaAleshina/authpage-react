import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import Form from 'react-bootstrap/Form';
import { ErrorMessage } from '@hookform/error-message';
import Button from 'react-bootstrap/Button';
import { loginRequest } from '../API.js';
import { ErrorAlert } from "../components/errorAlert";


export const Login = () => {
  const { register, handleSubmit, errors } = useForm();

  const history = useHistory();
  const dispatch = useDispatch();
  const [fetchError, setFetchError] = useState(false);


  const handleLogin = async (user) => {

    try {
      const response = await loginRequest(user);
      localStorage.setItem("token", response.data.token);
      dispatch({ type: "SET_IS_AUTH", token: response.data.token });
      history.push("/home")
    }
    catch (err) {
      setFetchError(true);
      console.log(err);
    }

  };

  const handleRegister = () => {
    history.push("/register");
  }

  const emailRules = {
    required: "This is required.",
    pattern: {
      value: /[A-Za-z0-9._+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/,
      message: "Please, enter valid e-mail."
    }
  };

  return (
    <>
      {fetchError && <ErrorAlert />}
      <Form className="container col-6 p-5" onSubmit={handleSubmit(handleLogin)}>
        <Form.Group controlId="email"  >
          <Form.Control type="text" placeholder="Enter email" name="email" ref={register(emailRules)} />
          <ErrorMessage errors={errors} name="email">
            {({ messages }) =>
              messages &&
              Object.entries(messages).map(([type, message]) => (
                <p key={type}>{message}</p>
              ))
            }
          </ErrorMessage>
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Control type="password" placeholder="Password" name="password" ref={register({ required: true })} />

        </Form.Group>

        <Button variant="primary" type="submit">
          Login
      </Button>
        <Button variant="light" onClick={handleRegister}>
          Register
        </Button>
      </Form>
    </>
  )
};

/*loginRequest(user)
  .then(res => {localStorage.setItem("token", res)})
  .then(() => dispatch({type: "SET_IS_AUTH" }))
  .then(() => history.push("/home"))
  .catch(err => {
    console.log(err);
});

*/