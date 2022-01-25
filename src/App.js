import React, { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './components/auth/Login'
import NuevaCuenta from './components/auth/NuevaCuenta'
import Proyectos from './components/proyectos/Proyectos'
import RutaPrivada from './components/rutas/RutaPrivada'
import tokenAuth from './config/token'
import AlertaState from './context/alertas/alertaState'
import AuthState from './context/autenticacion/authState'
import ProyectoState from './context/proyectos/proyectoState'
import TareaState from './context/tareas/tareaState'

// Revisar si tenemos un token
const token = localStorage.getItem('token')
if (token) {
	tokenAuth(token)
}

function App() {
	return (
		<ProyectoState>
			<TareaState>
				<AlertaState>
					<AuthState>
						<Router>
							<Routes>
								<Route path='/' element={<Login />} />
								<Route path='/nueva-cuenta' element={<NuevaCuenta />} />
								<Route element={<RutaPrivada />}>
									<Route path='/proyectos' element={<Proyectos />} />
								</Route>
							</Routes>
						</Router>
					</AuthState>
				</AlertaState>
			</TareaState>
		</ProyectoState>
	)
}

export default App
