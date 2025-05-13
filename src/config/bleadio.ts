const URL = process.env.BLEADIO_URL;
const API_KEY = process.env.BLEADIO_API_KEY;

interface BleadioProps {
  action: string;
  [key: string]: string | number | boolean;
}

export const bleadio = async (props: BleadioProps) => {
  if (!URL || !API_KEY) {
    console.error("Env vars for Bleadio are not provided!.");
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
