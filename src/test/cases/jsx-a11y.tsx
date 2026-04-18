type Props = {
  readonly enabled: boolean;
};

export const Component = ({ enabled }: Props) => {
  const label = enabled ? 'Enabled' : 'Disabled';

  return (
    <div>
      <img src='test.png' />
      <div onClick={() => {}} />
      <span tabIndex={1}>
        {label}
      </span>
    </div>
  );
};
