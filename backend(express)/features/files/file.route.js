import { Router } from "express";
import { deleteFile, previewFile, renameFile, uploadFile } from "./file.controller.js";
const router = Router();

router
  .route("/:fileName")
  .post(uploadFile)
  .get(previewFile)
  .delete(deleteFile)
  .patch(renameFile);

export default router;
