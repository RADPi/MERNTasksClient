import { useReducer } from 'react'
import clienteAxios from '../../config/axios'
import {
	ACTUALIZAR_TAREA,
	AGREGAR_TAREA,
	ELIMINAR_TAREA,
	TAREAS_PROYECTO,
	TAREA_ACTUAL,
	VALIDAR_TAREA,
} from '../../types'
import TareaContext from './tareaContext'
import TareaReducer from './tareaReducer'

const TareaState = props => {
	const initialState = {
		tareasproyecto: [],
		errortarea: false,
		tareaseleccionada: null,
	}

	//Crear dispatch y state
	const [state, dispatch] = useReducer(TareaReducer, initialState)

	//Crear las funciones

	//Obtener las tareas de un proyecto
	const obtenerTareas = async proyecto => {
		try {
			const resultado = await clienteAxios.get('/api/tareas', {
				params: { proyecto },
			})
			// console.log(resultado)
			dispatch({
				type: TAREAS_PROYECTO,
				payload: resultado.data.tareas,
			})
		} catch (error) {
			console.error(error)
		}
	}

	//Agregar una tarea al pryecto seleccionado
	const agregarTarea = async tarea => {
		try {
			const resultado = await clienteAxios.post('/api/tareas', tarea)
			dispatch({
				type: AGREGAR_TAREA,
				payload: tarea,
			})
		} catch (error) {
			console.error(error)
		}
	}

	//Valida y muestra un error en caso que sea encesario
	function validarTarea() {
		dispatch({
			type: VALIDAR_TAREA,
		})
	}

	//Eliminar tarea por id
	const eliminarTarea = async (id, proyecto) => {
		try {
			await clienteAxios.delete(`/api/tareas/${id}`, { params: { proyecto } })
			dispatch({
				type: ELIMINAR_TAREA,
				payload: id,
			})
		} catch (error) {
			console.error(error)
		}
	}

	// Edita una tarea
	const actualizarTarea = async tarea => {
		try {
			const resultado = await clienteAxios.put(
				`/api/tareas/${tarea._id}`,
				tarea,
			)
			dispatch({
				type: ACTUALIZAR_TAREA,
				payload: resultado.data.tarea,
			})
		} catch (error) {
			console.error(error)
		}
	}

	//Extrae una tarea para edicion
	const guardarTareaActual = tarea => {
		dispatch({
			type: TAREA_ACTUAL,
			payload: tarea,
		})
	}

	return (
		<TareaContext.Provider
			value={{
				tareasproyecto: state.tareasproyecto,
				errortarea: state.errortarea,
				tareaseleccionada: state.tareaseleccionada,
				obtenerTareas,
				agregarTarea,
				validarTarea,
				eliminarTarea,
				guardarTareaActual,
				actualizarTarea,
			}}
		>
			{props.children}
		</TareaContext.Provider>
	)
}

export default TareaState
