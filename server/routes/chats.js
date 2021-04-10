const express = require("express");
const axios = require("axios");
const router = express.Router();

router.get("/", async (req, res) => {
  axios
    .get("http://45.79.111.106/interview.json")
    .then((d) => res.json({ success: true, data: d.data }))
    .catch((e) => {
      res.json({ success: false });
    });
});

module.exports = router;
