export class ClientError extends Error {
  status = 400
  name = "ClientError"

  /**
   * @param {string=} message 
   */
  constructor(message) {
    super(message);
  }
}
