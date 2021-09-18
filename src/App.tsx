import React, {ChangeEvent} from 'react';
import './styles/App.css';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Messages from './components/Messages/Messages';
import Profile from './components/Profile/Profile';
import {Route} from 'react-router-dom';
import {RootStateType} from './redux/state';

type AppProps = {
    state: RootStateType;
    addPost: () => void;
    changeNewPostText: (post: ChangeEvent<HTMLTextAreaElement>) => void;
};

const App: React.FC<AppProps> = ({state, addPost, changeNewPostText}) => {
    return (
        <div className="app-wrapper">
            <Header/>
            <Navbar/>
            <div className="app-content-wrapper">
                <Route
                    path={'/profile'}
                    render={() => (
                        <Profile
                            posts={state.ProfilePage.posts}
                            newPostText={state.ProfilePage.newPostText}
                            addPost={addPost}
                            changeNewPostText={changeNewPostText}
                        />
                    )}
                />
                <Route
                    path={'/messages'}
                    render={() => (
                        <Messages
                            messages={state.MessagesPage.messages}
                            dialogs={state.MessagesPage.dialogs}
                        />
                    )}
                />
            </div>
        </div>
    );
};

export default App;
