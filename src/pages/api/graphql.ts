// import getAccessToken from "../../users/getAccessToken";
import { NextApiRequest, NextApiResponse } from "next";
import { REMOTE_ENDPOINT } from "../../graphql/constants";
import getApiToken from "../../users/getApiToken";

export default async function graphql(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const accessToken = await getApiToken(req, res);

  const result = await fetch(REMOTE_ENDPOINT, {
    method: "POST",
    body: JSON.stringify(req.body),
    headers: {
      "Content-Type": "application/json",
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {})
    }
  });
  res.status(result.status);
  res.json(await result.json());
}
