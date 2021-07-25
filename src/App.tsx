import React from "react";
import "./styles/App.css";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Messages from "./components/Messages";
import Profile from "./components/Profile";
import { BrowserRouter, Route } from "react-router-dom";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="app-wrapper">
        <Header />
        <Navbar />
        <div className="app-content-wrapper">
          <Route path={"/profile"} component={Profile} />
          <Route path={"/messages"} component={Messages} />
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
