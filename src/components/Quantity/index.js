import React from 'react'
import { useSelector } from 'react-redux'
import { getTasks } from '../../store/store'
import classes from './quantity.module.css'

const Quantity = ({ className, text, func }) => {
  let tasks = useSelector(getTasks)
  tasks = func ? tasks.filter((task) => func(task)) : tasks
  return <p className={`${className} ${classes.text}`}>
    <span>{`${text}:`}</span>
    <span>{tasks.length}</span>
  </p>
}

export default Quantity
