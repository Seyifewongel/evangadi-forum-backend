const nodemailer = require("nodemailer");
const crypto = require("crypto");

// Dummy user data (replace this with your actual user database)
const users = {
  "danielkibire07@gmail.com": {
    id: 1,
    password: "hashed_password", // Hashed password
    resetToken: null,
    resetTokenExpiry: null,
  },
};

// Create a Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "abebech@gmail.com", // Your Gmail email address
    pass: "abebech@gmail.com", // Your Gmail email password
  },
});

// Controller method to initiate the forgot password process
function forgotPassword(req, res) {
  const { email } = req.body;

  // Generate a random reset token
  const resetToken = crypto.randomBytes(20).toString("hex");
  const resetTokenExpiry = Date.now() + 3600000; // Token expires in 1 hour

  // Store the token and its expiry in the user's data
  users[email].resetToken = resetToken;
  users[email].resetTokenExpiry = resetTokenExpiry;

  // Send a password reset email with the token link
  const resetLink = `http://yourapp.com/reset-password?token=${resetToken}`;
  sendResetEmail(email, resetLink);

  res.send("Password reset email sent");
}

// Controller method to handle password reset
function resetPassword(req, res) {
  const { email, token, newPassword } = req.body;

  // Check if the token is valid and has not expired
  if (
    users[email].resetToken === token &&
    users[email].resetTokenExpiry > Date.now()
  ) {
    // Update the user's password
    users[email].password = newPassword;

    // Reset the token and its expiry
    users[email].resetToken = null;
    users[email].resetTokenExpiry = null;

    res.send("Password reset successfully");
  } else {
    res.status(400).send("Invalid or expired token");
  }
}

// Function to send reset password email using Nodemailer
function sendResetEmail(email, resetLink) {
  const mailOptions = {
    from: "abebech@gmail.com", // Your Gmail email address
    to: email,
    subject: "Password Reset",
    html: `Click the following link to reset your password: <a href="${resetLink}">${resetLink}</a>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

module.exports = {
  forgotPassword,
  resetPassword,
};
