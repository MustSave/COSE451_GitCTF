import './UserPage.css';
import React, {useState} from "react";
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Loader from "./components/sugang.userpage.loader";
import Nav from "./components/sugang.userpage.nav";
import Container from './components/sugang.userpage.container';

const StyledDiv = styled.div`
    display: flex;
    align-items: stretch;
    min-height: 100%;
    &.nav-closed .nav {
        margin-left: -250px;
    }
`;

export default function UserPage(){
    console.log('Call Home');
    const {state:userInfo} = useLocation(); // get info when login
    const [showNav, setShowNav] = useState(true);
    const [page, setPage] = useState('Search');

    return (
      <>
        {/* <Loader/> */}
        <StyledDiv className={showNav ? null : "nav-closed"}>
          <Nav setPage={setPage}/>
          <Container page={page} setShowNav={setShowNav} userInfo={userInfo} />
        </StyledDiv>
      </>
    );
}