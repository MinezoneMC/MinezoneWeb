import HeaderButton from "./HeaderButton";

export default function Header() {
    return (
        <header className="relative flex justify-center p-4 gap-10 bg-gray-900 h-60">
            <div className="absolute inset-0 bg-[url('/HeaderBG.png')] bg-cover bg-center blur-[8px]"></div>
            <div className="relative z-10 flex gap-10 items-center">
                <HeaderButton name="Home" link="/" />
                <HeaderButton name="Games" link="/" />
                <img className="max-w-48 cursor-pointer" src="./MainIcon.svg" />
                <HeaderButton name="Support" link="/" />
                <HeaderButton name="Shop" link="/" />
            </div>
        </header>
    );
}