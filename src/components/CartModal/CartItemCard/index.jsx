import styles from './style.module.scss';

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
            <div className={styles.decrementQuantityContainer}>
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
            <div className={styles.incrementQuantityContainer}>
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
