import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import {Route,Routes} from 'react-router';
import {  useState } from 'react';

import Home from './pages/Home';
import Nav from './components/Nav';
import Login from './pages/Login';
import Register  from './pages/Register';
import ShowPosts from './pages/ShowPosts';
import CreatePost from './pages/CreatePost';
import './index.css';
import { RecoilRoot } from 'recoil';



const App =() => {
    return <>
        <RecoilRoot>{}

            <Router>
                <div>
                    <Nav /> 
                </div>
                <Routes>
                    <Route path="/" element={<Home/>}></Route>
                    <Route path="/login" element ={<Login />}></Route>
                    <Route path="/register" element={<Register />}></Route>
                    <Route path="/posts" element={<ShowPosts />}></Route>
                    <Route path="/posts/create" element={<CreatePost />}></Route>
                </Routes>
            </Router>
        </RecoilRoot>
        
    </>
}
ReactDOM.render(
    <App />,
    document.getElementById('root')
)