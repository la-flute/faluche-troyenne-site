import axios from '../lib/axios'
import errorToString from '../lib/errorToString'
import { actions as notifActions } from 'redux-notifications'

export const SET_TINDERS = 'tinder/SET_TINDERS'
export const REMOVE_TINDER = 'tinder/REMOVE_TINDER'

const initialState = {
  tinders: []
}

export default (state = initialState, action) => {
  let tinders = []
  switch (action.type) {
    case SET_TINDERS:
      return {
        ...state,
        tinders: action.payload
      }
    case REMOVE_TINDER:
      tinders = state.tinders.slice()
      tinders = tinders.filter(t => t.id !== action.payload)
      return {
        ...state,
        tinders
      }
    default:
      return state
  }
}

export const fetchTinders = () => {
  return async (dispatch, getState) => {
    const authToken = getState().login.token

    if (!authToken || authToken.length === 0) {
      return
    }

    try {
      const res = await axios.get('tinders', {
        headers: { 'X-Token': authToken }
      })
      console.log(res)
      dispatch({ type: SET_TINDERS, payload: res.data })
    } catch (err) {
      console.log(err)
      dispatch(
        notifActions.notifSend({
          message: errorToString(err.response.data.error),
          kind: 'danger',
          dismissAfter: 2000
        })
      )
    }
  }
}

export const like = userId => {
  return async (dispatch, getState) => {
    const authToken = getState().login.token

    if (!authToken || authToken.length === 0) {
      return
    }

    try {
      const res = await axios.post(
        'tinders',
        { userId, type: 'like' },
        {
          headers: { 'X-Token': authToken }
        }
      )
      if (res.data === 'MATCH')
        dispatch(
          notifActions.notifSend({
            message: "C'est un match !",
            dismissAfter: 2000
          })
        )
      dispatch({ type: REMOVE_TINDER, payload: userId })
    } catch (err) {
      console.log(err)
      dispatch(
        notifActions.notifSend({
          message: errorToString(err.response.data.error),
          kind: 'danger',
          dismissAfter: 2000
        })
      )
    }
  }
}

export const dislike = userId => {
  return async (dispatch, getState) => {
    const authToken = getState().login.token

    if (!authToken || authToken.length === 0) {
      return
    }

    try {
      await axios.post(
        'tinders',
        { userId, type: 'dislike' },
        {
          headers: { 'X-Token': authToken }
        }
      )
      dispatch({ type: REMOVE_TINDER, payload: userId })
    } catch (err) {
      console.log(err)
      dispatch(
        notifActions.notifSend({
          message: errorToString(err.response.data.error),
          kind: 'danger',
          dismissAfter: 2000
        })
      )
    }
  }
}
export const turbolike = userId => {
  return async (dispatch, getState) => {
    const authToken = getState().login.token

    if (!authToken || authToken.length === 0) {
      return
    }

    try {
      await axios.post(
        'tinders',
        { userId, type: 'turbolike' },
        {
          headers: { 'X-Token': authToken }
        }
      )
      dispatch({ type: REMOVE_TINDER, payload: userId })
    } catch (err) {
      console.log(err)
      dispatch(
        notifActions.notifSend({
          message: errorToString(err.response.data.error),
          kind: 'danger',
          dismissAfter: 2000
        })
      )
    }
  }
}
