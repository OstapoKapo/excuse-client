import './Main.scss';
import CardContainer from '../CardContainer/CardContainer';
import Header from '../Header/Header';
import { useNavigate } from 'react-router-dom';

const Main = () => {
    const navigate = useNavigate()

    const logout = () : void => {
        localStorage.setItem('isLoggedIn', 'false');
        navigate('/');
    }

    return (
        <div className='Main'>
            <Header />
            <CardContainer />
            <button onClick={logout} className='Main__logout'>Вийти</button>
        </div>
    )
}

export default Main;
