export const Component = () => {
  return <div children="text"></div>;
};

export const Nested = () => {
  const Inner = () => <span>nested</span>;

  return <Inner />;
};
