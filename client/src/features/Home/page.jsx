import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getFilesNamesApi, sendFileToServerApi } from "../../api/files.api";

const ShowFiles = () => {
  const [files, setFiles] = useState([]);
  const [currentFile, setCurrentFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    (async () => {
      const { data } = await getFilesNamesApi();
      setFiles(data);
    })();
  }, []);

  const handleFile = (e) => {
    setCurrentFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentFile) return;

    setUploading(true);
    setProgress(0);

    try {
      await sendFileToServerApi(currentFile, (percent) => {
        setProgress(percent);
      });
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-4">
      {/* FILE LIST */}
      {files.map((item) => (
        <div key={item} className="flex gap-3">
          <span>{item}</span>
          <Link to={`/${item}`} className="text-blue-600">
            download
          </Link>
        </div>
      ))}

      {/* UPLOAD */}
      <form onSubmit={handleSubmit} className="mt-5">
        <input type="file" onChange={handleFile} />
        <button
          disabled={uploading}
          className="ml-2 px-3 py-1 bg-black text-white disabled:opacity-50"
        >
          Upload
        </button>

        {uploading && (
          <>
            <div className="w-full bg-gray-200 rounded h-3 mt-3">
              <div
                className="bg-green-600 h-3 rounded transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p>{progress}%</p>
          </>
        )}
      </form>
    </div>
  );
};

export default ShowFiles;
