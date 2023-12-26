import './CardContainer.scss';
import Card from '../Card/Card';
const CardContainer = () => {
    return (
        <div className='CardContainer'>
            <div className="block_adding-cards">
                <input type="text" className="input_adding-cards" />
                <button className="btn_adding-cards">Додати нову відмазку</button>
            </div>
            <div className="block_cards">
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
            </div>
        </div>
    )
}

export default CardContainer