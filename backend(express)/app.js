import express from "express";
import fs, { readdir, rm, rmdir } from "fs/promises";
import fileRouter from "./features/files/file.route.js";

console.log("server running");

const app = express();
app.use((req,res,next)=>{
    if(req.url==="/favicon.ico") return
    express.json()(req,res,next)
})

app.use("/", fileRouter);

app.get("/", async (req, res) => {
  const files = await readdir("./storage");
  res.json(files);
});

// app.get("/:fileName", async (req, res) => {
//   const { fileName } = req.params;
//   if (req.query.action === "download") {
//     res.set("Content-Disposition", "attachment");
//   }

//   res.sendFile(`${import.meta.dirname}/storage/${fileName}`);
// });

// app.post("/:fileName", async (req, res) => {
//   const { fileName } = req.params;
//   res.sendFile(`${import.meta.dirname}/storage/${fileName}`);
// });
// app.delete("/:fileName", async (req, res) => {
//   const { fileName } = req.params;
//   await rm(`./storage/${fileName}`);
//   res.end("file deleted");
// });

app.use(express.static("storage"));
export default app;
