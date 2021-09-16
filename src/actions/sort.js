import { SORTED_BY_ID } from "./types"

export const sortById = (sorted) => {

    return {
        type: SORTED_BY_ID,
        payload: sorted
    }

}