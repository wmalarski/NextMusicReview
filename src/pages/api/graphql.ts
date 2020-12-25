import { NextApiRequest, NextApiResponse } from "next";
import auth0 from "../../users/auth0";

async function getAccessToken(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<string | null> {
  try {
    const tokenCache = auth0.tokenCache(req, res);
    const { accessToken } = await tokenCache.getAccessToken();
    return accessToken ?? null;
  } catch (err) {
    return null;
  }
}

export default async function graphql(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const accessToken = await getAccessToken(req, res);

  const result = await fetch(
    "https://next-music-rating.azurewebsites.net/graphql",
    {
      method: "POST",
      body: JSON.stringify(req.body),
      headers: {
        "Content-Type": "application/json",
        ...(accessToken ? { Authorization: accessToken } : {})
      }
    }
  );
  res.status(result.status);
  res.json(await result.json());
}
