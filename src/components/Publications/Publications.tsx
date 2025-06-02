import { getContentfulEntriesByType } from "@/config/contentful/client";
import { PublicationContentfulSkeleton } from "@/lib/types/Contentful";
import { getAppLocale } from "@/lib/utils";
import { Entry } from "contentful";
import { Button } from "../ui/button";
import { Heading } from "../common/Heading/Heading";
import {
  HabrIconSvgUrl,
  MediumIconSvgUrl,
  TelegramIconSvgUrl,
  TwitterIconSvgUrl,
  YoutubeIconSvgUrl,
} from "../svg";
import { SOCIALS_IDS } from "@/config/socials";
import Link from "next/link";
import Image from "next/image";

export const Publications = async ({ title }: { title: string }) => {
  const locale = getAppLocale();
  let data: Array<
    Entry<PublicationContentfulSkeleton, "WITHOUT_UNRESOLVABLE_LINKS", string>
  > = [];

  try {
    data =
      await getContentfulEntriesByType<PublicationContentfulSkeleton>(
        "publication"
      );
  } catch {
    throw new Error("Unable to get data from CMS");
  }

  const SOCIALS_DATA = [
    {
      id: SOCIALS_IDS.MEDIUM,
      cloudinaryUrlKey: "mediumLink",
      iconUrl: MediumIconSvgUrl,
      iconAlt: "Medium icon",
    },
    {
      id: SOCIALS_IDS.HABR,
      cloudinaryUrlKey: "habrLink",
      iconUrl: HabrIconSvgUrl,
      iconAlt: "Habr icon",
    },
    {
      id: SOCIALS_IDS.YOUTUBE,
      cloudinaryUrlKey: "youtubeLink",
      iconUrl: YoutubeIconSvgUrl,
      iconAlt: "Youtube icon",
    },
    {
      id: SOCIALS_IDS.TELEGRAM,
      cloudinaryUrlKey: "telegramLink",
      iconUrl: TelegramIconSvgUrl,
      iconAlt: "Telegram icon",
    },
    {
      id: SOCIALS_IDS.TWITTER,
      cloudinaryUrlKey: "twitterLink",
      iconUrl: TwitterIconSvgUrl,
      iconAlt: "Twitter icon",
    },
  ] as const;

  return (
    <div className="flex flex-col grow gap-2 px-4">
      <Heading className="lg:text-start mb-2">{title}</Heading>
      {data.map((each, index) => (
        <div className="py-2 flex flex-col w-full" key={index}>
          <div className="flex flex-col lg:flex-row w-full border-2 border-card bg-card/20 rounded-lg overflow-clip">
            <div className="flex flex-col grow px-4">
              <h4 className="text-2xl font-serif text-primary text-center lg:text-start">
                {each.fields.title}
              </h4>
              <p className="font-mono">{each.fields.description}</p>
            </div>
            <div className="flex gap-2 w-full lg:w-auto justify-center items-center p-2">
              {SOCIALS_DATA.map((socialData) =>
                each.fields[socialData.cloudinaryUrlKey] ? (
                  <Button
                    key={socialData.id}
                    asChild
                    variant="ghost"
                    size="reset"
                    className="hover:bg-primary/30 rounded-lg p-2 bg-card/30"
                  >
                    <Link
                      href={each.fields[socialData.cloudinaryUrlKey]}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <Image
                        src={socialData.iconUrl}
                        alt={socialData.iconAlt}
                        width="0"
                        height="0"
                        sizes="100vh"
                        className="h-16 w-16"
                        priority
                      />
                    </Link>
                  </Button>
                ) : null
              )}
            </div>
          </div>
          <span className="w-full text-end font-mono font-semibold text-muted">
            {new Date(each.sys.createdAt).toLocaleDateString(locale, {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </div>
      ))}
    </div>
  );
};
