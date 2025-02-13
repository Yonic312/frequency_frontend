import React from "react";
import { useNavigate, useLocation } from 'react-router-dom'

const Header = ( { user, setUser } ) => {
    const navigate = useNavigate(); // 페이지를 이동하게 도와주는 함수
    const location = useLocation();

    const handleLogout = () => {
        setUser(null);
        navigate('/');
    }

    const handleAdmin = () => {
        navigate('/admin');
    }
    
    const handleHome = () => {
        navigate('/home');
    }
    
    // 경로에따라 보이게 하기
    const isHomePage = location.pathname === "/home";
    const isAdminPage = location.pathname === "/admin";

    return (
        <header className="bg-none text-white text-xs w-full pt-1 relative">
            {(isHomePage || isAdminPage) &&  user && (
                <div className="absolute w-full text-right">
                {user ? 
                 <div className="text-xs mr-2">
                     {user === "admin" && (
                         <button className="mr-2" onClick={handleHome}> 메인페이지 </button>
                     )}
 
                     
                     {user === "admin" && (
                         <button className="mr-2" onClick={handleAdmin}> 관리자페이지 </button>
                     )}
                     <span>{user}님</span>
                     <button className=" bg ml-1" onClick={handleLogout}>로그아웃</button>
                 </div> : ""}
                 </div>
            )}
           
           
           {/* 여기는 항상 보이게 */}
           <div>
                <div className="mt-8">
                    <h2 className="text-2xl font-bold text-white">2025 YK44 Frequency</h2>
                    <p className="text-4xl text-white font-black">수문 앞 새벽기도회</p>
                </div>
           </div>
           
        </header>
    )
}

export default Header;