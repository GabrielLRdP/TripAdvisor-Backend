const express = require("express");
const router = express.Router();
const formData = require("form-data");
const Mailgun = require("mailgun.js");
require("dotenv").config();

router.post("/form", async (req, res) => {
  try {
    const mailgun = new Mailgun(formData);
    const client = mailgun.client({
      username: "Gabriel Le Roy",
      key: process.env.MAILGUN_API,
    });
    console.log(req.body);
    const { firstname, lastname, email, subject, message } = req.body;

    const messageData = {
      from: `${firstname} ${lastname} <${email}>`,
      to: "gabriel.le.roy06@gmail.com",
      subject: subject,
      text: message,
    };

    const response = await client.messages.create(
      process.env.DOMAIN,
      messageData
    );

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

module.exports = router;
