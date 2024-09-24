export default function HeaderButton({ name, link }) {
    return <button
        className="bg-gradient-to-b from-[#ECBA32] to-[#F1A72A]
        h-12 px-7 rounded-[5px] 
        text-gray-900 text-xl font-semibold
        transition-all duration-200 hover:scale-105"
    >
        {name}
    </button>
}