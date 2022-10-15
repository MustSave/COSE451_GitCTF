import React, {useState} from "react";
import styled from "styled-components";
import listIcon from "../img/login/bullet.png"

const StyledDiv = styled.div`
    padding: 30px;
    position: relative;
    border: 1px solid #dedede;
    background: #fff;
    box-sizing: border-box;
    margin-top: 10px;
    

    .list-icon>li{
        margin-bottom: 10px;
        padding: 0 0 0 12px;
        background: url(${listIcon}) no-repeat 0 7px;
        font-size: 14px;
        line-height: 22px;
        box-sizing: border-box;
    }

    .list-num{
        margin-left: 30px;
        list-style-type: decimal;

        li{
            margin-bottom: 10px;
            font-size: 14px;
            line-height: 22px;
            word-break: break-all;
        }

        .list-dot{
            margin-top: 2px;

            li{
                position: relative;
                padding: 3px 0 3px 10px;
                font-size: 13px;
                line-height: 18px;

                ::before{
                    content: "";
                    display: inline-block;
                    position: absolute;
                    top: 10px;
                    left: 0;
                    width: 4px;
                    height: 4px;
                    border-radius: 4px;
                    background: #876243;
                }
            }
        }
    }
`;

export default function NoticeList() {
    console.log('Call InfoBox');
    const [display, setDisplay] = useState('none');

    const onClickInfo = event => {
        display === 'none' ? setDisplay('block') : setDisplay('none')
    }

    return(
        <StyledDiv className="info-box" id="box">
            <ol>
                <ul className="list-icon">
                    <li>
                        <a onClick={onClickInfo} style={{'cursor': 'pointer'}}>
                            수강신청시스템 중복로그인/매크로 제한 기능 도입 안내
                        </a>
                    </li>
                    <div id="notMacro" style={{'display': display}}>
                        <ul style={{'marginLeft': '18px'}}>
                            <li>
				                2013학년도 2학기 수강신청부터(2013학년도 여름계절수업 시범 운영) 모든 사용자에게 공정하고 원활한 수강신청 서비스를 제공하고자
                                <br/>
                                아래와 같은 제한 기능을 도입하오니 학생 여러분께서는 수강신청 시 아래 내용을 필히 숙지하여 주시기 바랍니다.
                                <br/>
                                아래 기능 도입으로 인하여 본인의 아이디와 패스워드를 타인에게 빌려주면 원치 않게 로그아웃이 될 수 있으니, 본인 계정 관리에 신중을 기하여 주시기 바랍니다.
                            </li>
                        </ul>
                        <p>&nbsp;</p>
                        <ul className="list-num">
                            <li>
                                중복로그인 방지 기능
                                <ul className="list-dot">
                                    <li>
                                    동일 아이디로 두 명 이상이 로그인하면 가장 마지막에 로그인 한 사용자만 수강신청이 가능합니다.
                                    </li>
                                </ul>
                            </li>
                            <li>
                                매크로 방지 기능
                                <ul className="list-dot">
                                    <li>
                                    수강신청저장을 일정횟수를 초과하여 시도 할 때마다 임의의 문자열 이미지를 무작위로 화면에 표시하고 문자열을 올바르게 입력 했을 경우 수강신청 저장이 가능합니다.
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                    <li>
                        공지사항입니다
                    </li>
                </ul>
            </ol>
        </StyledDiv>
    )
}