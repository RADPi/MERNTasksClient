import React, { useContext, useEffect } from 'react'
import authContext from '../../context/autenticacion/authContext'

const Barra = () => {
	const { usuario, usuarioAutenticado, cerrarSesion } = useContext(authContext)

	useEffect(() => {
		usuarioAutenticado()
	}, [])

	return (
		<header className='app-header'>
			{usuario && (
				<p className='nombre-usuario'>
					Hola <span>{usuario.nombre}</span>
				</p>
			)}
			<nav className='nav-principal'>
				<button
					className='btn btn-blank cerrar-sesion'
					onClick={() => cerrarSesion()}
				>
					Cerrar Sesion
				</button>
			</nav>
		</header>
	)
}

export default Barra
