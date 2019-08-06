import React from 'react';
import Layout from './Containers/Layout/Layout';
import BurgerBuilder from './Containers/BurgerBuilder/BurgerBuilder'

function App() {
  return (
    <div>
      <Layout>
        <BurgerBuilder></BurgerBuilder>
      </Layout>
    </div>
  );
}

export default App;
