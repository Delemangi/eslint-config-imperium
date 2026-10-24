// @ts-expect-error -- module not installed, only the ESLint plugin is
import { test, expect } from "@playwright/test";

type TestContext = {
  page: {
    evaluate(callback: () => void): Promise<void>;
    getByRole(role: string): { click(): Promise<void> };
  };
};

test.only("focused", async ({ page }: TestContext) => {
  expect(page).toHaveTitle("Example");

  test.step("unawaited step", async () => {
    expect(1).toBe(1);
  });
});

test("valid", async ({ page }: TestContext) => {
  await page.getByRole("button").click();
  await expect(page).toHaveTitle("Example");
});

test("conditional skip with reason", async ({}) => {
  test.skip(true, "Requires a supported browser");
  expect({ value: 1 }, "custom assertion message").toStrictEqual({ value: 1 });
});

test("conditional skip without reason", async ({}) => {
  test.skip(true);
  expect(1).toBe(1);
});

test("strict matcher", async ({}) => {
  expect({ value: 1 }).toEqual({ value: 1 });
});

test("retry without timeout", async ({}) => {
  await expect(async () => {
    expect(1).toBe(1);
  }).toPass();
});

test("retry with timeout", async ({}) => {
  await expect(async () => {
    expect(1).toBe(1);
  }).toPass({ timeout: 1000 });
});

test("retry with reusable options", async ({}) => {
  const options = { timeout: 1000 };
  await expect(async () => {
    expect(1).toBe(1);
  }).toPass(options);
});

test("returned assertion promise", ({ page }: TestContext) => {
  return expect(page).toHaveTitle("Example");
});

const {} = { value: 1 };

test.skip("skipped", async ({}) => {
  expect(1).toBe(1);
});

test("conditional fixme with reason", async ({}) => {
  test.fixme(true, "Requires a supported browser");
  expect(1).toBe(1);
});

test.fixme("unconditional fixme", async ({}) => {
  expect(1).toBe(1);
});

test("synchronous methods", async ({ page }: TestContext) => {
  const map = new Map();
  map.clear();
  const values = Array(3);
  values.fill(0);
  await page.evaluate(() => {
    const button = document.createElement("button");
    button.click();
  });

  await test.step("awaited step", async () => {
    expect(1).toBe(1);
  });

  await expect(page).toHaveTitle("Example");
});
