import { useState } from 'react';
import styles from './style.module.scss';
import Cart from '../../assets/cart.svg';
import Logo from '../../assets/Logo.svg';
import { MdSearch } from 'react-icons/md';

export const Header = ({ onCartButtonClick, cartQuantity, productList, setFilteredProductList }) => {
	const [value, setValue] = useState('');

	const updateProductList = (e) => {
		e.preventDefault();

		const filteredProductList = productList.filter((product) => {
			return product.name.toLowerCase().includes(value.toLowerCase());
		});

		setFilteredProductList(filteredProductList);
	}

	return (
		<header className={styles.header}>
			<div className={styles.headerContainer}>
				<div className={styles.imgContainer}>
					<img src={Logo} alt='Logo Kenzie Burguer' />
				</div>
				<div className={styles.test}>
					<button 
						className={styles.cartButton} 
						onClick={onCartButtonClick}
					>						
						<img className={styles.cartImg} src={Cart} />
						<span className={styles.cartQuantity}>{cartQuantity}</span>
					</button>
				</div>
			</div>
			<div className={styles.searchContainer}>
				<form 
					className={styles.formContainer} 
					onSubmit={(e) => updateProductList(e)}
				>
					<input
						className={styles.searchInput}
						type='text'
						value={value}
						onChange={(e) => setValue(e.target.value)}
						placeholder='Digitar Pesquisa'
					/>
					<button className={styles.searchButton} type='submit'>
						<MdSearch size={21} />
					</button>
				</form>
			</div>
		</header>
	);
};
