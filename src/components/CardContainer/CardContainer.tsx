import { useState, useEffect } from 'react';
import axios from 'axios';
import './CardContainer.scss';
import Card from './Card/Card';

interface Vidmazka {
  excuse: string;
  date: string;
  creator: string;
  _id: any
}

const CardContainer = () => {
  const getCurrentDate = (): string => {
    const currentDate: Date = new Date();

    const day: string = currentDate.getDate().toString().padStart(2, '0');
    const month: string = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const year: number = currentDate.getFullYear();

    return `${month}/${day}/${year}`;
  };

  const [data, setData] = useState({
    creator: '', // author's name
    exuse: '', // excuse
    date: getCurrentDate(),
  });

  const [excuses, setExcuses] = useState<Array<Vidmazka>>([]);

  useEffect(() => {
    const fetchExcuses = async () => {
        try {
          const response = await axios.get('http://localhost:8000/api/exuses');
          setExcuses(response.data);
          console.log(response.data)
        } catch (error) {
          console.error('Error fetching data:', error);
      
          if (axios.isAxiosError(error)) {
            console.error('Error response:', error.response);
          }
        }
      };

    fetchExcuses();
  }, []);

  const handleChange = (e: any): void => {
    const { name, value } = e.target;
    setData((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const createExuse = async (e: any) => {
    e.preventDefault();
    console.log(data);
    try {
      await axios.post('http://localhost:8000/createExuse', {
        creator: data.creator,
        date: data.date,
        excuse: data.exuse,
      });

      const response = await axios.get('http://localhost:8000/api/exuses');
      setExcuses(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='CardContainer'>
      <div className='block_adding-cards'>
        <div className='for_inputs'>
          <input
            type='text'
            className='input_adding-cards'
            placeholder='Автор...'
            name='creator'
            value={data.creator}
            onChange={handleChange}
          />
          <input
            type='text'
            className='input_adding-cards'
            placeholder='Відмазка...'
            name='exuse'
            value={data.exuse}
            onChange={handleChange}
          />
        </div>
        <button onClick={createExuse} className='btn_adding-cards'>
          Додати нову відмазку
        </button>
      </div>
      <div className='block_cards'>
        {excuses.map((item, index) => (
          <Card setExcuses={setExcuses} key={index} _id={item._id} excuse={item.excuse} creator={item.creator} date={item.date}/>
        ))}
      </div>
    </div>
  );
};

export default CardContainer;
