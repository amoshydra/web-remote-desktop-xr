import { ClientError } from "./error.mjs"

export class Client404Error extends ClientError {
  status = 404
  name = "Client404Error"
}
