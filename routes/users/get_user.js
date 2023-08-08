const express = require("express");
const router = express.Router();
const Users = require("../../models/Users");
const auth = require("../../middleware/auth")

router.get("/", auth,async (req, res) => {
  const userId = req.user.user_id;
  console.log(userId);
  try {
    const user = await Users.findById(userId);
    if (!user) {
      return res.status(401).send("Invalid email or password");
    }
    res.send({data:user});
  } catch (err) {
    console.log(err);
  }
});



module.exports = router