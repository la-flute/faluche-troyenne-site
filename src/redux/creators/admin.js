import axios from '../lib/axios'
import errorToString from '../lib/errorToString'
import { actions as notifActions } from 'redux-notifications'
import { getAdmins, getCounts } from '../apiCalls/admin'
import { handleError } from '../../lib/utils'

export const fetchAdmins = () => {
    return async (dispatch, getState) => {
        const authToken = getState().login.token
        if (!authToken || authToken.length === 0) {
            return
        }

        try {
            const res = await getAdmins(authToken)
            dispatch({ type: SET_USERS_ROLES, users: res.data })
        } catch (err) {
            handleError(err)
        }
    }
}

export const fetchCounts = () => {
    return async (dispatch, getState) => {
        const authToken = getState().login.token

        if (!authToken || authToken.length === 0) {
            return
        }

        try {
            const res = await getCounts(authToken)
            dispatch({ type: SET_COUNTS, payload: res.data })
        } catch (err) {
            handleError(err)
        }
    }
}

export const fetchUsersRoles = () => {
    return async (dispatch, getState) => {
        const authToken = getState().login.token

        if (!authToken || authToken.length === 0) return

        try {
            const res = await axios.get('admin/listRoles', {
                headers: { 'X-Token': authToken },
            })

            dispatch({ type: SET_USERS_ROLES, payload: res.data })
        } catch (err) {
            handleAPIerror(err)
        }
    }
}

export const validatePayment = (userId, alcool, bedroom) => {
    return async (dispatch, getState) => {
        const authToken = getState().login.token

        if (!authToken || authToken.length === 0) {
            return
        }
        try {
            const res = await axios.post(
                `admin/forcepay`,
                { userId, alcool, bedroom },
                { headers: { 'X-Token': authToken } }
            )
            if (res.status === 200) {
                dispatch({ type: SET_USER_PAID, payload: userId })
                dispatch(
                    notifActions.notifSend({
                        message: 'Paiement validé',
                        dismissAfter: 2000,
                    })
                )
            }
        } catch (err) {
            console.log(err)
            dispatch(
                notifActions.notifSend({
                    message: errorToString(err.response.data.error),
                    kind: 'danger',
                    dismissAfter: 2000,
                })
            )
        }
    }
}

export const unvalidatePayment = (userId) => {
    return async (dispatch, getState) => {
        const authToken = getState().login.token

        if (!authToken || authToken.length === 0) {
            return
        }
        try {
            const res = await axios.delete(`admin/forcepay/${userId}`, {
                headers: { 'X-Token': authToken },
            })
            if (res.status === 200) {
                dispatch({ type: SET_USER_UNPAID, payload: userId })
                dispatch(
                    notifActions.notifSend({
                        message: 'Paiement supprimé',
                        kind: 'warning',
                        dismissAfter: 2000,
                    })
                )
            }
        } catch (err) {
            console.log(err)
            dispatch(
                notifActions.notifSend({
                    message: errorToString(err.response.data.error),
                    kind: 'danger',
                    dismissAfter: 2000,
                })
            )
        }
    }
}

export const validateCaution = (userId) => {
    return async (dispatch, getState) => {
        const authToken = getState().login.token

        if (!authToken || authToken.length === 0) {
            return
        }
        try {
            const res = await axios.post(`admin/caution`, { userId }, { headers: { 'X-Token': authToken } })
            if (res.status === 200) {
                dispatch({ type: SET_USER_CAUTION, payload: userId })
                dispatch(
                    notifActions.notifSend({
                        message: 'Caution validé',
                        dismissAfter: 2000,
                    })
                )
            }
        } catch (err) {
            console.log(err)
            dispatch(
                notifActions.notifSend({
                    message: errorToString(err.response.data.error),
                    kind: 'danger',
                    dismissAfter: 2000,
                })
            )
        }
    }
}

