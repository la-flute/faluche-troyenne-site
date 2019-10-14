import axios from '../../lib/axios'

export const getAdmins = (authToken) => {
    return axios.get('admin/list', {
        headers: { 'X-Token': authToken },
    })
}

export const getCounts = (authToken) => {
    return await axios.get('admin/counts', {
    headers: { 'X-Token': authToken },
})}


