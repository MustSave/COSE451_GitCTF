import React, {useState, useEffect, useRef} from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import apiService from "../services/api-service";
import checkIcon from "../img/contents/icon-check.png"
const StyledDiv = styled.div`
padding: 25px 30px;
min-width: 1030px;
.form-search {
    margin-bottom: 15px;
    padding: 12px;
    border: 1px solid #e6e6e6;

    table {
        td {
            padding: 3px 0 3px 6px;
            .cols {
                align-items: center;
                display: flex;
                flex-wrap: wrap;
                width: 100%;
            
                select
                {
                    :not(.col-fix) {
                        padding-right: 5px;
                    }
                    :focus {
                        outline: 0 none;
                    }
                    option {
                        padding-left: 5px;
                    }
                }
                >*:first-child {
                    margin-left: 0 !important;
                }
                * {
                flex: 1 0 0px;
                min-width: 0;
                max-width: 100%;
                width: auto;
                margin-left: 10px !important;
                }
            }
            &.search {
                padding-left: 15px;
                button {
                    cursor: pointer;
                }
            }
        }

        th {
            padding: 0;
            font-size: 12px;
            line-height: 1.2;
            word-spacing: -1px;
            text-align: right;
        }
    }
}

.info-box {
    position: relative;
    padding: 25px;
    border: 1px solid #dedede;
    background: #fff;
    box-sizing: border-box;

    .highlight {
        color: #bf0039;
    }

    .list-dot li {
        position: relative;
        padding: 3px 0 3px 10px;
        font-size: 13px;
        line-height: 18px;

        :before {
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

        .txt-red {
            color: #f23d18 !important;
        }
        .txt-blue {
            color: #0085ca !important;
        }
    }
}

.dataTables_wrapper {
    position: relative;
    width: 100%;
    border-top: 1px solid #404040;
    clear: both;
    zoom: 1;

    :after {
        visibility: hidden;
        display: block;
        content: "";
        clear: both;
        height: 0;
    }
    .dataTables_scroll {
        clear: both;
        background: #f2eee8;

        .dataTables_scrollHead {
            overflow: hidden;
            position: relative;
            border: 0px;
            width: 100%;

            .dataTables_scrollHeadInner {
                box-sizing: content-box;
                padding-right: 0px;
                width: 100% !important;
                width:calc(100%+17px);
                max-height: 50vh;
                overflow: auto;
                table {
                    margin-left: 0px;
                    border-bottom: none;
                    width: 100% !important;
                    box-sizing: content-box;
                    margin: 0 auto;
                    clear: both;
                    border-collapse: separate;
                    border-spacing: 0;
                    table-layout: fixed;

                    thead {
                        background: #f2eee8;

                        th {
                            height: 34px;
                            padding: 0 5px 0;
                            line-height: 1.1;
                            border-bottom: 1px solid #ccc;
                            border-right: 1px solid #ccc;
                            font-size: 12px;
                            font-weight: bold;
                            box-sizing: content-box;
                        }
                    }

                    tbody {
                        tr {
                            background-color: #fff;
                            &.even {
                                background-color: #fafafa;
                            }
                            :hover {
                                background-color: #f6f6f6;
                            }
                            td {
                                vertical-align: middle;
                                border-bottom: 1px solid #ddd;
                                border-right: 1px solid rgba(0,0,0,0.1);
                                font-size: 12px;
                                height: 21px;
                                padding: 4px 6px;
                                line-height: 1.2;
                                box-sizing: content-box;

                                &.dt-body-center {
                                    text-align: center;
                                }

                                i.sw-icon-check {
                                    background-image: url(${checkIcon});
                                    display: inline-block;
                                    width: 16px;
                                    height: 16px;
                                    background-repeat: no-repeat;
                                    background-position: center center;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
`;

function checkExist(listA, objB, key) {
    for (let tmp of listA) {
        if (tmp[key] === objB[key]) {
            return true;
        }
    }
    return false;
}

function validateYear(e, curYear) {
    const len = e.target.value.length;
    if (len !== 4) {
        if (len > 4) {
            alert("유효하지 않은 기한입니다.");
            e.target.value = e.target.value.slice(0,-1);
        }
        return false;
    }
    else if (Number(e.target.value) > Number(curYear)) {
        alert("유효하지 않은 기한입니다.");
        e.target.value = curYear;
        return false;
    }

    return true;
}

