import { StoreProvider } from './store';
import { ErrorBoundary } from './error-boundary';
import { AppRoutes } from './routes';

export function Application() {
  return (
    <ErrorBoundary>
      <StoreProvider>
        <AppRoutes />
      </StoreProvider>
    </ErrorBoundary>
  );
}
