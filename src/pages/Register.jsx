import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { registerRequest } from "../API.js";

export const Register = () => {
  const { register, handleSubmit, errors } = useForm();

  let history = useHistory();
  const dispatch = useDispatch();


  /*const [user, setUser] = useState(
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
  };*/

  const handleAdd = async (user) => {


    try {
      const response = await registerRequest(user);
      localStorage.setItem("token", response);
      dispatch({ type: "SET_IS_AUTH" });
      history.push("/home")
    }
    catch (err) { console.log(err); }



  };


  return (

    <Form className="container col-6 p-5" onSubmit={handleSubmit(handleAdd)}>
      <Form.Group controlId="email">
        <Form.Control type="email" placeholder="Enter email" name="email" ref={register({ required: true })} />
        {errors.email && <span>This field is required</span>}
      </Form.Group>

      <Form.Group controlId="password">
        <Form.Control type="password" placeholder="Password" name="password" ref={register({ required: true })} />
        {errors.password && <span>This field is required</span>}
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