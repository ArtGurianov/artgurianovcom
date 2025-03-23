import { EntryFieldTypes } from "contentful";

export type ProjectContentfulSkeleton = {
  contentTypeId: "project";
  fields: {
    title: EntryFieldTypes.Text;
    description: EntryFieldTypes.Text;
    externalLink: EntryFieldTypes.Text;
    backgroundImage: any;
  };
};
