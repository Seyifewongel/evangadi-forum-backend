const pool = require("../../config/database");
const {
  questionTable,
  allQuestions,
  selectQuestion,
} = require("./question.service");

module.exports = {
  createQuestion: (req, res) => {
    const { question } = req.body;
    if (!question)
      return res.status(400).json({
        msg: "The question field isnot provided",
      });
    questionTable(req.body, (err, result) => {
      if (err) {
        // console.log(err);
        return res.status(500).json({ msg: "Database connection error" });
      }
      return res.status(200).json({
        msg: "Question added successfully",
        data: result,
      });
    });
  },
  getAllquestions: (req, res) => {
    allQuestions((err, result) => {
      if (err)
        return res.status(500).json({
          msg: "database connection error",
        });
      return res.status(200).json({
        questions: result,
      });
    });
  },

  getQuestion: (req, res) => {
    console.log(req.body);
    selectQuestion(req.body, (err, result) => {
      if (err)
        return res.status(500).json({
          msg: "database connection error!",
        });
      return res.status(200).json({
        data: result,
      });
    });
  },
};
