import { describe, expect, test } from "vitest";
import { buildApp } from "./app.js";

describe("zod validation", () => {
  test("parses nested config and strips unknown fields", async () => {
    const app = buildApp();
    const res = await app.inject({
      method: "POST",
      url: "/api/projects",
      payload: { name: "project-a", config: { retries: 3 }, extra: "ignored" },
    });
    expect(res.statusCode).toBe(200);
    expect(res.json()).toEqual({ name: "project-a", config: { retries: 3 } });
  });
});
