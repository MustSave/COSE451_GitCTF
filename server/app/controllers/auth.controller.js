const db = require("../models");
const bcrypt = require("bcryptjs")

exports.signin = (req, res) => {
    const {id, pw} = req.body;
    if (id?.length !== 10 || pw?.length !== 64) {
        return res.status(404).send({message:"Invalid ID or PW"});
    }
    db.query(`SELECT pw, role from login where std_num='${id}'`, (err, results)=>{
        if (err || results.length === 0){
            return res.status(404).send({message:"Invalid ID or PW"});
        }
        // const isPasswordValid = results[0].pw == req.body.pw; // password auth TBD
        const isPasswordValid = bcrypt.compareSync(pw, results[0].pw);
        if (isPasswordValid === false)
            return res.status(404).send({message:"Invalid ID or PW"});

        db.query(`SELECT name, std_num, stdInfo.col_cd, col_nm, stdInfo.dept_cd, dept_nm, grade, min_credit, max_credit from stdInfo join dept on stdInfo.dept_cd=dept.dept_cd where stdInfo.std_num='${id}' limit 1`, (err, userInfo)=>{
            if (err || userInfo.length === 0)
                return res.status(404).send({message: err});
            userInfo[0].year = process.env.CUR_YEAR;
            userInfo[0].term = process.env.CUR_TERM;
            
            req.session.is_logined = true;
            req.session.std_num = userInfo[0].std_num;
            req.session.save(()=>{
                return res.status(200).send(userInfo[0])
            })
        })
    })
    
}

exports.logout = (req, res) => {
    if (req.session){
        req.session.destroy(err=>{
            if(err) throw err;
            res.clearCookie("sessionId", {httpOnly: true, secure: !process.env.DEV });
            return res.status(200).send()
        })
    }

    else return res.status(401).send();
}