import { ValueOf } from "@/lib/types";
import { ProjectKey } from ".";
import { PROJECT_STATUSES, PROJECT_TYPES } from "./constants";

export type ProjectStatus = ValueOf<typeof PROJECT_STATUSES>;
export type ProjectType = ValueOf<typeof PROJECT_TYPES>;

export interface ProjectConfig {
  key: ProjectKey;
  externalLinkUrl: string;
  backgroundFileName?: string;
  status: ProjectStatus;
  type: ProjectType;
  diagramsFileNames?: string[];
  techStack: string[];
}
