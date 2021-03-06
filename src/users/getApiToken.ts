import { getAccessToken } from "@auth0/nextjs-auth0";
import { NextApiRequest, NextApiResponse } from "next";

export default async function getApiToken(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<string | null> {
  try {
    const { accessToken } = await getAccessToken(req, res);
    // const { accessToken } = await tokenCache.getAccessToken();
    return accessToken ?? null;
  } catch (err) {
    return null;
  }
}
