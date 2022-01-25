import React, { useContext, useEffect, useState } from 'react'
import proyectoContext from '../../context/proyectos/proyectoContext'
import tareaContext from '../../context/tareas/tareaContext'

const FormTarea = () => {
	//Extraer proyectos del state inicial
	const proyectosContext = useContext(proyectoContext)
	const { proyecto } = proyectosContext

	//Obtener la funcion del context de tareas
	const tareasContext = useContext(tareaContext)
	const {
		errortarea,
		tareaseleccionada,
		agregarTarea,
		validarTarea,
		obtenerTareas,
		actualizarTarea,
	} = tareasContext

	//Effect que detecta sy hay una tarea seleccionada
	useEffect(() => {
		if (tareaseleccionada !== null) setTarea(tareaseleccionada)
		else setTarea({ nombre: '' })
	}, [tareaseleccionada])

	//State del formulario
	const [tarea, setTarea] = useState({
		nombre: '',
	})

	//extraer el nombre del proyecto
	const { nombre } = tarea

	//Si no hay proyecto seleccionado
	if (!proyecto) return null

	const [proyectoActual] = proyecto

	// Leer los valores del formulario
	function handleChange(e) {
		setTarea({
			...tarea,
			[e.target.name]: e.target.value,
		})
	}

	function onSubmit(e) {
		e.preventDefault()
		//validar
		if (nombre.trim() === '') {
			validarTarea()
			return
		}

		//Revisar si es edicion o si es nueva tarea
		if (tareaseleccionada) {
			//Actualizar tarea existente
			actualizarTarea(tarea)
		} else {
			//Tarea nueva
			//agregar nueva tarea al state de tareas
			tarea.proyecto = proyectoActual._id
			agregarTarea(tarea)
		}

		//Obtener y filtar las tareas del proyecto'actual
		obtenerTareas(proyectoActual._id)

		//reiniciar el form
		setTarea({
			nombre: '',
		})
	}

	return (
		<div className='formulario'>
			<form onSubmit={onSubmit}>
				<div className='contenedor-input'>
					<input
						type='text'
						className='input-text'
						placeholder='Nombre Tarea...'
						name='nombre'
						value={nombre}
						onChange={handleChange}
					/>
				</div>
				<div className='contenedor-input'>
					<input
						type='submit'
						className='btn btn-primario btn-submit btn-block'
						value={tareaseleccionada ? 'Editar Tarea' : 'Agregar Tarea'}
					/>
				</div>
			</form>
			{errortarea && (
				<p className='mensaje error'>El nombre de la tarea es obligatorio</p>
			)}
		</div>
	)
}

export default FormTarea
