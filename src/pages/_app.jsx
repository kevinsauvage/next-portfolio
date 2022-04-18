import "../../styles/globals.scss";
import { useSmoothScroll } from "../hooks/useSmoothScroll";

function MyApp({ Component, pageProps }) {
  useSmoothScroll();
  return <Component {...pageProps} />;
}

export default MyApp;
