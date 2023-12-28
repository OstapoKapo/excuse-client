import React from 'react';
import { useRef, useState, useEffect } from 'react';
import './Header.scss';
import { useNavigate } from 'react-router-dom';
import SearchImg from './img/search.png';
import axios from 'axios';


interface Excuse {
    _id: string;
    creator: string;
    excuse: string;
    date: string;
  }

  interface Header {
    setExcuses: any
  }

const Header: React.FC<Header> = ({setExcuses}) => {

    const navigate = useNavigate()
  
    const headerInput = useRef(null);

    const [searchData, setSearchData] = useState('')

    const [allExcuses, setAllExcuses] = useState([]);

    useEffect(() => {
        const fetchExcuses = async () => {
          try {
            const response = await axios.get('http://localhost:8000/api/exuses');
            setAllExcuses(response.data);
          } catch (error) {
            console.error('Error fetching data:', error);
    
            if (axios.isAxiosError(error)) {
              console.error('Error response:', error.response);
            }
          }
        };
        fetchExcuses();
      }, []);
    
    const inputHandle= (e: any) => {
        let lowerCase = e.target.value.toLowerCase();
        setSearchData(lowerCase);
      } 

    const logout = () : void => {
        localStorage.setItem('isLoggedIn', 'false');
        navigate('/');
    }

    useEffect(() =>{
        async function searchHandle (){
          if(allExcuses){
            let newExcuses = allExcuses.filter((el: any) => {
              if (searchData === '') {
                return el;
            }
            else {
                return el.creator.toLowerCase().includes(searchData)
            }
            })
            const dividedExcuses = chunkArray(newExcuses, 4);
            setExcuses(dividedExcuses);
          }  
      }  
      searchHandle()
      },[searchData])
 
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

    return (
        <div className='header'>
            <div className="header__left">
                <h1><span>/</span>Creator Відмазки</h1>
            </div>
            <div className="header__right">
                <div className="header__search">
                    <div className="header__img">
                        <img src={SearchImg} alt="" />
                    </div>
                  <input ref={headerInput} type="text" className="header__input" name={'data'}  onChange={inputHandle} value={searchData} placeholder='Ведіть пошукове імя' />
                </div>
               <button onClick={logout} className='header__logout'>Вийти</button>
            </div>
        </div>
    )
}

export default Header