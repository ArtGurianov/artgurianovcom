import { EntryFieldTypes } from "contentful";

export type ProjectContentfulSkeleton = {
  contentTypeId: "project";
  fields: {
    title: EntryFieldTypes.Text;
    description: EntryFieldTypes.Text;
    externalLink: EntryFieldTypes.Text;
    status: EntryFieldTypes.Text;
    techStack: Array<EntryFieldTypes.Text>;
    backgroundImage: any;
    colorPaletteId: EntryFieldTypes.Text;
    previousLinkedItem: EntryFieldTypes.EntryLink<ProjectContentfulSkeleton>;
  };
};
