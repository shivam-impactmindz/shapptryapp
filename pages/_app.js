import AppBridgeProvider from "@/components/providers/AppBridgeProvider";
import { AppProvider as PolarisProvider } from "@shopify/polaris";
import "@shopify/polaris/build/esm/styles.css";
import translations from "@shopify/polaris/locales/en.json";
import Link from "next/link";

const App = ({ Component, pageProps }) => {
  return (
    <>
      <PolarisProvider i18n={translations}>
       
          <ui-nav-menu>
            
          </ui-nav-menu>
          <Component {...pageProps} />
      
      </PolarisProvider>
    </>
  );
};

export default App;
