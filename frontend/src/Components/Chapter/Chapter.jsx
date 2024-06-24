import React, { useState } from 'react';

function ChapterForm({ onAddChapter }) {
  const [chapterName, setChapterName] = useState('');
  const [chapterImage, setChapterImage] = useState(null);
  const [chapterContent, setChapterContent] = useState('');

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setChapterImage(file);
  }

  const handleAddChapter = () => {
    if (chapterName && chapterImage && chapterContent) {
      const newChapter = {
        name: chapterName,
        image: chapterImage,
        content: chapterContent
      };
      onAddChapter(newChapter);
      setChapterName('');
      setChapterImage(null);
      setChapterContent('');
    } else {
      alert('Please fill in all chapter details.');
    }
  }

  return (
    <div>
      <h2>Add Chapter</h2>
      <label htmlFor="chapterName">Chapter Name:</label>
      <input
        type="text"
        id="chapterName"
        value={chapterName}
        onChange={(e) => setChapterName(e.target.value)}
        placeholder="Enter chapter name"
      />

      <label htmlFor="chapterImage">Chapter Image:</label>
      <input
        type="file"
        id="chapterImage"
        onChange={handleImageUpload}
        accept="image/*"
      />

      <label htmlFor="chapterContent">Chapter Content:</label>
      <textarea
        id="chapterContent"
        value={chapterContent}
        onChange={(e) => setChapterContent(e.target.value)}
        placeholder="Enter chapter content"
      />

      <button type="button" onClick={handleAddChapter}>Add Chapter</button>
    </div>
  );
}

export default ChapterForm;
