
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {auth} from '../_actions/user_actions'

export default function (SpecificComponent, option, adminRoute = null) {

    // null  --> 아무나 출입이 가능한 페이지
    // true  --> 로그인한 유저만 출입이 가능한 페이지
    // false --> 로그인한 유저는 출입 불가능한 페이지


    function AuthenticationCheck(props) {

        const dispatch = useDispatch()
        const navigate = useNavigate();

        useEffect(() => {

            dispatch(auth()).then(response => {
                console.log("auth")

                // 로그인 안 한 상태
                if(!response.payload.isAuth) {
                    if(option) {
                        navigate('/login')
                    }
                } 
                // 로그인한 상태
                else {
                    if(adminRoute && !response.payload.isAdmin) {
                        navigate('/')
                    }
                    else {
                        if(option === false) {
                            navigate('/')
                        }
                    }
                }
            })
        }, [])

        return (<SpecificComponent />);
        
    }


    return <AuthenticationCheck />
}