export const unvalidateCaution = (userId) => {
    return async (dispatch, getState) => {
        const authToken = getState().login.token

        if (!authToken || authToken.length === 0) {
            return
        }
        try {
            const res = await axios.delete(`admin/caution/${userId}`, {
                headers: { 'X-Token': authToken },
            })
            if (res.status === 200) {
                dispatch({ type: SET_USER_NO_CAUTION, payload: userId })
                dispatch(
                    notifActions.notifSend({
                        message: 'Caution supprimé',
                        kind: 'warning',
                        dismissAfter: 2000,
                    })
                )
            }
        } catch (err) {
            console.log(err)
            dispatch(
                notifActions.notifSend({
                    message: errorToString(err.response.data.error),
                    kind: 'danger',
                    dismissAfter: 2000,
                })
            )
        }
    }
}

export const validateUser = (userId) => {
    return async (dispatch, getState) => {
        const authToken = getState().login.token

        if (!authToken || authToken.length === 0) {
            return
        }
        try {
            const res = await axios.post(`admin/validate`, { userId }, { headers: { 'X-Token': authToken } })
            if (res.status === 200) {
                dispatch({ type: SET_USER_VALID, payload: userId })
                dispatch(
                    notifActions.notifSend({
                        message: 'Participant validé',
                        dismissAfter: 2000,
                    })
                )
            }
        } catch (err) {
            console.log(err)
            dispatch(
                notifActions.notifSend({
                    message: errorToString(err.response.data.error),
                    kind: 'danger',
                    dismissAfter: 2000,
                })
            )
        }
    }
}
export const unvalidateUser = (userId) => {
    return async (dispatch, getState) => {
        const authToken = getState().login.token

        if (!authToken || authToken.length === 0) {
            return
        }
        try {
            const res = await axios.post(`admin/unvalidate`, { userId }, { headers: { 'X-Token': authToken } })
            if (res.status === 200) {
                dispatch({ type: SET_USER_UNVALID, payload: userId })
                dispatch(
                    notifActions.notifSend({
                        message: 'Participant annulé',
                        kind: 'warning',
                        dismissAfter: 2000,
                    })
                )
            }
        } catch (err) {
            console.log(err)
            dispatch(
                notifActions.notifSend({
                    message: errorToString(err.response.data.error),
                    kind: 'danger',
                    dismissAfter: 2000,
                })
            )
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

            if (res.status === 200) {
                dispatch({ type: SET_USER_ADMIN, payload: id })
                dispatch(
                    notifActions.notifSend({
                        message: "L'utilisateur est maintenant administrateur",
                        dismissAfter: 2000,
                    })
                )
            }
        } catch (err) {
            console.log(err)
            dispatch(
                notifActions.notifSend({
                    message: errorToString(err.response.data.error),
                    kind: 'danger',
                    dismissAfter: 2000,
                })
            )
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
            const res = await axios.put(
                `/admin/setAdmin/${id}`,
                { admin: false },
                { headers: { 'X-Token': authToken } }
            )

            if (res.status === 200) {
                dispatch({ type: REMOVE_USER_ADMIN, payload: id })
                dispatch(
                    notifActions.notifSend({
                        message: "L'utilisateur n'est maintenant plus administrateur",
                        dismissAfter: 2000,
                    })
                )
            }
        } catch (err) {
            console.log(err)
            dispatch(
                notifActions.notifSend({
                    message: errorToString(err.response.data.error),
                    kind: 'danger',
                    dismissAfter: 2000,
                })
            )
        }
    }
}

export const setOrga = (id) => {
    return async (dispatch, getState) => {
        const authToken = getState().login.token

        if (!authToken || authToken.length === 0) {
            return
        }
        try {
            const res = await axios.put(`/admin/setOrga/${id}`, { orga: true }, { headers: { 'X-Token': authToken } })
            console.log(res)
            if (res.status === 200) {
                dispatch({ type: SET_USER_ORGA, payload: id })
                dispatch(
                    notifActions.notifSend({
                        message: "L'utilisateur est maintenant organisateur",
                        dismissAfter: 2000,
                    })
                )
            }
        } catch (err) {
            console.log(err)
            dispatch(
                notifActions.notifSend({
                    message: errorToString(err.response.data.error),
                    kind: 'danger',
                    dismissAfter: 2000,
                })
            )
        }
    }
}

