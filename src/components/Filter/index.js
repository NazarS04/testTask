import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getTasksFilter } from '../../store/store'
import { changeFilterStatus } from '../../store/slices/tasks-slice'
import classes from './filter.module.css'

const Filter = ({ className }) => {
  const value = useSelector(getTasksFilter)
  const dispatch = useDispatch()
  const selectClass = className ? `${className}
  ${classes.select}` : classes.select
  return <select value={value}
                 className={selectClass}
                 onChange={({ target }) => {
                   dispatch(changeFilterStatus(target.value))
                 }}>
    <option value="default">Default</option>
    <option value="completed">Completed</option>
    <option value="uncompleted">Uncompleted</option>
  </select>
}

export default Filter
