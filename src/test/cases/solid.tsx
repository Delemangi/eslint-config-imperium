type Props = {
  count: number;
};

// solid/no-destructure - destructuring props
export const Component = ({ count }: Props) => {
  // solid/no-react-specific-props - using key prop
  return (
    <div key="test">
      {/* solid/no-array-handlers - array handler in event */}
      <button onClick={[() => {}, count]}>Click</button>
    </div>
  );
};
