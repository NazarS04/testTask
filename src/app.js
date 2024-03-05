import React from 'react'
import classes from './css/index.module.css'
import Tasks from './components/Tasks'
import Quantity from './components/Quantity'
import Filter from './components/Filter'
import FieldWithBtn from './components/FieldWithBtn'
import { useSelector } from 'react-redux'
import { getMaxLength } from './store/store'
import { addTask, changeMaxLength } from './store/slices/tasks-slice'

const App = () => {
  const maxLength = useSelector(getMaxLength)

  return <div className={classes.wrapper}>
    <div className={classes.container}>
      {!maxLength &&
        <FieldWithBtn
        actionCreator={changeMaxLength}
        buttonText="Add max length"
        initialValue="10"
        placeholder="Min 1 and Max 99"
        validateFunc={(value) => {
          return /^$|^[1-9]\d?$/u.test(value)
        }}
        />}
      {maxLength &&
        <>
          <div className={classes.controls}>
            <FieldWithBtn actionCreator={addTask}
                          placeholder={`Available maxLength ${maxLength}`}
                          buttonText="Add new task"/>
            <Filter className={classes.filter}/>
          </div>
          <Quantity text={'Quantity of completed tasks'}
                    func={(task) => task.isComplete}/>
          <Quantity className={classes.lastQuantity}
                    text={'Quantity of uncompleted tasks'}
                    func={(task) => !task.isComplete}/>
          <Tasks filterFunc={(filterStatus, tasks) => {
            if (filterStatus === 'completed') {
              return tasks.filter((task) => {
                return task.isComplete
              })
            }

            return tasks.filter((task) => {
              return !task.isComplete
            })
          }}/>
        </>
      }
    </div>
  </div>
}

export default App
