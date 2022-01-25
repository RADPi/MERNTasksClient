import React, { useContext } from 'react'
import proyectoContext from '../../context/proyectos/proyectoContext'
import tareaContext from '../../context/tareas/tareaContext'

const Tarea = ({ tarea }) => {
	//Extraer proyectos del state inicial
	const proyectosContext = useContext(proyectoContext)
	const { proyecto } = proyectosContext

	//Obtener proyectoAcual
	const [proyectoActual] = proyecto

	//Obtener la funcion del context de tareas
	const tareasContext = useContext(tareaContext)
	const { eliminarTarea, obtenerTareas, actualizarTarea, guardarTareaActual } =
		tareasContext

	//funcion que se ejecuta cuando el usuario presiona el boton de elimniar tarea
	function tareaEliminar(id) {
		eliminarTarea(id, proyectoActual._id)
		obtenerTareas(proyectoActual._id)
	}

	//funcion que modifica el estado de las tareas
	function cambiarEstado(tarea) {
		if (tarea.estado) {
			tarea.estado = false
		} else tarea.estado = true
		actualizarTarea(tarea)
	}

	//Agrega una tarea actual cuando el usuario seleciona Editar
	function seleccionarTarea(tarea) {
		guardarTareaActual(tarea)
	}

	return (
		<li className='tarea sombra'>
			<p>{tarea.nombre}</p>

			<div className='estado'>
				{tarea.estado ? (
					<button
						type='button'
						className='completo'
						onClick={() => cambiarEstado(tarea)}
					>
						Completo
					</button>
				) : (
					<button
						type='button'
						className='incompleto'
						onClick={() => cambiarEstado(tarea)}
					>
						Incompleto
					</button>
				)}
			</div>

			<div className='acciones'>
				<button
					type='button'
					className='btn btn-primario'
					onClick={() => seleccionarTarea(tarea)}
				>
					Editar
				</button>
				<button
					type='button'
					className='btn btn-secundario'
					onClick={() => tareaEliminar(tarea._id)}
				>
					Eliminar
				</button>
			</div>
		</li>
	)
}

export default Tarea
