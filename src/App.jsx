import React from 'react';
import "./assets/stylings/main.css";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import ScrollToTop from './components/ScrollToTop';
import Stories from './pages/Stories';
import StoryDetails from './pages/StoryDetails';
import StoryAdd from './pages/StoryAdd';
import Login from './pages/Login';
import Protected from './components/Protected';

const App = () => {
    return (
        <>
        <BrowserRouter>
            <Navbar />
            <ScrollToTop />
            <Routes>
                <Route index path='/' element={<Protected redirect={true}><Login /></Protected>} />
                <Route path='/stories' element={<Protected><Stories /></Protected>} />
                <Route path='/story/add' element={<Protected><StoryAdd /></Protected>} />
                <Route path='/story/:uid/:stripped' element={<Protected><StoryDetails /></Protected>} />
            </Routes>
        </BrowserRouter>
        </>
    );
};

export default App;