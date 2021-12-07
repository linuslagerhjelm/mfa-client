import React, { ChangeEvent, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { startLogin, completeLogin } from '../../../api/user';
import './login-form.css';
import { EmailPasswordForm } from './EmailPasswordForm';
import { QrCodeForm } from './MfaCodeForm';

type SimpleChange = ChangeEvent<{ name: string | undefined; value: unknown; }>

export const LoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [qrMaterial, setQrMaterial] = useState('');
  const [error, setError] = useState('');
  const [mfaCode, setMfaCode] = useState('');

  const updateEmail = (e: SimpleChange) => {
    setEmail(e.target.value as string);
  }
  
  const updatePassword = (e: SimpleChange) => {
    setPassword(e.target.value as string);
  }

  const updateMfaCode = (e: SimpleChange) => {
    setMfaCode(e.target.value as string);
  }

  const submitForm = () => {
    startLogin(email, password)
      .then(qr => setQrMaterial(qr))
      .catch(err => {
        setError(err.message)
      });
  }

  const submitMfaCode = async () => {
    try {
      const caseId = await startLogin(email, password);
      const sessionId = await completeLogin(caseId, mfaCode);
      localStorage.setItem('sessionId', sessionId);
      navigate('/start', {replace: true});
    } catch (e: any) {
      setError(e.message)
    }
  }

  return (
    <div className="signup-form">
        {qrMaterial ?
          <QrCodeForm 
            qrMaterial={qrMaterial}
            updateMfaCode={updateMfaCode}
            onSubmit={submitMfaCode}
            error={error}
          /> : 
          <EmailPasswordForm
            updateEmail={updateEmail}
            updatePassword={updatePassword}
            onSubmit={submitForm}
            error={error}
          />
        }
    </div>
  )
}

