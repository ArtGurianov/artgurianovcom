import { Heading } from "@/components/common/Heading/Heading";
import { PageContent } from "@/components/common/PageContent/PageContent";
import { Socials } from "@/components/Socials/Socials";

export default function PublicityPage() {
  return (
    <PageContent className="md:flex-row">
      <div className="grow">
        <Heading tag="h2">{"Blogposts"}</Heading>
      </div>
      <div className="flex flex-col gap-4 justify-center grow md:max-w-[320px]">
        <Heading tag="h2">{"Socials"}</Heading>
        <Socials />
      </div>
    </PageContent>
  );
}
