import { FIND_USERNAME } from "../actions/types"

const appFind = (state, action) => {

    const { type, payload } = action


    if (state === undefined) {
        return {
            findUsername: ""
        }
    }
    switch (type) {
        case FIND_USERNAME:
            return {
                ...state,
                findUsername: payload
            }
        default:
            return state
    }

}

export default appFind;