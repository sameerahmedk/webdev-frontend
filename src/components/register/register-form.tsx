import { yupResolver } from '@hookform/resolvers/yup'
import React from 'react'
import { useForm, UseFormReturn } from 'react-hook-form'
import * as yup from 'yup'
import axios from 'axios'
import Cookies from 'js-cookie'
const jsonwebtoken = require('jsonwebtoken')
interface RegisterFormInputs {
  email: string
  password: string
}

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required()
})

const RegisterForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  }: UseFormReturn<RegisterFormInputs> = useForm<RegisterFormInputs>({
    resolver: yupResolver(schema)
  })

  const onSubmit = (data: RegisterFormInputs) => {
    console.log(data)
    axios
      .post(
        'http://localhost:8080/auth/register',
        {
          email: data.email,
          password: data.password
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
      .then(res => {
        console.log('res', res.data)
        console.log(res.data['accessToken'])
        Cookies.set('AccessToken', res.data['accessToken'], { expires: 7 })
        Cookies.set('RefreshToken', res.data['refreshToken'], { expires: 30 })
        console.log(Cookies)
      })
      .catch(err => {
        console.log('error in request', err)
        console.log()
      })
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col w-80 p-6 bg-gray-100 rounded-lg shadow-md">
      <div className="mb-4">
        <label htmlFor="email" className="block mb-2 font-bold text-gray-700">
          Email:
        </label>
        <input
          type="email"
          id="email"
          placeholder="abc@xyz.com"
          {...register('email')}
          className="w-full px-3 py-2 text-gray-700 border rounded-md focus:outline-none focus:border-indigo-500"
        />
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}
      </div>
      <div className="mb-4">
        <label
          htmlFor="password"
          className="block mb-2 font-bold text-gray-700">
          Password:
        </label>
        <input
          type="password"
          id="password"
          placeholder="password"
          {...register('password')}
          className="w-full px-3 py-2 text-gray-700 border rounded-md focus:outline-none focus:border-indigo-500"
        />
        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}
      </div>
      <button
        type="submit"
        className="py-2 px-4 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600">
        Register
      </button>
    </form>
  )
}

export default RegisterForm
