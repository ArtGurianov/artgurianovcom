import { CreationProjects } from "@/components/CreationProjects/CreationProjects";
import { getContentfulEntriesByType } from "@/config/contentful/client";
import { ColorPaletteId } from "@/config/contentful/colorPalettes";
import { ContentfulProductStatusId } from "@/config/contentful/productStatuses";
import { ContentfulProductTypeId } from "@/config/contentful/productTypes";
import { ProjectContentfulSkeleton } from "@/lib/types/Contentful";
import { sortLinkedContentfulList } from "@/lib/utils";

export interface CreationProjectData {
  title: string;
  description: string;
  externalLink?: string;
  statusId: ContentfulProductStatusId;
  techStack: string[];
  type: ContentfulProductTypeId;
  bgUrl?: string;
  colorPaletteId: ColorPaletteId;
  previousLinkedItemTitle: string | null;
}

export default async function CreationPage() {
  let projects: CreationProjectData[];

  try {
    const data =
      await getContentfulEntriesByType<ProjectContentfulSkeleton>("project");

    const normalized = data.map((each) => ({
      ...each.fields,
      bgUrl: (each.fields.backgroundImage as any)?.fields.file.url,
      previousLinkedItemTitle:
        each.fields.previousLinkedItem?.fields.title || null,
      statusId: each.fields.statusId as ContentfulProductStatusId,
      colorPaletteId:
        each.fields.colorPaletteId.toLowerCase() as ColorPaletteId,
      type: each.fields.type as ContentfulProductTypeId,
    }));

    projects = sortLinkedContentfulList(normalized);
  } catch {
    throw new Error("Unable to get data from CMS");
  }

  return <CreationProjects data={projects} />;
}
