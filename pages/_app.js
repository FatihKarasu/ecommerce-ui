import Layout from "../components/Layout";
import { Provider } from "react-redux";
import store from "../redux/store";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "@fortawesome/fontawesome-free";
import "../styles/globals.scss";
import "bootstrap/dist/css/bootstrap.css";
import "@fortawesome/fontawesome-svg-core/styles.css"; // import Font Awesome CSS
import { config } from "@fortawesome/fontawesome-svg-core";
import { SSRProvider } from "@react-aria/ssr";
config.autoAddCss = false;

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <SSRProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SSRProvider>
    </Provider>
  );
}

export default MyApp;

