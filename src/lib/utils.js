import { actions as notifActions } from 'redux-notifications'

export const handleAPIerror = (error, kind) => {
    console.log(error)
            dispatch(
                notifActions.notifSend({
                    message: errorToString(error.response.data.error),
                    kind: kind,
                    dismissAfter: 2000,
                })
            )
}

export const notification = (message) => {
    notifActions.notifSend({
        message,
        dismissAfter: 2000,
    })
}
