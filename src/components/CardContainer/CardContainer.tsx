import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './Card/Card';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import './CardContainer.scss';


interface Excuse {
  _id: string;
  creator: string;
  excuse: string;
  date: string;
}

const CardContainer: React.FC = () => {

  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  const getCurrentDate = (): string => {
    const currentDate: Date = new Date();
    const day: string = currentDate.getDate().toString().padStart(2, '0');
    const month: string = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const year: number = currentDate.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const [data, setData] = useState({
    creator: '',
    excuse: '',
    date: getCurrentDate(),
  });

  const [excuses, setExcuses] = useState<Excuse[][]>([]);

  // useEffect(()=>{
  //   console.log(excuses)
  // }, [excuses])

  useEffect(() => {
    const fetchExcuses = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/exuses');
        const dividedExcuses = chunkArray(response.data.reverse(), 5);
        console.log(response.data)
        setExcuses(dividedExcuses);
      } catch (error) {
        console.error('Error fetching data:', error);

        if (axios.isAxiosError(error)) {
          console.error('Error response:', error.response);
        }
      }
    };

    fetchExcuses();
  }, []);

  const chunkArray = (arr: Excuse[], size: number): Excuse[][] => {
    return arr.reduce((chunks:Array<any>, element, index) => {
      if (index % size === 0) {
        chunks.push([element]);
      } else {
        chunks[chunks.length - 1].push(element);
      }
      return chunks;
    }, []);
  };


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setData((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const createExcuse = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/createExuse', {
        creator: data.creator,
        date: data.date,
        excuse: data.excuse,
      });

      const response = await axios.get('http://localhost:8000/api/exuses');
      const dividedExcuses = chunkArray(response.data.reverse(), 5);
      setExcuses(dividedExcuses);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const deleteExcuse = async (excuseId: string) => {
    try {
      await axios.delete(`http://localhost:8000/deleteExuse/${excuseId}`);
      const updatedExcuses = excuses.filter(item => item._id !== excuseId);
      setExcuses(updatedExcuses);
    } catch (error) {
      console.log('Error deleting: ', error);
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
            name='excuse'
            value={data.excuse}
            onChange={handleChange}
          />
        </div>
        <button onClick={createExcuse} className='btn_adding-cards'>
          Додати нову відмазку
        </button>
      </div>
      <div className='block_cards'>
        {excuses[currentPage - 1]?.map((item, index) => (
          <Card key={index} idObject={item._id} excuse={item.excuse} creator={item.creator} onDelete={() => deleteExcuse(item._id)} />
        ))}
      </div>
      <Stack spacing={2} className='pagination-container'>
        <Pagination
          count={excuses.length}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </Stack>
    </div>
  );
};

export default CardContainer;

