import React from 'react'
import classes from './tasks.module.css'
import { useSelector } from 'react-redux'
import { getTasks, getTasksFilter } from '../../store/store'
import Task from './../Task'

const Tasks = ({ filterFunc }) => {
  let tasks = useSelector(getTasks)
  const filterStatus = useSelector(getTasksFilter)
  if (filterStatus !== 'default') {
    tasks = filterFunc(filterStatus, tasks)
  }
  return <ul className={classes.list}>
    {tasks.map((task) => {
      return <Task key={task.id} task={task}/>
    })}
  </ul>
}

export default Tasks
