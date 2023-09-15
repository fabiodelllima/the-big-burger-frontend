import styles from './style.module.scss';
import { useState } from 'react';
import { MdSearch } from 'react-icons/md';
import Cart from '../../assets/cart.svg';
import Logo from '../../assets/Logo.png';

export const Header = ({
  onCartButtonClick,
  cartQuantity,
  setSearch,
}) => {
  const [value, setValue] = useState('');

  const updateProductList = (e) => {
    e.preventDefault();
    setSearch(value);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.subContainerA}>
          <div className={styles.logoContainer}>
            <img className={styles.logo} src={Logo} />
          </div>
          <div className={styles.cartContainer}>
            <button
              className={styles.cartButtonContainer}
              onClick={onCartButtonClick}
            >
              <img className={styles.cartImg} src={Cart} />
              <span className={styles.cartQuantity}>
                {cartQuantity}
              </span>
            </button>
          </div>
        </div>
        <div className={styles.subContainerB}>
          <form
            className={styles.formContainer}
            onSubmit={updateProductList}
          >
            <input
              className={styles.searchInput}
              type='text'
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <button
              className={styles.searchButton}
              type='submit'
            >
              <MdSearch size={21} />
            </button>
          </form>
        </div>
      </div>
    </header>
  );
};
