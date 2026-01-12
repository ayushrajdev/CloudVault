import { Router } from "express";
import { deleteFile, previewFile, renameFile } from "./file.controller.js";
const router = Router();

router
  .route("/:fileName")
  .get(previewFile)
  .delete(deleteFile)
  .patch(renameFile);

export default router;
