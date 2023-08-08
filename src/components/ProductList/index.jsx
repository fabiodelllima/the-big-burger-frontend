import styles from './style.module.scss';
import { ProductCard } from './ProductCard';

export const ProductList = ({ productList, onAddToCart }) => {
	return (
		<ul className={styles.container}>
			{productList.map((product) => (
				<ProductCard 
					key={product.id} 
					product={product} 
					onAddToCart={() => onAddToCart(product)}
				/>
			))}
		</ul>
	);
};
