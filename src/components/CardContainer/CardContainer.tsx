import { useState } from 'react';
import axios from 'axios';
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
    const [exuse, setExuse] = useState<string>('');
    const [creator, setCreator] = useState<string>('');

    const getCurrentDate = () : string => {
        const currentDate: Date = new Date();
    
        const day: string = currentDate.getDate().toString().padStart(2, '0');
        const month: string = (currentDate.getMonth() + 1).toString().padStart(2, '0');
        const year: number = currentDate.getFullYear();
    
        return `${month}/${day}/${year}`;
      };
    
      const [data, setData] = useState<object>({
        creator: "",  // author's name
        exuse: "",  // exuse
        date: getCurrentDate(),
      });


    // Handles changes in inputs data
    const handleChange = (e: any) : void => {
        const { name, value } = e.target;
        setData((prevValues) => ({
          ...prevValues,
          [name]: value,
        }));
    };

    const createExuse = async  (e:any) => {
        e.preventDefault();
        console.log(exuse);
        try {
            await axios.post('http://localhost:8000/createExuse', {creator: creator, date: new Date(), excuse: exuse})
                 .then((response) => {
                    console.log(response)
                 })
                 .catch((error) => {
                     console.error('Error:', error);
                 });
        } catch(error) {
            console.error(error)
        }
    }


    return (
        <div className='CardContainer'>
            <div className="block_adding-cards">
                <input type="text" className="input_adding-cards" placeholder='Автор...' value={creator} onChange={(e: any) : void => setCreator(e.target.value)}/>
                <input type="text" className="input_adding-cards" placeholder='Відмазка...' value={exuse} onChange={(e: any) : void => setExuse(e.target.value)}/>                
                <button onClick={createExuse} className="btn_adding-cards">Додати нову відмазку</button>
            </div>
            <div className="block_cards">
                {array.map(item=> <Card key={item} excuse={item.excuse} creator={item.creator}/>)}
            </div>
        </div>
    )
}

export default CardContainer