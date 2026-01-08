// import axiosInstance from "./axiosInstance";

// const FilesApi = {
// }


// export function getFilesNamesApi(path) {
//     return axiosInstance.get(path)
// }
// // export function sendFileToServerApi(file) {
// //     return axiosInstance.post("" , file)
// // }


// export const sendFileToServerApi = (file, onProgress) => {
//   const formData = new FormData();
//   formData.append("file", file);

//   return axiosInstance.post("", formData, {
//     headers: {
//       "Content-Type": "multipart/form-data",
//     },
//     onUploadProgress: (event) => {
//       if (!event.total) return;
//       const percent = Math.round((event.loaded * 100) / event.total);
//       onProgress(percent);
//     },
//   });
// };





import axiosInstance from "./axiosInstance";

export const getFilesNamesApi = () => {
  return axiosInstance.get("/files");
};

export const sendFileToServerApi = (file, onProgress) => {
  const formData = new FormData();
  formData.append("file", file);

  return axiosInstance.post("/upload", formData, {
    onUploadProgress: (event) => {
      if (!event.total) return;
      const percent = Math.round((event.loaded * 100) / event.total);
      onProgress(percent);
    },
  });
};
