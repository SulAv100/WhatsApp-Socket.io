const courseModel = require("../models/coursemodel");

const addCourse = async (req, res) => {
  try {
    const { courseName, courseDescription, chapters } = req.body;
    console.log("req.files:", req.files); // Debug log
    console.log("req.body:", req.body);   // Debug log

    if (!req.files || !req.files['courseImage'] || !req.files['chapterImage']) {
      return res.status(400).json({ message: 'Missing required files' });
    }

    const courseImage = req.files['courseImage'][0].filename;

    // Parse chapters from the request body
    const parsedChapters = JSON.parse(chapters).map((chapter, index) => ({
      chapterName: chapter.chapterName,
      chapterDetails: chapter.chapterDetails,
      chapterImage: req.files['chapterImage'][index].filename
    }));

    const newCourse = new courseModel({
      courseName,
      courseDescription,
      courseImage,
      chapters: parsedChapters
    });

    await newCourse.save();

    res.json({ message: 'Course added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  addCourse
};
