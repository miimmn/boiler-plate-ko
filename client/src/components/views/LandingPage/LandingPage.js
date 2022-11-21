import React, { useEffect, useInsertionEffect } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom";


function LandingPage() {

    const navigate = useNavigate();

    // 이 페이지를 들어오고 실행할 내용
    useEffect(() => {
        axios.get('/api/hello')  // get 요청을 서버에다 보내는 것
        .then(response => {console.log(response.data)})      
    }, [])
    

    const onClickHandler = () => {
        axios.get('/api/users/logout')
            .then(response => {
                if(response.data.success) {
                    navigate("/login");
                }
                else {
                    alert("로그아웃 실패")
                }
            })
    }


    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            width: '100%', height: '100vh'
        }}>
            <h2>시작 페이지</h2>

            <button onClick={onClickHandler} >
                로그아웃
            </button>
        </div>
    )
}

export default LandingPage