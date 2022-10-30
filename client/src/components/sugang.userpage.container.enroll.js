import React, {useEffect, useRef, useState} from "react";
import styled from "styled-components";
import userService from "../services/user.service";

const StyledDiv = styled.div`
    padding: 25px 30px;
    min-width: 1030px;

    .enroll_cd {
        display: flex

        input {
            width: 20px;
            margin-right: 5px;
        }
        button {
            margin-left: 20px;
        }
    }
`;

export default function Enroll({userInfo}) {
    console.log("Called Enroll")
    const [history, setHistory] = useState();
    const enrollParam = useRef({
        std_num: userInfo.std_num,
        cour_cd: undefined,
        cour_cls: undefined,
    })
    
    useEffect(()=>{
        console.log("UE");
        userService.getHistory({std_num: userInfo.std_num, year: userInfo.year, term: userInfo.term})
        .then(res=>{
            console.log(res)
            setHistory(res);
        })
    }, [])

    const onEnroll = (param)=>{
        console.log(enrollParam.current)
        if (!enrollParam.current.cour_cd || !enrollParam.current.cour_cls) {
            alert("check input");
            return;
        }

        userService.enroll(enrollParam.current)
        .then(res=>{
            setHistory(res);
        })
    }

    const onCancel = (e)=>{
        if (!window.confirm("삭제하시겠습니까?")) return;
        const children = e.target.parentElement.children;
        userService.cancel({std_num: userInfo.std_num, cour_cd: children['cour_cd'].innerText, cour_cls: children['cour_cls'].innerText})
        .then(res=>{
            setHistory(res);
        })
    }

    return(
        <StyledDiv>
            {history && history.map((a)=>{
                return (
                <div>
                    <span name="cour_cd">{a.cour_cd}</span>
                    <span name="cour_cls">{a.cour_cls}</span>
                    <span name="cour_nm">{a.cour_nm}</span>
                    <button onClick={onCancel}>cancel</button>
                </div>
                )})
            }
            <div className="enroll_cd">
                <input type={"text"} onChange={(e)=>enrollParam.current.cour_cd=e.target.value}></input>
                <input type={"text"} onChange={(e)=>enrollParam.current.cour_cls=e.target.value}></input>
                <button onClick={onEnroll}>enroll</button>
            </div>
        </StyledDiv>
    )
}