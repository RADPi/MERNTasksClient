import React, { useContext, useState } from 'react'
import proyectoContext from '../../context/proyectos/proyectoContext'

const NuevoProyecto = () => {
	const proyectosContext = useContext(proyectoContext)
	const {
		formulario,
		errorformulario,
		mostrarFormulario,
		agregarProyecto,
		mostrarError,
	} = proyectosContext

	const [proyecto, setProyecto] = useState({
		nombre: '',
	})

	const { nombre } = proyecto

	//Lee los contenidos del input
	function onChangeProyecto(e) {
		setProyecto({
			...proyecto,
			[e.target.name]: e.target.value,
		})
	}

	function onSubmitProyecto(e) {
		e.preventDefault()
		//Validar el Proyecto
		if (nombre === '') {
			mostrarError()
			return
		}

		//Agregar al State
		agregarProyecto(proyecto)

		//Reiniciar el Formulario
		setProyecto('')
	}

	function onClickFormulario() {
		mostrarFormulario()
	}

	return (
		<>
			<button
				type='button'
				className='btn btn-primario btn-block'
				onClick={onClickFormulario}
			>
				Nuevo Proyecto
			</button>

			{formulario && (
				<form
					action=''
					className='formulario-nuevo-proyecto'
					onSubmit={onSubmitProyecto}
				>
					<input
						type='text'
						className='input-text'
						placeholder='Nombre Proyecto'
						name='nombre'
						value={nombre}
						onChange={onChangeProyecto}
					/>
					<input
						type='submit'
						className='btn btn-primario btn-block'
						value='Agregar Proyecto'
					/>
				</form>
			)}
			{errorformulario && (
				<p className='mensaje error'>El nombre del proyecto es obligatorio</p>
			)}
		</>
	)
}

export default NuevoProyecto
