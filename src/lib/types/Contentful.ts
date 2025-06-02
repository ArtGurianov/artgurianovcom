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

export type WisdomOfferingContentfulSkeleton = {
  contentTypeId: "wisdomOffering";
  fields: {
    id: EntryFieldTypes.Text;
    title: EntryFieldTypes.Text;
    description: EntryFieldTypes.Text;
    isDisabled: EntryFieldTypes.Boolean;
    routeId: EntryFieldTypes.Text;
  };
};

export type PublicationContentfulSkeleton = {
  contentTypeId: "publication";
  fields: {
    id: EntryFieldTypes.Text;
    title: EntryFieldTypes.Text;
    description: EntryFieldTypes.Text;
    mediumLink: EntryFieldTypes.Text;
    habrLink: EntryFieldTypes.Text;
    twitterLink: EntryFieldTypes.Text;
    telegramLink: EntryFieldTypes.Text;
    youtubeLink: EntryFieldTypes.Text;
  };
};
