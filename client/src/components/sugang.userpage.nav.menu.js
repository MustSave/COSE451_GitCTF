import React, {useRef, useState, useContext} from "react";
import styled from "styled-components";
import { LangContext } from "../App";

const StyledLi = styled.li`
    position: relative;
    padding: 15px 0;
    border-bottom: 1px solid #ccc;

    >span.is-selected, .wrap-container .nav .nav-main ul.nav-menu>li>span:hover {
        color: #a20131;
        transition: all .3s;
    }
    >span {
        font-size: 15px;
        font-weight: 600;
    }
    span {
        cursor: pointer;
        transition: all .3s;
    }

    &.has-child {
        :before{
            content: "";
            display: inline-block;
            position: absolute;
            background: #000;
            transition: all .3s;
            top: 20px;
            right: 0;
            width: 10px;
            height: 2px;
        }
        :after {
            content: "";
            display: inline-block;
            position: absolute;
            background: #000;
            transition: all .3s;
            top: 16px;
            right: 4px;
            width: 2px;
            height: 10px;
        }
        &.is-opened:after {
            display: none;
        }
    
        >ul{
            display: none;
            padding-top: 5px;
    
            li {
                padding: 2px 0 2px 15px;
    
                >span {
                    position: relative;
                    font-size: 13px;
                    font-weight: 600;
                    color: #666;
                    transition: all .3s;
                    
                    :before {
                        content: "";
                        display: inline-block;
                        position: absolute;
                        top: 7px;
                        left: -13px;
                        width: 8px;
                        height: 2px;
                        background: transparent;
                        transition: all .3s;
                    }
                    &.is-selected {
                        color: #a20131;
                        :before {
                            background: #a20131;
                            transition: all .3s;
                        }
                    }
                }
            }
        }
    }
`;

export default function MenuList({setPage, title, children}) {
    console.log('Call MenuList');
    const {lang} = useContext(LangContext);
    const parentElement = useRef();

    const onClickMenu = (e) => {
        if (e.target.id) {
            setPage(e.target.id)
        }
        else if (e.target.className == 'menu-container'){
            const cls = parentElement.current.classList;
            if (cls.contains('has-child')) {
                if (cls.contains('is-opened')) {
                    cls.remove('is-opened')
                }
                else {
                    cls.add('is-opened')
                }
            }
        }
    }

    return(
        <StyledLi ref={parentElement} className={children !== undefined ? "has-child is-opened" : null}>
            <span id={title.page ? title.page : null} className='menu-container' onClick={onClickMenu} style={(!title.page && !children) ? {cursor: 'not-allowed'} : null}>
                {lang==='KOR' ? title.text[0] : title.text[1]}
            </span>
            {children !== undefined &&
            <ul style={{display:'block'}}>
                {children.text.map((child, idx)=>{
                    const tmp = Array.isArray(children.page) && children.page.length > idx;
                    return (
                        <li key={idx}>
                            <span id={tmp ? children.page[idx] : null} onClick={onClickMenu} style={tmp ? null : {cursor: 'not-allowed'}}>
                                {lang==='KOR' ? child[0] : child[1]}
                            </span>
                        </li>
                    )
                })}
            </ul>
            }
        </StyledLi>
    )
}