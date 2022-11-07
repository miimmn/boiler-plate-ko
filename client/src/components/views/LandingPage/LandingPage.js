import React, { useEffect, useInsertionEffect } from 'react'
import axios from 'axios'

function LandingPage() {

    // 이 페이지를 들어오고 실행할 내용
    useEffect(() => {
        axios.get('/api/hello')  // get 요청을 서버에다 보내는 것
        .then(response => {console.log(response.data)})      
    }, [])
    
  return (
    <div>LandingPage 랜딩페이지</div>
  )
}

export default LandingPage