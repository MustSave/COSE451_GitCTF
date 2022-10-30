const db = require("../models");
const historyQuery = `select B.cour_cd, B.cour_cls, B.cour_nm, B.time, B.time_room from (select cour_cd, cour_cls from history where std_num=? and year=? and term=?) as A join (select * from lectures where year=? and term=?) as B on A.cour_cd=B.cour_cd and A.cour_cls=B.cour_cls;`

function auth(req) {
    if (!req.session || !req.session.is_logined || req.session.std_num !== req.body.std_num)
        return false;
    return true;
}

exports.getHistory = (req, res) => {
    if (auth(req) === false)
        return res.status(400).send("bb");

    const param = [req.body.std_num, req.body.year, req.body.term, req.body.year, req.body.term]

    q = db.query(historyQuery, param, (err, result)=>{
        if (err)
            return res.status(400).send("bb");
        
        res.status(200).send(result);
    })
};

exports.enroll = (req, res) => {
    if (auth(req) === false)
        return res.status(400).send("bb");
    const query = 'INSERT INTO history SET ?';
    const param = {
        std_num: req.body.std_num,
        cour_cd: req.body.cour_cd.toUpperCase(),
        cour_cls: req.body.cour_cls,
        year: process.env.CUR_YEAR,
        term: process.env.CUR_TERM,
    };
    q = db.query(query, param, (err, result)=>{
        if (err){
            console.log(err)
            return res.status(400).send("bb");
        }

        db.query(historyQuery, [param.std_num, param.year, param.term, param.year, param.term], (err, historyResult)=>{
            if (err){
                console.log(err)
                return res.status(400).send("CC");
            }
            return res.status(200).send(historyResult);
        })
    })
}

exports.cancel = (req, res)=>{
    if (auth(req) === false)
        return res.status(400).send("bb");
    const query = `DELETE FROM history WHERE std_num=? AND year=? AND term=? AND cour_cd=? AND cour_cls=?`
    const param=[req.body.std_num, process.env.CUR_YEAR, process.env.CUR_TERM, req.body.cour_cd.toUpperCase(), req.body.cour_cls]

    q = db.query(query, param, (err, result)=>{
        if (err)
        {
            console.log(err)
            return res.status(400).send("bb");
        }
        
        db.query(historyQuery, [req.body.std_num, process.env.CUR_YEAR, process.env.CUR_TERM, process.env.CUR_YEAR, process.env.CUR_TERM,], (err, historyResult)=>{
            if (err){
                console.log(err)
                return res.status(400).send("CC");
            }

            return res.status(200).send(historyResult);
        })
    })
}