import { use, useEffect, useState } from 'react'
import { selectTheme } from '../../store/slices/themeSlice'
import { EmptyState, ThemeToggle } from '../components/UI'
import { AddTaskModal, EditTaskModal } from '../components/Modal'
import { TaskSection } from '../components/Task'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectTasks,
  addTask,
  deleteTask,
  toggleTaskComplete,
  selectPendingTasks,
  selectCompletedTasks
} from '../../store/slices/tasksSlice'

import {
  selectAnalytics,
  updateAnalytics
} from '../../store/slices/analyticsSlice'

function StudyPlannerPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [taskToEdit, setTaskToEdit] = useState(null)
  //Pegando do Redux
  const tasks = useSelector(selectTasks)
  const pendingTasks = useSelector(selectPendingTasks)
  const completedTasks = useSelector(selectCompletedTasks)
  const dispatch = useDispatch()
  const theme = useSelector(selectTheme)
  const analytics = useSelector(selectAnalytics)

  useEffect(() => {
    dispatch(updateAnalytics(tasks))
  }, [tasks, dispatch])


  const handleAddTask = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const handleAddNewTask = (newTask) => {
    dispatch(addTask(newTask))
  }

  const handleToggleComplete = (taskId) => {
    dispatch(toggleTaskComplete(taskId))
  }

  const handleEditTask = (taskId) => {
    const task = tasks.find(t => t.id === taskId)
    setTaskToEdit(task)
    setIsEditModalOpen(true)
  }

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false)
    setTaskToEdit(null)
  }

  const handleSaveEditTask = (taskId, updatedTask) => {
    editTask(taskId, updatedTask)
  }

  const handleDeleteTask = (taskId) => {
    dispatch(deleteTask(taskId))
  }


  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        backgroundImage: theme.background,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: theme.backgroundColor
      }}
    >
      <div className="w-full max-w-md">
        <div className="bg-purple-header rounded-t-2xl px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-icons text-white text-lg">school</span>
              <h1 className="text-white font-medium text-lg">Plano de Estudos</h1>
            </div>
            <ThemeToggle />
          </div>
        </div>

        <div className={`${theme.cardBg} rounded-b-2xl p-6`}>
          {tasks.length === 0 ? (
            <EmptyState onAddTask={handleAddTask} />
          ) : (
            <div>
              <TaskSection
                title={`Para estudar (${analytics.pendingTasks})`}
                tasks={pendingTasks}
                borderColor="gray-600"
                onToggleComplete={handleToggleComplete}
                onEdit={handleEditTask}
                onDelete={handleDeleteTask}
              />

              <TaskSection
                title={`Concluído (${analytics.completedTasks})`}
                tasks={completedTasks}
                borderColor="purple-header"
                onToggleComplete={handleToggleComplete}
                onEdit={handleEditTask}
                onDelete={handleDeleteTask}
              />

              <div className="flex justify-center mt-8">
                <button
                  onClick={handleAddTask}
                  className="w-12 h-12 bg-purple-header hover:bg-purple-dark transition-colors rounded-full flex items-center justify-center"
                  aria-label="Adicionar tarefa"
                >
                  <span className="material-icons text-white text-xl">add</span>
                </button>
              </div>
            </div>
          )}
        </div>

      </div>

      <AddTaskModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onAddTask={handleAddNewTask}
      />

      <EditTaskModal
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        onEditTask={handleSaveEditTask}
        task={taskToEdit}
      />
    </div>
  )
}

export default StudyPlannerPage