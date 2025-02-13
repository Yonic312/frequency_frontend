import React from 'react';

const Modal = ({ isOpen, closeModal, content }) => {
    if(!isOpen) return null; // 모달이 열려있지 않으면 렌더링X
     
    return (
        <div className="mt-5 pt-2 pl-2 fixed w-72 h-80 z-1 bg-purple-400 text-left">
            <label className="text-3xl">특별 프리퀀시 조건</label>
            <br/><br/>
            <label className="text-xl">1.수문장 기간 하루 3명 출석</label> <br/><br/>
            <label className="text-xl">2.다니엘 특새 기간간 하루 3명 출석</label> <br/><br/>
            <label className="text-xl">3.수문장, 다니엘특새기간 목자와 부목자 한 번씩 참여</label> <br/>
            <br/>
            <button className="w-12" onClick={closeModal}>
                닫기
            </button>
        </div>   
    )
}

export default Modal;