import ReactDOM from "react-dom";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import {addPost, changeNewPostText, state} from './redux/state';

export const renderTree = () => {
  ReactDOM.render(
    <React.StrictMode>
      <BrowserRouter>
        <App state={state} addPost={addPost} changeNewPostText={changeNewPostText} />
      </BrowserRouter>
    </React.StrictMode>,
    document.getElementById("root")
  );
};
