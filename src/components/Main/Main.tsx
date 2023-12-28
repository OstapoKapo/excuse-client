import  {useState} from 'react';
import './Main.scss';
import CardContainer from '../CardContainer/CardContainer';
import Header from '../Header/Header';


interface Excuse {
    _id: string;
    creator: string;
    excuse: string;
    date: string;
  }

const Main = () => {
    
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [excuses, setExcuses] = useState<Excuse[][]>([]);

    return (
        <div className='Main'>
            <Header setExcuses={setExcuses}/>
            <CardContainer currentPage={currentPage} setCurrentPage={setCurrentPage} excuses={excuses} setExcuses={setExcuses}/>
        </div>
    )
}

export default Main;