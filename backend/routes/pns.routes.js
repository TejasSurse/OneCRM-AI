const express = require("express");
const router = express.Router();

const {
  addPNS,
  updatePNS,
  deletePNS,
  getPNS,
  getAllPNS,
} = require("../controllers/pns.controller");

router.post("/addPNS", addPNS);
router.put("/updatePNS/:id", updatePNS);
router.delete("/deletePNS/:id", deletePNS);
router.get("/getPNS/:id", getPNS);
router.get("/getAllPNS", getAllPNS);

module.exports = router;
