import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import { Home } from "./components/authenticated/Home";
import { Authentication } from "./components/Authentication";
import { NativeBaseProvider } from "native-base";

function App() {
  const [token, setToken] = useState("");

  useEffect(() => {
    setToken(localStorage.getItem("the-book-of"));
  }, []);

  const setJWT = (data) => {
    setToken(data.token);

    localStorage.setItem("the-book-of", data.token);
  };

  if (!token || token.length < 0) {
    return (
      <NativeBaseProvider>
        <Authentication setJWT={setJWT} />
      </NativeBaseProvider>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home token={token} setToken={setToken} />} exact />
      </Routes>
    </Router>
  );
}

export default App;
