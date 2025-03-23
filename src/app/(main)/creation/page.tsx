import { getContentfulEntriesByType } from "@/config/cms";
import { ProjectContentfulSkeleton } from "@/lib/types/Contentful";

export default async function CreationPage() {
  const projectsData =
    await getContentfulEntriesByType<ProjectContentfulSkeleton>("project");

  return (
    <ul>
      {projectsData.map((each) => (
        <li key={each.fields.title}>{each.fields.title}</li>
      ))}
    </ul>
  );
}
