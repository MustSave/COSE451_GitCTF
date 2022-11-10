import React, {useState, useContext} from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { LangContext } from "../App";
import AuthService from "../services/auth.service";
import SearchLecture from "./sugang.userpage.container.search";
import Enroll from "./sugang.userpage.container.enroll";

import navIcon from "../img/layout/bg-controller.png";
import layoutIcon from "../img/contents/bg-select.png"
import logoImg from "../img/layout/logo.png";

const StyledDiv = styled.div`

flex: 1 0 0px;
max-width: 100%;
min-width: 0;
min-height: 100vh;


.nav-control {
    position: absolute;
    top: 34px;
    z-index: 2;
    width: 15px;
    height: 51px;
    border: 1px solid #e1e1e1;
    border-left: 0;
    background: #f9f9f9 url(${navIcon}) no-repeat 3px 21px;
    cursor: pointer;
    &.is-closed {
        background-position: -37px 21px;
    }
}

.header {
    height: 60px;
    padding: 0 30px;
    border-bottom: 1px solid #ccc;

    .is-left {
        float: left;
        display: flex;
        align-items: center;
        height: 100%;

        .title {
            margin-left: 12px;
            padding-left: 10px;
            border-left: 1px solid #ccc;
            font-size: 20px;
            font-weight: 600;
            letter-spacing: -1px;
        }
    }
    .is-right {
        float: right;
        display: flex;
        align-items: center;
        height: 100%;

        .user-name {
            margin-right: 20px;
            padding-right: 15px;
            background: url(${layoutIcon}) no-repeat;
            background-position: right 0 top 50%;
            font-size: 14px;
            font-weight: 600;
            letter-spacing: -1px;
            color: #4c4c4c;
            cursor: pointer;
        }

        button{
            cursor: pointer;
            &.btn-sub{
                background-color: #876243;
                border-color: #76563b;
                color: #fff;
            }
            &.btn-md{
                min-width: 70px;
                height: 30px;
                padding: 0 15px 2px;
                word-spacing: -1px;
            }
        }

        .layer-user {
            display: none;
            position: absolute;
            top: 50px;
            right: 30px;
            z-index: 1;
            width: 300px;
            padding: 10px 25px;
            background: #fff;
            border: 2px solid #a20131;
            box-shadow: 2px 2px 6px rgb(0 0 0 / 20%);
            

            :before {
                content: "";
                width: 0;
                height: 0;
                position: absolute;
                top: -13px;
                right: 130px;
                border-left: 12px solid transparent;
                border-right: 12px solid transparent;
                border-bottom: 12px solid #a20131;
            }
            :after {
                content: "";
                width: 0;
                height: 0;
                position: absolute;
                top: -10px;
                right: 132px;
                border-left: 10px solid transparent;
                border-right: 10px solid transparent;
                border-bottom: 10px solid #fff;
            }
            li {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 15px 0;
                border-bottom: 1px solid #e6e6e6;

                label {
                    font-size: 13px;
                    font-weight: 600;
                }
                span {
                    font-size: 14px;
                }
            }
        }
    }

}
`;

export default function Container({page, setShowNav, userInfo}) {
    console.log('Call Container');
    const {lang} = useContext(LangContext);
    
    const [visible, setVisible] = useState(false);
    const [overflow, setOverflow] = useState(false);
    const [isMaxHeight, setHeight] = useState(false);

    var sty = {
        overflow: overflow ? 'unset': 'hidden',
        display: visible ? 'block' : 'none',
        maxHeight : isMaxHeight ? '500px' : '0px',
        paddingTop : isMaxHeight ? '10px' : '0px',
        paddingBottom : isMaxHeight ? '10px' : '0px',
        WebkitTransition : 'all 0.7s ease-out',
        transition: 'all 0.7s ease-out',
    }

    const onClickTransition = e => {
        if (visible === false) {
            setVisible(true);
        }
        setTimeout(()=> {
            if (overflow) {
                setOverflow(false);
            }
            setHeight(prev=>!prev);
        }, 10);
    }
    const onTransitionEnd = e => {
        if (isMaxHeight === false) {
            setVisible(false);
        }
        else {
            setOverflow(true);
        }
    }
    const onClickNav = (e)=>{
        setShowNav(prev=>{
            e.target.className= prev ? 'nav-control is-closed' : "nav-control is-opened";
            e.target.title= prev? '메뉴열기' : '메뉴닫기'
            return !prev;
        })
    }
    const navigate = useNavigate();
    const handleLogout = ()=>{
        AuthService.logout().then(res=>{
            navigate("/");
        })
    }

    return (
        <StyledDiv className="container">
            <div className="nav-control is-opened" title="메뉴닫기" onClick={onClickNav}></div>
            <div className="header">
                <div className="is-left">
                    <img src={logoImg}/>
                    <span className="title">{lang==='KOR' ? "2022학년도 2학기" : "Fall 2022 Course Registration"}</span>
                </div>
                <div className="is-right">
                    <span className="user-name" onClick={onClickTransition}>{userInfo.name}</span>
                    <button type="button" className="btn-sub btn-md" onClick={handleLogout}>{lang === 'KOR' ? "로그아웃" : "Logout"}</button>
                    <div className="layer-user" style={sty} onTransitionEnd={onTransitionEnd}>
                        <ul>
                            <li>
                                <label>{lang === 'KOR' ? "대학" : "College"}</label>
                                <span>{userInfo.col_nm}</span>
                            </li>
                            <li>
                                <label>{lang === 'KOR' ? "학부" : "Dept"}</label>
                                <span>{userInfo.dept_nm}</span>
                            </li>
                            <li>
                                <label>{lang === 'KOR' ? "학년 (Year)" : "Year"}</label>
                                <span>{userInfo.grade}</span>
                            </li>
                            <li>
                                <label>{lang === 'KOR' ? "신청최소학점(Min Credit Limit)" : "Min Credit Limit"}</label>
                                <span><em>{userInfo.min_credit}</em>{lang == 'KOR' ? "학점" : "Credit"}</span>
                            </li>
                            <li>
                                <label>{lang === 'KOR' ? "신청최대학점(Max Credit Limit)" : "Max Credit Limit"}</label>
                                <span><em>{userInfo.max_credit}</em>{lang == 'KOR' ? "학점" : "Credit"}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            {page==='Search' ? <SearchLecture userInfo={userInfo}/> : <Enroll userInfo={userInfo}/>}
        </StyledDiv>
    )
}
