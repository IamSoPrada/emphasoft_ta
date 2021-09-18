import axios from "axios";
import {
  FETCH_USERS_SUCCESS,
  FETCH_USERS_REQUEST,
  FETCH_USERS_FAIL,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAIL,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL
} from "./types";

axios.defaults.baseURL = "https://emphasoft-test-assignment.herokuapp.com/";

const usersRequested = () => {
  return {
    type: FETCH_USERS_REQUEST,
  };
};

const usersLoaded = (newUsers) => {
  return {
    type: FETCH_USERS_SUCCESS,
    payload: newUsers,
  };
};

const usersError = (error) => {
  return {
    type: FETCH_USERS_FAIL,
    payload: error,
  };
};

const fetchUsers = (usersService, dispatch) => () => {
  dispatch(usersRequested());
  usersService
    .getUsers()
    .then((data) => dispatch(usersLoaded(data)))
    .catch((err) => usersError(err));
};

const createUserError = (error) => {
  return {
    type: CREATE_USER_FAIL,
    payload: error,
  };
};

export const createUser =
  ({ id, username, first_name, last_name, password, is_active }) =>
  async (dispatch) => {
    const conf = {
      headers: {
        Accept: "application/json",
        Authorization: `Token ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({
      id,
      username,
      first_name,
      last_name,
      password,
      is_active,
    });

    try {
      const res = await axios.post("api/v1/users/", body, conf);
      dispatch({
        type: CREATE_USER_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      createUserError(err);
    }
  };
const deleteUserError = (error) => {
  return {
    type: DELETE_USER_FAIL,
    payload: error,
  };
};
const deleteUser =
    (id ) =>
        async (dispatch) => {
          const conf = {
            headers: {
              Authorization: `Token ${localStorage.getItem("token")}`,
            },
          };

          try {
            const res = await axios.delete(`api/v1/users/${id}`, conf);
            dispatch({
              type:   DELETE_USER_SUCCESS,
              payload: id
            });
          } catch (err) {
            deleteUserError(err);
          }
        };

/* const fetchUser = (usersService, dispatch) => (id) => {
    dispatch(usersRequested())
    usersService.getUser(id)
        .then((data) => dispatch(usersLoaded(data)))
        .catch((err) => usersError(err))
} */

export { fetchUsers , deleteUser};
