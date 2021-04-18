import { rest } from "msw";

export default [
  rest.get("/api/auth/me", (_req, res, ctx) => {
    console.log("Auth");
    return res(
      ctx.json({
        name: "UserName"
      })
    );
  })
];
