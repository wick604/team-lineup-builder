export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) {
    res.status(400).send("Missing url parameter.");
    return;
  }

  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0",
        "Accept": "text/calendar,text/plain,*/*"
      }
    });

    if (!response.ok) {
      res.status(response.status).send(`Upstream fetch failed: ${response.status}`);
      return;
    }

    const text = await response.text();

    res.setHeader("Content-Type", "text/calendar; charset=utf-8");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200).send(text);
  } catch (error) {
    res.status(500).send(error?.message || "Server error fetching calendar.");
  }
}
