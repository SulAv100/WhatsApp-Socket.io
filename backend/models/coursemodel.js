const mongoose = require("mongoose");

const chapterSchema = new mongoose.Schema({
    chapterName: {
        type: String,
        required: true
    },
    chapterDetails: {
        type: String,
        required: true
    },
    chapterImage: {
        type: String,
        required: true
    }
});

const courseSchema = new mongoose.Schema({
    courseName: {
        type: String,
        required: true
    },
    courseDescription: {
        type: String,
        required: true
    },
    courseImage: {
        type: String,
        required: true
    },
    chapters: [chapterSchema]
});

const courseModel = mongoose.model("Course", courseSchema);
module.exports = courseModel;
