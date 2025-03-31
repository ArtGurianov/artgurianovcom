import { EntryFieldTypes } from "contentful";

export type ProjectContentfulSkeleton = {
  contentTypeId: "project";
  fields: {
    id: EntryFieldTypes.Text;
    title: EntryFieldTypes.Text;
    description: EntryFieldTypes.Text;
    externalLink: EntryFieldTypes.Text;
    statusId: EntryFieldTypes.Text;
    techStack: Array<EntryFieldTypes.Text>;
    type: EntryFieldTypes.Text;
    backgroundImage: any;
    previousLinkedItem: EntryFieldTypes.EntryLink<ProjectContentfulSkeleton>;
  };
};
