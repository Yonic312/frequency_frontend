// 로그인 후 메인 페이지
import React, { useState, useEffect } from "react";
import p2 from "../assets/images/p2.png";
import p3 from "../assets/images/p3.png";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [specialFrequencyActive, setSpecialFrequencyActive] = useState(false); // 가족 수문 카운트
  const [specialFrequencyActive2, setSpecialFrequencyActive2] = useState(false); // 가족 다니엘엘 카운트
  const [specialFrequencyActive3, setSpecialFrequencyActive3] = useState(false); // 가족 다니엘엘 카운트
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 관리

  // 출석체크 날짜 범위 설정
  const isWithinAttendancePeriod = () => {
    const now = new Date();
    const hours = now.getHours(); // 현재 시간

  // 오늘 날짜
    const day = now.getDate();

  // 지정된 날짜 범위 (17~21일, 24~28일) / 조건 1
  const isWithinDateRange = (day >= 17 && day <= 21) || (day >= 24 && day <= 28);

  // 오전 4시부터 7시까지인지 체크 / 조건 2
  const isWithinTimeRange = hours >= 4 && hours <7;

    return isWithinDateRange && isWithinTimeRange;
  }

  // 지도 api
  const [location, setLocation] = useState(null);
  const [isInsideChurch, setIsInsideChurch] = useState(false);
  const [user, setUser] = useState({ id:''});

  // 교회 위치 (예시: 서울 중심부) 
  const churchLocation = { lat: 37.6081404769246, lng: 126.928927763469}; 
  const radius = 50; // 허용 반경 50(미터) 교회 앞 횡단보도 / 조건 3

  useEffect(() => {
    if("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lng: longitude});

          // 거리 계산 후 반경 내에 있는지 확인
          if(caculateDistance(latitude, longitude, churchLocation.lat, churchLocation.lng) <= radius){
            setIsInsideChurch(true);
          } else {
            setIsInsideChurch(false);
          }
        },
        (error) => console.error("위치 정보를 가져올 수 없습니다.", error),
        { enableHighAccuracy: true} // 노트북에서 위치 요청 시 "고정 위치 사용 옵션 추가
      );
    } else {
      console.error("지원하지 않는 브라우저입니다.");
    }
  }, []);

  // 두 좌표 간 거리 계산 (Haversine 공식)
  function caculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371000; // 지구 반경 (미터)
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  // 출석체크 API
  useEffect(() => {
    const storedUserId = localStorage.getItem("id");
    if (storedUserId) {
      setUser({ id: storedUserId });
    }
  }, []);

  // 출석체크 구현
  const checkAttendance = async () => {
    try {
      console.log("userid : ", user);
      const response = await fetch(`http://localhost:8080/attendance/check?userid=${user.id}`, {
        method: "POST"
      });

      if (response.ok) {
        // 서버에서 반환하는 메세지를 받음
        const result = await response.text(); 

        if (result === "출석 완료!") {
          alert("출석 체크 완료 :)");

          // 출석 횟수 새로고침
          setAttendanceCount(0);  // count 초기화
          const updatedCountResponse = await fetch(`http://localhost:8080/attendance/count?userid=${user.id}`);
          const updatedCountData = await updatedCountResponse.json();
          setAttendanceCount(updatedCountData.count);  // 새로운 출석 횟수로 상태 업데이트
          navigate("/home");
          
        } else if(result === "이미 출석했습니다") {
          alert("이미 출석하셨습니다.");
        } else {
          alert("관리자에게 문의 바람");
        }
      } else {
        alert("출석 체크 실패!");
      }
    } catch (error) {
      alert("서버 오류 발생! : ", user.id);
    }
  };
  
  // 출석일 카운트 구현
  const [attendanceCount, setAttendanceCount] = useState(0);

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const response = await fetch(`http://localhost:8080/attendance/count?userid=${user.id}`);
        if (response.ok) {
          const data = await response.json();
          setAttendanceCount(data.count); // 출석 회수 저장
        } else {
          alert("출석 데이터 조회 실패");
        }
      } catch (error) {
        //alert("출석 데이터 조회 중 오류 발생 ", error);
      }
    };

    if (user.id) {
      fetchAttendance();
    }
  }, [user]);


  // 가족 출석 확인(수문)
  useEffect(() => {
    const storedUserId = localStorage.getItem("id");
    if (storedUserId) {
      setUser({ id: storedUserId });

      fetch(`http://localhost:8080/attendance/family-special-check?userid=${storedUserId}`)
      .then((res) => res.json())
      .then((data) => setSpecialFrequencyActive(data)) // true/false 반환
      .catch((err) => console.error("특별 프리퀀시 조회 오류:", err));
    }
  }, [user.id])

  // 가족 출석 확인(다니엘)
  useEffect(() => {
    const storedUserId = localStorage.getItem("id");
    if (storedUserId) {
      setUser({ id: storedUserId });

      fetch(`http://localhost:8080/attendance/family-special-check2?userid=${storedUserId}`)
      .then((res) => res.json())
      .then((data) => setSpecialFrequencyActive2(data)) // true/false 반환
      .catch((err) => console.error("특별 프리퀀시 조회 오류:", err));
    }
  }, [user.id])

  // 목자 부목자 출석 확인
  useEffect(() => {
    const checkDutyP3 = async () => {
      try {
        const response = await fetch(`http://localhost:8080/attendance/has-duty-attendance?userid=${user.id}`);
        const data = await response.json();
        setSpecialFrequencyActive3(data);
        //setDutyP3(data); // duty 프리퀀시 여부를 state에 저장
      } catch (error) {
        console.error("duty 프리퀀시 확인 오류: ", error);
      }
    };

    if (user.id){
      checkDutyP3();
    }
  }, [user])

    return (
    <div className="w-full flex flex-col items-center">
        <div className="flex items-center mt-5">
            {location ? (
                <>
                <button
                    className="w-22"
                    onClick={checkAttendance}
                    disabled={!isInsideChurch || !isWithinAttendancePeriod()}
                >
                    출석 체크
                </button>
                <p>{isInsideChurch && isWithinAttendancePeriod() ? "✅" : "❌"}</p>      
                </>
            ) : (
                <p>위치 정보를 가져오는 중...</p>
            )}
            <p className="ml-2">출석일 : {attendanceCount}회</p> &ensp;
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-4"
              >
              ?
              </button>

              {/* 모달 */}
              {isModalOpen && (
                <div className="fixed top-0 left-0 w-full h-full bg-none bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-lg shadow-lg w-80">
                  <div className="text-left">
                    <label className="block mb-1 guideText">🌠일반 프리퀀시(개인)🌠</label>
                    <label className="block mb-1 guideText">➜시간 : 04-07 / 거리 : 교회 정문 40M ( 교회 바로 앞 횡단보도 )</label>
                    <label className="block mb-1 guideText">🌠특별 프리퀀시(목장)🌠</label>
                    <label className="block mb-1 guideText">➜수문장(17일~21일) 하루 3명 출석</label>
                    <label className="block mb-1 guideText">➜다니엘(24일~28일) 하루 3명 출석</label>
                    <label className="block mb-1 guideText">➜수문장, 다니엘특새기간 목자, 부목자 한 번씩 참여</label> 
                  </div>
                  <button 
                    onClick={() => setIsModalOpen(false)} // 모달 닫기
                    className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
                  >
                    닫기
                  </button>
                </div>
              </div>
              )}
        </div>

        <div className="flex mt-6 ">
            {<img src={p3} className={`w-21 h-21 ${specialFrequencyActive  ? "" : "filter grayscale"}`}/>}
            {<img src={p3} className={`w-21 h-21 ${specialFrequencyActive2  ? "" : "filter grayscale"}`}/>}
            {<img src={p3} className={`w-21 h-21 ${specialFrequencyActive3  ? "" : "filter grayscale"}`}/>}
        </div>
        <div>
            <div className="flex flex-col mt-5">
              {[0, 1].map(row => (
                <div key={row} className="flex">
                  {Array.from({ length: 5}).map((_dirname, index) => {
                    const itemIndex = row * 5 + index; // 전체 인덱스 (0-9)
                    return (
                      <img
                        key={itemIndex}
                        src={p2}
                        className={`w-18 h-18 ${itemIndex < attendanceCount ? "" : "filter grayscale"}`}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
        </div>
    </div>
    )
}

export default Home;