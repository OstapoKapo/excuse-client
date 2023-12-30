import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './Card/Card';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import './CardContainer.scss';

interface cardContainer {
  currentPage: number,
  setCurrentPage: any,
  excuses: Excuse[][],
  setExcuses: any
}

interface Excuse {
  _id: string;
  creator: string;
  excuse: string;
  date: string;
}

const CardContainer: React.FC<cardContainer> = ({ currentPage, setCurrentPage, excuses, setExcuses }) => {

  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');


  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };
  const startDateChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setStartDate(e.target.value)

  }
  const endDateChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setEndDate(e.target.value)

  }
  const clearDate = () => {
    setStartDate('')
    setEndDate('')
  }

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


  // useEffect(()=>{
  //   console.log(excuses)
  // }, [excuses])

  useEffect(() => {
    const fetchExcuses = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/exuses');
        let filteredExcuses = response.data;

        if (startDate) {
          filteredExcuses = filteredExcuses.filter((excuse: Excuse) => {
            const date = new Date(excuse.date.split('/').reverse().join('-'))
            return date >= new Date(startDate)
          })
        }
        if (endDate) {
          filteredExcuses = filteredExcuses.filter((excuse: Excuse) => {
            const date = new Date(excuse.date.split('/').reverse().join('-'))
            return date <= new Date(endDate)
          })

        }
        const sortedExcuses = filteredExcuses.sort((start: Excuse, end: Excuse) => {
          const dateStart = new Date(start.date.split('/').reverse().join('-'));
          const dateEnd = new Date(end.date.split('/').reverse().join('-'));
          return dateEnd.getTime() - dateStart.getTime()
        })
        const dividedExcuses = chunkArray(sortedExcuses, 4);
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
  }, [startDate, endDate, setExcuses]);

  const chunkArray = (arr: Excuse[], size: number): Excuse[][] => {
    return arr.reduce((chunks: Array<any>, element, index) => {
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

    if (!data.creator.trim() || !data.excuse.trim()) {
      alert('Please enter both creator and excuse')
      return;
    }

    try {
      await axios.post('http://localhost:8000/createExuse', {
        creator: data.creator,
        date: data.date,
        excuse: data.excuse,
      });

      const response = await axios.get('http://localhost:8000/api/exuses');
      let updatedExcuses = [...response.data, {
        _id: response.data.length.toString(),
        creator: data.creator,
        date: data.date,
        excuse: data.excuse,

      }]
      if (startDate) {
        updatedExcuses = updatedExcuses.filter((excuse: Excuse) => {
          const date = new Date(excuse.date.split('/').reverse().join('-'))
          return date >= new Date(startDate)

        })
      }
      if (endDate) {
        updatedExcuses = updatedExcuses.filter((excuse: Excuse) => {
          const date = new Date(excuse.date.split('/').reverse().join('-'))
          return date <= new Date(endDate)

        })
      }
      const sortedExcuses = updatedExcuses.sort((start: Excuse, end: Excuse) => {
        const dateStart = new Date(start.date.split('/').reverse().join('-'));
        const dateEnd = new Date(end.date.split('/').reverse().join('-'));
        return dateEnd.getTime() - dateStart.getTime()
      })
      const dividedExcuses = chunkArray(sortedExcuses, 4);
      setExcuses(dividedExcuses);
      setData({
        creator: '',
        excuse: '',
        date: getCurrentDate(),
      });
    } catch (error) {
      console.error('Error:', error);
    }
  };


  const deleteExcuse = async (excuseId: string) => {
    try {
      await axios.delete(`http://localhost:8000/deleteExuse/${excuseId}`);
      const updatedExcuses: Excuse[][] = excuses.map(chunk => chunk.filter(item => item._id !== excuseId));
      setExcuses(updatedExcuses)
    } catch (error) {
      console.log('Error deleting: ', error);
    }
  };


  return (
    <div className='CardContainer'>
      <div className='block_adding-cards'>
        <div className='for_inputs'>
          <button onClick={clearDate} className='btn_clear-date'>Clear</button>
          <input type="date" name="" value={startDate} onChange={startDateChange} className='input_select-date' />
          <input type="date" name="" value={endDate} onChange={endDateChange} className='input_select-date' />
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

          <button onClick={createExcuse} className='btn_adding-cards'>
            Додати
          </button>
        </div>
      </div>
      <div className='block_cards'>
        {
          excuses[currentPage - 1]?.length > 0 ? (
            excuses[currentPage - 1]?.map((item, index) => (
              <Card key={index} idObject={item._id} chunkArray={chunkArray} setExcuses={setExcuses} excuse={item.excuse} creator={item.creator} onDelete={() => deleteExcuse(item._id)} />
            ))

          ) : (
            <p className='non_founded-cards'>Не знайдено відмазок в цей період</p>

          )

        }
      </div>
      <Stack spacing={2} className='pagination-container'>
        <Pagination
          count={excuses.length}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
          style={{ backgroundColor: '#F5A006' }}
          className='pagination-buttons'
        />
      </Stack>
    </div>
  );
};

export default CardContainer;


