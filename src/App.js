import { Fragment } from 'react';
import Cart from './conponents/Cart/Cart';
import Header from './conponents/Layout/Header';
import Meals from './conponents/Meals/Meals';

function App() {
  return (
    <Fragment>
      <Cart />
      <Header />
      <main>
        <Meals />
      </main>
    </Fragment>
  );
}

export default App;
