import { FC, useState } from 'react';
import axios from 'axios';
import './Login.scss';
import CryptoJS from "crypto-js";
import { useNavigate } from 'react-router-dom';

interface LoginProps {
    handleLogin: (token: string) => void;
}

const Login: FC<LoginProps> = ({ handleLogin }) => {

    const navigate = useNavigate()

    const secretPass: string = "XkhZG4fW2t2W";

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

    const decrypt = (name: any, password: any): string[] => {
        const bytesForName : any = CryptoJS.AES.decrypt(name, secretPass);
        const decryptName: string = JSON.parse(bytesForName.toString(CryptoJS.enc.Utf8));

        const bytesForPassword : any = CryptoJS.AES.decrypt(password, secretPass);
        const decryptPassword: string = JSON.parse(bytesForPassword.toString(CryptoJS.enc.Utf8));
        decryptPassword.toLowerCase();
        decryptName.toLowerCase();
        return([decryptName, decryptPassword]);
    }

    interface UserData {
        login: string,
        password: string
    }

    const login = async (e: any) => {
        e.preventDefault();
        try {
          const response = await axios.post('http://localhost:8000/createUser', {});
      
          if (response.status !== 400) {
            const userData = response.data.user;
            const token = response.data.token;

            console.log(token)
      
            let adminData = decrypt(userData.name, userData.password);
      
            let inputData: UserData = {
              login: data.login.toLowerCase(),
              password: data.password.toLowerCase(),
            };
      
            if (inputData.login === adminData[0] && inputData.password === adminData[1]) {
              handleLogin(token);
              navigate('/main');
            } else {
              alert('Incorrect password or name');
            }
          } else {
            console.log('Error:', response.data.error);
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };
      

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
