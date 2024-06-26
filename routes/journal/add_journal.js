const express = require("express");
const router = express.Router();
const Journal = require("../../models/Journal");
const auth = require("../../middleware/auth");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: "./images/journal",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({
  storage: storage,
});

router.post("/", auth, upload.array("images"), async (req, res) => {
  const {title ,detail ,type} = req.body;
  console.log(type);
  const images = req.files.map((file) => file.filename); // Extract filenames from req.files array
  try {
    const data = await Journal.create({
      title: title,
      detail: detail,
      type : type.map((type)=> type),
      image: images.map((url) => ({ url })),
    });

    if (!data) {
      return res.status(401).send({ data: "error add journal" });
    }

    res.status(201).send({ data: "add journal success" });
  } catch (err) {
    console.log(err);
    res.status(500).send("error");
  }
});

module.exports = router;
