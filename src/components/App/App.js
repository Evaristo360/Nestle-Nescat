import React, { useEffect } from 'react';
import { Navigation } from 'routes/Navigation';
import Layout from 'layouts';
import { Images } from 'assets';

const App = () => {
  useEffect(() => {
    const link = document.querySelector("link[rel='icon']");
    if (link) {
      link.href = Images.Favicon;
    }
  }, []);

  return (
    <Layout>
      <Navigation />
    </Layout>
  );
};

export default App;
