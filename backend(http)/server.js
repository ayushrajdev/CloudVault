import { open, readdir, readFile, rm } from "node:fs/promises";
import http from "node:http";

const server = http.createServer(async (req, res) => {
  console.log(req.url + "    ...................................");
  res.setHeader("Access-Control-Allow-Headers", "*");

  if (req.url == "/favicon.ico") return res.end("no favicon found");

  if (req.method === "DELETE") {
    req.on("data", async (chunk) => {
      const fileName = chunk.toString();
      console.log(fileName);
      await rm(`./storage/${fileName}`);
    });
    req.on("end", () => {
      res.end("file deleted");
    });
    return;
  }
  if (req.url === "/upload") {
    console.log(req.headers.filename);
    console.log("uploading>>>>>>>>>");
    const uploadFileHandle = await open(
      "./storage/" + req.headers.filename,
      "w+"
    );

    const uploadWriteStream = uploadFileHandle.createWriteStream();
    //   req.on("data", (chunk) => );
    req.on("end", () => {
      console.log("wow3");
      res.end(JSON.stringify(["done"]));
      uploadFileHandle.close();
      //   return;
    });
    // req.on("data",(chunk)=>{
    //     console.log(chunk.toString());
    // })
    console.log("wow");
    req.pipe(uploadWriteStream);
    console.log("wow2");
    return;
  }
  console.log(
    "after upload..................................................."
  );

  if (req.url.includes("preview")) {
    console.log("in previe");
    console.log(req.url.split("/").slice(1));
    console.log("./storage" + req.url.replace("/preview", ""));
    const path = "./storage" + req.url.replace("/preview", "");
    const fileHandle = await open(path);
    const readStream = fileHandle.createReadStream();
    readStream.pipe(res);
    readStream.on("end", () => {
      fileHandle.close();
    });
    return;
  }
  if (req.url.includes("download")) {
    console.log(req.url.split("/").slice(1));
    console.log("./storage" + req.url.replace("/download", ""));
    const path = "./storage" + req.url.replace("/download", "");
    const fileHandle = await open(path);
    const readStream = fileHandle.createReadStream({ highWaterMark: 1 });
    const stats = await fileHandle.stat();
    res.setHeader("Content-Disposition", "attachment");
    res.setHeader("Content-Length", stats.size);
    readStream.pipe(res);
    readStream.on("end", () => {
      fileHandle.close();
    });

    return;
  }

  try {
    const htmlFile = await readFile("./index.html", "utf-8");
    // console.log(req.url);

    const url = new URL(req.url, `http://${req.headers.host}`);

    const pathname = decodeURIComponent(url.pathname);

    // remove leading slash
    const requestedFile = pathname.slice(1);
    console.log(requestedFile);

    const files = await readdir("./storage");

    // If file is clicked

    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(files));

    return;
    if (
      (requestedFile && files.includes(requestedFile)) ||
      files.some((letter) => requestedFile.includes(letter))
    ) {
      try {
        // const filehandle = await open(`./storage/${requestedFile}`);
        const filehandle = await open(`./storage${req.url}`);
        const stats = await filehandle.stat();
        res.statusCode = 200;

        if (stats?.isDirectory()) {
          console.log("in if ");
          const files = await readdir("./storage" + req.url);

          let dynamicHtml = "";
          files.forEach((file) => {
            dynamicHtml += `<a href="/${requestedFile}/${encodeURIComponent(
              file
            )}">${file}</a>`;
          });

          res.end(
            htmlFile
              .toString("utf-8")
              .replace("${dynamicHtml}", dynamicHtml.toString("utf-8"))
          );
          return;
        } else {
          console.log("in else`");
          const readStream = filehandle.createReadStream({
            highWaterMark: 1,
          });

          //   res.setHeader(
          //     "Content-Disposition",
          //     `attachment; filename="${requestedFile}"`
          //   );
          //   res.write(`You clicked on file: ${requestedFile}\n`);
          readStream.pipe(res);
          readStream.on("end", () => {
            filehandle.close();
          });
        }
      } catch (error) {
        console.log(error.message);
      }
    } else {
      // Directory listing
      let dynamicHtml = "";

      files.forEach((item) => {
        dynamicHtml += `<div><a href="/${encodeURIComponent(item)}">${item}</a>
        <a style="background-color: aqua; margin:10px" href="/${item}/preview">preview</a>
        <a style="background-color: aqua;" href="/${item}/download">download</a>
        <br>
        </div>`;
      });

      res.statusCode = 200;
      res.setHeader("Content-Type", "text/html");
      res.end(
        htmlFile
          .toString("utf-8")
          .replace("${dynamicHtml}", dynamicHtml.toString("utf-8"))
      );
    }
  } catch (err) {
    console.error(err);
    res.statusCode = 500;
    res.end("Internal Server Error");
  }
});

server.listen(3000, () => {
  console.log("Server is listening on http://localhost:3000");
});
