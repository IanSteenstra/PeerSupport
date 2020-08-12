import axios from "axios";
import * as actionTypes from "./actionTypes";
import { getUserChats } from "./message";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const registerSuccess = () => {
  return {
    type: actionTypes.REGISTER_SUCCESS,
  };
};

export const authSuccess = (username, token) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token: token,
    username: username,
  };
};

export const authIdSuccess = (id) => {
  return {
    type: actionTypes.AUTH_ID_SUCCESS,
    id: id,
  };
};

export const validateUserGroup = (token) => {
 return (dispatch) => {
    axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
    axios.defaults.xsrfCookieName = "csrftoken";
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    };
    axios
      .get(`http://127.0.0.1:8000/validate-group/`, {
        params: {
          groupName: 'Risk Monitor'
        }
      })
      .then((res) => {
        console.log(res.data)
      })
      
  };
}

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("username");
  localStorage.removeItem("expirationDate");
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const checkAuthTimeout = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const authLogin = (username, password) => {
  return (dispatch) => {
    dispatch(authStart());
    axios
      .post(`http://127.0.0.1:8000/rest-auth/login/`, {
        username: username,
        password: password,
      })
      .then((res) => {
        const token = res.data.key;
        const expirationDate = new Date(new Date().getTime() + 28800 * 1000);
        localStorage.setItem("token", token);
        localStorage.setItem("username", username);
        localStorage.setItem("expirationDate", expirationDate);
        dispatch(authSuccess(username, token));
        dispatch(authId(username, token));
        dispatch(validateUserGroup(token));
        dispatch(checkAuthTimeout(28800));
      })
      .catch((err) => {
        dispatch(authFail(err));
      });
  };
};

export const authId = (username, token) => {
  return (dispatch) => {
    axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
    axios.defaults.xsrfCookieName = "csrftoken";
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    };
    axios
      .get(`http://127.0.0.1:8000/rest-auth/user/`, {
        username: username,
      })
      .then((res) => {
        const id = res.data.pk;
        localStorage.setItem("id", id);
        dispatch(authIdSuccess(id));
        dispatch(getUserChats(id, token));
      })
      .catch((err) => {
        dispatch(authFail(err));
      });
  };
};

export const authRegister = (username, email, password1, password2) => {
  return (dispatch) => {
    dispatch(authStart());
    axios
      .post(`http://127.0.0.1:8000/rest-auth/registration/`, {
        username: username,
        email: email,
        password1: password1,
        password2: password2,
      })
      .then((res) => {
        dispatch(registerSuccess());
      })
      .catch((err) => {
        dispatch(authFail(err));
      });
  };
};

export const authCheckState = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    if (token === undefined) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        dispatch(authSuccess(username, token));
        dispatch(
          checkAuthTimeout(
            (expirationDate.getTime() - new Date().getTime()) / 1000
          )
        );
      }
    }
  };
};
