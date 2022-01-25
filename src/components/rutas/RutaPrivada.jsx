import React, { useContext, useEffect } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import AuthContext from '../../context/autenticacion/authContext'
import Login from '../auth/Login'

const RutaPrivada = () => {
	const authContext = useContext(AuthContext)
	const { autenticado, cargando, usuarioAutenticado } = authContext

	useEffect(() => {
		usuarioAutenticado()
	}, [])

	return autenticado || cargando ? <Outlet /> : <Navigate to='/' />
}

export default RutaPrivada
