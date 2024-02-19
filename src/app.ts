import bodyParser from "body-parser";
import dotenv from "dotenv";
import express, { Request, Response } from "express";
import { controllers } from "./contexts";

dotenv.config();
const app = express();
const port = 5050;
const jsonParser = bodyParser.json();

app.use(jsonParser);
app.use(controllers);

app.use((err: any, req: Request, res: Response, next: Function) => {
  console.error(err.stack);
  res.json("오류가 발생했습니다!");
});

app.listen(port, () => {
  console.log(`서버 돌아갑니다! 일합시다! 주소는 [localhost:${port}]!!`);
});
