
import { FC } from 'react';

import './Card.scss';
import axios from 'axios';
import AuthorImg from  './img/author.png';

import DateImg from './img/date.png';
import PanImg from './img/pen.png';
import OkPng from './img/ok.png';
import DeleteImg from './img/delete.png';
import CloseImg from './img/close.png';
import { useRef, useState } from 'react';


const Card = (props: any) => {

    const cardInput: any = useRef(null)

  let [changeKey, setChangeKey] = useState(false);

  const [excuseData, setExcuseData] = useState({
    data: '',
  })

// Handles changes in inputs data
const handleChange = (e: any) : void => {
    const { name, value } = e.target;
    setExcuseData((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
};

  const changeKeyHandle = () => {
    setChangeKey(true);
  }

  const changeExcuseHandle =async (e: any) => {
    setChangeKey(false);
    setExcuseData({
        data:''
    })
    if(e.currentTarget.classList.contains('card__btn_change')){
        let targetId: string = e.currentTarget.getAttribute('data-action');
        console.log(targetId)
        let value: string = cardInput.current.value
        console.log(cardInput.current.value)
        try {
            await axios.post('http://localhost:8000/changeExcuse', {targetId, value})
                 .then((response) => {
                    if(response.status !== 400){
                        const dividedExcuses = props.chunkArray(response.data.reverse(), 5);
                        props.setExcuses(dividedExcuses);
                    }else{
                        console.log('error');
                    }
                 })
                 .catch((error) => {
                     console.error('Error:', error);
                 });
        } catch(error) {
            console.error(error)
        }
    }
  }

interface CardProp {
    idObject: string;
    creator: string;
    excuse: string;
    onDelete: (idObject: string) => void;
}


    return (
       
<div className='card'>
<div className="card__author">
    <div className="card__img">
        <img src={AuthorImg} alt="" />
    </div>
    <div className="card__name">{props.creator}</div>
</div>
<div className="card__main">
    {changeKey ? (
        
    <input ref={cardInput} type="text" className="card__input" name={'data'}  onChange={handleChange} value={excuseData.data} placeholder='Ведіть вашу відмазку' />
    
    ) : <div className="card__text">{props.excuse}</div>}
</div>
{/* <div className="card__data">
    <div className="card__img">
        <img src={DateImg} alt="" />
    </div>
    <div className="card__text"></div>
</div> */}
<div className="card__buttons">
    {changeKey ? (
    <div className="card__btn card__btn_change" onClick={changeExcuseHandle} data-action={props.idObject}>
        <img src={OkPng} alt="" />
    </div>
    ) : (
    <div className="card__btn card__btn_change" onClick={changeKeyHandle} data-action={props.idObject}>
        <img src={PanImg} alt="" />
    </div>
    )}
    

    {changeKey ? (
    <div className="card__btn card__btn_change" onClick={()=> setChangeKey(false)} data-action={props.idObject}>
        <img src={CloseImg} alt="" />
    </div>
    ) : (
    <div className="card__btn" onClick={() => props.onDelete(props.idObject)}>
        <img src={DeleteImg} alt="" />
    </div>
    )}
</div>
</div>

    );
                }

export default Card
