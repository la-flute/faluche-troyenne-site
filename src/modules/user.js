import axios from '../lib/axios'
import errorToString from '../lib/errorToString'
import { actions as notifActions } from 'redux-notifications'
import { logout } from './login'

export const SET_USER = 'user/SET_USER'
export const REMOVE_IMAGE = 'user/REMOVE_IMAGE'
export const ADD_IMAGE = 'user/ADD_IMAGE'
export const SET_ATTESTATION = 'user/SET_ATTESTATION'
export const SET_USERS = 'users/SET_USERS'
export const SET_CATCHPHRASE = 'user/SET_CATCHPHRASE'

const initialState = {
  user: null,
  users: []
}

export default (state = initialState, action) => {
  let user = null
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload
      }
    case SET_ATTESTATION:
      user = state.user
      user.attestation = true
      return {
        ...state,
        user
      }
    case REMOVE_IMAGE:
      user = state.user
      user.image = null
      return {
        ...state,
        user
      }
    case ADD_IMAGE:
      user = state.user
      user.image = action.payload
      return {
        ...state,
        user
      }
    case SET_CATCHPHRASE:
      user = state.user
      user.catchphrase = action.payload
      return {
        ...state,
        user
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
      if (req.status === 200) dispatch({ type: SET_USERS, payload: req.data })
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
      const res = await axios.put('user', data, {
        headers: { 'X-Token': authToken }
      })

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

export const sendAttestation = () => {
  return async (dispatch, getState) => {
    const authToken = getState().login.token

    if (!authToken || authToken.length === 0) {
      return
    }

    try {
      const res = await axios.post(
        'user/attestation',
        {},
        { headers: { 'X-Token': authToken } }
      )
      if (res.status === 200) {
        dispatch({
          type: SET_ATTESTATION
        })
        dispatch(fetchUser())
        dispatch(
          notifActions.notifSend({
            message: 'Attestation validée',
            dismissAfter: 2000
          })
        )
      }
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

export const deleteImage = () => {
  return async (dispatch, getState) => {
    const authToken = getState().login.token

    if (!authToken || authToken.length === 0) {
      return
    }

    try {
      const res = await axios.delete('tinders/image', {
        headers: { 'X-Token': authToken }
      })
      if (res.status === 200) {
        dispatch({
          type: REMOVE_IMAGE
        })
        dispatch(fetchUser())
        dispatch(
          notifActions.notifSend({
            message: 'Image supprimée',
            dismissAfter: 2000
          })
        )
      }
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

export const addImage = name => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: ADD_IMAGE,
        payload: name
      })
      setTimeout(() => dispatch(fetchUser()), 1000)
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

export const sendCatchPhrase = catchphrase => {
  return async (dispatch, getState) => {
    const authToken = getState().login.token

    if (!authToken || authToken.length === 0) {
      return
    }

    try {
      await axios.post(
        'tinders/catchphrase',
        { catchphrase },
        {
          headers: { 'X-Token': authToken }
        }
      )
      dispatch({ type: SET_CATCHPHRASE, payload: catchphrase })
      dispatch(fetchUser())
      dispatch(
        notifActions.notifSend({
          message: 'Phrase sauvegardée',
          dismissAfter: 2000
        })
      )
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
