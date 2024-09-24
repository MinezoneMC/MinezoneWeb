import HeaderButton from "./HeaderButton";

export default function Header() {
    return <header className="bg-gray-900 flex justify-center place-items-center p-4 gap-10">
        <HeaderButton name="Home" link="/"/>
        <HeaderButton name="Games" link="/"/>
        <img className="max-w-48 cursor-pointer" src="./MainIcon.svg"/>
        <HeaderButton name="Support" link="/"/>
        <HeaderButton name="Shop" link="/"/>
    </header>
}