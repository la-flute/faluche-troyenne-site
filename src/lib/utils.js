import { actions as notifActions } from 'redux-notifications'

export const handleAPIerror = (dispatch, error) => {
    console.log(error)
    dispatch(notification(error.response.data.error, 'danger'))
}

export const notification = (message, kind) => {
    notifActions.notifSend({
        message,
        kind,
        dismissAfter: 2000,
    })
}
