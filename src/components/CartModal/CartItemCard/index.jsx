import styles from './style.module.scss';
import TrashCan from '../../../assets/trash-can.svg';

export const CartItemCard = ({
  product,
  onAddItem,
  onRemoveItem,
}) => {
  return (
    <li className={styles.container}>
      <div className={styles.imgContainer}>
        <img
          className={styles.img}
          src={product.img}
          alt={product.name}
        />
      </div>
      <div className={styles.subContainer}>
        <div className={styles.titleContainer}>
          <h3 className={styles.title}>{product.name}</h3>
          <div className={styles.quantityContainer}>
            <div className={styles.quantityDecreaseContainer}>
              <button
                className={styles.quantityButton}
                onClick={() => onRemoveItem(product)}
              >
                -
              </button>
            </div>
            <div className={styles.actualQuantityContainer}>
              <span className={styles.quantity}>
                {product.quantity}
              </span>
            </div>
            <div className={styles.quantityIncreaseContainer}>
              <button
                className={styles.quantityButton}
                onClick={() => onAddItem(product)}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};
