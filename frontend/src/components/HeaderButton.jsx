export default function HeaderButton({ name, svg, link, style }) {
    return (
        <>
            {!style ? (
                <a href={link}>
                    <button
                        className="bg-gradient-to-b from-[#ECBA32] to-[#F1A72A]
                        h-12 px-7 rounded-[5px] 
                        text-gray-900 text-xl font-semibold
                        transition-all duration-200 hover:scale-105
                        hover:shadow-[0_4px_10px_rgba(255,165,0,0.5)]"
                    >
                        <span className="flex flex-row gap-2">
                            <img src={svg} className="w-6 h-6" alt="" />
                            {name}
                        </span>
                    </button>
                </a>
            ) : (
                <a href={link}>
                    <button
                        className="bg-gradient-to-b from-[#327cec] to-[#1c6bbb]
                        h-12 px-7 rounded-[5px] 
                        text-gray-900 text-xl font-semibold
                        transition-all duration-200 hover:scale-105
                        hover:shadow-[0_4px_10px_rgba( 0, 0, 255, 0.5)]"
                    >
                        <span className="flex flex-row gap-2">
                            <img src={svg} className="w-6 h-6" alt="" />
                            {name}
                        </span>
                    </button>
                </a>
            )}
        </>
    );
}
