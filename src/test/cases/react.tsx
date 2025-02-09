type Props = {
  enabled: boolean;
};

export const Component = ({ enabled }: Props) => {
  const message = enabled ? 'Enabled' : 'Disabled';

  return <div children={message}></div>;
};
