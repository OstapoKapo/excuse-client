import './Card.scss';

const Card = (props) => {
    return (
        <div className='Card'>
            <h3>{props.creator}</h3>
            <p>{props.excuse}</p>
        </div>
    )
}

export default Card