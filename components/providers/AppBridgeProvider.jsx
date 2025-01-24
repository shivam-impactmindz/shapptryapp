const AppBridgeProvider = ({ children }) => {
  if (typeof window !== "undefined") {
    const shop = "shivam12store.myshopify.com";

    if (!shop) {
      return <p>No Shop Provided</p>;
    }
  }

  return <>{children}</>;
};

export default AppBridgeProvider;
