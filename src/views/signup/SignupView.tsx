import React from "react";
import { SignupForm } from "./signupform/SignupForm";

export const SignupView = () => (
  <div className="content" style={{ width: '500px', margin: 'auto' }}>
    <h1>MFA Client</h1>
    <h2>Signup</h2>
    <SignupForm />
  </div>
)