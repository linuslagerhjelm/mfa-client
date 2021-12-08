import React from "react";
import { Paper, InputBase, Button } from '@mui/material';
import './signup-form.css'

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
      Register
    </Button>
    <div>
      <a href="/login">Already have an account? Login</a>
    </div>
  </div>
)