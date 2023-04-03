import PublicHeader from "./PublicHeader"
import { AiOutlineLogin } from 'react-icons/ai'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Spinner from '../widgets/Spinner'
import { useLoginUserMutation } from '../services/authApi'
import homeBanner from '../assets/home-banner.png'

const Login = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [logginIn, setLogginIn] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const [loginUser, {data, isError, error}] = useLoginUserMutation();

    useEffect(() => {
        if(data && data.token) {
            localStorage.setItem("login", JSON.stringify({
                userLogin: true,
                token: data.token,
                role: data.role,
                user: data.user
            }));

            setErrorMsg("");
            setEmail("");
            setPassword("");
            navigate('/dashboard');
            window.location.reload();
        }

        if(isError){
            setErrorMsg(error.data.error)
            setLogginIn(false);
        }
        // eslint-disable-next-line
    }, [data, isError]);


    const handleLogin = async () => {

        if(email === '' || password === ''){
            alert('You must enter email and password')
        }
        else{ 
            setLogginIn(true);
            await loginUser({ email, password });
        }

    }


    useEffect(() => {
        if(localStorage.getItem('login') !== null){
            navigate('/dashboard');
        }
    }, [navigate])

    return (
        <div>
            <PublicHeader />
            <div className="w-full mt-24 grid lg:grid-cols-6 px-12">
                <div className='col-span-1'></div>
                <div className='col-span-2 flex justify-center lg:border-r border-gray-300 dark:border-gray-800 p-4'>
                    <img src={homeBanner} alt="home-banner" className='hidden lg:block' />
                </div>
                <div className="col-span-2 w-full lg:px-8">
                    <div className='flex justify-center'>
                        <AiOutlineLogin size={50} />
                    </div>
                    {errorMsg && <span className='text-red-500'>{errorMsg}</span>}
                    <input 
                        type="email" 
                        placeholder="email"
                        className="w-full bg-transparent p-3 border-b border-slate-500 my-8"
                        onChange={(e) => setEmail(e.target.value)}
                    />
        
                    <input 
                        type="password" 
                        placeholder="password"
                        className="w-full bg-transparent p-3 border-b border-slate-500 my-8"
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    {logginIn ? <div className='mt-6'><Spinner w={160} /></div> : 
                        <button 
                            className="w-full bg-transparent p-3 border border-slate-500 rounded-full my-12"
                            onClick={handleLogin}
                        >
                            Sign in
                        </button>
                    }
                </div>
                <div className='col-span-1'></div>
            </div>
        </div>
    )
}

export default Login