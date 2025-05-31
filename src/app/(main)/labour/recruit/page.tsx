import { Heading } from "@/components/common/Heading/Heading";
import { PageContent } from "@/components/common/PageContent/PageContent";
import { Quote } from "@/components/common/Quote/Quote";
import { RecruitForm } from "@/components/Forms/RecruitForm/RecruitForm";
import { Button } from "@/components/ui/button";
import { getAppLocale } from "@/lib/utils";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

export default async function RecruitPage() {
  const locale = getAppLocale();
  const t = await getTranslations({ locale, namespace: "RECRUIT" });

  return (
    <PageContent>
      <Heading className="mb-4">{t("heading")}</Heading>
      <Quote>{t("quote")}</Quote>
      <Heading tag={"h4"} className="text-3xl text-card mt-4 mb-2">
        {t("heading-stack")}
      </Heading>
      <ul className="flex flex-col gap-4 justify-center items-center text-muted text-xl text-center">
        <li>
          <span className="font-semibold">{`${t("frontend")}: `}</span>
          <span>
            {
              "React.js, Next, Typescript, Webpack, Redux, GraphQL, ThreeJS, Tailwind, Viem, Wagmi, Ethers.js, RTL, Jest, Storybook and more..."
            }
          </span>
        </li>
        <li>
          <span className="font-semibold">{`${t("backend")}: `}</span>
          <span>
            {
              "NodeJS, Express, NestJS, Prisma, TypeORM, Mongo, Postgres, Redis, Nginx and more..."
            }
          </span>
        </li>
        <li>
          <span className="font-semibold">{`${t("blockchain")}: `}</span>
          <span>{"Solidity, Foundry, Hardhat and more..."}</span>
        </li>
        <li>
          <span className="font-semibold">{`${t("design")}: `}</span>
          <span>{"Figma, Lottie, SVGator, Blender and more..."}</span>
        </li>
        <li>
          <span className="font-semibold">{`${t("infrastructure")}: `}</span>
          <span>
            {
              "Vercel, Turborepo, CloudinaryCMS, CircleCI, Docker, Git, Jenkins and more..."
            }
          </span>
        </li>
      </ul>
      <div className="flex gap-4 py-4 w-full items-center justify-center flex-wrap">
        <Button
          asChild
          size="xl"
          className="bg-transparent border-4 border-primary text-primary hover:bg-primary/10 w-full max-w-[540px]"
        >
          <Link
            href={
              locale === "en-US" ? "/ArtGurianovCV.pdf" : "/ArtGurianovCV.pdf"
            }
            rel="noopener noreferrer"
            target="_blank"
          >
            {`${t("cv")} 📄`}
          </Link>
        </Button>
        <RecruitForm />
      </div>
    </PageContent>
  );
}
