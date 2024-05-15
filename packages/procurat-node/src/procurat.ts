import { GeneratedProcurat } from "./client";

export class Procurat extends GeneratedProcurat {
  constructor(apiKey: string, baseUrl: string) {
    super({
      BASE: baseUrl,
      HEADERS: { "Content-Type": "application/json", "X-Api-Key": apiKey },
    });
  }
}

export * from "./client/GeneratedProcurat";
