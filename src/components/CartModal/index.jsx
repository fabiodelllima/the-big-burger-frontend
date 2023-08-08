import styles from './style.module.scss';
import { MdClose } from 'react-icons/md';
import { CartItemCard } from './CartItemCard';

export const CartModal = ({ cartList, onClose, onRemoveItem, removeAllItems, total }) => {
	const totalValue = cartList.reduce((prevValue, product) => {
		return prevValue + product.price * product.quantity;
	}, 0);

	return (
		<div role='dialog' className={styles.container}>
			<header className={styles.header}>
				<h2 className={styles.title}>Carrinho de compras</h2>
				<button 
					className={styles.closeButton}
					aria-label='close' 
					title='Fechar'
					onClick={onClose}
				>
					<MdClose size={21} />
				</button>
			</header>
			<main className={styles.main}>
				<ul className={styles.productList}>
					{cartList.map((product) => (
						<CartItemCard 
							key={product.id} 
							product={product} 
							onRemoveItem={onRemoveItem}
							totalValue={totalValue}
						/>
					))}
				</ul>
			</main>
			<foooter className={styles.footer}>
				<div className={styles.footerSubcontainer}>
					<div className={styles.totalContainer}>
						<span className={styles.totalTitle}>Total</span>
						<span className={styles.totalQuantity}>
							{totalValue.toLocaleString('pt-BR', {
								style: 'currency',
								currency: 'BRL',
							})}
						</span>
					</div>
					<button 
						className={styles.removeButton}
						onClick={removeAllItems}
					>
						Remover todos
					</button>
				</div>
			</foooter>
		</div>
	);
};
