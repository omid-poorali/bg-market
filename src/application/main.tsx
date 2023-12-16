import { ErrorBoundary } from './error-boundary';
import { AppRoutes } from './routes';

export function Application() {
  return (
    <ErrorBoundary>
      <AppRoutes />
    </ErrorBoundary>
  );
}
