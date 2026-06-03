import { EntryFieldTypes } from "contentful";

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
