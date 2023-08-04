import styles from './style.module.scss';
import { useEffect, useState } from 'react';
import { productsApi } from '../../services/api';
import { Header } from '../../components/Header';
import { CartModal } from '../../components/CartModal';
import { ProductList } from '../../components/ProductList';

export const HomePage = () => {
	const [productList, setProductList] = useState([]);
	const [cartList, setCartList] = useState([]);
	const [isVisible, setIsVisible] = useState(false);

	const handleCartButtonClick = () => {
		setIsVisible(true);
	};

	const handleCloseModal = () => {
		setIsVisible(false);
	};

	useEffect(() => {
		const getProducts = async () => {
			try {
				const { data } = await productsApi.get('/products');
				setProductList(data);
			} catch (error) {
				console.log(error);
			}
		};

		getProducts();
	}, []);

	// useEffect montagem - carrega os produtos da API e joga em productList
	// useEffect atualização - salva os produtos no localStorage (carregar no estado)
	// adição, exclusão, e exclusão geral do carrinho
	// renderizações condições e o estado para exibir ou não o carrinho
	// filtro de busca
	// estilizar tudo com sass de forma responsiva

	return (
		<>
			<Header onCartButtonClick={handleCartButtonClick} />
			<main className={styles.container}>
				<ProductList productList={productList} />
				{isVisible ? (
					<CartModal cartList={cartList} onClose={handleCloseModal} />
				) : null}
			</main>
		</>
	);
};
