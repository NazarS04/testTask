import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import classes from './fieldWithBtn.module.css'

const FieldWithBtn = ({
  initialValue = '',
  actionCreator,
  validateFunc,
  buttonText,
  placeholder,
}) => {
  const [state, setState] = useState(initialValue)
  const dispatch = useDispatch()
  const onChangeHandler = ({ target }) => {
    if (!validateFunc || validateFunc(target.value)) {
      setState(target.value)
    }
  }

  return <form className={classes.form} onSubmit={(event) => {
    event.preventDefault()
    if (state.trim().length > 0) {
      dispatch(actionCreator(state))
    }
    setState(initialValue)
  }}>
    <input type="text"
           className={classes.input}
           value={state}
           placeholder={placeholder}
           onChange={onChangeHandler}/>
    <button className={classes.button}>{buttonText}</button>
  </form>
}

export default FieldWithBtn
