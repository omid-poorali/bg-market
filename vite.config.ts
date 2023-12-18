import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import EnvironmentPlugin from 'vite-plugin-environment';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths(), EnvironmentPlugin({
    // Uses 'development' if the NODE_ENV environment variable is not defined.
    NODE_ENV: 'development',
  
    // Have in mind that variables coming from process.env are always strings.
    DEBUG: 'false'
  })],
  // server: {
  //   watch: {
  //     usePolling: true,
  //   },
  //   host: true, // needed for the Docker Container port mapping to work
  //   strictPort: true,
  //   port: 5173, // you can replace this port with any port
  // }
});