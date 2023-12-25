import { FC, useState } from 'react';
// import axios from 'axios';
import './Login.scss';


const Login: FC = () => {

    const [data, setData] = useState({
        login: "",  // User login
        password: "",  // User password
    })

    // Handles changes in inputs data
    const handleChange = (e: any) : void => {
        const { name, value } = e.target;
        setData((prevValues) => ({
          ...prevValues,
          [name]: value,
        }));
    };

    // post function to server (send data)
    const login = (e:any) : void => {
        e.preventDefault();
        // axios.post('url', {data})
    }

  return (
    <div className='login'>
        <div className="login__container">
            <div className="login__heading">
                <h1><span>/</span>Creator Відмазки</h1>
            </div>
            <form className='login__form' action="POST" onSubmit={login}>
                <input type="text" placeholder='Логін' name='login' value={data.login} onChange={handleChange}/>
                <input type="password" placeholder='Пароль' name='password' value={data.password} onChange={handleChange}/>
                <button type='submit'>Увійти</button>
            </form>
        </div>
    </div>
  )
}

export default Login;
