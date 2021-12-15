import axios from "axios";
import { useState, useEffect } from "react";
import { NativeBaseProvider, Link } from "native-base";
import "./App.css";

import { Authentication } from "./components/Authentication";

import { TopBar } from "./components/authenticated/TopBar";
import { Friends } from "./components/authenticated/Friends";
import { Entry } from "./components/authenticated/Entry";

const { REACT_APP_API_URL } = process.env;

export const ShowComponent = ({ token, user, friends }) => {
  const [showEntry, setShowEntry] = useState(false);
  const [viewUser, setViewUser] = useState({});

  if (showEntry) {
    return <Entry token={token} user={user} viewUser={viewUser} setShowEntry={setShowEntry} />;
  } else {
    return (
      <Friends
        token={token}
        user={user}
        friends={friends}
        showEntry={showEntry}
        setShowEntry={setShowEntry}
        setViewUser={setViewUser}
      />
    );
  }
};

function App() {
  const [token, setToken] = useState("");
  const [user, setUser] = useState({});
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("the-book-of");
    setToken(token);

    axios
      .all([
        axios.get(`${REACT_APP_API_URL}user`, { headers: { Authorization: token } }),
        axios.get(`${REACT_APP_API_URL}friends`, { headers: { Authorization: token } }),
      ])
      .then(
        axios.spread((user, friends, entries) => {
          setUser(user.data.user);
          setFriends(friends.data.friends);
        })
      );
  }, []);

  const setJWT = (data) => {
    setToken(data.token);

    localStorage.setItem("the-book-of", data.token);
  };

  if (!token || token.length < 0) {
    return <Authentication setJWT={setJWT} />;
  }

  return (
    <NativeBaseProvider>
      <TopBar />
      <ShowComponent token={token} user={user} friends={friends} />
    </NativeBaseProvider>
  );
}

export default App;
