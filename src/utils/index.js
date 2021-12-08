import axios from "axios";

const { REACT_APP_API_URL } = process.env;

export const queryParams = (fields) => {
  return Object.entries(fields).map(([key, value]) => {
    return `${key}=${value}`;
  });
};

export const Get = (type, data) => {
  const { userToken, ...fields } = data;

  const uriObj = {
    user: "users",
  };
  const uri = uriObj[type];

  axios
    .get(`${REACT_APP_API_URL}${uri}?${queryParams(fields)}`, {
      headers: { Authorization: userToken },
    })
    .then((response) => {
      if (response.data.status == "success") {
      }
    });
};

export const Post = (type, data, func) => {
  const { userToken, ...fields } = data;

  const token = function () {
    return { headers: { Authorization: userToken } };
  };

  axios.post(`${REACT_APP_API_URL}${type}`, fields, token()).then((response) => {
    if (response.data.status == "success") {
      return func(response.data);
    }
  });
};
