import React, {useEffect, useRef, useState} from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import userService from "../services/user.service";

const StyledDiv = styled.div`
    padding: 25px 30px;
    min-width: 1030px;

    .enroll_cd {
        display: flex;
	margin-left: 20px;

        input {
            width: 200px;
            margin-right: 5px;
	    margin-left: 10px;
        }
        button {
            margin-left: 20px;
		
        }
    }

    .Section{
	margin-left: 30px;
	
}
    .box1{
	top: 149px;
	left: 389px;
	width: 927px;
	height: 160px;
	padding: 10px 20px;
	//box-shadow: 5px 5px 20px 5px rgba(0,0,0,0.1);
	//background-color: #F3F3F3;
	//border-radius: 10px 10px 10px 10px;
	border: 0.5px solid #B1B1B1;
	font-size: 20px;
	font-weight: 700;
	color: #7C001A;
	margin-bottom: 30px;
    }

     .box2{
	top: 149px;
	left: 389px;
	width: 927px;
	height: 500px;
	padding: 10px 20px;
	//box-shadow: 5px 5px 20px 5px rgba(0,0,0,0.1);
	//background-color: #F3F3F3;
	//border-radius: 10px 10px 10px 10px;
	border: 0.5px solid #B1B1B1;
	font-size: 20px;
	font-weight: 700;
	color: #7C001A;
    }

    .input{
	width: 200px;
	padding-left: 5px;
	padding-right: 0px;
}
    .title{
	margin-top: 20px;
	margin-left: 20px;
	margin-bottom: 20px;	
}

    .course-result{
	margin-left: 20px;
	span{
		padding-left: 0px;
		padding-right: 10px;
		padding-up: 0px;
		padding-bottom: 10px;
		text-align: center;
	}
}
 
`;

export default function Enroll({userInfo}) {
    // console.log("Called Enroll")
    const [history, setHistory] = useState();
    const enrollParam = useRef({
        std_num: userInfo.std_num,
        cour_cd: undefined,
        cour_cls: undefined,
    })
    
    const navigate = useNavigate();
    const handleError = err => {
        if (err.response.status === 403) {
            alert(err.response.data.message);
            navigate('/');
        }
    }
    
    useEffect(()=>{
        // console.log("UE");
        userService.getHistory({std_num: userInfo.std_num, year: userInfo.year, term: userInfo.term})
            .then(res=>setHistory(res))
            .catch(handleError)
    }, [])

    const onEnroll = (param)=>{
        // client side basic validation
        if (!enrollParam.current.cour_cd || !enrollParam.current.cour_cls) {
            alert("check input");
            return;
        }

        userService.enroll(enrollParam.current)
            .then(res=>setHistory(res))
            .catch(handleError)
    }

    const onCancel = (e)=>{
        if (!window.confirm("Delete the course?")) return;
        const children = e.target.parentElement.children;
        userService.cancel({std_num: userInfo.std_num, cour_cd: children['cour_cd'].innerText, cour_cls: children['cour_cls'].innerText})
            .then(res=>setHistory(res))
            .catch(handleError)
    }

    return(
        <StyledDiv>
		<div className="box1">
		       <span className="title" name="Course Registration">Course Registration</span>

		<div className="enroll_cd">
 			<span name="Course Code">Course Code</span>

		        <input className = 'input' type={"text"} onChange={(e)=>enrollParam.current.cour_cd=e.target.value}></input>

			<span className="Section" name="Section">Section</span>	

		        <input className='input' type={"text"} onChange={(e)=>enrollParam.current.cour_cls=e.target.value}></input>

		        <button onClick={onEnroll}>enroll</button>
			
		 </div>
		

		</div>


		<div className="box2"c>
		<span className="title" name="Result">Course Registration Result</span>

{history && history.map((a)=>{
                return (
			

		        <div className="course-result">			    
		            <span className="cd" name="cour_cd">{a.cour_cd}</span>
		            <span className="cls" name="cour_cls">{a.cour_cls}</span>
		            <span className="nm" name="cour_nm">{a.cour_nm}</span>
 			    <button onClick={onCancel}>cancel</button>
		        </div>
		
		        )})
		    }

			
            </div>

		    
        </StyledDiv>
    )
}
