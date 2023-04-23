import LoginForm from '@/components/login/login-form';
import Head from 'next/head';
import React from 'react';

function login() {
	return (
		<>
			<Head>
				<title>Login</title>
			</Head>
			<div className='flex items-center justify-center h-screen bg-container bg-no-repeat bg-cover bg-center bg-fixed'>
				<LoginForm />
			</div>
		</>
	);
}

export default login;
