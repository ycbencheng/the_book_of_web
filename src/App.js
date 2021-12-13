import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import { Home } from "./components/authenticated/Home";
import { Entry } from "./components/authenticated/Entry";
import { Authentication } from "./components/Authentication";
import { MainContext } from "./utils/MainContext";

function App() {
  const [token, setToken] = useState("");
  const [contextState, setContextState] = useState({ user: {}, friends: {} });

  useEffect(() => {
    setToken(localStorage.getItem("the-book-of"));
  }, []);

  const setJWT = (data) => {
    setToken(data.token);

    localStorage.setItem("the-book-of", data.token);
  };

  const updateContext = (data) => {
    setContextState({ ...contextState, ...data });
  };

  if (!token || token.length < 0) {
    return <Authentication setJWT={setJWT} />;
  }

  return (
    <MainContext.Provider value={{ token, ...contextState, updateContext }}>
      <Router>
        <Routes>
          <Route path="/" element={<Home setToken={setToken} />} exact />
          <Route path="/entry" element={<Entry />} exact />
        </Routes>
      </Router>
    </MainContext.Provider>
  );
}

export default App;
