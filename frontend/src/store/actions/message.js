import axios from "axios";
import * as actionTypes from "./actionTypes";

export const addMessage = (message) => {
  return {
    type: actionTypes.ADD_MESSAGE,
    message: message,
  };
};

export const setMessages = (messages) => {
  return {
    type: actionTypes.SET_MESSAGES,
    messages: messages,
  };
};

const getUserChatsSuccess = (chats) => {
  return {
    type: actionTypes.GET_CHATS_SUCCESS,
    chats: chats,
  };
};

export const getUserChats = (id, token) => {
  return (dispatch) => {
    axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
    axios.defaults.xsrfCookieName = "csrftoken";
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    };
    axios
      .get(`${process.env.REACT_APP_HOST_IP_ADDRESS}/api/chats/?id=${id}`)
      .then((res) => dispatch(getUserChatsSuccess(res.data)));
  };
};
