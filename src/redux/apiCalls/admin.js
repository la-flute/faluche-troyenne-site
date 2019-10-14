import axios from '../../lib/axios'

export const getAdmins = (authToken) => {
    return axios.get('admin/list', {
        headers: { 'X-Token': authToken },
    })
}

export const getCounts = (authToken) => {
    return axios.get('admin/counts', {
        headers: { 'X-Token': authToken },
    })
}

export const getUsersRoles = (authToken) => {
    return axios.get('admin/listRoles', {
        headers: { 'X-Token': authToken },
    })
}

export const acceptPayment = (authToken, userId, alcool, bedroom) => {
    return axios.post(`admin/forcepay`, { userId, alcool, bedroom }, { headers: { 'X-Token': authToken } })
}

export const refusePayment = (authToken, userId) => {
    return axios.delete(`admin/forcepay/${userId}`, {
        headers: { 'X-Token': authToken },
    })
}

export const acceptCaution = (authToken, userId) => {
    return axios.post(`admin/caution`, { userId }, { headers: { 'X-Token': authToken } })
}

export const refuseCaution = (authToken, userId) => {
    return axios.delete(`admin/caution/${userId}`, {
        headers: { 'X-Token': authToken },
    })
}

export const acceptUser = (authToken, userId) => {
    return axios.post(`admin/validate`, { userId }, { headers: { 'X-Token': authToken } })
}

export const refuseUser = (authToken, userId) => {
    return axios.post(`admin/unvalidate`, { userId }, { headers: { 'X-Token': authToken } })
}

export const grantAdmin = (authToken, userId) => {
    return axios.put(`/admin/setAdmin/${userId}`, { admin: true }, { headers: { 'X-Token': authToken } })
}

export const flushAdmin = (authToken, userId) => {
    return axios.put(`/admin/setAdmin/${userId}`, { admin: false }, { headers: { 'X-Token': authToken } })
}

export const grantOrga = (authToken, userId) => {
    return axios.put(`/admin/setOrga/${userId}`, { orga: true }, { headers: { 'X-Token': authToken } })
}

export const flushOrga = (authToken) => {
    return axios.put(`/admin/setOrga/${userId}`, { orga: false }, { headers: { 'X-Token': authToken } })
}

export const grantTreas = (authToken, userId) => {
    return axios.put(`/admin/setTreso/${userId}`, { treso: true }, { headers: { 'X-Token': authToken } })
}
export const flushTreas = (authToken, userId) => {
    return axios.put(`/admin/setTreso/${userId}`, { treso: false }, { headers: { 'X-Token': authToken } })
}

export const grantRedac = (authToken, userId) => {
    return axios.put(`/admin/setRedac/${userId}`, { write: true }, { headers: { 'X-Token': authToken } })
}

export const flushRedac = (authToken, userId) => {
    return axios.put(`/admin/setRedac/${userId}`, { write: false }, { headers: { 'X-Token': authToken } })
}
