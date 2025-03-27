import { CreationProjects } from "@/components/CreationProjects/CreationProjects";
import { getContentfulEntriesByType } from "@/config/cms";
import { ColorPaletteId } from "@/config/colorPalettes";
import { ProjectContentfulSkeleton } from "@/lib/types/Contentful";
import { sortLinkedContentfulList } from "@/lib/utils";

export interface CreationProjectData {
  title: string;
  description: string;
  externalLink?: string;
  status: string;
  techStack: string[];
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
      colorPaletteId:
        each.fields.colorPaletteId.toLowerCase() as ColorPaletteId,
    }));

    projects = sortLinkedContentfulList(normalized);
  } catch {
    throw new Error("Unable to get data from CMS");
  }

  return <CreationProjects data={projects} />;
}
