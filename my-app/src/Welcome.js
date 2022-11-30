import React, { useState } from 'react';

function Welcome() {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);
////////////////change to https:localhost:5000/upload
    const response = await fetch('https://prrucs-5000.csb.app/upload', {
      method: 'POST',
      body: formData
    });

    const data = await response.json();
    console.log(data);
  };

  return (
    <div>
      <h1>Welcome</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}

export default Welcome;