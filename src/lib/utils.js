import { actions as notifActions } from 'redux-notifications'

export const handleAPIerror = (dispatch, error, kind) => {
    console.log(error)
    dispatch(notification(error.response.data.error, kind))
}

export const notification = (message, kind) => {
    notifActions.notifSend({
        message,
        kind,
        dismissAfter: 2000,
    })
}
