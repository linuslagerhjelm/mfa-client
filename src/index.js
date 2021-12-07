import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LoginView } from './views/login/LoginView';
import { SignupView } from './views/signup/SignupView';
import { StartView } from './views/start/StartView';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Navigate to="login" />} />
      <Route path="login" element={<LoginView />} />
      <Route path="signup" element={<SignupView />} />
      <Route path="start" element={<StartView />} />
      <Route path="*" element={<Navigate to="login" />} />
    </Routes>
  </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
