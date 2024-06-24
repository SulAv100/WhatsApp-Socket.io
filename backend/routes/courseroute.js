const express = require('express');
const router = express.Router();
const upload = require("../multerconfig");
const courseController = require("../controllers/coursecontroller");

router.post('/course', upload.fields([{ name: 'courseImage', maxCount: 1 }, { name: 'chapterImage', maxCount: 10 }]), courseController.addCourse);

module.exports = router;
