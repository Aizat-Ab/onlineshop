import React from 'react';
import Content from './Content';
import axios from 'axios';
import Drawer from './Drawer';
import Header from './Header';


const AppContext = React.createContext({})

const Home = () => {
  const [cartOpened, setCartOpened] = React.useState(false);
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [ searchValue, setSearchValue ] = React.useState('');
  const [ isReady, setIsReady ] = React.useState(true);

  React.useEffect(() => {
     async function fetchData(){
      try{
       const [cartResponce, itemsResponce] = await Promise.all([
         axios.get('https://60d4148561160900173ca47f.mockapi.io/cart'), axios.get('https://60d4148561160900173ca47f.mockapi.io/items')])

      // setIsReady(true)
      setIsReady(false)
      setCartItems(cartResponce.data);
      setItems(itemsResponce.data);
      } catch(error){
        alert('Ошибка при запросе данных') 
      }
     }
     fetchData()
  }, []);

  const onAddToCart = async (obj) => {
    try {
      const findItem = cartItems.find((item)=> Number(item.parentId) === Number(obj.id));
      if(findItem){
        axios.delete(`https://60d4148561160900173ca47f.mockapi.io/cart/${findItem.id}`);
        setCartItems((prev) => prev.filter((item)=> Number(item.parentId) !== Number(obj.id)));
      } else{
        setCartItems((prev) => [...prev, obj]);
        const {data} = await axios.post('https://60d4148561160900173ca47f.mockapi.io/cart', obj);
        setCartItems((prev) => prev.map(item => {
          if(item.parentId === data.parentId){
            return {
              ...item,
              id: data.id
            }
          }
          return item;
         
        }));
      }
    } catch(error){
      alert('Ошибка при добавлении корзины')
    }
  };

  const onSearchInput = (e) => {
    setSearchValue(e.target.value);
  }

  const onRemoveItem = (id) => {
    try{
      axios.delete(`https://60d4148561160900173ca47f.mockapi.io/cart/${id}`);
      setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(id)));
    } catch (error) {
      alert('Ошибка при удалении из корзины') 
    }
  };

  const isItemAdd = (id) => {
    return cartItems.some(obj => Number(obj.parentId) === Number(id))
  }

    return (
      <>
        <div>
        <Header cartItems={cartItems} onClickCart={() => setCartOpened(true)} />
        {cartOpened && <Drawer cartItems={cartItems} setCartItems={setCartItems} cartOpened={cartOpened} onRemove={onRemoveItem} items={cartItems} onClose={() => setCartOpened(false)}/>}
        <Content 
        searchValue={searchValue} 
        onAddToCart={onAddToCart}
        onSearchInput={onSearchInput}
        setSearchValue={setSearchValue}
        items={items}
        cartItems={cartItems}
        isLoading={isReady}
        isItemAdd={isItemAdd}
        setCartItems={setCartItems}/>
        </div>
        
      </>
    )
}

export default Home;
