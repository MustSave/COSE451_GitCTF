import React, {useContext} from "react";
import styled, {css} from "styled-components";
import MenuList from "./sugang.userpage.nav.menu";
import downloadIcon from "../img/layout/icon-download.png";
import plusIcon from "../img/layout/icon-plus.png";
import { LangContext } from "../App";

const styleNavHeader = css`
{
    padding: 20px 20px 5px;
    background: #e0e0e0;

    span {
        float: left;
        width: 50%;
        height: 40px;
        background: #b3b3b3;
        font-size: 14px;
        color: #fff;
        line-height: 38px;
        text-align: center;
        cursor: pointer;
    }
    span.is-active {
        background: #a20131;
        cursor: default;
    }
}
`;

const styleNavFooter = css`
{
    position: relative;
    height: 210px;
    margin-right: -1px;
    padding: 20px;
    background: #262626;

    .btn-footer {
        cursor: not-allowed;
        // cursor: pointer;
        width: 100%;
        height: 40px;
        margin-bottom: 10px;
        padding: 0 15px;
        line-height: 40px;
        background-color: #666;
        border: 0;
        color: #fff;
        text-align: left;

        position: relative;
        border-radius: 0;
        font-weight: normal;
        white-space: nowrap;
        touch-action: manipulation;
        overflow: hidden;
        box-sizing: border-box;
        min-width: 55px;
        font-size: 12px;
        letter-spacing: -0.5px;
        word-spacing: -1px;
        background-image: none;

        i{
            float: right;
            margin: 0;
            display: inline-block;
            width: 16px;
            background-repeat: no-repeat;
            background-position: center center;

            &.sw-icon-download{
                height: 100%;
                background-image: url(${downloadIcon});
                background-position-y: 10px;
            }
            &.sw-icon-plus {
                height: 100%;
                background-image: url(${plusIcon});
                background-position-y: 14px;
            }
        }
    }

    .btn-main{
        background-color: #a20131;
        border-color: #890129;
        color: #fff;
    }

    .layer-site {
        display: none;
        position: absolute;
        left: 20px;
        right: 20px;
        bottom: 100px;
        z-index: 1;
        padding: 20px;
        border: 2px solid #a20131;
        background: #fff;

        li {
            font-size: 14px;

            a {
                color: #333;
                text-decoration: none;
                outline: 0 none;
            }
        }
    }

    .copy {
        font-size: 11px;
        color: #999;
        text-align: center;
    }
}
`;

const StyledDiv = styled.div`
display: inline-flex;
    flex-direction: column;
    width: 250px;
    min-height: 100vh;
    border-right: 1px solid #ccc;
    background: #e0e0e0;
    transition: all .3s;

    .nav-header{
        ${styleNavHeader}
    }

    .nav-main {
        flex: 1 1 auto;
        padding: 0 20px 20px;
        ul.nav-menu {
        }
    }

    .nav-footer{
        ${styleNavFooter}
    }
`;

const menuList = [
    {title: {text: ["????????????", "Course Registration"], page: 'enroll'}},

    {title: {text: ["????????????/???????????? ??????", "Preffered Course List System"], page: undefined}},

    {title: {text: ["????????????", "Search Course"], page: undefined}, 
        children: {text: [
            ["?????? ????????????", "Undergraduate Courses"],
            ["?????? ????????????", "Similar subjects"],
        ], page: ['Search']}},

    {title: {text: ["????????????", "Notice"], page: undefined}, 
        children: {text: [
            ["???????????? ??????", "Course Registration Schedule"],
            ["????????? ??????", "Course Locations/Room Numbers"],
            ["????????????????????? ??????", "Payment of Tuition for Summer/Winter Sessions"],
            ["????????? ?????? ??????", "Find a freshman's student number"],
        ], page: undefined}},

    {title: {text: ["?????????????????? ???????????? ??????", "Password Change for Non-Portal Users"], page: undefined}}
]

export default function Nav({setPage}) {
    // console.log('Call Nav');
    const {lang, changeLangTo} = useContext(LangContext);

    const onCLickMenu = event => {

    }

    return(
        <StyledDiv className="nav">
			<div className="nav-header">
                <span onClick={()=>changeLangTo('KOR')} className={lang === 'KOR' ? "is-active" : null}>KOREAN</span>
                <span onClick={()=>changeLangTo('ENG')} className={lang === 'ENG' ? "is-active" : null}>ENGLISH</span>
            </div>

            <div className="nav-main">
                <ul className="nav-menu">
                    {
                        menuList.map((menu, idx)=>{
                            return <MenuList key={idx} title={menu.title} children={menu.children} setPage={setPage}/>
                        })
                    }
                </ul>
            </div>

            <div className="nav-footer">
                <div id="manual">
                    <button type="button" className="btn-footer">
                        <span id="manualPC">{lang === 'KOR' ? "????????? ????????? (PC)" : "User Manual (PC)"}</span>
                        <i className="sw-icon-download"></i>
                    </button>
                    <button type="button" className="btn-footer">
                        <span id="manualMO">{lang === 'KOR' ? "????????? ????????? (????????????)" : "User Manual (Mobile)"}</span>
                        <i className="sw-icon-download"></i>
                    </button>
                </div>
                <button type="button" className="btn-footer btn-main" id="linkSite">
                    <span>{lang === 'KOR' ? "???????????????" : "Relevant websites"}</span>
                    <i className="sw-icon-plus icon-plus"></i>
                </button>
                <div className="layer-site">
                    <ul>
                        <li><a href="http://portal.korea.ac.kr" target="_blank">KUPID</a></li>
                        <li><a href="http://www.korea.ac.kr" target="_blank">????????????</a></li>
                        <li><a href="http://registrar.korea.ac.kr" target="_blank">????????????</a></li>
                    </ul>
                </div>
                <div className="copy">
                    Copyright ?? 2020 Korea University.
                    <br/>
                    All Rights Reserved.
                </div>
            </div>
		</StyledDiv>
    )
}
