import { ARTGURIANOV_CONFIG, ARTGURIANOV_KEY } from "./artgurianov";
import { BLEAD_CONFIG, BLEAD_KEY } from "./blead";
import { GUNLOAD_CONFIG, GUNLOAD_KEY } from "./gunload";
import { MOTHERHUNT_CONFIG, MOTHERHUNT_KEY } from "./motherhunt";
import { MYDAOGS_CONFIG, MYDAOGS_KEY } from "./mydaogs";
import { SKROW_CONFIG, SKROW_KEY } from "./skrow";

export type { ProjectConfig } from "./types";

export const PROJECTS_KEYS = [
  MOTHERHUNT_KEY,
  MYDAOGS_KEY,
  BLEAD_KEY,
  SKROW_KEY,
  GUNLOAD_KEY,
  ARTGURIANOV_KEY
] as const;

export type ProjectKey = typeof PROJECTS_KEYS[number];

export const PROJECTS_CONFIG_BY_KEY = {
  [MOTHERHUNT_KEY]: MOTHERHUNT_CONFIG,
  [MYDAOGS_KEY]: MYDAOGS_CONFIG,
  [BLEAD_KEY]: BLEAD_CONFIG,
  [SKROW_KEY]: SKROW_CONFIG,
  [GUNLOAD_KEY]: GUNLOAD_CONFIG,
  [ARTGURIANOV_KEY]: ARTGURIANOV_CONFIG,
} as const;

export const PROJECTS_CONFIG = PROJECTS_KEYS.map(
  (key) => PROJECTS_CONFIG_BY_KEY[key]
);
