const value: Promise<number> = Promise.resolve(1);

/** Await the value. */
export const check = async (): Promise<void> => {
  await value;
};
