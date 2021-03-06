import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { fetchUsers } from '../../api/user';
import '../../App.css';
import './start-view.css';

export const StartView = () => {
  const navigate = useNavigate();
  
  const [sessionId, setSessionId] = useState('');

  useEffect(() => {
    const sessionId = sessionStorage.getItem('sessionId');
    if (!sessionId) {
      navigate('/login', { replace: true });
    }
    setSessionId(sessionId as string);
  }, [navigate, sessionId]);

  const [users, updateUsers] = useState([] as string[]);

  useEffect(() => {
    if (users.length === 0 && sessionId) {
      fetchUsers(sessionId as string)
      .then(data => {
        updateUsers(data)})
        .catch(() => {
          navigate('/login', { replace: true })});
    }
  }, [navigate, users, sessionId]);

  return (
    <div className="content" style={{ width: '500px', margin: 'auto' }}>
      <h1>Successfully logged in!</h1>
      <p>Registered users: </p>
      {users.map(user => <p key="user">{user}</p>)}
    </div>
  )
}

