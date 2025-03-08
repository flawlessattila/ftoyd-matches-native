import { isServer } from "@tanstack/react-query";
import { sleep } from "./sleep";

export const customFetch = async (
  input: string | URL | globalThis.Request,
  init?: RequestInit
): Promise<Response> => {
  const isClient = !isServer;

  if (isClient) {
    await sleep(1000);
  }

  return await fetch(input, init);
};
