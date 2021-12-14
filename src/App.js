import axios from "axios";
import { useState, useEffect } from "react";
import { NativeBaseProvider, Link } from "native-base";
import "./App.css";

import { Authentication } from "./components/Authentication";

import { Friends } from "./components/authenticated/Friends";
import { Entry } from "./components/authenticated/Entry";

import { Delete } from "./utils";
import Route from "./utils/Route";
import { MainContext } from "./utils/MainContext";

const { REACT_APP_API_URL } = process.env;

function App() {
  const [token, setToken] = useState("");
  const [user, setUser] = useState({});
  const [friends, setFriends] = useState([]);
  const [entries, setEntries] = useState([]);
  const [entryUser, setEntryUser] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("the-book-of");
    setToken(token);

    axios
      .all([
        axios.get(`${REACT_APP_API_URL}user`, { headers: { Authorization: token } }),
        axios.get(`${REACT_APP_API_URL}friends`, { headers: { Authorization: token } }),
        axios.get(`${REACT_APP_API_URL}entries`, { headers: { Authorization: token } }),
      ])
      .then(
        axios.spread((user, friends, entries) => {
          setUser(user.data.user);
          setFriends(friends.data.friends);
          setEntries(entries.data.entries);
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

  const signOut = () => {
    setToken("");

    localStorage.removeItem("the-book-of");

    Delete("users/sign_out", token);
  };

  return (
    <MainContext.Provider value={{ token, user, friends, entries, entryUser, setEntryUser }}>
      <NativeBaseProvider>
        <Link onPress={() => signOut()}>Sign out</Link>
      </NativeBaseProvider>

      <Route path="/">
        <Friends />
      </Route>

      <Route path="/entry">
        <Entry />
      </Route>
    </MainContext.Provider>
  );
}

export default App;
