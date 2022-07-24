import { Fragment, useState } from "react";
import Cart from "./conponents/Cart/Cart";
import Header from "./conponents/Layout/Header";
import Meals from "./conponents/Meals/Meals";
import CartProvider from "./store/CartProvider";

function App() {
  const [isShownCart, setIsShownCart] = useState(false);

  const showCartHandler = () => {
    setIsShownCart(true);
  };

  const hideCartHandler = () => {
    setIsShownCart(false);
  };

  return (
    <CartProvider>
      {isShownCart && (
        <Cart onShowCart={showCartHandler} onClose={hideCartHandler} />
      )}

      <Header onShowCart={showCartHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
