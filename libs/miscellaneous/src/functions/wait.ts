import { promisify } from "util";

export const wait = promisify(setTimeout);

export const waitTil = (date: Date) => wait(date.getTime() - Date.now());
