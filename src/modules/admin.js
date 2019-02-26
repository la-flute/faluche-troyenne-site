import axios from '../lib/axios'
import errorToString from '../lib/errorToString'
import { actions as notifActions } from 'redux-notifications'

export const SET_USERS = 'admin/SET_USERS'
export const SET_COUNTS = 'admin/SET_COUNTS'
export const SET_CHARTDATA = 'admin/SET_CHARTDATA'
export const SET_USER_ADMIN = 'admin/SET_USER_ADMIN'
export const SET_USER_PAID = 'admin/SET_USER_PAID'
export const REMOVE_USER_ADMIN = 'admin/REMOVE_USER_ADMIN'
export const SET_USER_PLACE = 'admin/SET_USER_PLACE'
export const SET_USER_RESPO = 'admin/SET_USER_RESPO'
export const SET_USER_PERMISSION = 'admin/SET_USER_PERMISSION'

const initialState = {
  users: [],
  respo: [],
  chartData: { daily: [], cumul: [] },
}

export default (state = initialState, action) => {
  let users = state.users.slice(0)
  let userId = null
  let index = null

  switch (action.type) {
    case SET_USERS:
      return {
        ...state,
        users: action.payload
      }
    case SET_COUNTS:
      return {
        ...state,
        counts: action.payload
      }
    case SET_CHARTDATA:
      return {
        ...state,
        chartData: action.payload
      }
    case SET_USER_ADMIN:
      userId = action.payload
      index = users.findIndex(u => u.id === userId)
      users[index].permission.admin = true
      return {
        ...state,
        users
      }
    case REMOVE_USER_ADMIN:
      userId = action.payload
      index = users.findIndex(u => u.id === userId)
      users[index].permission.admin = false
      return {
        ...state,
        users
      }
    case SET_USER_PAID:
      userId = action.payload
      index = users.findIndex(u => u.id === userId)
      users[index].paid = 1
      return {
        ...state,
        users
      }
    case SET_USER_RESPO:
      index = users.findIndex(u => u.id === action.payload.id)
      users[index].permission.respo = action.payload.respo.toString()
      return {
        ...state,
        users
      }
    case SET_USER_PERMISSION:
      index = users.findIndex(u => u.id === action.payload.id)
      users[index].permission.permission = action.payload.permission.toString()
      return {
        ...state,
        users
      }
    default:
      return state
  }
}

export const fetchUsers = () => {
  return async (dispatch, getState) => {
    const authToken = getState().login.token

    if (!authToken || authToken.length === 0) {
      return
    }

    try {
      const res = await axios.get('admin/list', { headers: { 'X-Token': authToken } })

      dispatch({ type: SET_USERS, payload: res.data })
    } catch (err) {
      console.log(err)
      dispatch(
        notifActions.notifSend({
          message: errorToString(err.response.data.error),
          kind: 'danger',
          dismissAfter: 2000
      }))
    }
  }
}

export const validatePayment = (userId) => {
  return async (dispatch, getState) => {
    const authToken = getState().login.token

    if (!authToken || authToken.length === 0) {
      return
    }
    dispatch(
      notifActions.notifSend({
        message: 'Demande de paiement reçue, merci de patienter...',
        kind: 'warning',
        dismissAfter: 2000
    }))
    try {
      const res = await axios.post(`admin/forcepay`, { userId }, { headers: { 'X-Token': authToken } })
      if(res.status === 200) {
        dispatch({ type: SET_USER_PAID, payload: userId })
        dispatch(
          notifActions.notifSend({
            message: 'Paiement validé',
            dismissAfter: 2000
        }))
      }
    } catch (err) {
      console.log(err)
      dispatch(
        notifActions.notifSend({
          message: errorToString(err.response.data.error),
          kind: 'danger',
          dismissAfter: 2000
      }))
    }
  }
}


export const setAdmin = (id) => {
  return async (dispatch, getState) => {
    const authToken = getState().login.token

    if (!authToken || authToken.length === 0) {
      return
    }
    try {
      const res = await axios.put(`/admin/setAdmin/${id}`, { admin: true }, { headers: { 'X-Token': authToken } })

      if(res.status === 200) {
        dispatch({ type: SET_USER_ADMIN, payload: id })
        dispatch(
          notifActions.notifSend({
            message: 'L\'utilisateur est maintenant administrateur',
            dismissAfter: 2000
        }))
      }
    } catch (err) {
      console.log(err)
      dispatch(
        notifActions.notifSend({
          message: 'Une erreur est survenue',
          kind: 'danger',
          dismissAfter: 2000
      }))
    }
  }
}

export const removeAdmin = (id) => {
  return async (dispatch, getState) => {
    const authToken = getState().login.token

    if (!authToken || authToken.length === 0) {
      return
    }
    try {
      const res = await axios.put(`/admin/setAdmin/${id}`, { admin: false }, { headers: { 'X-Token': authToken } })

      if(res.status === 200) {
        dispatch({ type: REMOVE_USER_ADMIN, payload: id })
        dispatch(
          notifActions.notifSend({
            message: 'L\'utilisateur n\'est maintenant plus administrateur',
            dismissAfter: 2000
        }))
      }
    } catch (err) {
      console.log(err)
      dispatch(
        notifActions.notifSend({
          message: 'Une erreur est survenue',
          kind: 'danger',
          dismissAfter: 2000
      }))
    }
  }
}


export const setRespo = (id, respo) => {
  return async (dispatch, getState) => {
    const authToken = getState().login.token

    if (!authToken || authToken.length === 0) {
      return
    }
    try {
      const res = await axios.put(`/admin/setRespo/${id}`, { respo }, { headers: { 'X-Token': authToken } })

      if(res.status === 200) {
        dispatch({ type: SET_USER_RESPO, payload: { id, respo } })
        dispatch(
          notifActions.notifSend({
            message: 'Les permissions de l\'utilisateur ont été modifiées',
            dismissAfter: 2000
        }))
      }
    } catch (err) {
      console.log(err)
      dispatch(
        notifActions.notifSend({
          message: 'Une erreur est survenue',
          kind: 'danger',
          dismissAfter: 2000
      }))
    }
  }
}

export const setPermission = (id, permission) => {
  return async (dispatch, getState) => {
    const authToken = getState().login.token

    if (!authToken || authToken.length === 0) {
      return
    }
    try {
      const res = await axios.put(`/admin/setPermission/${id}`, { permission }, { headers: { 'X-Token': authToken } })

      if(res.status === 200) {
        dispatch({ type: SET_USER_PERMISSION, payload: { id, permission } })
        dispatch(
          notifActions.notifSend({
            message: 'Les permissions de l\'utilisateur ont été modifiées',
            dismissAfter: 2000
        }))
      }
    } catch (err) {
      console.log(err)
      dispatch(
        notifActions.notifSend({
          message: 'Une erreur est survenue',
          kind: 'danger',
          dismissAfter: 2000
      }))
    }
  }
}