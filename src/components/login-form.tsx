import React from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
//import '../components/login-form.module.css';
import axios from 'axios';
const jsonwebtoken = require('jsonwebtoken');
import Cookies from "js-cookie";
import {sign} from 'jsonwebtoken';

//import { serialize } from "cookies";

import { serialize  } from "cookie";

interface LoginFormInputs {
  email: string;
  password: string;
}

const schema = yup.object().shape({
  email: yup.string().email().required(),
  //password: yup.string().required(), 
  //backend mein bhi validation daalni hai pwd kay liye
  password: yup.string()
  .required('No password provided.') 
  .min(8, 'Password is too short - should be 8 chars minimum.')
  .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, 'Password invalid.')
});

const LoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  }: UseFormReturn<LoginFormInputs> = useForm<LoginFormInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: LoginFormInputs) => {
    console.log(data);
    axios
    .post('http://localhost:8080/auth/login', {
      email: data.email,
      password: data.password,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    )
.then(res => {
      console.log('res', res.data);
      console.log(res.data["accessToken"]);
      Cookies.set("AccessToken", res.data["accessToken"], { expires: 7 });
      Cookies.set("RefreshToken", res.data["refreshToken"]), { expires: 30 }; 
      console.log(Cookies);  
    })
    .catch(err => {
      console.log('error in request', err);
      console.log();
    });
  
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-80 p-6 bg-gray-100 rounded-lg shadow-md">
      <div className="mb-4">
        <label htmlFor="email" className="block mb-2 font-bold text-gray-700">Email:</label>
        <input type="email" id="email" placeholder="abc@xyz.com" {...register("email")} className="w-full px-3 py-2 text-gray-700 border rounded-md focus:outline-none focus:border-indigo-500"/>
        {errors.email && <span className="text-red-500">{errors.email.message}</span>}
      </div>
      <div className="mb-4">
        <label htmlFor="password" className="block mb-2 font-bold text-gray-700">Password:</label>
        <input type="password" id="password" placeholder="password" {...register("password")} className="w-full px-3 py-2 text-gray-700 border rounded-md focus:outline-none focus:border-indigo-500"/>
        {errors.password && <span className="text-red-500">{errors.password.message}</span>}
      </div>
      <button type="submit" className="py-2 px-4 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600">Login</button>
    </form>
  );
  
};

export default LoginForm;
