import axios from "axios";

const baseUrl = "http://localhost:5000";
const registerUrl = `${baseUrl}/users`;
const signinUrl = `${baseUrl}/sessions`;

export const startRegistration = (email: string, password: string) => 
  new Promise<string>((resolve, reject) => {
    axios
      .post(registerUrl, { email, password })
      .then(res => res.data.qr_material ? resolve(res.data.qr_material as string) : reject("Field qr_material not returned from server"))
      .catch(err => reject({message: err.response.data.error, status: err.response.status}));
  });

export const startLogin = (email: string, password: string) => 
  new Promise<string>((resolve, reject) => {
    axios
      .post(signinUrl, { email, password })
      .then(res => res.data.case_id ? resolve(res.data.case_id as string) : reject("Field case_id not returned from server"))
      .catch(err => reject({message: err.response.data.error, status: err.response.status}));
  });

export const completeLogin = (caseId: string, code: string) => 
  new Promise<string>((resolve, reject) => {
    axios.put(signinUrl, { case_id: caseId, token: code })
    .then(res => res.data.session_id ? resolve(res.data.session_id as string) : reject("Field session_id not returned from server"))
    .catch(err => reject({message: err.response.data.error, status: err.response.status}));
  });

export const fetchUsers = (sessionId: string) => 
  new Promise<string[]>((resolve, reject) => {
    axios.get(registerUrl, { headers: { 'Authorization': sessionId }})
      .then(res => res.data.registered_users ? resolve(res.data.registered_users as string[]) : reject("Field registered_users not returned from server"))
      .catch(err => reject({message: err.response.data.error, status: err.response.status}));
  })
