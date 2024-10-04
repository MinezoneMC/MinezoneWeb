import HeaderButton from "./HeaderButton";
import ControllerSVG from '../assets/controller.svg';
import ForumSVG from '../assets/forum.svg';
import HomeSVG from '../assets/home.svg';
import ShopSVG from '../assets/store.svg';
import SupportSVG from '../assets/support.svg';
import UserIcon from '../assets/user.svg';
import { Link } from 'react-router-dom';

export default function Header({ isLoggedIn, setIsLoggedIn, name, setName, setEmail }) {
    const handleLogout = () => {
        setIsLoggedIn(false);
        setName('');
        setEmail('');

        // Clear localStorage
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('name');
        localStorage.removeItem('email');
        localStorage.removeItem('user_id');
    };

    return (
        <header className="relative flex flex-col justify-center items-center p-4 gap-10 bg-gray-900 h-80">
            <div className="absolute inset-0 bg-[url('/HeaderBG.png')] bg-cover bg-center blur-[8px]" />
            <div className="relative z-10 accounts flex justify-end w-screen mr-10">
                <div className="">
                    {/* Conditionally render login/logout */}
                    {isLoggedIn ? (
                        <div className="flex items-center">
                            <span className="text-white mr-2">Welcome, {name}</span>
                            <Link to="/profile">
                                <button className="bg-blue-500 text-white px-3 py-1 rounded mr-2">
                                    My Profile
                                </button>
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="bg-red-500 text-white px-3 py-1 rounded"
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <HeaderButton name="Login" svg={UserIcon} link="/login" style={2} />
                    )}
                </div>
            </div>
            <img className="relative z-10 max-w-48 cursor-pointer" src="./MainIcon.svg" />
            <div className="relative z-10 flex gap-10 items-center">
                <HeaderButton name="Home" svg={HomeSVG} link="/" />
                <HeaderButton name="Games" svg={ControllerSVG} link="/games" />
                <HeaderButton name="Forums" svg={ForumSVG} link="/forums" />
                <HeaderButton name="Support" svg={SupportSVG} link="https://discord.gg/ne3ZeXFsTw" />
                <HeaderButton name="Shop" svg={ShopSVG} link="https://minezone.tebex.io" />

            </div>
        </header>
    );
}
