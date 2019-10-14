export const handleAPIerror = (error) => {
    console.log(error)
            dispatch(
                notifActions.notifSend({
                    message: errorToString(error.response.data.error),
                    kind: 'danger',
                    dismissAfter: 2000,
                })
            )
}
