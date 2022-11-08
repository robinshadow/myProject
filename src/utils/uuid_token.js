import { v4 as uuidv4 } from 'uuid'
export const getUUID = () => {
    let uuid_token = localStorage.getItem('uuidToken')
    if (!uuid_token) {
        uuid_token = uuidv4()
        localStorage.setItem('uuidToken', uuid_token)
    }
    return uuid_token
}