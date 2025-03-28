import { EntryFieldTypes } from "contentful";

export type ProjectContentfulSkeleton = {
  contentTypeId: "project";
  fields: {
    title: EntryFieldTypes.Text;
    description: EntryFieldTypes.Text;
    externalLink: EntryFieldTypes.Text;
    statusId: EntryFieldTypes.Text;
    techStack: Array<EntryFieldTypes.Text>;
    type: EntryFieldTypes.Text;
    backgroundImage: any;
    colorPaletteId: EntryFieldTypes.Text;
    previousLinkedItem: EntryFieldTypes.EntryLink<ProjectContentfulSkeleton>;
  };
};
