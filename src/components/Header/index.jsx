import { useState } from 'react';
import styles from './style.module.scss';
import Logo from '../../assets/Logo.svg';
import { MdSearch, MdShoppingCart } from 'react-icons/md';
import { CartModal } from '../CartModal';

export const Header = ({ onCartButtonClick }) => {
	const [value, setValue] = useState('');

	return (
		<header className={styles.header}>
			<div className={styles.headerContainer}>
				<div className={styles.imgContainer}>
					<img src={Logo} alt='Logo Kenzie Burguer' />
				</div>
				<button 
					className={styles.cartButton} 
					onClick={onCartButtonClick}
				>
					<MdShoppingCart size={21} />
					<span className={styles.cartQuantity}>0</span>
				</button>
			</div>
			<div className={styles.searchContainer}>
				<form className={styles.formContainer}>
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
