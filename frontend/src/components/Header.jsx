import HeaderButton from "./HeaderButton";
import ControllerSVG from '../assets/controller.svg';
import ForumSVG from '../assets/forum.svg';
import HomeSVG from '../assets/home.svg';
import ShopSVG from '../assets/store.svg';
import SupportSVG from '../assets/support.svg';

export default function Header() {
    return (
        <header className="relative flex flex-col justify-center items-center p-4 gap-10 bg-gray-900 h-60">
            <div className="absolute inset-0 bg-[url('/HeaderBG.png')] bg-cover bg-center blur-[8px]"></div>
            <img className="relative z-10 max-w-48 cursor-pointer" src="./MainIcon.svg" />
            <div className="relative z-10 flex gap-10 items-center">
                <HeaderButton name="Home" svg={HomeSVG} link="/" />
                <HeaderButton name="Games" svg={ControllerSVG} link="/games" />
                <HeaderButton name="Forums" svg={ForumSVG} link="/games" />
                <HeaderButton name="Support" svg={SupportSVG} link="/support" />
                <HeaderButton name="Shop" svg={ShopSVG} link="/shop" />
            </div>
        </header>
    );
}