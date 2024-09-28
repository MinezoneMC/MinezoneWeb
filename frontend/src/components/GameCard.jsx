export default function GameCard({ image, title, colorHex, selectGame }) {
    return (
        <div
            className="bg-[#353942] p-4 shadow-md hover:scale-105 rounded-lg cursor-pointer
                hover:bg-[#5D626F] transition-all duration-100 w-full sm:w-[26rem]"
            style={{ borderTop: `6px solid ${colorHex}` }}
            onClick={selectGame}
        >
            <img src={image} alt={''} className="w-full h-48 object-cover rounded-md" />
            <h1 className="uppercase text-2xl sm:text-4xl font-semibold text-center mt-4"
                style={{ color: `${colorHex}` }}>
                {title}
            </h1>
        </div>
    );
}
