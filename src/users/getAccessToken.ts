import { NextApiRequest, NextApiResponse } from "next";
import auth0 from "./auth0";

export default async function getAccessToken(
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
