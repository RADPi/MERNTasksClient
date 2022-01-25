import React, { Fragment, useContext } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import proyectoContext from '../../context/proyectos/proyectoContext'
import tareaContext from '../../context/tareas/tareaContext'
import Tarea from './Tarea'

const ListadoTareas = () => {
	//Extraer proyectos del state inicial
	const proyectosContext = useContext(proyectoContext)
	const { proyecto, eliminarProyecto } = proyectosContext

	//Obtener las tareas del proyecto
	const tareasContext = useContext(tareaContext)
	const { tareasproyecto } = tareasContext

	//Si no hay proyecto seleccionado
	if (!proyecto) return <h2>Selecciona un proyecto</h2>

	//Obtener proyectoAcual
	const [proyectoActual] = proyecto

	//Eliminar un proyecto
	function onClickEliminar() {
		eliminarProyecto(proyectoActual._id)
	}

	return (
		<Fragment>
			<h2>Proyecto: {proyectoActual.nombre}</h2>
			<ul className='listado-tareas'>
				{tareasproyecto.length === 0 ? (
					<li className='tarea'>
						<p>No hay tareas</p>
					</li>
				) : (
					<TransitionGroup>
						{tareasproyecto.map(tarea => (
							<CSSTransition key={tarea._id} timeout={200} classNames='tarea'>
								<Tarea tarea={tarea} />
							</CSSTransition>
						))}
					</TransitionGroup>
				)}
			</ul>
			<button
				type='button'
				className='btn btn-primario'
				onClick={onClickEliminar}
			>
				Eliminar Proyecto &times;
			</button>
		</Fragment>
	)
}

export default ListadoTareas
