import axios from "axios";

const { REACT_APP_API_URL } = process.env;

export const queryParams = (fields) => {
  return Object.entries(fields).map(([key, value]) => {
    return `${key}=${value}`;
  });
};

export const Get = (type, data, func) => {
  const { token, ...fields } = data;

  axios.get(`${REACT_APP_API_URL}${type}`, { headers: { Authorization: token }, fields }).then((response) => {
    if (response.data.status === "success") {
      return func(response.data);
    }
  });
};

export const Post = (type, data, func) => {
  const { token, ...fields } = data;

  axios.post(`${REACT_APP_API_URL}${type}`, fields, { headers: { Authorization: token } }).then((response) => {
    if (response.data.status === "success") {
      return func(response.data);
    }
  });
};

export const Put = (type, data, func) => {
  const { token, ...fields } = data;

  axios.put(`${REACT_APP_API_URL}${type}`, fields, { headers: { Authorization: token } }).then((response) => {
    if (response.data.status === "success") {
      return func(response.data);
    }
  });
};

export const Delete = (type, data) => {
  const { token, ...fields } = data;

  axios
    .delete(`${REACT_APP_API_URL}${type}`, {
      headers: { Authorization: token },
      data: fields,
    })
    .then((response) => {
      if (response.data.status === "success") {
        console.log("Delete success");
      }
    });
};
