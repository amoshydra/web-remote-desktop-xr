import cors from "cors";
import express from "express";
import ViteExpress from "vite-express";
import { WrdxrObs } from "./class/wrdxr-obs.mjs";
import routerApi from "./router/api.mjs";

const app = express();

app.use(cors());
app.use("/api", routerApi);

const port = parseInt(process.env.PORT ?? "5173", 10);

const server = ViteExpress.listen(app, port, () => console.log(`Server is listening at port ${port}...`));

new WrdxrObs(server);
