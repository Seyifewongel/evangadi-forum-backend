const pool = require('../../config/database')
module.exports ={
    questionTable: (data, callback)=>{
pool.query(`INSERT INTO question(question, question_description, user_id, post_id) VALUES(?,?,?,?)`,
[
    data.question,
    data.question_description,
    data.user_id,
    data.post_id,
],
(err, result)=>{
    if(err) return callback(err);
    return callback(null, result);
})
    },
    allQuestions: (callback)=>{
        pool.query(`SELECT  question, question_description, question_id, post_id, user_name FROM question JOIN registration ON question.user_id = registration.user_id ORDER BY question_id DESC`,[], (err, results)=>{
            if(err) return callback(err);
            return callback(null, results);
        });
    },
    selectQuestion: (data, callback)=>{
        pool.query(`SELECT * FROM question WHERE post_id = ?`,[data.post_id],
        (err, result)=>{
            if(err) return callback(err);
            return callback(null, result[0]);
        })
    }
}