export default function SearchLecture({userInfo}) {
    // console.log("Called Search")
    const [lecList, setLecList] = useState();
    const [trigger, setTrigger] = useState();

    const [optionList, setOptionList] = useState({
        col: undefined,
        dept: undefined
    });
    const [inputObjects, setInputObjects] = useState({
        year : userInfo.year,
        term : userInfo.term,
        col_cd : userInfo.col_cd,
        dept_cd : userInfo.dept_cd
    });
    const optionalInput = useRef({
        cour_cd: undefined,
        cour_cls: undefined,
        cour_nm: undefined
    })

    const navigate = useNavigate();
    const handleError = err => {
        if (err.response.status === 403) {
            alert(err.response.data.message);
            navigate('/');
        }
    }

    const updateInputValue = (toChange) => {
        setInputObjects(prev=>{
            return {...prev, ...toChange}
        })
    }

    const handleOptional = (e) => {
        optionalInput.current[e.target.name] = e.target.value;
        if (e.target.name === "cour_cd") {
            const cls = document.getElementById("cour_cls")
            if (e.target.value.length === 0) {
                cls.disabled = true;
                cls.value='';
                optionalInput.current.cour_cls = '';
            }
            else cls.disabled = false;
        }
    }

    const handleInput = async (e) => {
        const name = e.target.name;
        let updateValue = {};
        updateValue[name] = e.target.value;
        switch(name) {
            case 'year':
                if (validateYear(e, userInfo.year) === false)
                    return;
            case 'term':
                setTrigger(prev=>!prev)
                break;
            case 'col_cd':
                await onChangeCol(e, updateValue);
                break;
        }
        updateInputValue(updateValue)
    }

    useEffect(()=>{
        apiService.getColList(inputObjects.year, inputObjects.term)
        .then(resCol=>{
            const isColExist = checkExist(resCol, inputObjects, 'col_cd')

            apiService.getDeptList(inputObjects.year, inputObjects.term, isColExist ? inputObjects.col_cd : resCol[0].col_cd)
            .then(resDept=>{
                if (isColExist) {
                    const isDeptExist = checkExist(resDept, inputObjects, 'dept_cd')
                    if (!isDeptExist) updateInputValue({dept_cd: resDept[0].dept_cd})
                }
                else updateInputValue({col_cd: resCol[0].col_cd, dept_cd: resDept[0].dept_cd})

                setOptionList({col: resCol, dept: resDept})
            })
            .catch(handleError)
        })
        .catch(handleError)
    },[trigger]);

    const onChangeCol = async (e, u=undefined)=>{
        await apiService.getDeptList(inputObjects.year, inputObjects.term, e.target.value)
        .then(resDept=>{
            if (u) {
                u.dept_cd = resDept[0].dept_cd;
            }
            setOptionList(prev=>{return {...prev, dept: resDept}})
        })
        .catch(handleError)
    }

    const onClickSearch = (e)=>{
        apiService.getLecList({...inputObjects, ...optionalInput.current})
        .then(res=>{setLecList(res)})
        .catch(handleError)
    }

    return (
        <StyledDiv id='contents' className="contents">
            <div className="form-search">
                <form name="sForm" id="sForm" onSubmit={onClickSearch}>
                    <table>
                        <colgroup>
                            <col width={"60px"}/>
                            <col width={"80px"}/>
                            <col width={"80px"}/>
                            <col width={"80px"}/>
                            <col width={"80px"}/>
                            <col width={"220px"}/>
                            <col width={"80px"}/>
                            <col width={"120px"}/>
                            <col/>
                        </colgroup>
                        <tbody>
                            <tr>
                                <td colSpan={"2"}>
                                    <div className="cols">
                                        <input type="number" name="year" id="year"  defaultValue={userInfo.year} max={9999} onChange={handleInput} style={{imeMode:'disabled'}}/>
                                        <select name="term" id="term" onChange={handleInput} defaultValue={userInfo.term}>
                                            <option value={"1R"}>1학기</option>
                                            <option value={"2R"}>2학기</option>
                                        </select>
                                    </div>
                                </td>
                                <th>캠퍼스</th>
                                <td>
                                    <select name="pCampus" id="pCampus" defaultValue="1">
                                        <option value="1">서울</option>
                                    </select>
                                </td>
                                <th>대학구분</th>
                                <td>
                                    <select name="pGradCd" id="pGradCd" defaultValue="0136">
                                        <option value="0136">대학</option>
                                    </select>
                                </td>
                                <th className="isu">이수구분</th>
                                <td className="isu" colSpan={"2"}>
                                    <div className="cols">
                                        <select name="pCourDiv" id="pCourDiv" defaultValue="00">
                                            <option value="00">전공</option>
                                        </select>
                                        <select name="col_cd" id="col_cd" value={inputObjects.col_cd} onChange={handleInput}>
                                            {optionList.col && optionList.col.map((value)=>
                                            <option key={value.col_cd} value={value.col_cd}>{value.col_nm}</option>)}
                                        </select>
                                        <select name="dept_cd" id="dept_cd" value={inputObjects.dept_cd} onChange={handleInput}>
                                            {optionList.dept && optionList.dept.map((value)=>
                                            <option key={value.dept_cd} value={value.dept_cd}>{value.dept_nm}</option>)}
                                        </select>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th>학수번호</th>
                                <td><input style={{imeMode:'disabled'}} type="text" id="cour_cd" name="cour_cd" maxLength="7" onChange={handleOptional}/></td>
                                <th>분반</th>
                                <td><input style={{imeMode:'disabled'}} type="text" id="cour_cls" name="cour_cls" maxLength="2" onChange={handleOptional} disabled/></td>
                                <th>교과목명</th>
                                <td colSpan="3"><input type="text" name="cour_nm" id="cour_nm" onChange={handleOptional}/></td>
                                <td className="search">
                                    <button type="button" id="btnSearch" className="btn-sub" onClick={onClickSearch}>조회</button>
                                    <button type="button" id="btnReset" onClick={()=>console.log("To do")}>초기화</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </div>
            <div className="info-box" style={{padding:"5px 25px"}}>
                <div id="legendKOR" className="highlight">
                    <ul className="list-dot">
                        <li><span className="txt-red">학수번호, 교과목명, 대학원  </span> 검색시<span className="txt-blue"> 이수구분 조건은 무시</span>됩니다.</li>
                        <li>
	                        <span className="txt-red">M</span>: MOOC&nbsp;&nbsp;&nbsp; 
                            <span className="txt-red">FC</span>: Flipped className&nbsp;&nbsp;&nbsp;
                            <span className="txt-red">T</span>: Tutorial&nbsp;&nbsp;&nbsp;
                            <span className="txt-red">NM</span>: NeMo className&nbsp;&nbsp;&nbsp;
                            <span className="txt-red">SC</span>: Signature className(영강100선)&nbsp;&nbsp;&nbsp;<span className="txt-blue">☜ 과목명에 뒤에 아이콘으로 표기됩니다.</span>
                        </li>
                        <li>학수번호 클릭시 강의계획안 조회가 가능합니다.</li>
                        <li>강의계획안 학생의견 작성 안내 : 포털 로그인-&gt;수업-&gt;수강안내-&gt;학부 전공과목/교양교직과목 내에서 해당 과목 학수번호 클릭 후 강의계획서 조회하여 조회되는 강의계획서 하단에 의견 작성 가능</li>
                    </ul>
                </div>
            </div>
            <div id="gridLecture_wrapper" className="dataTables_wrapper no-footer">
                <div className="dataTables_scroll">
                    <div className="dataTables_scrollHead">
                        <div className="dataTables_scrollHeadInner">
                            <table className="display stripe dataTable no-footer">
                                <thead>
                                    <tr role="row">
                                        <th colSpan="1" rowSpan="1" className="sorting_disabled dt-body-center" style={{width: "5.5%", minWidth: "43px"}}>캠퍼스</th>
                                        <th colSpan="1" rowSpan="1" className="sorting_disabled dt-body-center" style={{width: "6.96%", minWidth: "56px"}}>학수번호</th>
                                        <th colSpan="1" rowSpan="1" className="sorting_disabled dt-body-center" style={{width: "4%", minWidth: "30px"}}>분반</th>
                                        <th colSpan="1" rowSpan="1" className="sorting_disabled dt-body-center" style={{width: "6.96%", minWidth: "56px"}}>이수구분</th>
                                        <th colSpan="1" rowSpan="1" className="sorting_disabled dt-body-center" style={{width: "8.46%", minWidth: "70px"}}>개설학과</th>
                                        <th colSpan="1" rowSpan="1" className="sorting_disabled" style={{width: "15.8%", minWidth: "136px"}}>교과목명</th>
                                        <th colSpan="1" rowSpan="1" className="sorting_disabled dt-body-center" style={{width: "8.46%", minWidth: "70px"}}>담당교수</th>
                                        <th colSpan="1" rowSpan="1" className="sorting_disabled dt-body-center" style={{width: "4%", minWidth: "30px"}}>학점<br/>(시간)</th>
                                        <th colSpan="1" rowSpan="1" className="sorting_disabled" style={{width: "12.85%", minWidth: "109px"}}>강의시간/강의실</th>
                                        <th colSpan="1" rowSpan="1" className="sorting_disabled dt-body-center" style={{width: "4%", minWidth: "30px"}}>상대<br/>평가</th>
                                        <th colSpan="1" rowSpan="1" className="sorting_disabled dt-body-center" style={{width: "4%", minWidth: "30px"}}>인원<br/>제한</th>
                                        <th colSpan="1" rowSpan="1" className="sorting_disabled dt-body-center" style={{width: "4%", minWidth: "30px"}}>교환<br/>학생</th>
                                        <th colSpan="1" rowSpan="1" className="sorting_disabled dt-body-center" style={{width: "5.5%", minWidth: "43px"}}>출석확인 <br/>자율화</th>
                                        <th colSpan="1" rowSpan="1" className="sorting_disabled dt-body-center" style={{width: "5.5%", minWidth: "43px"}}>무감독<br/>시험</th>
                                        <th colSpan="1" rowSpan="1" className="sorting_disabled dt-body-center" style={{width: "4%", minWidth: "30px"}}>유연<br/>학기</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {lecList && lecList.map((lecture, idx)=>{
                                        return(
                                            <tr key={lecture.params} role="row" className={idx%2 === 0 ? "odd" : "even"}>
                                                <td className="dt-body-center">{lecture.campus}</td>
                                                <td className="dt-body-center">{lecture.cour_cd}</td>
                                                <td className="dt-body-center">{lecture.cour_cls}</td>
                                                <td className="dt-body-center">{lecture.isu_nm}</td>
                                                <td className="dt-body-center">{lecture.department}</td>
                                                <td><span>{lecture.cour_nm}</span></td>
                                                <td className="dt-body-center">{lecture.prof_nm}</td>
                                                <td className="dt-body-center">{lecture.time}</td>
                                                <td>
                                                    {lecture.time_room.split("<br>\n").map((room, idx)=>{
                                                        return (
                                                            <>
                                                                {idx!==0 && <br/>}
                                                                {room}
                                                            </>
                                                        )
                                                    })}
                                                </td>
                                                <td className="dt-body-center">
                                                    {lecture.absolute_yn==='Y' && <i className="sw-icon-check"/>}
                                                </td>
                                                <td className="dt-body-center">
                                                    {lecture.lmt_yn==='Y' && <i className="sw-icon-check"/>}
                                                </td>
                                                <td className="dt-body-center">
                                                    {lecture.exch_cor_yn==='N' && <i className="sw-icon-check"/>}
                                                </td>
                                                <td className="dt-body-center">
                                                    {lecture.attend_free_yn==='Y' && <i className="sw-icon-check"/>}
                                                </td>
                                                <td className="dt-body-center">
                                                    {lecture.no_supervisor_yn==='Y' && <i className="sw-icon-check"/>}
                                                </td>
                                                <td className="dt-body-center">
                                                    {lecture.flexible_school_yn==='Y' && <i className="sw-icon-check"/>}
                                                </td>
                                            </tr>
                                        )
                                    })}
                                    
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </StyledDiv>
    )
}
