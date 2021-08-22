import { SET_USER } from "./action.types"

export const setUser = (userId) => {
    return {
        type: SET_USER,
        payload: userId
    }
}

