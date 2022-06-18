import express from "express";
import https from "https";
import fs from 'fs';
import { router } from "./routes/routes";

const app = express();
const port = process.env.PORT || 8000;

const options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
}
const server = https.createServer(options, app);

app.use(express.json());
app.use(router);

server.listen(port, () => {
  console.log("🚀 Server is running...");
});

process.on("SIGINT", () => {
  console.log("🤖 Server closed");
});
