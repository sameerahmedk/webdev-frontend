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
        <input type="email" id="email" name="email" placeholder="abc@xyz.com" />
        {errors.email && <span>{errors.email.message}</span>}
      </div>
      <div>
        <label htmlFor="password" className="form-label">Password:</label>
        <input type="password" id="password" name="password" placeholder="password" />
        {errors.password && <span>{errors.password.message}</span>}
      </div>
      <button type="submit">Login</button>
    </form>
  );
  
};

export default LoginForm;
