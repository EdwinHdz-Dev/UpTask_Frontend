import { getFullProject } from "@/api/ProjectAPI"
import AddTaskModal from "@/components/tasks/AddTaskModal"
import EditTaskData from "@/components/tasks/EditTaskData"
import TaskList from "@/components/tasks/TaskList"
import TaskModalDetails from "@/components/tasks/TaskModalDetails"
import { useAuth } from "@/hooks/useAuth"
import { isManager } from "@/utils/policies"
import { calculateTheoreticalProgress, formatDates } from "@/utils/utils"
import { useQuery } from "@tanstack/react-query"
import { useMemo } from "react"
import { Link, Navigate, useNavigate, useParams } from "react-router-dom"
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function ProjectDetailsView() {

    const { data: user, isLoading: authLoading } = useAuth()
    const navigate = useNavigate()
    const params = useParams()
    const projectId = params.projectId!
    const { data, isLoading, isError } = useQuery({
        queryKey: ['project', projectId],
        queryFn: () => getFullProject(projectId),
        retry: false
    })

    const canEdit = useMemo(() => data?.manager === user?._id, [data, user])

    if (isLoading || authLoading) return 'Cargando...'
    if (isError) return <Navigate to='/404' />
    if (data && user) {
        const completedTasksCount = data.tasks.filter(task => task.status === 'completed').length
        const tasksCount = data.tasks.length
        const avance = (completedTasksCount * 100) / tasksCount
        const estimatedCompletionDate = new Date(data.estimatedCompletionDate); // Suponiendo que data tiene esta propiedad
        const currentDate = new Date();

        let diferencia;
        let projectLate = false;
        let mensaje;

        // Si el proyecto está completo, calcular diferencia sólo una vez
        if (avance === 100) {
            diferencia = 100 - Math.round(calculateTheoreticalProgress(data.createdAt, data.estimatedCompletionDate));
            if (currentDate > estimatedCompletionDate) {
                mensaje = 'El proyecto no fue terminado a tiempo';
            } else {
                mensaje = 'El proyecto ha sido terminado en tiempo y forma';
            }
        } else {
            diferencia = avance - Math.round(calculateTheoreticalProgress(data.createdAt, data.estimatedCompletionDate));
            projectLate = diferencia < 0 && currentDate > estimatedCompletionDate;
            if (projectLate) {
                mensaje = 'El proyecto no fue terminado a tiempo';
            } else if (diferencia < 0) {
                mensaje = 'El progreso del proyecto va lento';
            } else {
                mensaje = 'El progreso del proyecto va en tiempo y forma';
            }
        }

        return (
            <>
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-5xl font-black">{data.projectName}</h1>
                        <p className="text-2xl font-light text-gray-500 mt-5">{data.description}</p>
                        <p className="text-2xl font-light text-gray-500 mt-5">{formatDates(data.createdAt)}</p>
                        <p className="text-2xl font-light text-gray-500 mt-5">Total de tareas asignadas: {tasksCount} tareas</p>
                        <p className="text-2xl font-light text-gray-500 mt-5">Total de tareas completadas: {completedTasksCount} {completedTasksCount > 1 ? 'tareas' : 'tarea'}</p>
                        <p className={`text-2xl font-light mt-5 ${diferencia >= 0 ? 'text-gray-800' : 'text-red-500'}`}>
                            {mensaje}
                        </p>
                    </div>
                    <div className="mt-16 mr-60" style={{ width: '200px', height: '200px' }}>
                        <CircularProgressbar
                            value={avance}
                            text={avance >= 100 ? 'Completado' : `${avance.toFixed(2)}%`}
                            styles={buildStyles({
                                textSize: '14px',
                                textColor: avance >= 100 ? '#000000' : '#3B82F6',
                                pathColor: avance >= 100 ? '#28a745' : '#3B82F6',
                                trailColor: ''
                            })}
                        />
                    </div>
                </div>

                {isManager(data.manager, user._id) && (
                    <nav className="my-5 flex gap-3">
                        <button
                            type="button"
                            className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl 
                            font-bold cursor-pointer transition-colors"
                            onClick={() => navigate(location.pathname + '?newTask=true')}
                        >
                            Agregar Tarea
                        </button>

                        <Link
                            to={'team'}
                            className="bg-fuchsia-600 hover:bg-fuchsia-700 px-10 py-3 text-white text-xl 
                            font-bold cursor-pointer transition-colors"
                        >
                            Colaboradores
                        </Link>
                    </nav>
                )}

                <TaskList
                    tasks={data.tasks}
                    canEdit={canEdit}
                />

                <AddTaskModal />
                <EditTaskData />
                <TaskModalDetails />
            </>
        )
    }
    return null;
}
