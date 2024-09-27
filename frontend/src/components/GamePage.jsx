import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GameCard from "./GameCard";
import GameInfo from './GameInfo';
import GAMES from '../assets/data/games';
import SuperCraftBrosIMG from '../assets/supercraftbros.png';

export default function GamePage() {
    const [selectedGame, setSelectedGame] = useState(null);

    function selectGame(game) {
        setSelectedGame(game);
    }

    return (
        <div className="w-screen flex justify-center mt-10 h-[80rem]">
            <div className="flex flex-col h-max w-11/12 p-8 bg-[#11141E]">
                <h1 className="text-[5rem] font-bold text-white mb-2">GAMES</h1>
                <p className="text-4xl text-gray-50">
                    Introducing the Minezone Network, home of
                    <span className="font-semibold text-[#FFC700]"> SUPER CRAFT BROS</span>. We're not
                    just stopping there—new games are on the way and will be available on
                    the server soon. Play now at minezone.club
                </p>

                <div className="flex flex-wrap gap-4 mt-8">
                    <GameCard image={SuperCraftBrosIMG}
                        title='Super Craft Bros'
                        colorHex='#FFC700'
                        selectGame={() => selectGame(0)} />
                    <GameCard
                        title='COMING SOON...'
                        colorHex='#FFFFFF'
                        selectGame={() => selectGame(1)} />
                </div>

                <AnimatePresence mode="wait">
                    {selectedGame !== null && (
                        <motion.div
                            key={selectedGame}
                            initial={{ opacity: 0, y: -20 }} // Start above
                            animate={{ opacity: 1, y: 0 }}    // Slide down to original position
                            exit={{ opacity: 0, y: -20 }}     // Slide up and fade out
                            transition={{ duration: 0.3 }}
                        >
                            <GameInfo
                                title={GAMES[selectedGame].title}
                                colorHex={GAMES[selectedGame].colorHex}
                                gameModes={GAMES[selectedGame].gameModes}
                                videoId={GAMES[selectedGame].videoId}
                            >
                                {GAMES[selectedGame].description}
                            </GameInfo>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
