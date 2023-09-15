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
  const [isVisible, setIsVisible] = useState(false);
  const [search, setSearch] = useState('');

  const handleCartButtonClick = () => {
    setIsVisible(true);
  };

  const handleCloseModal = () => {
    setIsVisible(false);
  };

  const toastConfig = {
    position: 'top-right',
    autoClose: 2 * 1000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: 'colored',
  };

  const addToCart = (product) => {
    const isProductInCart = cartList.some(
      (item) => item.id === product.id
    );

    if (!isProductInCart) {
      const updatedCart = [
        ...cartList,
        { ...product, quantity: 1 },
      ];
      setCartList(updatedCart);
      localStorage.setItem(
        'cartList',
        JSON.stringify(updatedCart)
      );
    } else {
      const updatedCart = cartList.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setCartList(updatedCart);
      localStorage.setItem(
        'cartList',
        JSON.stringify(updatedCart)
      );
    }
  };

  const addItem = (product) => {
    const updatedCart = cartList.map((item) => {
      return item.id === product.id
        ? { ...item, quantity: item.quantity + 1 }
        : item;
    });
    setCartList(updatedCart);
    localStorage.setItem(
      'cartList',
      JSON.stringify(updatedCart)
    );
  };

  const removeFromCart = (product) => {
    if (product.quantity === 1) {
      const updatedCart = cartList.filter(
        (item) => item.id !== product.id
      );
      setCartList(updatedCart);
      localStorage.setItem(
        'cartList',
        JSON.stringify(updatedCart)
      );
    } else {
      const updatedCart = cartList.map((item) => {
        return item.id === product.id
          ? { ...item, quantity: item.quantity - 1 }
          : item;
      });
      setCartList(updatedCart);
      localStorage.setItem(
        'cartList',
        JSON.stringify(updatedCart)
      );
    }
  };

  const removeAllItems = () => {
    if (cartList.length === 0) {
      toast.error(
        'Não há produtos para remover do carrinho',
        toastConfig
      );
    } else {
      setCartList([]);
      localStorage.removeItem('cartList');
      toast.success(
        'Todos os produtos foram removidos do carrinho',
        toastConfig
      );
    }
  };

  const total = cartList.reduce((prevValue, product) => {
    return prevValue + product.price * product.quantity;
  }, 0);

  const filteredProductList = productList.filter((product) => {
    return product.name
      .toLowerCase()
      .includes(search.toLowerCase());
  });

  const cartQuantity = cartList.reduce((prevValue, product) => {
    return prevValue + product.quantity;
  }, 0);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const { data } = await productsApi.get('/products');
        setProductList(data);
      } catch (error) {
        console.log(error);
        toast.error('Ops! Ocorreu um erro', toastConfig);
      }
    };

    getProducts();

    const storedCartList = localStorage.getItem('cartList');
    if (storedCartList) {
      setCartList(JSON.parse(storedCartList));
    }
  }, []);

  return (
    <>
      <Header
        onCartButtonClick={handleCartButtonClick}
        cartQuantity={cartQuantity}
        setSearch={setSearch}
      />
      <main className={styles.container}>
        <ProductList
          productList={
            search === '' ? productList : filteredProductList
          }
          onAddToCart={addToCart}
        />
        {isVisible ? (
          <CartModal
            cartList={cartList}
            onClose={handleCloseModal}
            addItem={addItem}
            onRemoveItem={removeFromCart}
            removeAllItems={removeAllItems}
            total={total}
          />
        ) : null}
      </main>
    </>
  );
};
