import styles from './style.module.scss';

export const ProductCard = ({ product, onAddToCart }) => {
	return (
		<li className={styles.container}>
			<div className={styles.imgContainer}>
				<img 
					className={styles.img} 
					src={product.img} 
					alt={product.name} 
					data-name={product.name}
				/>
			</div>
			<div className={styles.descriptionContainer}>
				<h3 className={styles.name}>
					{product.name}
				</h3>
				<span className={styles.category}>
					{product.category}
				</span>
				<span className={styles.price}>
					{ product.price.toLocaleString('pt-BR', {
						style: 'currency',
						currency: 'BRL',
					})}
				</span>
				<button 
					className={styles.button} 
					onClick={() => onAddToCart(product)}
				>
					Adicionar
				</button>
			</div>
		</li>
	);
};
