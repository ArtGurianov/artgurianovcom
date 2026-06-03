import { ARTGURIANOV_KEY } from "./artgurianov";
import { BLEAD_KEY } from "./blead";
import { GUNLOAD_KEY } from "./gunload";
import { MOTHERHUNT_KEY } from "./motherhunt";
import { MYDAOGS_KEY } from "./mydaogs";
import { SKROW_KEY } from "./skrow";

export const PROJECTS_KEYS = [
  MOTHERHUNT_KEY,
  MYDAOGS_KEY,
  BLEAD_KEY,
  SKROW_KEY,
  GUNLOAD_KEY,
  ARTGURIANOV_KEY
] as const;

export type ProjectKey = typeof PROJECTS_KEYS[number];
