import styles from './style.module.scss';
import { MdClose } from 'react-icons/md';
import { CartItemCard } from './CartItemCard';

export const CartModal = ({ cartList, onClose }) => {
	const total = cartList.reduce((prevValue, product) => {
		return prevValue + product.price;
	}, 0);

	return (
		<div role='dialog' className={styles.container}>
			<div className={styles.header}>
				<h2 className={styles.title}>Carrinho de compras</h2>
				<button 
					className={styles.closeButton}
					aria-label='close' 
					title='Fechar'
					onClick={onClose}
				>
					<MdClose size={21} />
				</button>
			</div>
			<div className={styles.main}>
				<ul className={styles.productList}>
					{cartList.map((product) => (
						<CartItemCard key={product.id} product={product} />
					))}
				</ul>
			</div>
			<div className={styles.footer}>
				<div className={styles.totalContainer}>
					<span className={styles.totalTitle}>Total</span>
					<span className={styles.totalQuantity}>
						{total.toLocaleString('pt-BR', {
							style: 'currency',
							currency: 'BRL',
						})}
					</span>
				</div>
				<button className={styles.removeButton}>Remover todos</button>
			</div>
		</div>
	);
};
