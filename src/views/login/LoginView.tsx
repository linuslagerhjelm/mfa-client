import React from "react";
import { LoginForm } from "./loginForm/LoginForm";
import '../../App.css';

export const LoginView = () => (
  <div className="content" style={{ width: '500px', margin: 'auto' }}>
    <h1>MFA Client</h1>
    <h2>Login</h2>
    <LoginForm />
  </div>
);