const db = require("../models");

exports.getColInfo = (req, res)=>{
    db.query(`SELECT col_cd, col_nm FROM dept WHERE year=? AND term=? group by col_cd, col_nm`, [req.body.year, req.body.term], (err, result)=>{
        if (err) return res.status(400).send("bb");
        if (result.length === 0) return res.status(404).send({message: "No result"});
        
        // console.log(result);
        res.status(200).send(result);
    })
}

exports.getDeptInfo = (req, res)=>{
    db.query(`SELECT dept_cd, dept_nm FROM dept WHERE year=? AND term=? AND col_cd=?`, [req.body.year, req.body.term, req.body.col_cd], (err, result)=>{
        if (err) return res.status(400).send("bb");
        if (result.length === 0) return res.status(404).send({message: "No result"})

        res.status(200).send(result);
    })
}

exports.getLecInfo = (req, res)=>{
    dataList = [req.body.year, req.body.term];
    sql_base = `SELECT * FROM lectures WHERE year=? AND term=?`;
    sql1 = ` AND col_cd=? AND dept_cd=?`;
    sql2 = ` AND cour_cd=?`;
    sql3 = ` AND cour_nm LIKE ?`;

    if (req.body.cour_cd) {
        fullSQL = sql_base + sql2;
        params = [...dataList, req.body.cour_cd];
        if (req.body.cour_cls) {
            fullSQL += ` AND cour_cls=?`;
            params.push(req.body.cour_cls);
        }
    }
    else if (req.body.cour_nm) {
        fullSQL = sql_base + sql3;
        params = [...dataList, '%'+req.body.cour_nm+'%'];
    }
    else {
        fullSQL = sql_base + sql1;
        params = [...dataList, req.body.col_cd, req.body.dept_cd];
    }
    q=db.query(fullSQL, params, (err, result, f)=>{
        if (err) return res.status(400).send("bb");
        if (result.length === 0) return res.status(404).send({message: "No result"});

        // console.log(result);
        res.status(200).send(result);
    })
}