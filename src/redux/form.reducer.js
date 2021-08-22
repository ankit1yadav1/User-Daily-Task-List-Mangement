import { SET_USER } from "./action.types"

const initialState = {
    userId: null
}

const userDataReducer = (state = initialState, action) => {
    switch (action.type) {
    case SET_USER:
        state = {
            ...state,
            userId : action.payload
        }
        break
    default:
        return state
    }
    return state
}

export default userDataReducer
