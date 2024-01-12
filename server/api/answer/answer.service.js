const pool = require("../../config/database")

module.exports = {
    answerTable: (data, callback)=>{
        pool.query(`INSERT INTO answer(answer, question_id, user_id)VALUES(?, ?, ?)`,[
            data.answer,
            data.question_id,
            data.user_id
        ], (err, result)=>{
            if(err) return callback(err);
            return callback(null, result);
        })
    },

    getAnswerById: (data, callback)=>{
        pool.query(`SELECT answer, user_name FROM answer JOIN registration ON answer.user_id = registration.user_id AND answer.question_id = ? ORDER BY answer_id DESC`,[data.question_id], (err, results)=>{
            if(err) return callback(err);
            return callback(null, results)
        })
    }
}