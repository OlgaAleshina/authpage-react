import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import Form from 'react-bootstrap/Form';
import { ErrorMessage } from '@hookform/error-message';
import Button from 'react-bootstrap/Button';
import { post } from "../API.js";

export const Register = () => {
  const { register, handleSubmit, errors } = useForm();

  let history = useHistory();
  const dispatch = useDispatch();


  const handleAdd = async (user) => {
    try {
      const response = await post("/api/register", user);
      localStorage.setItem("token", response);
      dispatch({ type: "SET_IS_AUTH", token: response.data.token });
      history.push("/home")
    }
    catch (err) { console.log(err); }
  };


  const emailRules = {
    required: "This is required.",
    pattern: {
      value: /[A-Za-z0-9._+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/,
      message: "Please, enter valid e-mail."
    }
  };

  const passwordRules = {
    required: "This is required.",
    pattern: {
      value: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).+/,
      message: "Please, include at least 1 number, 1 uppercase letter and 1 lowercase letter."
    },
    minLength: {
      value: 8,
      message: "Please, enter at least 8 symbols."
    }
  }


  return (

    <Form className="container col-6 p-5" onSubmit={handleSubmit(handleAdd)} >
      <Form.Group controlId="email">
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
        <Form.Control type="password" placeholder="Password" name="password" ref={register(passwordRules)} />
        <ErrorMessage errors={errors} name="password">
          {({ messages }) =>
            messages &&
            Object.entries(messages).map(([type, message]) => (
              <p key={type}>{message}</p>
            ))
          }
        </ErrorMessage>

      </Form.Group>

      <Button variant="primary" type="submit">
        Save
        </Button>
    </Form >

  )
};

/* registerRequest(user)
       .then(res => localStorage.setItem("token", res))
       .then(() => dispatch({ type: "SET_IS_AUTH" }))
       .then(() => history.push("/home"))
       .catch(err => {
         console.log(err);

       })*/