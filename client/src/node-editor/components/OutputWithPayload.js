import Rete from "rete";

export class OutputWithPayload extends Rete.Output {
    constructor(key, title, socket, payload = "payload", multiConns = true) {
    super(key, title, socket, multiConns);
    this.payload = payload;
  }
}
