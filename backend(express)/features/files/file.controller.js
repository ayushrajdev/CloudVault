// import { rename, rm } from "node:fs/promises";

// export const previewFile = (req, res) => {
//   const { fileName } = req.params;
//   if (req.query.action === "download") {
//     res.set("Content-Disposition", "attachment");
//   }
//   console.log(fileName);
//   console.log(import.meta.dirname);
//   res.sendFile(`${import.meta.dirname}/storage/${fileName}`);
// };

// export const downloadFile = (req, res) => {};

// export const renameFile = async (req, res) => {
//   try {
//     const { newFileName } = req.body;
//     const { fileName: oldFileName } = req.params;
//     console.log({oldFileName,newFileName})
//     await rename(
//       `../../storage/${oldFileName}`,
//       `../../storage/${newFileName}`
//     );
//     res.json(body);
//   } catch (error) {
//     console.log(error.message);
//   }
// };

// export const deleteFile = async (req, res) => {
//   const { fileName } = req.params;
//   await rm(`./storage/${fileName}`);
//   res.end("file deleted");
// };
import path from "path";
import { fileURLToPath } from "url";
import { open, rename, rm } from "fs/promises";

// ESM replacement for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// absolute path to storage folder
const STORAGE_PATH = path.resolve(__dirname, "../../storage");

/* ===================== PREVIEW FILE ===================== */
export const previewFile = (req, res) => {
  const { fileName } = req.params;

  if (req.query.action === "download") {
    res.setHeader("Content-Disposition", `attachment; filename="${fileName}"`);
  }

  const filePath = path.join(STORAGE_PATH, fileName);

  res.sendFile(filePath, (err) => {
    if (err) {
      res.status(404).json({ error: "File not found" });
    }
  });
};

/* ===================== RENAME FILE ===================== */
export const renameFile = async (req, res) => {
  try {
    const { newFileName } = req.body;
    const { fileName: oldFileName } = req.params;

    await rename(
      path.join(STORAGE_PATH, oldFileName),
      path.join(STORAGE_PATH, newFileName)
    );

    res.json({
      success: true,
      oldFileName,
      newFileName,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/* ===================== DELETE FILE ===================== */
export const deleteFile = async (req, res) => {
  try {
    const { fileName } = req.params;

    await rm(path.join(STORAGE_PATH, fileName));

    res.json({ success: true, message: "File deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const uploadFile = async (req, res) => {
  const { filename: fileName } = req.headers;
  const writeFileHandle = await open(fileName, "w+");
  const ws = writeFileHandle.createWriteStream();
  req.pipe(ws);
  req.on("end", () => {
      res.end("wow");
});
};
