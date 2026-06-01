import { CreationProjects } from "@/components/CreationProjects/CreationProjects";
import { getContentfulEntriesByType } from "@/config/contentful/client";
import { ContentfulProductStatusId } from "@/config/contentful/productStatuses";
import { ContentfulProductTypeId } from "@/config/contentful/productTypes";
import { ProjectContentfulSkeleton } from "@/lib/types/Contentful";
import { sortLinkedContentfulList } from "@/lib/utils";

export interface CreationProjectDiagram {
  title: string;
  embedUrl: string;
}

export interface CreationProjectData {
  id: string;
  title: string;
  description: string;
  externalLink?: string;
  statusId: ContentfulProductStatusId;
  techStack: string[];
  type: ContentfulProductTypeId;
  bgUrl?: string;
  previousLinkedItemTitle: string | null;
  diagrams?: CreationProjectDiagram[];
}

export default async function CreationPage() {
  let projects: CreationProjectData[];

  try {
    const data =
      await getContentfulEntriesByType<ProjectContentfulSkeleton>("project");

    type ResolvedDiagram = { fields?: { title?: string; embedUrl?: string } };

    const normalized = data.map((each) => ({
      ...each.fields,
      bgUrl: (each.fields.backgroundImage as any)?.fields.file.url,
      previousLinkedItemTitle:
        each.fields.previousLinkedItem?.fields.title || null,
      statusId: each.fields.statusId as ContentfulProductStatusId,
      type: each.fields.type as ContentfulProductTypeId,
      diagrams: (each.fields.diagrams as ResolvedDiagram[] | undefined)
        ?.map((d) => ({ title: d?.fields?.title, embedUrl: d?.fields?.embedUrl }))
        .filter((d): d is CreationProjectDiagram => !!d.title && !!d.embedUrl),
    }));

    projects = sortLinkedContentfulList(normalized);
  } catch {
    throw new Error("Unable to get data from CMS");
  }

  return <CreationProjects data={projects} />;
}
