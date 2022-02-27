import React, {useState} from 'react';
import axios from 'axios';
import Joi from 'joi';
import { useNavigate } from 'react-router-dom';
export default function Login(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [errorList, setErrorList] = useState([]);
  let navigate = useNavigate();
  const [user, setUser] = useState({
  email: '',
  password: ''
  });
function getUser(e) 
{
  let myUser = {...user};
  myUser[e.target.name]= e.target.value;
  setUser(myUser);
}
async function submitLogin (e) 
{
  e.preventDefault();
  setIsLoading(true);
  let validationResult = validateLoginForm(user);
  console.log(validationResult);
  if(validationResult.error)
  {
    setIsLoading(false);
    setErrorList(validationResult.error.details);

  }
  else
  {
    let {data} =await axios.post('https://routeegypt.herokuapp.com/signin', user);
    if (data.message === 'success')
    {
      localStorage.setItem('userToken', data.token);
      setIsLoading(false);
      props.getUserData();
      navigate('/home');
    }
    else 
    {
      setError(data.message);
      setIsLoading(false);
    }
  }
}
function validateLoginForm(user)
{
  const schema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    password: Joi.string().pattern(/^[A-Z][a-z]{3,8}$/)
  });
  return schema.validate(user, {abortEarly: false});
}
  return (
    <>
    <h2>Login Now</h2>
    {errorList.map((error, index)=> {
      if(error.message.includes("password"))
      {
        return <div key={index} className='alert alert-danger'>Password invalid</div>
      }
      else{
    return <div key={index} className='alert alert-danger'>{error.message}</div>
  }
})};
    {error?<div className='alert alert-danger'>{error}</div>: ''}
    <form onSubmit={submitLogin}>
      <div className='input-gp my-3'>
        <label htmlFor='email'>Email</label>
        <input onChange={getUser} className='form-control my-2' name='email' type='email'></input>
      </div>
      <div className='input-gp my-3'>
        <label htmlFor='password'>Password</label>
        <input onChange={getUser} className='form-control my-2' name='password' type='password'></input>
      </div>
      <button className='btn btn-info text-white'>{isLoading?<i className='fas fa-spinner'></i>: 'Login'}</button>
     </form>
    </>
  )
}
