import { NextApiRequest, NextApiResponse } from "next";
import { REMOTE_ENDPOINT } from "../../graphql/constants";
import getAccessToken from "../../users/getAccessToken";

export default async function graphql(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const accessToken = await getAccessToken(req, res);

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
