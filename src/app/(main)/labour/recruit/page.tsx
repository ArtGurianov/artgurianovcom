import { Heading } from "@/components/common/Heading/Heading";
import { PageContent } from "@/components/common/PageContent/PageContent";
import { Quote } from "@/components/common/Quote/Quote";
import { RecruitForm } from "@/components/Forms/RecruitForm/RecruitForm";
import { getAppLocale } from "@/lib/utils";
import { getTranslations } from "next-intl/server";

export default async function RecruitPage() {
  const locale = getAppLocale();
  const t = await getTranslations({ locale, namespace: "RECRUIT" });

  return (
    <PageContent>
      <Heading className="mb-4">{"RECRUIT"}</Heading>
      <Quote>
        {
          "Currently I am mostly focused on shipping own products, but feel free to contact and discuss your needs, I might be interested in joining your team."
        }
      </Quote>
      <Heading tag={"h4"} className="text-3xl text-card mt-4 mb-2">
        {"Tech stack"}
      </Heading>
      <ul className="flex flex-col gap-4 justify-center items-center text-muted text-xl text-center">
        <li>
          <span className="font-semibold">{"Frontend: "}</span>
          <span>
            {
              "React.js, Next, Typescript, Webpack, Redux, GraphQL, ThreeJS, Tailwind, Viem, Wagmi, Ethers.js, RTL, Jest, Storybook and more..."
            }
          </span>
        </li>
        <li>
          <span className="font-semibold">{"Backend: "}</span>
          <span>
            {
              "NodeJS, Express, NestJS, Prisma, TypeORM, Mongo, Postgres, Redis, Nginx and more..."
            }
          </span>
        </li>
        <li>
          <span className="font-semibold">{"Blockchain:"}</span>
          <span>{"Solidity, Foundry, Hardhat and more..."}</span>
        </li>
        <li>
          <span className="font-semibold">{"Design: "}</span>
          <span>{"Figma, Lottie, SVGator, Blender and more..."}</span>
        </li>
        <li>
          <span className="font-semibold">{"Infrastructure:"}</span>
          <span>
            {
              "Vercel, CloudinaryCMS, CircleCI, Docker, Git, Jenkins and more..."
            }
          </span>
        </li>
      </ul>
      <Heading tag={"h4"} className="text-3xl text-card mt-4 mb-2">
        {"C.V."}
      </Heading>
      <object
        data="/ArtGurianovCV.pdf"
        type="application/pdf"
        width="100%"
        height="720px"
        className="shadow-2xl"
      />
      <RecruitForm />
    </PageContent>
  );
}
