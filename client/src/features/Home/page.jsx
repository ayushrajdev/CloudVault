import React, { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { getFilesNamesApi,  } from "../../api/files.api";
import { Link } from "react-router-dom";

const ShowFiles = () => {
  const [data, setData] = useState([]);
  const [remainingTime, setRemainingTime] = useState(null);

  const [currentFIle, setCurrentFIle] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const inputRef = useRef("");


  const formatTime = (sec) => {
    if (sec < 60) return `${sec}s`;
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}m ${s}s`;
  };


  useEffect(() => {
    if (uploading) return;
    (async () => {
      const { data } = await getFilesNamesApi();
      setData(data);
    })();
  }, [uploading]);

  console.log(data);

  const handleFile = async (e) => {
    const file = e.target.files[0];
    setCurrentFIle(file);
  };
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     // const response = await sendFileToServerApi(currentFIle);
//     try {
//       setUploading(true);
//       //   const response = await fetch("http://localhost:3000/", {
//       //     body: currentFIle,
//       //     method: "POST",
//       //     headers: {
//       //       filename: currentFIle.name,
//       //     },
//       //   });
//       const xhr = new XMLHttpRequest();
//       xhr.open("POST", "http://localhost:3000", true);
//       xhr.setRequestHeader("filename", currentFIle.name);
//       xhr.upload.addEventListener("progress", (e) => {
//         console.log(e);
//         setProgress(Math.floor((e.loaded / e.total) * 100));
//       });
//       xhr.addEventListener("load", () => {
//         setProgress(0);
//         setCurrentFIle(null);
//         setUploading(false);
//         inputRef.current.value = "";
//       });
//       xhr.send(currentFIle);
//     } catch (error) {
//       console.log(error.message);
//     }
//   };
  console.log(progress);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!currentFIle) return;

    setUploading(true);
    setProgress(0);
    setRemainingTime(null);

    const startTime = Date.now();

    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    formData.append("file", currentFIle);

    xhr.open("POST", "http://localhost:3000/upload", true);

    xhr.upload.onprogress = (e) => {
      if (!e.lengthComputable) return;

      const percent = Math.floor((e.loaded / e.total) * 100);
      setProgress(percent);

      const elapsedSeconds = (Date.now() - startTime) / 1000;
      const speed = e.loaded / elapsedSeconds; // bytes/sec
      const remainingBytes = e.total - e.loaded;
      const remainingSeconds = remainingBytes / speed;

      setRemainingTime(Math.ceil(remainingSeconds));
    };

    xhr.onload = () => {
      setProgress(100);
      setUploading(false);
      setRemainingTime(0);
      setCurrentFIle(null);
      inputRef.current.value = "";
    };

    xhr.onerror = () => {
      setUploading(false);
      setRemainingTime(null);
    };

    xhr.send(formData);
  };

  return (
    <div>
      {data.map((item) => (
        <div className="bg-black text-white my-4 rounded-3xl p-4 w-4/5 mx-auto  ">
          <p className="text-red-800 text-2xl">{item}</p>
          <div className="my-2">
            <Link
              to={"/hello.txt"}
              className="bg-green-500 p-1 rounded-2xl px-2 mr-4 "
            >
              download
            </Link>
            <Link className="bg-purple-500 p-1 rounded-2xl px-2 mr-4 ">
              Preview
            </Link>
            <Link className="bg-red-500 p-1 rounded-2xl px-2 mr-4 ">
              Delete
            </Link>
            <Link className="bg-emerald-500 p-1 rounded-2xl px-2 mr-4 ">
              Rename
            </Link>
          </div>
        </div>
      ))}
      <div className="bg-amber-400 w-4/5 mx-auto rounded-2xl p-8">
        <form
          action="http://localhost:3000/"
          method="POST"
          encType="multipart/form-data"
          onSubmit={handleSubmit}
        >
          <h1 className="text-center mb-4 text-3xl font-bold">File uploader</h1>
          <input
            ref={inputRef}
            onChange={handleFile}
            type="file"
            name="file"
            id="file"
            className="bg-white w-3/5 mr-6 py-1 px-2 rounded-xl"
          />
          <button className="bg-green-500 rounded-2xl px-2 py-1">submit</button>
        </form>
        {uploading && (
          <div className="w-full mt-4">
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div
                className="h-full bg-blue-600 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="flex justify-between text-sm text-gray-700 mt-1">
              <span>{progress}%</span>
              {remainingTime !== null && (
                <span>⏳ {formatTime(remainingTime)} remaining</span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowFiles;
