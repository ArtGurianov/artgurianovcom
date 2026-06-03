import { CreationProjects } from "@/components/CreationProjects/CreationProjects";
import {
  ProjectConfig,
  PROJECTS_CONFIG,
  ProjectKey,
} from "@/config/projects";
import { TYPE_TO_I18N } from "@/config/projects/constants";

export interface CreationProjectData {
  id: ProjectKey;
  title: string;
  externalLink?: string;
  statusId: ProjectConfig["status"];
  type: ProjectConfig["type"];
  techStack: string[];
  bgUrl?: string;
  colors: ProjectConfig["colors"];
  diagrams?: string[];
}

export default async function CreationPage() {
  const data: CreationProjectData[] = PROJECTS_CONFIG.map((config) => ({
    id: config.key,
    title: config.title,
    externalLink: config.externalLinkUrl,
    statusId: config.status,
    type: config.type,
    techStack: config.techStack,
    bgUrl: config.backgroundFileName
      ? `/backgrounds/${config.backgroundFileName}`
      : undefined,
    colors: config.colors,
    diagrams: config.diagramsFileNames,
  }));

  return <CreationProjects data={data} />;
}
