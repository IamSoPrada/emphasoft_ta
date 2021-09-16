import {
    FIND_USERNAME
} from "./types"

export const onFindUsername = (input) => {
    return {
        type: FIND_USERNAME,
        payload: input
    }
}