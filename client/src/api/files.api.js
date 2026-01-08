import axiosInstance from "./axiosInstance";

const FilesApi = {
}


export function getFilesNamesApi(path) {
    return axiosInstance.get(path)
}
export function sendFileToServerApi(file) {
    return axiosInstance.post("" , file,{headers:{
        fileName:file.path
    }})
}


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
