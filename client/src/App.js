import HeaderContainer from "./Components/Header/HeaderContainer";
import {Navigate, Route, Routes} from "react-router-dom";
import HomeContainer from "./Components/Home/HomeContainer";
import Sidebar from "./Components/Sidebar/Sidebar";
import {Suspense, useEffect} from "react";
import Login from "./Components/Login/Login";
import {useDispatch} from "react-redux";
import {auth} from "./redux/user-reducer";
import FriendsContainer from "./Components/Friends/FriendsContainer";

function App() {
    const isAuth = true;
    const dispatch = useDispatch()

    const initializeApp = () =>{
        dispatch(auth())
    }
    useEffect(()=>initializeApp)
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
                        {/*<Route path="/messages/*" element={<Messages/>}/>
                        <Route path="/comunities" element={<Communities />} />

                        <Route path="/games" element={<Games />} />
                        <Route path="/settings" element={<Settings />} />*/}
                        <Route path="/login" element={<Login />} />
                        <Route path="/" element={<Navigate to="/home" />} />
                    </Routes>
                </Suspense>
            </main>
        </div>
      <footer className='footer'>&copy Copyright 2023</footer>
    </div>
  );
}

export default App;
