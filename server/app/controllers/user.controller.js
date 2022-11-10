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
    let {std_num, cour_cd, cour_cls} = req.body;
    const {CUR_YEAR, CUR_TERM} = process.env;
    cour_cd = cour_cd.toUpperCase();
    const credit_query = `select A.credit + B.credit as credit, max_credit from (select SUM(credit) as credit from history where std_num = ? and year = ? and term = ?) as A join (select SUBSTRING_INDEX(time, "(", 1) as credit from lectures where year = ? and term =? and cour_cd = ? and cour_cls = ?) as B join ( select max_credit from stdInfo where std_num = ? ) as C`

    const credit_param = [std_num, CUR_YEAR, CUR_TERM, CUR_YEAR, CUR_TERM, cour_cd, cour_cls, std_num]
    const query = 'INSERT INTO history (std_num, cour_cd, cour_cls, year, term, credit) select ?, ?, ?, ?, ?, CAST(SUBSTRING_INDEX(time,"(",1) as UNSIGNED) from lectures where year=? and term=? and cour_cd=? and cour_cls=?';
    const param = [ std_num, cour_cd, cour_cls, CUR_YEAR, CUR_TERM, CUR_YEAR, CUR_TERM, cour_cd, cour_cls,
    ];

    q=db.query(credit_query, credit_param, (err, credit_result)=>{
        console.log(q.sql, credit_result);
        if (err || credit_result.length == 0) return res.status(400).send("bb");
        const {credit, max_credit} = credit_result[0];
        if (credit <= max_credit){
            db.query(query, param, (err, result)=>{
                if (err){
                    console.log(err)
                    return res.status(400).send("bb");
                }
        
                db.query(historyQuery, [std_num, CUR_YEAR, CUR_TERM, CUR_YEAR, CUR_TERM], (err, historyResult)=>{
                    if (err){
                        console.log(err)
                        return res.status(400).send("CC");
                    }
                    return res.status(200).send(historyResult);
                })
            })
        }
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