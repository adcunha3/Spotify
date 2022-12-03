import React, {useState} from 'react';


function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function loginUser(event) {
      event.preventDefault()
  
      const response = await fetch('http://localhost:3001/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      })
  
      const data = await response.json()
  
      if (data._id) {
        alert('Login successful')
        window.location.href = '/dashboard'
      } else {
        alert('Please check your username and password')
      }
    }
    

   return (
      <form onSubmit={loginUser}>
        <div>
            <input name='email' type="text" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input name='password' type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button>Register</button>
        </div>
      </form>
    );

  }
export default Login;