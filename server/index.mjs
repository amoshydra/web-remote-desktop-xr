import express from "express";
import ViteExpress from "vite-express";
import routerApi from "./router/api.mjs";
import { obsScreenSession } from "./services/screenshare-session.service.mjs";
import { sessionSocketService } from "./services/session-socket.service.mjs";

const app = express();

app.use("/api", routerApi);

const port = parseInt(process.env.PORT ?? "5173", 10);

const server = ViteExpress.listen(app, port, () => console.log(`Server is listening at port ${port}...`));

sessionSocketService.init(server, {
  connection: ({ id }) => console.log(`user ${id} connected`),
  disconnect: ({ id }) => {
    obsScreenSession.fallbackScreenshare.exit(id);
    console.log(`user ${id} disconnected`);
  },
  "obs-screen:join": ({ id }) => obsScreenSession.fallbackScreenshare.join(id),
  "obs-screen:exit": ({ id }) => obsScreenSession.fallbackScreenshare.exit(id),
});
