export default function HeaderButton({ name, svg, link }) {
    return <a href={link}>
        <button
            className="bg-gradient-to-b from-[#ECBA32] to-[#F1A72A]
        h-12 px-7 rounded-[5px] 
        text-gray-900 text-xl font-semibold
        transition-all duration-200 hover:scale-105
        hover:shadow-[0_4px_10px_rgba(255,165,0,0.5)]"
        >
            <span className="flex flex-row gap-2">
                <img src={svg} className="w-6 h-6" />
                {name}
            </span>
        </button>
    </a>
}