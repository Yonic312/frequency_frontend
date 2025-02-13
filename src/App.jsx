import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom"
import './App.css'
import Header from "./components/Header"
import SignUp from "./components/SignUp"
import Login from "./components/Login"
import Home from "./components/Home"
import Admin from "./components/Admin"
import EditUser from "./components/EditUser"
import bgImage from "./assets/images/p1.png";

function App() {
  const [user, setUser] = useState(localStorage.getItem("id") || null); // 사용자 상태 관리하기

  return (
    <Router>
      <AppWithRouter user={user} setUser={setUser}/>
    </Router>
  )
}

function AppWithRouter({ user, setUser}) {
  console.log(location.pathname)

  return (
    <div className="w-full h-screen overflow-hidden"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat"
          }}
      >
        <Header user={user} setUser={setUser} />
        <main>
          <Routes>
            <Route path="/" element={<Login setUser={setUser}/>} /> {/*로그인 페이지*/}
            <Route path="/home" element={<Home />} /> {/*메인 페이지*/}
            <Route path="/signUp" element={<SignUp />} /> {/*회원가입*/}
            <Route path="/admin" element={<Admin />} /> {/*회원가입*/}
            <Route path="/edit-user/:userid" element={<EditUser />} /> {/*어드민민수정*/}
          </Routes>
        </main>  
      </div>
  )
}

export default App
