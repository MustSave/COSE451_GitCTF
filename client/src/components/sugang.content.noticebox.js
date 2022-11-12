import React, {useContext} from "react";
import styled from "styled-components";
import moreImg from "../img/login/btn-more.png";
import { LangContext } from "../App";

const StyledDiv = styled.div`
  flex: 0 0 auto;
  -webkit-box-flex: 1;
  flex-grow: 1;
  flex-basis: 0;
  max-width: 100%;
  min-width: 0;
  position: relative;
  margin-left: 45px;
  box-sizing: border-box;

  :first-child {
    margin-left: 0;
  }

  div {
    position: relative;
    height: auto;
    padding-left: 20px;
    border-left: 1px solid #bf0039;
    box-sizing: border-box;
    float: left;
    width: 100%;
  }

  h2 {
    position: relative;
    width: calc(100% - 12px);
    height: 30px;
    margin-bottom: 20px;
    padding: 2px 20px 0;
    background: #bf0039;
    font-size: 14px;
    color: #fff;
    letter-spacing: -1px;
    word-spacing: -1px;
    box-sizing: border-box;

    ::before {
      content: "";
      display: inline-block;
      height: 100%;
      vertical-align: middle;
      font-size: 0;
    }
    ::after {
      content: "";
      position: absolute;
      top: 0;
      right: -12px;
      width: 0;
      height: 0;
      border-right: 12px solid transparent;
      border-top: 15px solid #bf0039;
      border-bottom: 15px solid #bf0039;
    }
  }

  p {
    font-size: 20px;
    line-height: 22px;
  }

  .sname {
    font-size: 15px;
    line-height: 22px;
    width: 100%;
  }

  .btn-more {
    display: inline-block;
    position: relative;
    top: 5px;
    width: 60px;
    height: 22px;
    background: url(${moreImg}) no-repeat center center;
    cursor: not-allowed;
  }
`;

export default function NoticeBox({data, link}){
  // console.log('Call ContentInfo');
  const {lang} = useContext(LangContext);

    return (
        <StyledDiv>
            <h2>
                {data[lang][0]}
            </h2>
            <div className="schedule">
                <p>
                    <span className="sname">{data[lang][1]}</span>
                    <span className="btn-more" id="menu_noti_1" onClick={()=>console.log("Fill it! btn-more")}/>
                </p>
            </div>
        </StyledDiv>
    )
}