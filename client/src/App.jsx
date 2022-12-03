import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
//components
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
//firebase
import PrivateRoute from './firebase/PrivateRoute';
import {AuthProvider} from './firebase/auth'


function App() {
	return (
		<AuthProvider>
		<Router>
			<div>
			<Routes>
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route 
					path="/dashboard" 
					element={
						<PrivateRoute>
							<Dashboard />
						</PrivateRoute>
					} />
			</Routes>
			</div>
		</Router>
		</AuthProvider>
	)
}

export default App
