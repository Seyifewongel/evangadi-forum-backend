const { answerTable, getAnswerById } = require("./answer.service");

module.exports = {
    addAnswer: (req, res)=>{
        const {answer} = req.body;
        if(!answer) return res.status(400).json({
            msg: 'Answer is not provided!'
        })
        answerTable(req.body, (err, result)=>{
            if(err) return res.status(500).json({
                msg: 'database connection error!'
            })
            return res.status(200).json({
            msg: 'Answer successfully added',
            data: result
            })
        })
    },

    getAnswer: (req, res)=>{
        console.log(req.body);
        getAnswerById(req.body, (err, results)=>{
            if(err) return res.status(500).json({
                msg: 'Database connection error!'
            })
            return res.status(200).json({
                data: results
            })
        })
    },
}