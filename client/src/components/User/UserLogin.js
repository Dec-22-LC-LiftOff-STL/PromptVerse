import React, { useState, useEffect } from "react";
import { UserLoginAction } from "../../actions/UserActions.js";
import {useNavigate} from 'react-router-dom';
import { Cookies } from 'react-cookie';


const UserLogin = () => {
    const cookies = new Cookies();

    const [user, setUserData] = useState({
        "email": "",
        "password": "",
        "posts": []
    });

    const [rememberMe, setRememberMe] = useState(false);
    const [usedEmailCheck, setusedEmailCheck] = useState(false)
    const [usedPasswordCheck, setPasswordCheck] = useState(false)
    const navigate = useNavigate()
    const [update, setUpdate] = useState(false)


    useEffect(() => { 
        if (cookies.get('user_remember_me') !== undefined) {
            if (rememberMe === false) {
                setRememberMe(true)
                var user_Data = cookies.get('user_remember_me')
                setUserData(user_Data)
            }
        }
    }, [update])




    const handleSubmit = async (event) => {
        event.preventDefault();
        var data = await UserLoginAction(user)
        

        if ("message" in data){
            console.log(data['response']["data"]["msg"] )

            if (data['response']["data"]["msg"] === "no user with this email") {
                setusedEmailCheck(true)
                return
            }
            else {
                setusedEmailCheck(false)
            }
            if (data['response']["data"]["msg"] === "incorrect password") {
                setPasswordCheck(true)
                return
            }
            else {
                setPasswordCheck(false)
                return
            }
        }


        if (rememberMe === true) {
            cookies.set('user_remember_me', user, { path: '/' });
        }


        if (rememberMe === false) {
            cookies.remove('user_remember_me', { path: '/' })
        }


        data["email_check_UserSchema"]["image"] = ""
        cookies.set('user_data', data["email_check_UserSchema"], { path: '/', maxAge: 172800 });
        cookies.set('user_token', data["token"], { path: '/', maxAge: 172800 });
        

        console.log(cookies.get('user_data'))
        navigate("/")

    };


    return (
    
    <form onSubmit={handleSubmit} className=" bg-slate-800 text-white shadow-2xl rounded-lg px-8 pt-6 pb-8 mb-4 w-[98%] lg:w-[400px]">
        
        <div className=" w-[100%] mt-2 flex flex-col items-center">
            <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" width="60%" height="80%" viewBox="0 0 793 551.73152" xmlnsXlink="http://www.w3.org/1999/xlink"><ellipse cx="158" cy="539.73152" rx="158" ry="12" fill="#e6e6e6"/><path d="M324.27227,296.55377c27.49676-11.6953,61.74442-4.28528,95.19092.85757.31124-6.228,4.08385-13.80782.132-18.15284-4.80115-5.2788-4.35917-10.82529-1.47008-16.40375,7.38788-14.265-3.1969-29.44375-13.88428-42.0647a23.66937,23.66937,0,0,0-19.75537-8.29179l-19.7975,1.41411A23.70939,23.70939,0,0,0,343.635,230.85851v0c-4.72724,6.42917-7.25736,12.84055-5.66438,19.21854-7.08065,4.83882-8.27029,10.67977-5.08851,17.2644,2.698,4.14592,2.66928,8.18161-.12275,12.1056a55.89079,55.89079,0,0,0-8.31011,16.5061Z" transform="translate(-203.5 -174.13424)" fill="#2f2e41"/><path d="M977.70889,651.09727H417.29111A18.79111,18.79111,0,0,1,398.5,632.30616h0q304.727-35.41512,598,0h0A18.79111,18.79111,0,0,1,977.70889,651.09727Z" transform="translate(-203.5 -174.13424)" fill="#2f2e41"/><path d="M996.5,633.41151l-598-1.10536,69.30611-116.61553.3316-.55268V258.13057a23.7522,23.7522,0,0,1,23.75418-23.75418H899.792a23.7522,23.7522,0,0,1,23.75418,23.75418V516.90649Z" transform="translate(-203.5 -174.13424)" fill="#3f3d56"/><path d="M491.35028,250.95679a7.74623,7.74623,0,0,0-7.73753,7.73753V493.03073a7.74657,7.74657,0,0,0,7.73753,7.73752H903.64972a7.74691,7.74691,0,0,0,7.73753-7.73752V258.69432a7.74657,7.74657,0,0,0-7.73753-7.73753Z" transform="translate(-203.5 -174.13424)" fill="#fff"/><path d="M493.07794,531.71835a3.32522,3.32522,0,0,0-3.01275,1.93006l-21.35537,46.42514a3.31594,3.31594,0,0,0,3.01221,4.7021H920.81411a3.3157,3.3157,0,0,0,2.96526-4.79925L900.5668,533.55126a3.29926,3.29926,0,0,0-2.96526-1.83291Z" transform="translate(-203.5 -174.13424)" fill="#2f2e41"/><circle cx="492.34196" cy="67.97967" r="4.97412" fill="#fff"/><path d="M651.69986,593.61853a3.32114,3.32114,0,0,0-3.20165,2.4536l-5.35679,19.89649a3.31576,3.31576,0,0,0,3.20166,4.17856h101.874a3.31531,3.31531,0,0,0,3.13257-4.40093l-6.88691-19.89649a3.31784,3.31784,0,0,0-3.13366-2.23123Z" transform="translate(-203.5 -174.13424)" fill="#2f2e41"/><polygon points="720.046 337.135 720.046 341.556 264.306 341.556 264.649 341.004 264.649 337.135 720.046 337.135" fill="#2f2e41"/><circle cx="707.33457" cy="77.37523" r="77.37523" fill="#6c63ff"/><path d="M942.89,285.223H878.77911a4.42582,4.42582,0,0,1-4.42144-4.42145V242.11391a4.42616,4.42616,0,0,1,4.42144-4.42144H942.89a4.42616,4.42616,0,0,1,4.42144,4.42144v38.68761A4.42582,4.42582,0,0,1,942.89,285.223Zm-64.11091-43.10906v38.68761h64.11415L942.89,242.11391Z" transform="translate(-203.5 -174.13424)" fill="#fff"/><path d="M930.73105,242.11391h-39.793V224.42814c0-12.80987,8.36792-22.10721,19.89649-22.10721s19.89648,9.29734,19.89648,22.10721Zm-35.37153-4.42144h30.95009V224.42814c0-10.413-6.36338-17.68576-15.475-17.68576s-15.47505,7.27281-15.47505,17.68576Z" transform="translate(-203.5 -174.13424)" fill="#fff"/><circle cx="707.33457" cy="86.21811" r="4.42144" fill="#fff"/><path d="M856.81994,421.28372H538.18006a5.90767,5.90767,0,0,1-5.90073-5.90073V336.342a5.90767,5.90767,0,0,1,5.90073-5.90072H856.81994a5.90767,5.90767,0,0,1,5.90073,5.90072V415.383A5.90767,5.90767,0,0,1,856.81994,421.28372Zm-318.63988-88.4821a3.5443,3.5443,0,0,0-3.54043,3.54043V415.383a3.54431,3.54431,0,0,0,3.54043,3.54044H856.81994a3.54431,3.54431,0,0,0,3.54043-3.54044V336.342a3.5443,3.5443,0,0,0-3.54043-3.54043Z" transform="translate(-203.5 -174.13424)" fill="#e6e6e6"/><circle cx="384.19021" cy="198.69546" r="24.03645" fill="#e6e6e6"/><path d="M643.203,356.80541a4.00608,4.00608,0,1,0,0,8.01215H832.06074a4.00607,4.00607,0,0,0,0-8.01215Z" transform="translate(-203.5 -174.13424)" fill="#e6e6e6"/><path d="M643.203,380.84186a4.00607,4.00607,0,1,0,0,8.01214H724.469a4.00607,4.00607,0,1,0,0-8.01214Z" transform="translate(-203.5 -174.13424)" fill="#e6e6e6"/><path d="M467.022,382.46241,408.1189,413.778l-.74561-26.09629c19.22553-3.20948,37.51669-8.7974,54.42941-17.8946l6.1605-15.22008a10.31753,10.31753,0,0,1,17.53643-2.67788l0,0a10.31753,10.31753,0,0,1-.90847,14.06885Z" transform="translate(-203.5 -174.13424)" fill="#ffb8b8"/><path d="M323.09819,563.26707v0a11.57378,11.57378,0,0,1,1.46928-9.36311l12.93931-19.85777a22.61221,22.61221,0,0,1,29.335-7.73927h0c-5.438,9.25647-4.67994,17.37679,1.87806,24.43365a117.63085,117.63085,0,0,0-27.93606,19.04492A11.57386,11.57386,0,0,1,323.09819,563.26707Z" transform="translate(-203.5 -174.13424)" fill="#2f2e41"/><path d="M469.70475,537.30274l0,0a22.20314,22.20314,0,0,1-18.87085,10.77909l-85.96027.65122-3.728-21.62264,38.026-11.18413-32.06116-24.60507L402.154,450.31277l63.65,59.32431A22.20317,22.20317,0,0,1,469.70475,537.30274Z" transform="translate(-203.5 -174.13424)" fill="#2f2e41"/><path d="M351.45266,685.17939H331.32124c-18.07509-123.89772-36.47383-248.14186,17.8946-294.51529l64.12231,10.43852L405.13646,455.532l-35.7892,41.00845Z" transform="translate(-203.5 -174.13424)" fill="#2f2e41"/><path d="M369.14917,713.24594h0a11.57381,11.57381,0,0,1-9.3632-1.46873l-21.85854-2.93814a22.61221,22.61221,0,0,1-7.741-29.33451v0c9.2568,5.43749,17.37707,4.67891,24.43354-1.8795,4.98593,10.06738,13.20093,9.45331,21.04657,17.93494A11.57385,11.57385,0,0,1,369.14917,713.24594Z" transform="translate(-203.5 -174.13424)" fill="#2f2e41"/><path d="M399.1716,307.90158l-37.28042-8.94731c6.19168-12.6739,6.70155-26.77618,3.728-41.75406l25.35068-.74561C391.76421,275.08,394.16732,292.48081,399.1716,307.90158Z" transform="translate(-203.5 -174.13424)" fill="#ffb8b8"/><path d="M409.41752,423.55243c-27.13873,18.49308-46.31418.63272-60.94729-26.92346,2.03338-16.86188-1.259-37.04061-7.35672-58.96635a40.13762,40.13762,0,0,1,24.50567-48.40124h0l32.06116,13.421c27.22362,22.19038,32.582,46.227,22.36825,71.5784Z" transform="translate(-203.5 -174.13424)" fill="#6c63ff"/><path d="M331.32124,326.54178,301.4969,342.19956l52.9382,31.31555,7.366,18.16951a9.63673,9.63673,0,0,1-5.78925,12.73088h0a9.63673,9.63673,0,0,1-12.76159-8.54442l-.74489-12.66307-67.2838-22.20366a15.73306,15.73306,0,0,1-9.87265-9.61147v0a15.733,15.733,0,0,1,5.90262-18.30258l54.10485-37.11845Z" transform="translate(-203.5 -174.13424)" fill="#ffb8b8"/><path d="M361.14557,329.52422c-12.43861-5.4511-23.74934.47044-38.026,5.21926l-2.23683-39.51725c14.17612-7.55568,27.69209-9.59281,40.26285-3.728Z" transform="translate(-203.5 -174.13424)" fill="#6c63ff"/><circle cx="172.52496" cy="78.09251" r="23.80211" fill="#ffb8b8"/><path d="M404.5,249.22353c-23.56616,2.30811-41.52338-1.54606-53-12.52007v-8.8377h51Z" transform="translate(-203.5 -174.13424)" fill="#2f2e41"/></svg>
        </div>

        <h1 className=" text-center font-extrabold mt-2 text-2xl font-sans mb-[-8px]"> Login </h1>


        <div class="divider"></div> 

        <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2">
            Email
            </label>
            <input
            placeholder="Email Address"
            type="email"
            value={user.email}
            onChange={(e) => setUserData({ ...user, email: e.target.value })}
            className="shadow input input-bordered w-full py-2 px-3 leading-tight border-spacing-4 focus:outline-none"
            />
        </div>

        {usedEmailCheck !== false && 
            <div className="alert alert-error shadow-lg mb-4 mt-4">
                <div>
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span>No account with this email exists.</span>
                </div>
            </div>
            }
        

        <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2">
            Password
            </label>
            <input
            placeholder="Password"
            type="password"
            value={user.password}
            onChange={(e) => setUserData({ ...user, password: e.target.value })}
            className="shadow input input-bordered w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            />
        </div>


        <div class="flex items-start mb-4">

            <div class="flex items-center h-5">
                <input onChange={() => setRememberMe(!rememberMe)} checked={rememberMe} id="remember" aria-describedby="remember" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" />
            </div>

            <div class="ml-3 text-sm">
                <label for="remember" class="text-gray-500 dark:text-gray-300">Remember me</label>
            </div>

        </div>

                      

        {usedPasswordCheck !== false && 
            <div className="alert alert-error shadow-lg mb-4 mt-4">
                <div>
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span>Incorrect password.</span>
                </div>
            </div>
        }

        <div className="flex items-center justify-between w-full"> 
            <span className="absolute ml-4 flex items-start">			
                <svg className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="True">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
                </svg>
            </span> 
            <button className=" btn btn-primary w-full">
            
            <h1 className=" self-center"> Login </h1> </button>
        </div>

        <div className=" self-center w-full flex flex-col justify-center items-center mt-10 opacity-80">
            <div className=" divider opacity-80 text-sm mb-2"> Don't have an account? </div>
            <a href="/Sign-Up" className="link text-sm link-info link-hover">Sign Up</a>
        </div>
        
        {/* 
        <div className=" self-center w-full flex flex-col justify-center items-center mt-5">
            <h1 className=" opacity-80"> Don't have an account? </h1>
            <a href="/Sign-Up" className="link opacity-80 link-info link-hover">Sign Up</a>
        </div> */}

    </form>
);
};




export default UserLogin;