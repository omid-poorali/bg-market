import { AppProvider } from './context';
import { ErrorBoundary } from './error-boundary';
import { AppRoutes } from './routes';

export function Application() {
  return (
    <ErrorBoundary>
      <AppProvider>
        <AppRoutes />
      </AppProvider>
    </ErrorBoundary>
  );
}
