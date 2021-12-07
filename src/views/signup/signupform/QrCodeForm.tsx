import React, { ChangeEvent, FC } from "react";
import { Paper, InputBase, Button } from '@mui/material';
import QRCode from "react-qr-code";
import './signup-form.css'

type SimpleChange = ChangeEvent<{ name: string | undefined; value: unknown; }>

interface Props {
  qrMaterial: string
  error: string
  updateMfaCode: (e: SimpleChange) => void
  onSubmit: (e: any) => void
}

export const QrCodeForm: FC<Props> = ({ qrMaterial, error, updateMfaCode, onSubmit }) => (
  <div className="qr-code">
    <QRCode value={qrMaterial} />
    <p className="qr-code-description">Enter MFA code into the below input field</p>
    <Paper
      component="form"
      style={{
        marginTop: '6px',
      }}
    >
      <InputBase
        placeholder="Code"
        onChange={updateMfaCode}
      />
    </Paper>
    <div className="error">{error}</div>
    <Button
      id="submit-registration-button"
      type="submit"
      variant="contained"
      color="primary"
      onClick={onSubmit}
      style={{marginTop: '6px'}}>
      Submit
    </Button>
  </div>
)