import React, { useContext, useEffect } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import alertaContext from '../../context/alertas/alertaContext'
import proyectoContext from '../../context/proyectos/proyectoContext'
import Proyecto from './Proyecto'

const ListadoProyectos = () => {
	//Etraer pryoectos de state inicial
	const { mensaje, proyectos, obtenerProyectos } = useContext(proyectoContext)
	const { alerta, mostrarAlerta } = useContext(alertaContext)

	useEffect(() => {
		// Si hay un error
		if (mensaje) {
			mostrarAlerta(mensaje.msg, mensaje.categoria)
		}
		obtenerProyectos()
	}, [mensaje])

	//Si no hay datos en la BD retorna null
	if (proyectos.length === 0)
		return <p>No hay proyectos, comienza creando uno</p>

	return (
		<ul className='listado-proyectos'>
			{alerta && (
				<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>
			)}
			<TransitionGroup>
				{proyectos.map(proyecto => (
					<CSSTransition key={proyecto._id} timeout={200} classNames='proyecto'>
						<Proyecto proyecto={proyecto} />
					</CSSTransition>
				))}
			</TransitionGroup>
		</ul>
	)
}

export default ListadoProyectos
