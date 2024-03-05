import { configureStore } from '@reduxjs/toolkit'
import TasksSlice from './slices/tasks-slice'

const store = configureStore({
  'reducer': {
    'tasks': TasksSlice,
  },
})

export const getTasks = (state) => state.tasks.items
export const getTasksFilter = (state) => state.tasks.filterStatus
export const getMaxLength = (state) => state.tasks.maxLength

export default store
