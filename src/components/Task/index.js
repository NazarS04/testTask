import React, { memo } from 'react'
import classes from './task.module.css'
import { useDispatch } from 'react-redux'
import { changeIsReady } from '../../store/slices/tasks-slice'

const Task = memo(({ task }) => {
  const dispatch = useDispatch()
  const classCheckMark =
    task.isComplete ? `${classes.checkMark} 
    ${classes.checkMarkActive}` : classes.checkMark
  return <li className={classes.item}>
    <div className={classCheckMark}>
      <svg className={classes.svg} viewBox="0 0 16 16"
           xmlns="http://www.w3.org/2000/svg">
        <path d="M13.5 2l-7.5 7.5-3.5-3.5-2.5 2.5 6 6 10-10z"></path>
      </svg>
    </div>
    <p className={classes.text} title={task.text}
       onClick={() => dispatch(changeIsReady(task.id))}>
      {task.text}</p>
  </li>
})

export default Task
