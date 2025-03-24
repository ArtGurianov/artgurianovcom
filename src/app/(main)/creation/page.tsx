import { CreationProjects } from "@/components/CreationProjects/CreationProjects";
import { getContentfulEntriesByType } from "@/config/cms";
import { ProjectContentfulSkeleton } from "@/lib/types/Contentful";

export default async function CreationPage() {
  const projectsData =
    await getContentfulEntriesByType<ProjectContentfulSkeleton>("project");

  return <CreationProjects />;
}
