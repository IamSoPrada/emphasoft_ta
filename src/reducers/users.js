import {
    FETCH_USERS_SUCCESS,
    FETCH_USERS_REQUEST,
    FETCH_USERS_FAIL,
    CREATE_USER_SUCCESS,
    CREATE_USER_FAIL,
    EDIT_USER_SUCCESS,
    EDIT_USER_FAIL,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAIL,
    SORTED_BY_ID,
} from "../actions/types";

const appUsers = (state, action) => {
    const { type, payload } = action;
    if (state === undefined) {
        return {
            users: localStorage.getItem("users")
                ? JSON.parse(localStorage.getItem("users"))
                : [],
            loading: true,
            error: null,
        };
    }
    switch (type) {
        case FETCH_USERS_REQUEST:
            return {
                users: [],
                loading: true,
                error: null,
            };
        case FETCH_USERS_SUCCESS:
            localStorage.setItem("users", JSON.stringify(payload));
            return {
                users: payload,
                loading: false,
                error: null,
            };
        case DELETE_USER_SUCCESS:
            return {
                ...state,
                users: state.users.filter(user => user.id !== payload),
            };
        case EDIT_USER_SUCCESS:
            return {
                ...state,
                error: null
            }
        case CREATE_USER_SUCCESS:
            return {
                ...state,
                error: null,
            };
        case SORTED_BY_ID:
            return {
                ...state,
                users: payload,
            };
        case EDIT_USER_FAIL:
        case DELETE_USER_FAIL:
        case CREATE_USER_FAIL:
        case FETCH_USERS_FAIL:
            return {
                users: [],
                loading: false,
                error: payload,
            };
        default:
            return state;
    }
};

export default appUsers;
