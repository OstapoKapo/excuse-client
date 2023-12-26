import './CardContainer.scss';
import Card from '../Card/Card';

interface Vidmazka{
    excuse: string,
    date: string,
    creator: string
}

let array: Array<Vidmazka> = [
    {creator: 'admin', date: '26/12/2023', excuse: 'Я забув'},
    {creator: 'admin', date: '26/12/2023', excuse: 'Я забув'},
    {creator: 'admin', date: '26/12/2023', excuse: 'Я забув'},
    {creator: 'admin', date: '26/12/2023', excuse: 'Я забув'},
    {creator: 'admin', date: '26/12/2023', excuse: 'Я забув'},
    {creator: 'admin', date: '26/12/2023', excuse: 'Я забув'}
]


const CardContainer = () => {
    return (
        <div className='CardContainer'>
            <div className="block_adding-cards">
                <input type="text" className="input_adding-cards" placeholder='Автор' />
                <input type="text" className="input_adding-cards" placeholder='Відмазка' />
                <button className="btn_adding-cards">Додати нову відмазку</button>
            </div>
            <div className="block_cards">
                {array.map(item=> <Card key={item} excuse={item.excuse} creator={item.creator}/>)}
            </div>
        </div>
    )
}

export default CardContainer