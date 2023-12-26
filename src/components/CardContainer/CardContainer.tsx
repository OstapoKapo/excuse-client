import { useState } from 'react';
import axios from 'axios';
import './CardContainer.scss';
import Card from './Card/Card';

interface Vidmazka{
    excuse: string,
    date: string,
    creator: string,
    id: number
}

let array: Array<Vidmazka> = [
    {creator: 'admin', id:1, date: '27/12/2023', excuse: 'Я забув'},
    {creator: 'admin', id:2, date: '23/12/2023', excuse: 'Я забув'},
    {creator: 'admin', id:3, date: '22/12/2023', excuse: 'Я забув Я забув Я забув Я забув Я забув Я забув Я забув'},
    {creator: 'admin', id:4, date: '26/12/2023', excuse: 'Я забув'},
    {creator: 'admin', id:5, date: '26/12/2023', excuse: 'Я забув'},
    {creator: 'admin', id:6, date: '26/12/2023', excuse: 'Я забув'}
]


const CardContainer = () => {

    const getCurrentDate = () : string => {
        const currentDate: Date = new Date();
    
        const day: string = currentDate.getDate().toString().padStart(2, '0');
        const month: string = (currentDate.getMonth() + 1).toString().padStart(2, '0');
        const year: number = currentDate.getFullYear();
    
        return `${month}/${day}/${year}`;
      };
    
      const [data, setData] = useState({
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
        console.log(data);
        try {
            await axios.post('http://localhost:8000/createExuse', {creator: data.creator, date: data.date, excuse: data.exuse})
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
            <input
            type="text"
            className="input_adding-cards"
            placeholder="Автор..."
            name="creator"
            value={data.creator}
            onChange={handleChange}
            />
            <input
            type="text"
            className="input_adding-cards"
            placeholder="Відмазка..."
            name="exuse"
            value={data.exuse}
            onChange={handleChange}
            />
            <button onClick={createExuse} className="btn_adding-cards">Додати нову відмазку</button>
            </div>
            <div className="block_cards">
                {array.map(item=> <Card key={item.id} excuse={item.excuse} creator={item.creator} date={item.date}/>)}
            </div>
        </div>
    )
}

export default CardContainer