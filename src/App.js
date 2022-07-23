import { Fragment, useState } from 'react';
import Cart from './conponents/Cart/Cart';
import Header from './conponents/Layout/Header';
import Meals from './conponents/Meals/Meals';

function App() {
  const [isShownCart, setisShownCart] = useState(false);

  const showCartHandler = () => {
    setisShownCart(true);
  };

  const hideCartHandler = () => {
    setisShownCart(false);
  };

  return (
    <Fragment>
      {isShownCart && <Cart onShowCart={showCartHandler} />}

      <Header />
      <main>
        <Meals />
      </main>
    </Fragment>
  );
}

export default App;
