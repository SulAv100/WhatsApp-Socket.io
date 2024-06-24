import React, { useState } from "react";
import "./Courses.css";

function Courses() {
  const [course, setCourse] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [chapterList, setChapterList] = useState([{ chapterName: '', chapterDetails: '', chapterImage: null }]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

  const handleChapterChange = (index, field, value) => {
    const newChapterList = [...chapterList];
    newChapterList[index][field] = value;
    setChapterList(newChapterList);
  };

  const handleAddChapter = () => {
    setChapterList([...chapterList, { chapterName: '', chapterDetails: '', chapterImage: null }]);
  };

  const handleChapterImageUpload = (index, event) => {
    const file = event.target.files[0];
    const newChapterList = [...chapterList];
    newChapterList[index].chapterImage = file;
    setChapterList(newChapterList);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const formData = new FormData();
    formData.append('courseName', course);
    formData.append('courseDescription', description);
    formData.append('courseImage', image);

    const chaptersData = chapterList.map(chapter => ({
      chapterName: chapter.chapterName,
      chapterDetails: chapter.chapterDetails
    }));

    formData.append('chapters', JSON.stringify(chaptersData));

    chapterList.forEach((chapter, index) => {
      formData.append('chapterImage', chapter.chapterImage);  // Append each chapter image
    });

    try {
      const response = await fetch('http://localhost:3000/api/auth/course', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="coursename">Course Name</label>
      <input
        type="text"
        value={course}
        onChange={(event) => setCourse(event.target.value)}
        placeholder="Enter your course name"
      />

      <label htmlFor="courseDescription">Course Description</label>
      <input
        type="text"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        placeholder="Enter your course description"
      />

      <label htmlFor="courseImage">Course Image</label>
      <input type="file" onChange={handleImageUpload} accept="image/*" />

      {chapterList.map((chapter, index) => (
        <div key={index} className="nextData">
          <label htmlFor={`chapterName${index}`}>Chapter Name</label>
          <input
            type="text"
            value={chapter.chapterName}
            onChange={(event) => handleChapterChange(index, 'chapterName', event.target.value)}
            placeholder="Enter your chapter name"
          />

          <label htmlFor={`chapterDetails${index}`}>Chapter Details</label>
          <textarea
            value={chapter.chapterDetails}
            onChange={(event) => handleChapterChange(index, 'chapterDetails', event.target.value)}
            placeholder="Enter your chapter details"
            rows={5}
          ></textarea>

          <label htmlFor={`chapterImage${index}`}>Chapter Image</label>
          <input type="file" onChange={(event) => handleChapterImageUpload(index, event)} accept="image/*" />
        </div>
      ))}

      <button type="button" onClick={handleAddChapter}>Add Chapter</button>
      <button type="submit">Submit</button>
    </form>
  );
}

export default Courses;
