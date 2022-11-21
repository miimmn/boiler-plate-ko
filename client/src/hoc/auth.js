
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {auth} from '../_actions/user_actions'

export default function (SpecificComponent, option, adminRoute = null) {

    // null  --> �ƹ��� ������ ������ ������
    // true  --> �α����� ������ ������ ������ ������
    // false --> �α����� ������ ���� �Ұ����� ������


    function AuthenticationCheck(props) {

        const dispatch = useDispatch()
        const navigate = useNavigate();

        useEffect(() => {

            dispatch(auth()).then(response => {
                console.log("auth")

                // �α��� �� �� ����
                if(!response.payload.isAuth) {
                    if(option) {
                        navigate('/login')
                    }
                } 
                // �α����� ����
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