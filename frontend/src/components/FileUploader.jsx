import { useState } from "react";
import API from "../api";

export default function FileUploader() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleUpload = async () => {
    if (!file) return alert("Please select a file first!");
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await API.post("/upload/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage(res.data.message);
    } catch (err) {
      setMessage("Upload failed!");
    }
  };

  return (
    <div className="p-4 border rounded shadow">
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button
        onClick={handleUpload}
        className="bg-green-600 text-white px-3 py-1 rounded ml-2"
      >
        Upload
      </button>
      {message && <p className="mt-2 text-sm">{message}</p>}
    </div>
  );
}
