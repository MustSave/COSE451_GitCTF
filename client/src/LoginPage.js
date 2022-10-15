import styled from 'styled-components';
import headerImg from "./img/login/logo.png";
import Login from './components/sugang.login';
import Content from './components/sugang.content';
import React from 'react';

const StyledDiv = styled.div`
margin: 0;
width: 100%;
height: 94px;
background-color: #760023;

>div{
  position: relative;
  width: 1200px;
  height: 100%;
  margin: 0 auto;
  background: url(${headerImg}) no-repeat 0 50%;
}
`;

export default function LoginPage() {
console.log('Call App');
return (
    <div className='login'>
      <StyledDiv className='header'>
          <div title='고려대학교 수강신청시스템'></div>
      </StyledDiv>
      <Login/>
      <Content/>
    </div>
)
}