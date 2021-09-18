import React from "react";
import "./styles/App.css";
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Messages from "./components/Messages/Messages";
import Profile from "./components/Profile/Profile";
import { BrowserRouter, Route } from "react-router-dom";
import { RootStateType } from "./redux/state";

type AppProps = {
  state: RootStateType;
};

const App: React.FC<AppProps> = ({ state }) => {
  return (
    <BrowserRouter>
      <div className="app-wrapper">
        <Header />
        <Navbar />
        <div className="app-content-wrapper">
          <Route
            path={"/profile"}
            render={() => <Profile posts={state.ProfilePage.posts} />}
          />
          <Route
            path={"/messages"}
            render={() => (
              <Messages
                messages={state.MessagesPage.messages}
                dialogs={state.MessagesPage.dialogs}
              />
            )}
          />
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
