import styles from './style.module.scss';
import { MdDelete } from 'react-icons/md';

export const CartItemCard = ({ product }) => {
	return (
		<li className={styles.container}>
			<div>
				<img src={product.img} alt={product.name} />
				<h3>{product.name}</h3>
			</div>
			<button aria-label='delete' title='Remover item'>
				<MdDelete size={21} />
			</button>
		</li>
	);
};
