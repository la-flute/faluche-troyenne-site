const initialState = {
    users: [],
    respo: [],
    chartData: { daily: [], cumul: [] },
    counts: null
}

export default (state = initialState, action) => {
    let users = state.users.slice(0)
    let userId = null
    let index = null

    switch (action.type) {
        case SET_USERS:
            return {
                ...state,
                users: action.payload,
            }
        case SET_USERS_ROLES:
            return {
                ...state,
                users: action.payload,
            }
        case SET_COUNTS:
            return {
                ...state,
                counts: action.payload,
            }
        case SET_CHARTDATA:
            return {
                ...state,
                chartData: action.payload,
            }

        case SET_USER_ADMIN:
            userId = action.payload
            index = users.findIndex(u => u.id === userId)
            console.log('userId', 'index', users[index])
            if (!users[index].permission) {
                users[index].permission = { admin: true }
            } else {
                users[index].permission.admin = true
            }
            return {
                ...state,
                users,
            }
        case REMOVE_USER_ADMIN:
            userId = action.payload
            index = users.findIndex(u => u.id === userId)
            users[index].permission.admin = false
            return {
                ...state,
                users,
            }

        case SET_USER_ORGA:
            userId = action.payload
            index = users.findIndex(u => u.id === userId)
            if (!users[index].permission) {
                users[index].permission = { bureau: true }
            } else {
                users[index].permission.bureau = true
            }
            return {
                ...state,
                users,
            }
        case REMOVE_USER_ORGA:
            userId = action.payload
            index = users.findIndex(u => u.id === userId)
            users[index].permission.bureau = false
            return {
                ...state,
                users,
            }
        case SET_USER_TRESO:
            userId = action.payload
            index = users.findIndex(u => u.id === userId)
            if (!users[index].permission) {
                users[index].permission = { treso: true }
            } else {
                users[index].permission.treso = true
            }
            return {
                ...state,
                users,
            }
        case REMOVE_USER_TRESO:
            userId = action.payload
            index = users.findIndex(u => u.id === userId)
            users[index].permission.treso = false
            return {
                ...state,
                users,
            }

        case SET_USER_WRITE:
            userId = action.payload
            index = users.findIndex(u => u.id === userId)
            if (!users[index].permission) {
                users[index].permission = { write: true }
            } else {
                users[index].permission.write = true
            }
            return {
                ...state,
                users,
            }
        case REMOVE_USER_WRITE:
            userId = action.payload
            index = users.findIndex(u => u.id === userId)
            users[index].permission.write = false
            return {
                ...state,
                users,
            }

        case SET_USER_PAID:
            userId = action.payload
            index = users.findIndex(u => u.id === userId)
            users[index].paid = true
            return {
                ...state,
                users,
            }
        case SET_USER_UNPAID:
            userId = action.payload
            index = users.findIndex(u => u.id === userId)
            users[index].paid = false
            return {
                ...state,
                users,
            }
        case SET_USER_CAUTION:
            userId = action.payload
            index = users.findIndex(u => u.id === userId)
            users[index].caution = true
            return {
                ...state,
                users,
            }
        case SET_USER_NO_CAUTION:
            userId = action.payload
            index = users.findIndex(u => u.id === userId)
            users[index].caution = false
            return {
                ...state,
                users,
            }
        case SET_USER_RESPO:
            index = users.findIndex(u => u.id === action.payload.id)
            users[index].permission.respo = action.payload.respo.toString()
            return {
                ...state,
                users,
            }
        case SET_USER_PERMISSION:
            index = users.findIndex(u => u.id === action.payload.id)
            users[
                index
            ].permission.permission = action.payload.permission.toString()
            return {
                ...state,
                users,
            }
        case SET_USER_VALID:
            userId = action.payload
            index = users.findIndex(u => u.id === userId)
            users[index].validated = true
            return {
                ...state,
                users,
            }
        case SET_USER_UNVALID:
            userId = action.payload
            index = users.findIndex(u => u.id === userId)
            users[index].validated = false
            return {
                ...state,
                users,
            }
        default:
            return state
    }
}
