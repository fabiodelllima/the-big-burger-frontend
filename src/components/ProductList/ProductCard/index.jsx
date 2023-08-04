import styles from './style.module.scss';

export const ProductCard = ({ product }) => {
	return (
		<li className={styles.container}>
			<div className={styles.imgContainer}>
				<img src={product.img} alt={product.name} />
			</div>
			<div className={styles.description}>
				<h3 className={styles.name}>{product.name}</h3>
				<span className={styles.category}>{product.category}</span>
				<span className={styles.price}>
					{product.price.toLocaleString('pt-BR', {
						style: 'currency',
						currency: 'BRL',
					})}
				</span>
				<button className={styles.button}>Adicionar</button>
			</div>
		</li>
	);
};
