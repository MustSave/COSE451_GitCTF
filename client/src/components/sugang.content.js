import React, {useContext} from "react";
import styled from "styled-components"
import NoticeList from "./sugang.content.noticelist";
import NoticeBox from "./sugang.content.noticebox";
import { LangContext } from "../App";

const StyledDiv = styled.div`
    width: 100%;
    padding: 65px 0 80px;
    box-sizing: border-box;

    >div {
        position: relative;
        width: 1200px;
        margin: 0 auto;
        
        .wrap-schedule{
            display: flex;
            -webkit-box-flex: 0;
            flex: 0 1 auto;
            -webkit-box-orient: horizontal;
            -webkit-box-direction: normal;
            flex-direction: row;
            flex-wrap: wrap;
            align-items: stretch;
            margin-top: 5px;
            margin-bottom: 60px;
        }

        h1{
            margin-bottom: 5px;
            font-size: 26px;
            font-weight: normal;
            letter-spacing: -2px;
            word-spacing: -1px;
        }

        small{
            margin-left: 10px;
            font-size: 16px;
            font-weight: normal;
            color: #666;
            letter-spacing: 0;
            word-spacing: 0;
        }
    }
`;

export default function Content(){
    console.log('Call Content');
    const { lang } = useContext( LangContext );

    return (
        <StyledDiv className='wrap-contents'>
            <div>
                <h1>
                    {lang==='KOR' ? "수강신청 안내" : "Course Registration Schedule"}
                    <small>{lang==='KOR' ? "Course Registration Schedule" : "수강신청 안내"}</small>
                </h1>

                <div className="wrap-schedule">
                    <NoticeBox data={{"KOR": ["학부 수강신청 일정", "학부 수강신청 안내"], "ENG": ["Course Registration Schedule", "Course Registration Schedule"]}}/>
                    <NoticeBox data={{"KOR": ["과목조회", "고려대학교 과목조회"], "ENG": ["Search Course", "Search Course"]}}/>
                    <NoticeBox data={{"KOR": ["교육정보", "고려대학교 교육정보 확인"], "ENG": ["Academic Information", "KU Academic Information"]}}/>
                    <NoticeBox data={{"KOR": ["비밀번호 변경", "포털 미사용자 비밀번호변경"], "ENG": ["Password Change", "Password Change for Non-Portal Users"]}}/>
                    <NoticeBox data={{"KOR": ["신입생 학번안내", "신입생 학번안내"], "ENG": ["Freshman's student number", "Find a freshman's student number"]}} />
                </div>

                <h1>
                    {lang === 'KOR' ? "수강신청 유의사항" : "Course Registration Notice"}
                    <small>{lang==='KOR' ? "Course Registration Notice" : "수강신청 유의사항"}</small>
                </h1>
                
                <NoticeList/>
            </div>
        </StyledDiv>
    )
}