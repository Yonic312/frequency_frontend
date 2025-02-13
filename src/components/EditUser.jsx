import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditUser = () => {
    const { userid } = useParams(); // URL에서 사용자 ID 가져오기
    const [user, setUser] = useState(null); // 변수명 충돌 해결
    const navigate = useNavigate();

    useEffect(() => {
        console.log("Fetching user with ID:", userid); // 디버깅용 로그 추가
        fetch(`http://localhost:8080/api/users/${userid}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error("User not found");
                }
                return response.json();
            })
            .then(data => {
                // 데이터가 배열이라면 해당 id에 맞는 사용자 한 명만 찾기
                const userData = data.find(user => user.userid === userid);
                console.log("Fetched user data:", data);
                setUser(userData);
            })
            .catch(error => console.error("데이터 가져오기 실패:", error)); // 쉼표 문제 수정
    }, [userid]);

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`http://localhost:8080/api/users/${userid}`, {
            method: "PUT",
            headers: { "Content-Type" : "application/json"},
            body: JSON.stringify(user),
        })
        .then(response => response.json())
        .then(() => navigate("/admin"))
        .catch(error => console.error("수정 실패", error));
    };

    const handleGoBack = () => {
        navigate("/admin");
    }

    if (!user) return <p>로딩 중...</p>;

    return (
        <div className="flex flex-col items-center">
            <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-bold text-gray-700 mb-2">사용자 정보 수정</h2>
                
                <div className="mb-4">
                    <label className="block text-gray-600 text-sm font-semibold" htmlFor="username">이름</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={user.username}
                        onChange={handleChange}
                        className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                
                <div className="mb-4">
                    <label className="block text-gray-600 text-sm font-semibold" htmlFor="number">전화번호</label>
                    <input
                        type="text"
                        id="number"
                        name="number"
                        value={user.number}
                        onChange={handleChange}
                        className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                
                <div className="mb-4">
                    <label className="block text-gray-600 text-sm font-semibold" htmlFor="duty">분류</label>
                    <select
                        id="duty"
                        name="duty"
                        value={user.duty}
                        onChange={handleChange}
                        className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="목자">목자</option>
                        <option value="부목자">부목자</option>
                        <option value="목원">목원</option>
                    </select>
                </div>
                
                <div className="mb-4">
                    <label className="block text-gray-600 text-sm font-semibold" htmlFor="userid">아이디</label>
                    <input
                        type="text"
                        id="userid"
                        name="userid"
                        value={user.userid}
                        onChange={handleChange}
                        className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                
                <div className="mb-4">
                    <label className="block text-gray-600 text-sm font-semibold" htmlFor="password">비밀번호</label>
                    <input
                        type="text"
                        id="password"
                        name="password"
                        value={user.password}
                        onChange={handleChange}
                        className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                
                <button
                    type="submit"
                    className="w-30 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300"
                >
                    수정 완료
                </button>
                
                <button
                    type="button"
                    onClick={handleGoBack} // 뒤로 가기 버튼
                    className="w-30 py-3 ml-2 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600 transition duration-300 mt-4"
                >
                    취소
            </button>
        </form>
</div>


    );
};

export default EditUser;
