export default function UploadForm({ onUpload }) {
    return (
      <div>
        <input type="file" onChange={onUpload} />
        <button onClick={onUpload}>Upload & Detect</button>
      </div>
    );
  }
  