const express = require("express");
const router = express.Router();
const { sendBulkMail } = require("../controllers/mail.controller");

router.get("/send-bulk-mail", sendBulkMail);

module.exports = router;
