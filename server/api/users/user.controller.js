const {
  register,
  profile,
  getUserByEmail,
  getAllUsers,
  userById,
} = require("./user.service");
const pool = require("../../config/database");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
module.exports = {
  createUser: (req, res) => {
    const { userName, firstName, lastName, email, password } = req.body;
    console.log(req.body);
    // to validate empty fields
    if (!userName || !firstName || !lastName || !email || !password)
      return res
        .status(400)
        .json({ msg: "Not all fields have been provided!" });

    // to validate password strength
    if (password.length < 8)
      return res
        .status(400)
        .json({ msg: "password must be atleast 8 characters!" });

    // to check if the email was used before if not it will create account
    pool.query(
      `SELECT * FROM registration WHERE user_email = ?`,
      [email],
      (err, results) => {
        if (err) {
          return res.status(500).json({ msg: "Database connection error" });
        }
        if (results.length > 0) {
          return res
            .status(400)
            .json({ msg: "An account with this email already exists!" });
        } else {
          // password encrption
          const salt = bcrypt.genSaltSync();
          req.body.password = bcrypt.hashSync(password, salt);

          register(req.body, (err, results) => {
            if (err) {
              console.log(err);
              return res.status(500).json({ msg: "Database connection error" });
            }
            console.log(results);

            //adding USer_Id to re.body
            req.body.userId = results.insertId;

            //sending data to profile with the the user-Id included in req.body
            profile(req.body, (err, results) => {
              if (err) {
                console.log(err);
                return res
                  .status(500)
                  .json({ msg: "Database connection error" });
              }
              return res.status(200).json({
                msg: "New user added successfully",
                data: results,
              });
            });
          });
        }
      }
    );
  },
  getUsers: (req, res) => {
    getAllUsers((err, results) => {
      if (err) {
        return res.status(500).json({ msg: "Database connection error" });
      }
      return res.status(200).json({
        Number_Of_Users: results.length,
      });
    });
  },
  getUserById: (req, res) => {
    userById(req.id, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ msg: "database connection err" });
      }
      if (!results) {
        return res.status(404).json({ msg: "Record not found" });
      }
      return res.status(200).json({ data: results });
    });
  },
  login: (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);
    if (!email || !password)
      return res.status(400).json({ msg: "Not all fields have been provided" });

    getUserByEmail(email, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ msg: "Database connection error" });
      }
      if (!results) {
        return res
          .status(404)
          .json({ msg: "No account with this email has been registered" });
      }
      const isMatch = bcrypt.compareSync(password, results.user_password);
      if (!isMatch) return res.status(404).json({ msg: "Invalid Credentials" });
      const token = jwt.sign({ id: results.user_id }, process.env.JWT_SECRET, {
        expiresIn: "1hr",
      });
      return res.json({
        token,
        user: {
          id: results.user_id,
          display_name: results.user_name,
        },
      });
    });
  },
};
