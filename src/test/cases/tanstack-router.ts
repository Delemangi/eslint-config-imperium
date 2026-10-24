// @ts-expect-error -- module not installed, only the ESLint plugin is
import { createRoute } from '@tanstack/react-router';

createRoute({ loader: () => null, beforeLoad: () => null });
createRoute({ beforeLoad: () => null, loader: () => null });
createRoute({ path: '/$user-id' });
createRoute({ path: '/$userId' });

const factory = () => ({ beforeLoad: () => null });
createRoute({ ...factory(), loader: () => null });
