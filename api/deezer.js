export default async function handler(req, res) {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: "Missing 'query' parameter" });
  }

  try {
    const deezerRes = await fetch(
      `https://api.deezer.com/search?q=${encodeURIComponent(query)}`
    );
    const data = await deezerRes.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Deezer API error:", error);
    res.status(500).json({ error: "Failed to fetch from Deezer" });
  }
}
