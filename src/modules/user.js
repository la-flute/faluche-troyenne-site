import axios from '../lib/axios'
import errorToString from '../lib/errorToString'
import { actions as notifActions } from 'redux-notifications'
import { logout } from './login'

export const SET_USER = 'user/SET_USER'
export const SET_USERS = 'users/SET_USERS'

const initialState = {
  user: null,
  users: []
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload
      }
    case SET_USERS:
      return {
        ...state,
        users: action.payload
      }
    default:
      return state
  }
}

export const fetchUser = () => {
  return async (dispatch, getState) => {
    const authToken = getState().login.token
    if (!authToken || authToken.length === 0) {
      return
    }
    try {
      const res = await axios.get('user', { headers: { 'X-Token': authToken } })
      dispatch({ type: SET_USER, payload: res.data })
    } catch (err) {
      dispatch(logout())
    }
  }
}

export const listUsers = () => {
  return async (dispatch, getState) => {
    const authToken = getState().login.token
    if (!authToken || authToken.length === 0) {
      return
    }
    try {
      const req = await axios.get('user/list', {
        headers: { 'X-Token': authToken }
      })
      if (req.status === 200) 
        dispatch({ type: SET_USERS, payload: req.data })
    } catch (err) {
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

export const sendInfos = data => {
  return async (dispatch, getState) => {
    const authToken = getState().login.token

    if (!authToken || authToken.length === 0) {
      return
    }

    try {
      const res = await axios.put('user', data, { headers: { 'X-Token': authToken } })

      dispatch({
        type: SET_USER,
        payload: res.data
      })

      dispatch(
        notifActions.notifSend({
          message: 'Compte édité avec succès',
          dismissAfter: 2000
        })
      )
    } catch (err) {
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
