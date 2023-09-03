import HeaderContainer from "./Components/Header/HeaderContainer";
import {Navigate, Route, Routes} from "react-router-dom";
import HomeContainer from "./Components/Home/HomeContainer";
import Sidebar from "./Components/Sidebar/Sidebar";
import {Suspense, useEffect} from "react";
import Login from "./Components/Login/Login";
import {useDispatch} from "react-redux";
import {auth} from "./redux/user-reducer";
import FriendsContainer from "./Components/Friends/FriendsContainer";
import MessagesContainer from "./Components/Messages/MessagesContainer";
import Developing from "./Components/Developing/Developing";

function App() {
    const dispatch = useDispatch()
    const initializeApp = () =>{
        dispatch(auth())
    }
    useEffect(()=> {
        initializeApp()
    })
  return (
    <div className="App">
      <HeaderContainer/>
      <div className='content'>
          <Sidebar/>
          <main className="main">
                <Suspense fallback={<div>Loading...</div>}>
                    <Routes>
                        <Route path="/home/:userId?" element={<HomeContainer/>}/>
                        <Route path="/friends" element={<FriendsContainer />} />
                        <Route path="/messages/:receiver?" element={<MessagesContainer/>}/>
                        <Route path="/communities" element={<Developing />} />
                        <Route path="/games" element={<Developing />} />
                        <Route path="/settings" element={<Developing />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/" element={<Navigate to="/home" />} />
                    </Routes>
                </Suspense>
            </main>
        </div>
      <footer className='footer'>&copy; Copyright 2023</footer>
    </div>
  );
}

export default App;
