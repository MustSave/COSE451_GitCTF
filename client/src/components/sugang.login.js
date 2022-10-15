import React, {useContext} from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import bgImg from "../img/login/bg-login.png";
import iconId from "../img/login/icon-id.png";
import iconPw from "../img/login/icon-pw.png";
import mainImg from "../img/login/img-login.jpg";
import AuthService from "../services/auth.service"
import { LangContext } from "../App";

const StyledDiv = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 530px;
  padding-top: 75px;
  border-bottom: 1px solid #d9d9d9;
  background: url(${mainImg}) no-repeat center 0;
  box-sizing: border-box;

  > div {
    position: relative;
    width: 1200px;
    margin: 0 auto;
  }

  .login-box {
    position: relative;
    float: right;
    width: 400px;
    height: 360px;
    padding: 145px 55px 0;
    background: #fff url(${bgImg}) no-repeat center 55px;
    box-sizing: border-box;

    .wrap-lang {
      margin-bottom: 30px;
      text-align: center;
    }

    input {
      float: left;
      width: 195px;
      height: 40px;
      line-height: 40px;
      margin-bottom: 10px;
      padding-left: 36px;
    }
    .input-id {
      background: url(${iconId}) no-repeat 10px center;
    }
    .input-pw {
      background: url(${iconPw}) no-repeat 11px center;
    }

    .btn-login {
      width: 85px;
      height: 90px;
      margin-left: 10px;
      background-color: #a20131;
      border-radius: 6px;
      border: 0;
      font-size: 17px;
      font-weight: bold;
      color: #fff;
      text-align: center;

      small {
        display: inline-block;
        float: left;
        width: 100%;
        margin-top: -2px;
        font-size: 13px;
        font-weight: normal;
        color: rgba(255, 255, 255, 0.5);
        margin-left: 2px;
        letter-spacing: 0;
      }
    }
  }
`;

export default function Login() {
  console.log('Call Login');
  const { lang, changeLangTo } = useContext( LangContext )
    const navigate = useNavigate();

    const handleLogin = event => {
        event.preventDefault();
        const {target:{"id":{value:id}, pwd:{value:pwd}, "btn-login":btn}} = event;

        if (!id){
            alert(lang === 'KOR' ? "ID를 입력해주세요" : "Enter your ID"); return;
        }
        if (!pwd) {
            alert(lang === 'KOR' ? "비밀번호를 입력해주세요" : "Enter yout PW"); return;
        }

        btn.disabled=true;
        btn.style.cursor='wait';

        AuthService.login(id, pwd).then((res)=>{
            console.log(res);
            btn.disabled=false;
            btn.style.cursor='pointer';
            navigate('/user', {state : res})
        }).catch(err=>{
            console.log(err)
            alert(lang === 'KOR' ? "아이디나 비밀번호 오류입니다" : "Invalid ID or PW");
            btn.disabled=false;
            btn.style.cursor='pointer';
        })
    }

    return (
        <StyledDiv className="wrap-login">
            <div>
                <div className="login-box">
                    <form name="loginForm" id="loginForm" autoComplete="off"  onSubmit={handleLogin}>
                        <div className="wrap-lang">
                            <input type="radio" name="lang" value="KOR" id="kor" onChange={()=>changeLangTo('KOR')} checked={lang==="KOR"}/>
                            <label htmlFor="kor">KOREAN</label>
                            <input type="radio" name="lang" value="ENG" id="eng" onChange={()=>changeLangTo('ENG')} checked={lang==='ENG'}/>
                            <label htmlFor="eng">ENGLISH</label>
                        </div>

                        <input type="text" id="id" name="id" className="input-id" placeholder="학번 ( Student ID )"/>
                        <input type="password" id="pwd" name="pwd" className="input-pw" placeholder="비밀번호 ( Password )"/>
                        <button type="submit" id="btn-login" className="btn-login">
                            로그인<small>Login</small>
                        </button>
                    </form>
                </div>
            </div>
        </StyledDiv>
    );
}
