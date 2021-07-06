import {Link} from 'react-router-dom';

function Header({onClickCart, cartItems}) {

  const totalPrice = cartItems.reduce((sum, obj) => obj.price + sum, 0)

  return (
    <header className="d-flex justify-between align-center p-40">
      <Link to={'/'} className="d-flex align-center">
        <img width={40} height={40} src="/img/logo.png" alt='Logo'/>
        <div>
          <h3 className="text-uppercase">React Sneakers</h3>
          <p className="opacity-5">Магазин лучших кроссовок</p>
        </div>
      </Link>
      <ul className="d-flex">
        <li onClick={onClickCart} className="mr-30 cu-p">
          <img width={18} height={18} src="/img/cart.svg" alt='Cart'/>
          <span>{totalPrice} руб.</span>
        </li>
      </ul>
    </header>
  );
}

export default Header;
