import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/userApi";

const SignUp = () => {
    const navigate = useNavigate();

    // 회원가입 입력
    const [user, setUser] = useState({
        userid: "",
        username: "",
        password: "",
        family: "", 
        number: "",
        duty:"목원"
    });

    // 목자 배열
    const vvipNumbers = [
        '010-8843-1184', '010-7125-5218', '010-9937-9394', '010-4212-1801', '010-8998-3757', '010-9236-2822'
        , '010-4274-9531', '010-3698-5226', '010-3921-4444', '010-9014-2828', '010-9108-8031' ,'1'
    ]
    
    // 부목자 배열
    const vipNumbers = [
        '010-7123-3682', '010-5744-2276', '010-4204-5225', '010-9755-2926', '010-9288-5582', '010-5397-4053'
        , '010-9252-8947', '010-8441-2663', '010-2162-6928', ' 010-4054-6287', '010-7119-5841','2'
    ]

    // 비밀번호 일치 관련 로직
    const isPasswordMatch = user.password !== "" && user.confirmPassword !== "" && user.password === user.confirmPassword;




    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (user.password !== user.confirmPassword) {
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }

        // 목자와 부목자 설정
        if (vvipNumbers.includes(user.number)){ // 포함되어 있다면
            user.duty="목자";
            console.log('목자 설정');
        } else if(vipNumbers.includes(user.number)){
            user.duty="부목자";
            console.log('부목자 설정');
        }

        
        // 비밀번호 중복 확인
        const result = await registerUser(user);
        if(result.status == 500){
            alert("회원가입 중 오류가 발생했습니다. 다시 시도해주세요.");
        } else {
            navigate("/");
        }
    }

    // 입력 번호 형식 포맷팅
    const formatPhoneNumber = (value, prevValue) => {
        // 숫자만 남기기
        const onlyNumbers = value.replace(/[^0-9]/g, '');
        let formatted = "";

        // 010-0000-0000 형식 적용
        if (onlyNumbers.length <= 3) {
            formatted = onlyNumbers
        } else if(onlyNumbers.length <= 7){
            formatted = `${onlyNumbers.slice(0, 3)}-${onlyNumbers.slice(3)}`;
        } else {
            formatted = `${onlyNumbers.slice(0, 3)}-${onlyNumbers.slice(3, 7)}-${onlyNumbers.slice(7, 11)}`;
        }

        if (prevValue && prevValue.length > value.length) {
            return formatted.replace(/-$/, "");
        }

        return formatted;
    };

    const handlePhoneChange = (e) => {
        const { value } = e.target;
        setUser((prev) => ({ ...user, number: formatPhoneNumber(value, prev.number) }));
    }




    return (
        <div className="mt-16 flex flex-col items-center">
            <span className="loginTitle-custom-text text-black">회원가입</span>
            <form className="w-62 pt-2" onSubmit={handleSubmit}>
                <div className="w-full mb-2">
                    <label className="text-sm text-white">아이디</label><br/>
                    <input type="text"
                        className="w-3/5 border-1 text-black bg-white"
                        onChange={(e) => setUser({...user, userid: e.target.value})}
                    />
                </div>

                <div className="w-full mb-2">
                    <label className="text-sm text-white">비밀번호</label><br/>
                    <input type="password" 
                        className="w-3/5 border-1 text-black bg-white"
                        onChange={(e) => setUser({...user, password: e.target.value})}
                    />
                </div>

                <div className="w-full mb-2">
                    <label className="text-sm text-white">비밀번호 확인</label><br/>
                    <input type="password" 
                        className="w-3/5 border-1 text-black bg-white"
                        onChange={(e) => setUser({...user, confirmPassword: e.target.value})}
                    />
                    {user.confirmPassword && (
                        <span className="absolute ml-2">
                            {isPasswordMatch ? "✅" : "❌"}
                        </span>
                    )}
                </div>

                <div className="w-full mb-2">
                    <label className="text-sm text-white">이름</label><br/>
                    <input type="text" 
                        className="w-3/5 border-1 text-black bg-white"
                        value={user.username}
                        onChange={(e) => setUser({...user, username: e.target.value.trimStart() })}
                        onBlur={(e) => setUser({...user, username: e.target.value.trim() })}
                    />
                </div>

                <div className="w-full mb-2">
                    <label className="text-sm text-white">목장</label><br/>
                    <select className="bg-white w-3/5 border-1"
                        onChange={(e) => setUser({...user, family: e.target.value})} // 👈 추가
                    >
                        <option value="">선택하세요</option>
                        <option value="김대인">김대인 목장</option>
                        <option value="박범수">박범수 목장</option>
                        <option value="박성은">박성은 목장</option>
                        <option value="송승회">송승회 목장</option>
                        <option value="신상준">신상준 목장</option>
                        <option value="신소은">신소은 목장</option>
                        <option value="이예진">이예진 목장</option>
                        <option value="이유림">이유림 목장</option>
                        <option value="임서울">임서울 목장</option>
                        <option value="조현준">조현준 목장</option>
                        <option value="심은미">심은미 목장</option>
                        <option value="이유림">이유림 목장</option>
                    </select>
                </div>

                <div className="w-full mb-2">
                    <label className="text-sm text-white">전화번호</label><br/>
                    <input 
                        type="text" 
                        placeholder="예)010-1234-5678" 
                        className="w-3/5 border-1 text-black bg-white"
                        value={user.number}
                        onChange={handlePhoneChange}
                    />
                </div>

                <button type="submit" className="bg-black ml-2 h-7 w-18 mt-2">가입</button>
                <button type="button" className="bg-black ml-2 h-7 w-18 mt-2" onClick={() => navigate("/")}>취소</button>
            </form>
        </div>
    );
};

export default SignUp;