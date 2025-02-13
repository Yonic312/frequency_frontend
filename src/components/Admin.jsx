import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // 페이지 이동을 위한 Hook
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Admin = () => {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:8080/api/users/get") // 백엔드 주소에 맞게 수정
            .then(response => response.json())
            .then(data => {
                console.log('data : ',data);
                const filteredUsers = data.filter(user => user.userid !== 'admin');
                setUsers(filteredUsers);
            })
            .catch(error => console.error("에러가 발생했습니다 : ",error));
    }, []);

    // 사용자 클릭 시 수정 페이지로 이동
    const handelUserClick = (userid) => {
        navigate(`/edit-user/${userid}`);
    }

    // 날짜를 선택할 때 처리
    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    // 유저 아이디 입력
    const handleUseridChange = (e) => {
        setUseris(e.target.value);
    };

    // 출석 추가
    const handelAddAttendance = () => {
        if (userid && setSelectedDate) {
            setAttendanceData(prevData => [
                ...prevData,
                { userid, date: selected}
            ])
        }
    }


    return (
        <div className="mt-5 h-[350px] overflow-y-auto">
            <table className="w-full bg-white">
                <thead>
                    <tr>
                        <th>목장</th>
                        <th>이름</th>
                        <th>아이디</th>
                        <th>전화번호</th>
                        <th>분류</th>
                        <th>출석일</th> 
                    </tr>
                </thead>
                <tbody>
                    {users.length > 0 ? (
                    users.map((user) => (
                        <tr key={user.userid} className="cursor-pointer hover:bg-gray-200"
                            onClick={() => handelUserClick(user.userid)}>
                            
                            <td>{user.family}</td>
                            <td>{user.username}</td>
                            <td>{user.userid}</td>
                            <td>{user.number}</td>
                            <td>{user.duty}</td>
                            <td>{user.attendanceCount}</td>
                        </tr>
                    ))
                    ) : (
                    <tr>
                        <td colSpan="6">데이터가 없습니다</td>
                    </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default Admin;