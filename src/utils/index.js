import axios from "axios";

const { REACT_APP_API_URL } = process.env;

export const queryParams = (fields) => {
  return Object.entries(fields).map(([key, value]) => {
    return `${key}=${value}`;
  });
};

export const Get = (type, data, func) => {
  axios.get(`${REACT_APP_API_URL}${type}`, { headers: { Authorization: data } }).then((response) => {
    if (response.data.status == "success") {
      console.log("response.data", response.data);
      return func(response.data);
    }
  });
};

export const Post = (type, data, func) => {
  const { userToken, ...fields } = data;

  axios.post(`${REACT_APP_API_URL}${type}`, fields, { headers: { Authorization: userToken } }).then((response) => {
    if (response.data.status == "success") {
      return func(response.data);
    }
  });
};

export const Delete = (type, data) => {
  axios.delete(`${REACT_APP_API_URL}${type}`, { headers: { Authorization: data } }).then((response) => {
    if (response.data.status == "success") {
      console.log("Delete success");
    }
  });
};
