import React from 'react';

const Modal = ({onClose, title, subTitle, description, image}) => {
    return (
        <div>
            <div className='empty'>
            <h2>{title}</h2>
            <p>{subTitle}</p>
            <p>{description}</p>
            <img className='empty__img' alt='empty' width='190px' src={image}/>
            <button onClick={onClose} className='greenButton'>Вернуться назад</button>
        </div>
        </div>
    )
}

export default Modal;
