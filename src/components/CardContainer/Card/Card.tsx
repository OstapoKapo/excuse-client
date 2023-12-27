import { FC } from 'react';
import { useEffect } from 'react';
import './Card.scss';
import AuthorImg from './img/author.png';
import DateImg from './img/date.png';
import PanImg from './img/pen.png';
import DeleteImg from './img/delete.png';
interface CardProp {
    idObject: string;
    creator: string;
    excuse: string;
    onDelete: (idObject: string) => void;
}

const Card: FC<CardProp> = ({ idObject, creator, excuse, onDelete }) => {

    useEffect(()=>{
        console.log(idObject, creator, excuse)
    }, [])

    return (
        <div className='card'>
            <div className="card__author">
                <div className="card__author__img">
                    <img src={AuthorImg} alt="" />
                </div>
                <div className="card__author__name">{creator}</div>
            </div>
            <div className="card__main">
                <div className="card__text">{excuse}</div>
            </div>
            <div className="card__data">
                <div className="card__data__img">
                    <img src={DateImg} alt="" />
                </div>
                <div className="card__text">{/* Add date here */}</div>
            </div>
            <div className="card__buttons">
                <div className="card__buttons__btn">
                    <img src={PanImg} alt="" />
                </div>
                <div className="card__buttons__btn" onClick={() => onDelete(idObject)}>
                    <img src={DeleteImg} alt="" />
                </div>
            </div>
        </div>
    );
}

export default Card;
