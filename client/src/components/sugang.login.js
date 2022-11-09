import React, {useContext} from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import bgImg from "../img/login/bg-login.png";
import iconId from "../img/login/icon-id.png";
import iconPw from "../img/login/icon-pw.png";
import mainImg from "../img/login/img-login.jpg";
import logo1 from "../img/login/logo1.png";
import AuthService from "../services/auth.service"
import { LangContext } from "../App";
import sha256 from "sha256";

const StyledDiv = styled.div`
  display: grid;
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 600px;
  padding-top: 75px;
  padding-right: 8px;
  background: white;
  box-sizing: border-box;

  .intro{
    position: absolute;
    margin: 30px 434px 451px 144px;
    width: 862px;
    height: 238px;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 800;
    font-size: 85px;
    line-height: 75px;
  }
  .logo1{
    position: absolute;
    height: 350px;
    width: 350px; 
    margin-left: 906px;
    margin-top: 100px;
  }

  .login-box {
    position: absolute;
    float: right;
    width: 200px;
    height: 239px;
    margin-left: 200px;
    margin-top: 250px;
    background: #fff no-repeat center 55px;
    box-sizing: border-box;

    .wrap-lang {
      margin-bottom: 30px;
      text-align: center;
    }

    input {
      float: left;
      width: 371px;
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
      width: 350px;
      height: 50px;
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

        AuthService.login(id, sha256(pwd)).then((res)=>{
            console.log(res);
            btn.disabled=false;
            btn.style.cursor='pointer';
            navigate('/user', {state : res})
        }).catch(err=>{
            console.log(err)
            if (err.response.status === 404) {
              alert(err.response.data.message);
            }
            else {
              alert("Server is not responding")
            }
            btn.disabled=false;
            btn.style.cursor='pointer';
        })
    }

    return (
        <StyledDiv className="wrap-login">
            <div>
                <div className="intro">Welcome to Course Taking Web</div>
                <img src={logo1} className="logo1" alt="logo1"/>
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
