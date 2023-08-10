import styles from './style.module.scss';
import TrashCan from '../../../assets/trash-can.svg'

export const CartItemCard = ({ product, onRemoveItem }) => {
	return (
		<li className={styles.container}>				
				<div className={styles.imgContainer}>
					<img 
						className={styles.img}
						src={product.img} 
						alt={product.name} />
				</div>
				<div className={styles.subcontainer}>					
					<div className={styles.titleContainer}>
						<h3 className={styles.title}>
							{product.name}
						</h3>
						<button
							className={styles.removeItemButton} 
							aria-label='delete' 
							title='Remover item'
							onClick={() => onRemoveItem(product)}
						>
							<img src={TrashCan} />							
						</button>		
					</div>
					<div className={styles.quantityContainer}>
						<p className={styles.quantityTitle}>
							Quantidade:
						</p>
						<span className={styles.quantity}>
							{product.quantity}
						</span>
					</div>
				</div>
		</li>
	);
};
