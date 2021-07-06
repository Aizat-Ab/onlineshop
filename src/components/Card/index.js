import React from 'react';
import ContentLoader from "react-content-loader"
import styles from './Card.module.scss';

function Card({id, title, imageUrl, price, onPlus, added = false, loading = false, isItemAdd, parentId }) {
  const [isAdded, setIsAdded] = React.useState(added);

  const onClickPlus = () => {
    onPlus({ id, title, imageUrl, price, parentId: id });
    setIsAdded(!isAdded);
  };

  return (
    <div className={styles.card}>
      {
        loading ? <ContentLoader 
        speed={2}
        width={150}
        height={213}
        viewBox="0 0 150 213"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
      >
        <rect x="0" y="0" rx="10" ry="10" width="150" height="90" /> 
        <rect x="0" y="104" rx="3" ry="3" width="150" height="15" /> 
        <rect x="0" y="126" rx="3" ry="3" width="98" height="15" /> 
        <rect x="0" y="157" rx="3" ry="3" width="80" height="24" /> 
        <rect x="115" y="149" rx="9" ry="9" width="34" height="34" />
      </ContentLoader> : <>
        <img width={133} height={112} src={imageUrl} alt="Sneakers" />
      <h5>{title}</h5>
      <div className="d-flex justify-between align-center">
        <div className="d-flex flex-column">
          <span>Цена:</span>
          <b>{price} руб.</b>
        </div>
        <img
          className={styles.plus}
          onClick={onClickPlus}
          src={isItemAdd(id) ? '/img/btn-checked.svg' : '/img/btn-plus.svg'}
          alt="Plus"
        />
      </div>
    </>
        }
    </div>

  );
}

export default Card;
