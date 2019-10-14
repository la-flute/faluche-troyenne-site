export const handleError = (error) => {
    console.log(error)
            dispatch(
                notifActions.notifSend({
                    message: errorToString(error.response.data.error),
                    kind: 'danger',
                    dismissAfter: 2000,
                })
            )
}
