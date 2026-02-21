interface BleadioPayload {
  action: string;
  [key: string]: string | number | boolean | undefined;
}

export const sendBleadio = async (
  url: string | undefined,
  apiKey: string | undefined,
  payload: BleadioPayload
) => {
  if (!url || !apiKey) {
    return;
  }

  try {
    await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        apiKey,
        title: "From ArtGurianov.com",
        timestamp: Date.now(),
        ...payload,
      }),
    });
  } catch {
    // Notification failures should not fail form submissions.
  }
};
