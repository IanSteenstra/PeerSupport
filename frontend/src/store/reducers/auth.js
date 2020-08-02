import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  token: null,
  username: null,
  error: null,
  loading: false,
  registered: false,
  id: null,
};

const authStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true,
  });
};

const registerSuccess = (state, action) => {
  return updateObject(state, {
    registered: true,
  });
};

const authSuccess = (state, action) => {
  return updateObject(state, {
    token: action.token,
    username: action.username,
    error: null,
    loading: false,
  });
};

const authIdSuccess = (state, action) => {
  return updateObject(state, {
    id: action.id,
  });
};

const authFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
  });
};

const authLogout = (state, action) => {
  return updateObject(state, {
    token: null,
    username: null,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return authStart(state, action);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_FAIL:
      return authFail(state, action);
    case actionTypes.AUTH_LOGOUT:
      return authLogout(state, action);
    case actionTypes.REGISTER_SUCCESS:
      return registerSuccess(state, action);
    case actionTypes.AUTH_ID_SUCCESS:
      return authIdSuccess(state, action);
    default:
      return state;
  }
};

export default reducer;