export const removeOrga = (id) => {
    return async (dispatch, getState) => {
        const authToken = getState().login.token

        if (!authToken || authToken.length === 0) {
            return
        }
        try {
            const res = await axios.put(`/admin/setOrga/${id}`, { orga: false }, { headers: { 'X-Token': authToken } })

            if (res.status === 200) {
                dispatch({ type: REMOVE_USER_ORGA, payload: id })
                dispatch(
                    notifActions.notifSend({
                        message: "L'utilisateur n'est maintenant plus organisateur",
                        dismissAfter: 2000,
                    })
                )
            }
        } catch (err) {
            console.log(err)
            dispatch(
                notifActions.notifSend({
                    message: errorToString(err.response.data.error),
                    kind: 'danger',
                    dismissAfter: 2000,
                })
            )
        }
    }
}

export const setTreso = (id) => {
    return async (dispatch, getState) => {
        const authToken = getState().login.token

        if (!authToken || authToken.length === 0) {
            return
        }
        try {
            const res = await axios.put(`/admin/setTreso/${id}`, { treso: true }, { headers: { 'X-Token': authToken } })

            if (res.status === 200) {
                dispatch({ type: SET_USER_TRESO, payload: id })
                dispatch(
                    notifActions.notifSend({
                        message: "L'utilisateur est maintenant trésorier",
                        dismissAfter: 2000,
                    })
                )
            }
        } catch (err) {
            console.log(err)
            dispatch(
                notifActions.notifSend({
                    message: errorToString(err.response.data.error),
                    kind: 'danger',
                    dismissAfter: 2000,
                })
            )
        }
    }
}

export const removeTreso = (id) => {
    return async (dispatch, getState) => {
        const authToken = getState().login.token

        if (!authToken || authToken.length === 0) {
            return
        }
        try {
            const res = await axios.put(
                `/admin/setTreso/${id}`,
                { treso: false },
                { headers: { 'X-Token': authToken } }
            )

            if (res.status === 200) {
                dispatch({ type: REMOVE_USER_TRESO, payload: id })
                dispatch(
                    notifActions.notifSend({
                        message: "L'utilisateur n'est maintenant plus trésorier",
                        dismissAfter: 2000,
                    })
                )
            }
        } catch (err) {
            console.log(err)
            dispatch(
                notifActions.notifSend({
                    message: errorToString(err.response.data.error),
                    kind: 'danger',
                    dismissAfter: 2000,
                })
            )
        }
    }
}

export const setRedac = (id) => {
    return async (dispatch, getState) => {
        const authToken = getState().login.token

        if (!authToken || authToken.length === 0) {
            return
        }
        try {
            const res = await axios.put(`/admin/setRedac/${id}`, { write: true }, { headers: { 'X-Token': authToken } })

            if (res.status === 200) {
                dispatch({ type: SET_USER_WRITE, payload: id })
                dispatch(
                    notifActions.notifSend({
                        message: "L'utilisateur est maintenant rédacteur",
                        dismissAfter: 2000,
                    })
                )
            }
        } catch (err) {
            console.log(err)
            dispatch(
                notifActions.notifSend({
                    message: errorToString(err.response.data.error),
                    kind: 'danger',
                    dismissAfter: 2000,
                })
            )
        }
    }
}

export const removeRedac = (id) => {
    return async (dispatch, getState) => {
        const authToken = getState().login.token

        if (!authToken || authToken.length === 0) {
            return
        }
        try {
            const res = await axios.put(
                `/admin/setRedac/${id}`,
                { write: false },
                { headers: { 'X-Token': authToken } }
            )

            if (res.status === 200) {
                dispatch({ type: REMOVE_USER_WRITE, payload: id })
                dispatch(
                    notifActions.notifSend({
                        message: "L'utilisateur n'est maintenant plus rédacteur",
                        dismissAfter: 2000,
                    })
                )
            }
        } catch (err) {
            console.log(err)
            dispatch(
                notifActions.notifSend({
                    message: errorToString(err.response.data.error),
                    kind: 'danger',
                    dismissAfter: 2000,
                })
            )
        }
    }
}
