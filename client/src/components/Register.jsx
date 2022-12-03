import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import firebaseApp from '../firebase/firebase';

function Register() {
    const navigate = useNavigate();

    const [name, setName] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function registerUser(event) {
      event.preventDefault()

      await firebaseApp.auth().createUserWithEmailAndPassword(email, password);
  
      const response = await fetch('http://localhost:3001/api/users/register', {
        method: 'POST',
        headers: {'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      })
  
      const data = await response.json()
  
      if (data.status === 'ok') {
        navigate('/login');
      }
    }
    
   return (
    <div>

      <h1>Register</h1>

      <div>
        <form onSubmit={registerUser}>
          <input name='name' type="text" placeholder="name" value={name} onChange={(e) => setName(e.target.value)} />
          <input name='email' type="text" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input name='password' type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button>Register</button>
        </form>
      </div>

    </div>
  
  );

}

export default Register;
