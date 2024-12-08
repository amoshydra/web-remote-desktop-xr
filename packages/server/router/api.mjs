import express from "express";
import { Client404Error } from "../class/error/404.mjs";

const router = express.Router();

router.get('/', (req, res) => {
})

router.all("/*path", (req, res) => {
  throw new Client404Error();
})

export default router;
