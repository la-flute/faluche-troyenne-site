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
