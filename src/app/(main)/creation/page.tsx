import { CreationProjects } from "@/components/CreationProjects/CreationProjects";
import { getContentfulEntriesByType } from "@/config/cms";
import { ProjectContentfulSkeleton } from "@/lib/types/Contentful";

export interface CreationProjectData {
  index: number;
  title: string;
  description: string;
  externalLink: string;
  status: string;
  bgUrl: string;
}

export default async function CreationPage() {
  let projects: CreationProjectData[];

  try {
    const data =
      await getContentfulEntriesByType<ProjectContentfulSkeleton>("project");

    projects = data.map((each, index) => ({
      index,
      ...each.fields,
      bgUrl: (each.fields.backgroundImage as any)?.fields.file.url,
    }));
  } catch (e) {
    console.log(e);
    throw new Error("Unable to get data from CMS");
  }

  return <CreationProjects data={projects} />;
}
