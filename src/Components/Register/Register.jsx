import React, {useState} from 'react';
import axios from 'axios';
import Joi from 'joi';
import { useNavigate } from 'react-router-dom';
export default function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [errorList, setErrorList] = useState([]);
  let navigate = useNavigate();
  const [user, setUser] = useState({
  first_name: '',
  last_name: '',
  age: 0,
  email: '',
  password: ''
  });
function getUser(e) 
{
  let myUser = {...user};
  myUser[e.target.name]= e.target.value;
  setUser(myUser);
}
async function submitRegister (e) 
{
  e.preventDefault();
  setIsLoading(true);
  let validationResult = validateRegisterForm(user);
  console.log(validationResult);
  if(validationResult.error)
  {
    setIsLoading(false);
    setErrorList(validationResult.error.details);

  }
  else
  {
    let {data} =await axios.post('https://routeegypt.herokuapp.com/signup', user);
    if (data.message === 'success')
    {
      setIsLoading(false);
      navigate('/login');
    }
    else 
    {
      setError(data.message);
      setIsLoading(false);
    }
  }
}
function validateRegisterForm(user)
{
  const schema = Joi.object({
    first_name: Joi.string().min(3).max(8).required(),
    last_name: Joi.string().min(3).max(8).required(),
    age: Joi.number().min(16).max(80),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    password: Joi.string().pattern(/^[A-Z][a-z]{3,8}$/)
  });
  return schema.validate(user, {abortEarly: false});
}
  return (
    <>
    <h2>Register Now</h2>
    {errorList.map((error, index)=> {
      if(error.message.includes("password"))
      {
        return <div key={index} className='alert alert-danger'>Password invalid</div>
      }
      else{
    return <div key={index} className='alert alert-danger'>{error.message}</div>
  }
})}
    {error?<div className='alert alert-danger'>{error}</div>: ''}
    <form onSubmit={submitRegister}>
      <div className='input-gp my-3'>
        <label htmlFor='first_name'>First Name</label>
        <input onChange={getUser} className='form-control my-2' name='first_name' type='text' id='first_name'></input>
      </div>
      <div className='input-gp my-3'>
        <label htmlFor='last_name'>Last Name</label>
        <input onChange={getUser} className='form-control my-2' name='last_name' type='text' id='last_name'></input>
      </div>
      <div className='input-gp my-3'>
        <label htmlFor='age'>Age</label>
        <input onChange={getUser} className='form-control my-2' name='age' type='number' id='age'></input>
      </div>
      <div className='input-gp my-3'>
        <label htmlFor='email'>Email</label>
        <input onChange={getUser} className='form-control my-2' name='email' type='email' id='email'></input>
      </div>
      <div className='input-gp my-3'>
        <label htmlFor='password'>Password</label>
        <input onChange={getUser} className='form-control my-2' name='password' type='password' id='password'></input>
      </div>
      <button className='btn btn-info text-white' type='submit'>{isLoading?<i className='fas fa-spinner'></i>: 'Register'}</button>
     </form>
    </>
  )
}
