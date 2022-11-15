import type { AppProps } from "next/app";
import { MeshProvider } from "@martifylabs/mesh-react";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MeshProvider>
      <Component {...pageProps} />
    </MeshProvider>
  );
}
