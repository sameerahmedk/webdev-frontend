import React from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styles from '@/components/login-form.module.css';


interface LoginFormInputs {
  email: string;
  password: string;
}

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

//register waala variable email and password kay input tag mein mein 
//ref = {register} karkay use ho raha tha but for
//some reason error aaraha tha, menay koshish ki resolve karnay ki but nahi hua. 
//Please look into it.
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
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="login-form">
      <div>
        <label htmlFor="email" className="form-label">Email:</label>
        <input type="email" id="email" placeholder="abc@xyz.com" {...register("email")}/>
        {errors.email && <span>{errors.email.message}</span>}
      </div>
      <div>
        <label htmlFor="password" className="form-label">Password:</label>
        <input type="password" id="password" placeholder="password" {...register("password")} />
        {errors.password && <span>{errors.password.message}</span>}
      </div>
      <button type="submit">Login</button>
    </form>
  );
  
};

export default LoginForm;
