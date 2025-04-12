const URL = process.env.PINGLEAD_URL;
const API_KEY = process.env.PINGLEAD_API_KEY;

interface PingLeadProps {
  action: string;
  [key: string]: string | number | boolean;
}

export const pingLead = async (props: PingLeadProps) => {
  if (!URL || !API_KEY) {
    console.error("Env vars for PingLead are not provided!.");
    return;
  }

  const now = new Date().getTime();

  await fetch(URL, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      apiKey: API_KEY,
      title: "From ArtGurianov.com",
      timestamp: now,
      ...props,
    }),
  });
};
