import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AlertaContext from '../../context/alertas/alertaContext'
import authContext from '../../context/autenticacion/authContext'

const NuevaCuenta = () => {
	const { alerta, mostrarAlerta } = useContext(AlertaContext)
	const { mensaje, autenticado, registrarUsuario } = useContext(authContext)

	let navigate = useNavigate()
	//En caso de que el usuario se haya autenticado, o registrado, o sea un registro duplicado
	useEffect(() => {
		if (autenticado) {
			navigate('/proyectos')
		}
		if (mensaje) {
			mostrarAlerta(mensaje.msg, mensaje.categoria)
		}
	}, [mensaje, autenticado])

	const [usuario, setUsuario] = useState({
		nombre: '',
		email: '',
		password: '',
		confirmar: '',
	})

	const { nombre, email, password, confirmar } = usuario

	function onChange(e) {
		setUsuario({
			...usuario,
			[e.target.name]: e.target.value,
		})
	}

	// Cuando el usuario quiere inicar sesion
	function onSubmit(e) {
		e.preventDefault()

		//Validar que no haya campos vacios
		if (
			nombre.trim() === '' ||
			email.trim() === '' ||
			password.trim() === '' ||
			confirmar.trim() === ''
		) {
			mostrarAlerta('Todos los campos son obligatorios', 'alerta-error')
			return
		}

		//Password mínimo de 6 caracteres
		if (password.length < 6) {
			mostrarAlerta(
				'El password debe tener al menos 6 caracteres',
				'alerta-error'
			)
			return
		}

		// Los dos passwordas con iguales
		if (password !== confirmar) {
			mostrarAlerta('Los passwords no son iguales', 'alerta-error')
			return
		}

		//Pasarlo al action
		registrarUsuario({
			nombre,
			email,
			password,
		})
	}

	return (
		<div className='form-usuario'>
			{alerta && (
				<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>
			)}
			<div className='contenedor-form sombra-dark'>
				<h1>Obtener Cuenta</h1>
				<form onSubmit={onSubmit}>
					<div className='campo-form'>
						<label htmlFor='email'>Nombre</label>
						<input
							type='text'
							id='nombre'
							name='nombre'
							placeholder='Tu Nombre'
							value={nombre}
							onChange={onChange}
						/>
					</div>
					<div className='campo-form'>
						<label htmlFor='email'>Email</label>
						<input
							type='email'
							id='email'
							name='email'
							placeholder='Tu Email'
							value={email}
							onChange={onChange}
						/>
					</div>
					<div className='campo-form'>
						<label htmlFor='password'>Password</label>
						<input
							type='password'
							id='password'
							name='password'
							placeholder='Tu Password'
							value={password}
							onChange={onChange}
						/>
					</div>
					<div className='campo-form'>
						<label htmlFor='password'>Confirmar Password</label>
						<input
							type='password'
							id='confirmar'
							name='confirmar'
							placeholder='Repite tu Password'
							value={confirmar}
							onChange={onChange}
						/>
					</div>
					<div className='campo-form'>
						<input
							type='submit'
							className='btn btn-primario btn-block'
							value='Registrarme'
						/>
					</div>
				</form>
				<Link to={'/'} className='enlace-cuenta'>
					Volver a Iniciar Sesión
				</Link>
			</div>
		</div>
	)
}

export default NuevaCuenta
