import axios from '../lib/axios'
import errorToString from '../lib/errorToString'
import { actions as notifActions } from 'redux-notifications'
import {
    getAdmins,
    getCounts,
    getUsersRoles,
    acceptPayment,
    refusePayment,
    acceptCaution,
    refuseCaution,
    refuseUser,
    grantAdmin,
    flushAdmin,
    grantOrga,
    flushOrga,
    grantTreas,
    flushTreas,
    grantRedac,
    flushRedac,
} from '../apiCalls/admin'
import { handleAPIerror, notification } from '../../lib/utils'

export const fetchAdmins = () => {
    return async (dispatch, getState) => {
        const authToken = getState().login.token

        if (!authToken || authToken.length === 0) {
            return
        }

        try {
            const res = await getAdmins(authToken)
            dispatch({ type: SET_USERS_ROLES, admins: res.data })
        } catch (err) {
            handleAPIerror(dispatch, err)
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
            dispatch({ type: SET_COUNTS, counts: res.data })
        } catch (err) {
            handleAPIerror(dispatch, err)
        }
    }
}

export const fetchUsersRoles = () => {
    return async (dispatch, getState) => {
        const authToken = getState().login.token

        if (!authToken || authToken.length === 0) {
            return
        }

        try {
            const res = await getUsersRoles(authToken)
            dispatch({ type: SET_USERS_ROLES, usersRoles: res.data })
        } catch (err) {
            handleAPIerror(dispatch, err)
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
            const res = await acceptPayment(authToken, userId, alcool, bedroom)
            dispatch({ type: SET_USER_PAID, userId })
            dispatch(notification('Paiement validé'))
        } catch (err) {
            handleAPIerror(dispatch, err)
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
            await refusePayment(authToken, userId)
            dispatch({ type: SET_USER_UNPAID, userId })
            dispatch(notification('Paiement supprimé', 'warning'))
        } catch (err) {
            handleAPIerror(dispatch, err)
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
            await acceptCaution(authToken, userId)
            dispatch({ type: SET_USER_CAUTION, userId })
            dispatch(notification('Caution validée'))
        } catch (err) {
            handleAPIerror(dispatch, err)
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
            await refuseCaution(authToken, userId)
            dispatch({ type: SET_USER_NO_CAUTION, userId })
            dispatch(notification('Caution supprimée', 'warning'))
        } catch (err) {
            handleAPIerror(dispatch, err)
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
            await axios.post(`admin/validate`, { userId }, { headers: { 'X-Token': authToken } })
            dispatch({ type: SET_USER_VALID, userId })
            dispatch(notification('Participant validé'))
        } catch (err) {
            handleAPIerror(dispatch, err)
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
            await refuseUser(authToken, userId)
            dispatch({ type: SET_USER_UNVALID, userId })
            dispatch(notification('Participant supprimé', 'warning'))
        } catch (err) {
            handleAPIerror(dispatch, err)
        }
    }
}

export const setAdmin = (userId) => {
    return async (dispatch, getState) => {
        const authToken = getState().login.token

        if (!authToken || authToken.length === 0) {
            return
        }

        try {
            await grantAdmin(authToken, userId)
            dispatch({ type: SET_USER_ADMIN, userId })
            dispatch(notification(`L'utilisateur est maintenant administrateur`))
        } catch (err) {
            handleAPIerror(dispatch, err)
        }
    }
}

export const removeAdmin = (userId) => {
    return async (dispatch, getState) => {
        const authToken = getState().login.token

        if (!authToken || authToken.length === 0) {
            return
        }

        try {
            await flushAdmin(authToken, userId)
            dispatch({ type: REMOVE_USER_ADMIN, userId })
            dispatch(notification(`L'utilisateur n'est maintenant plus administrateur`, 'warning'))
        } catch (err) {
            handleAPIerror(dispatch, err)
        }
    }
}

export const setOrga = (userId) => {
    return async (dispatch, getState) => {
        const authToken = getState().login.token

        if (!authToken || authToken.length === 0) {
            return
        }

        try {
            await grantOrga(authToken, userId)
            dispatch({ type: SET_USER_ORGA, userId })
            dispatch(notification(`L'utilisateur est maintenant organisateur`))
        } catch (err) {
            handleAPIerror(dispatch, err)
        }
    }
}

export const removeOrga = (userId) => {
    return async (dispatch, getState) => {
        const authToken = getState().login.token

        if (!authToken || authToken.length === 0) {
            return
        }

        try {
            await flushOrga(authToken, userId)
            dispatch({ type: REMOVE_USER_ORGA, userId })
            dispatch(notification(`L'utilisateur n'est maintenant plus organisateur`, 'warning"'))
        } catch (err) {
            handleAPIerror(dispatch, err)
        }
    }
}

export const setTreso = (userId) => {
    return async (dispatch, getState) => {
        const authToken = getState().login.token

        if (!authToken || authToken.length === 0) {
            return
        }

        try {
            await grantTreas(authToken, userId)
            dispatch({ type: SET_USER_TRESO, payload: id })
            dispatch(notification(`L'utilisateur est maintenant trésorier`))
        } catch (err) {
            handleAPIerror(dispatch, err)
        }
    }
}

export const removeTreso = (userId) => {
    return async (dispatch, getState) => {
        const authToken = getState().login.token

        if (!authToken || authToken.length === 0) {
            return
        }

        try {
            await flushTreas(authToken, userId)
            dispatch({ type: REMOVE_USER_TRESO, payload: id })
            dispatch(notification(`L'utilisateur n'est maintenant plus trésorier`, 'warning'))
        } catch (err) {
            handleAPIerror(dispatch, err)
        }
    }
}

export const setRedac = (userId) => {
    return async (dispatch, getState) => {
        const authToken = getState().login.token

        if (!authToken || authToken.length === 0) {
            return
        }
        
        try {
            await grantRedac(authToken, userId)
            dispatch({ type: SET_USER_WRITE, userId })
            dispatch(notification(`L'utilisateur est maintenant rédacteur`))
        } catch (err) {
            handleAPIerror(dispatch, error)
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
            await flushRedac(authToken, userId)
            dispatch({ type: REMOVE_USER_WRITE, userId })
            dispatch(notification(`L'utilisateur n'est maintenant plus rédacteur`, 'warning'))
        } catch (err) {
            handleAPIerror(dispatch, err)
        }
    }
}
