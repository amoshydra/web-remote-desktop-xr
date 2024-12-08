import { Events } from "@wrdxr-app/events";
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
  [Events.Core.Connection]: ({ id, handshake: { headers: { "user-agent": ua } } }) => {
    console.log(`[${sessionSocketService.map.size + 1}]    connected - ${id} - ${ua}`);
  },
  [Events.Core.Disconnect]: ({ id }) => {
    obsScreenSession.fallbackScreenshare.exit(id);
    console.log(`[${sessionSocketService.map.size}] disconnected - ${id}`);
  },
  [Events.ObsScreen.Join]: ({ id }) => obsScreenSession.fallbackScreenshare.join(id),
  [Events.ObsScreen.Exit]: ({ id }) => obsScreenSession.fallbackScreenshare.exit(id),
});
