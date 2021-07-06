import React from 'react';
import Card from './Card/index';
import a from '../assets/clear.svg';

const Content = ({searchValue, onFavorite, onAddToCart, onSearchInput,setSearchValue, items, setCartItems, isLoading, isItemAdd}) => {

  const renderItems=()=>{
    const filterItems =  items.filter((item)=> item.title.toLowerCase().includes(searchValue.toLowerCase()))
    return (isLoading ? [...Array(8)] : filterItems).map((item, index) => (
            <Card
              key={index}
              onFavorite={(obj) => onFavorite(obj)}
              onPlus={(obj) => onAddToCart(obj)}
              added={isItemAdd(item && item.id)}
              loading={isLoading}
              {...item}
              isItemAdd={isItemAdd}
              setCartItems={setCartItems}
              parentId
            />
          ))
  }
    return (
        <div>
        <div className="content p-40">
        <div className="d-flex align-center justify-between mb-40">
          <h1>{searchValue ? `Поиск по запросу: "${searchValue}"`: 'Все кроссовки'}</h1>
          <div className="search-block d-flex">
            <img src="/img/search.svg" alt="Search" />
            <input onChange={onSearchInput} value={searchValue} placeholder="Поиск..." />
            {searchValue && (
              <img width='10px' src={a} onClick={()=>setSearchValue('')} alt='clear'/>)}
          </div>
        </div>

        <div className="d-flex flex-wrap">
          {renderItems()}
        </div>
      </div>
        </div>
    )
}

export default Content;
