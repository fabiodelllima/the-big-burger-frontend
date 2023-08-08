import styles from './style.module.scss';
import { useEffect, useState } from 'react';
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

	const addToCart = (product) => {
		const isProductInCart = cartList.some((item) => item.id === product.id);

		if (!isProductInCart) {
			setCartList([...cartList, 
				{ ...product, quantity: 1}
			]);	
		} else {
			const updatedCart = cartList.map((item) => item.id === product.id 
				? { ...item, quantity: item.quantity + 1 } 
				: item
			);

			setCartList(updatedCart);
		}
		setCartQuantity(cartQuantity + 1);
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
				setProductList(data);
				setFilteredProductList(data);
			} catch (error) {
				console.log(error);
			}
		};

		getProducts();
	}, []);

	// // useEffect montagem - carrega os produtos da API e joga em productList
	// useEffect atualização - salva os produtos no localStorage (carregar no estado)
	// // adição, exclusão, e exclusão geral do carrinho
	// // renderizações condições e o estado para exibir ou não o carrinho
	// // filtro de busca
	// estilizar tudo com sass de forma responsiva

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
