import React from "react";
import { Paper, InputBase, Button } from '@mui/material';
import './login-form.css'

export const EmailPasswordForm = ({onSubmit, error, updateEmail, updatePassword}) => (
  <div className="signup-form">
    <div className="error">{error}</div>
    <Paper
      component="form"
      style={{
        width: 'calc(45% + 2px)',
        marginTop: '6px',
      }}
    >
      <InputBase
        placeholder="Username"
        onChange={updateEmail}
      />
    </Paper>
    <Paper
      component="form"
      style={{
        width: 'calc(45% + 2px)',
        marginTop: '6px',
      }}
    >
      <InputBase
        placeholder="Password"
        type="password"
        onChange={updatePassword}
      />
    </Paper>
    <Button
      id="submit-registration-button"
      type="submit"
      variant="contained"
      color="primary"
      onClick={onSubmit}
      style={{marginTop: '6px'}}>
      Login
    </Button>
    <div>
      <a href="/signup">Don't have an account? Register</a>
    </div>
  </div>
)