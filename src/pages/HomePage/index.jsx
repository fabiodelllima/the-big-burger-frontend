import styles from './style.module.scss';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { productsApi } from '../../services/api';
import { Header } from '../../components/Header';
import { CartModal } from '../../components/CartModal';
import { ProductList } from '../../components/ProductList';

export const HomePage = () => {
	const [productList, setProductList] = useState([]);
	const [cartList, setCartList] = useState([]);
	const [cartQuantity, setCartQuantity] = useState(0);
	const [isVisible, setIsVisible] = useState(false);	
	const [search, setSearch] = useState('');
	const [filteredProductList, setFilteredProductList] = useState(productList);

	const handleCartButtonClick = () => {
		setIsVisible(true);
	};

	const handleCloseModal = () => {
		setIsVisible(false);
	};

	const toastConfig = {
		position: 'top-center',		
		autoClose: 3 * 1000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
	};

	const addToCart = (product) => {
		const isProductInCart = cartList.some((item) => item.id === product.id);

		if (!isProductInCart) {
			setCartList([...cartList, 
				{ ...product, quantity: 1}
			]);
			toast.success(`
				${product.name} foi adicionado ao carrinho`, 
				toastConfig
			);
		} else {
			const updatedCart = cartList.map((item) => item.id === product.id 
				? { ...item, quantity: item.quantity + 1 } 
				: item
			);

			setCartList(updatedCart);
			toast.success(`
				${product.name} foi adicionado novamente ao carrinho`, 
				toastConfig
			);
		}

		setCartQuantity(cartQuantity + 1);
		localStorage.setItem('cartList', JSON.stringify(cartList));
	};

	const removeFromCart = (product) => {
		const updatedCart = cartList.filter((item) => item.id !== product.id);
		setCartList(updatedCart);
		setCartQuantity(cartQuantity - product.quantity);
	};

	const removeAllItems = () => {
		setCartList([]);
		setCartQuantity(0);
	}

	const total = cartList.reduce((prevValue, product) => {
		return prevValue + product.price * product.quantity;
	}, 0);
	
	useEffect(() => {
		const getProducts = async () => {
			try {
				const { data } = await productsApi.get('/products');
				const userProductList = JSON.parse(localStorage.getItem('cartList'));
				
				setProductList(data);
				setFilteredProductList(data);

				if (userProductList) {
					setCartList(userProductList);
					const userProductQuantity = userProductList.reduce(
						(prevValue, product) => prevValue + product.quantity, 0
					);
					setCartQuantity(userProductQuantity);
				}

			} catch (error) {
				console.log(error);
			}
		};

		getProducts();
	}, []);

	return (
		<>
      <Header 
				onCartButtonClick={handleCartButtonClick} 
				cartQuantity={cartQuantity}
				setSearch={setSearch}
				productList={productList} 
				setFilteredProductList={setFilteredProductList}
			/>
      <main className={styles.container}>
        <ProductList 
					productList={filteredProductList} 
					// productList={productList} 
					onAddToCart={addToCart} 
				/>
        { isVisible 
					? (
							<CartModal 
								cartList={cartList} 
								onClose={handleCloseModal} 
								onRemoveItem={removeFromCart} 
								removeAllItems={removeAllItems}
								total={total} 
							/>
						) 
					: null
				}
      </main>
    </>
	);
};
