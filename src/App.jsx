import './styles/index.scss';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { HomePage } from './pages/HomePage';

const App = () => {
	return (
		<>
			<HomePage />
			<ToastContainer />
		</>
	);
};

export default App;
