// @ts-expect-error -- module not installed, only the ESLint plugin is
import { QueryClient } from '@tanstack/react-query';

export function App() {
  const queryClient = new QueryClient();
  return <div>{String(queryClient)}</div>;
}
