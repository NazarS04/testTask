import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  'items': [],
  'filterStatus': 'default',
  'maxLength': undefined,
}

const slice = createSlice({
  'name': 'tasks',
  initialState,
  'reducers': {
    changeIsReady(state, action) {
      const task = state.items.find((elem) => elem.id === action.payload)
      task.isComplete = !task.isComplete
    },
    changeFilterStatus(state, action) {
      state.filterStatus = action.payload
    },
    addTask(state, action) {
      if (state.maxLength >= action.payload.length) {
        const id = state.items.length > 0 ? state.items.at(-1).id + 1 : 1
        state.items.push({
          id,
          'text': action.payload,
          'isComplete': false,
        })
      }
    },
    changeMaxLength(state, action) {
      state.maxLength = Number(action.payload)
    },
  },
})

export const {
  changeIsReady,
  changeFilterStatus,
  addTask,
  changeMaxLength,
} = slice.actions
export default slice.reducer
