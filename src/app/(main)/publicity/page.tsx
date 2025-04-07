import { Heading } from "@/components/common/Heading/Heading";
import { PageContent } from "@/components/common/PageContent/PageContent";
import { Socials } from "@/components/Socials/Socials";

export default function PublicityPage() {
  return (
    <PageContent className="md:flex-row grow pr-0">
      <div className="grow">
        <Heading tag="h2">{"Blogposts"}</Heading>
      </div>
      <div className="flex flex-col justify-center w-full md:max-w-[320px] bg-muted/10 rounded-tl-4xl border-t-2 border-l-8 overflow-clip">
        <Heading tag="h2" className="py-4 bg-muted/20 px-0 border-b">
          {"Socials"}
        </Heading>
        <Socials />
      </div>
    </PageContent>
  );
}
