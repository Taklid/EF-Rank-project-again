import React, { useMemo } from 'react';
import { Crown } from "lucide-react";
import { motion } from "framer-motion";

// --- গাণিতিক ফাংশন: GF (Goals For) এবং GA (Goals Against) গণনা ---
/**
 * ম্যাচের তালিকা থেকে একজন নির্দিষ্ট খেলোয়াড়ের গোল এবং গোল হজমের সংখ্যা গণনা করে।
 * @param {Array} allMatches - সকল ম্যাচের ডেটা।
 * @param {string} playerName - যে খেলোয়াড়ের জন্য গণনা করা হবে।
 * @returns {{goalsFor: number, goalsAgainst: number}}
 */
const calculateGoals = (allMatches, playerName) => {
    let goalsFor = 0;
    let goalsAgainst = 0;

    allMatches.forEach(m => {
        // নিশ্চিত করি যে স্কোরগুলি সংখ্যা হিসেবে আছে
        const s1 = Number(m.score1);
        const s2 = Number(m.score2);

        if (m.player1 === playerName) {
            goalsFor += s1;
            goalsAgainst += s2;
        } else if (m.player2 === playerName) {
            goalsFor += s2;
            goalsAgainst += s1;
        }
    });

    return { goalsFor, goalsAgainst };
};


// --- PlayerStatusCard কম্পোনেন্ট ---
const PlayerStatusCard = ({ playerStats, allMatches, playerTeam, rank, imageUrl }) => {
    
    if (!playerStats) {
        return (
            <div className="w-full max-w-sm mx-auto bg-gray-800 text-white rounded-xl shadow-lg p-4 text-center">
                খেলোয়াড়ের ডেটা পাওয়া যায়নি।
            </div>
        );
    }

    // ব্যাকএন্ড ডেটা থেকে প্রাপ্ত পরিসংখ্যান
    const { name, played, wins, draws } = playerStats;
    
    // GF/GA গণনা
    const { goalsFor, goalsAgainst } = useMemo(() => {
        return calculateGoals(allMatches, name);
    }, [allMatches, name]);

    // ছবিতে 'titles' বা লিগ উইন সংখ্যা 1 হিসাবে দেখানো হয়েছে। 
    // যদি আপনার ব্যাকএন্ডে এই ডেটা না থাকে, এটি স্ট্যাটিক 1 থাকবে।
    const titles = 1; 
    
    const backgroundStyle = { 
        backgroundImage: 'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(https://i.imgur.com/eB6YxYt.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: '#fff'
    };

    return (
        <motion.div
            className="w-full max-w-sm mx-auto bg-gray-900 rounded-xl overflow-hidden shadow-2xl relative p-0 border border-yellow-400/50"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100 }}
            style={backgroundStyle}
        >
            {/* Rank এবং Header */}
            <div className="flex justify-between items-center p-3 absolute top-0 left-0 w-full z-10">
                <span className="text-white font-serif text-xl font-bold">COBEG</span>
                <span className="text-white font-extrabold text-2xl px-3 py-1 rounded-lg bg-black/70 backdrop-blur-sm shadow-inner">{rank}</span>
            </div>

            {/* Player Image & Centered Info */}
            <div className="relative pt-12 pb-6 flex flex-col items-center">
                
                {/* Player Image Area */}
                <div 
                    className="w-32 h-32 rounded-full border-4 border-yellow-400 bg-cover bg-center mb-4 shadow-xl"
                    style={{ 
                        backgroundImage: `url(${imageUrl || 'https://via.placeholder.com/150/150/4A5568?text=Player'})`,
                        filter: 'brightness(1.1)'
                    }}
                />
                
                {/* Player Name and Team */}
                <h3 className="text-3xl font-extrabold text-white uppercase text-center drop-shadow-lg p-1 bg-black/10 rounded">
                    {name}
                </h3>
                <p className="text-sm font-medium text-gray-300 mt-1 mb-4 p-1 bg-black/10 rounded">
                    {playerTeam}
                </p>
            </div>

            {/* Stat Row */}
            <div className="bg-black/80 p-4 pt-6 text-center border-t border-gray-700">
                <div className="grid grid-cols-6 gap-1 text-white items-end">
                    
                    {/* Headers */}
                    <div className='pb-2'><p className="text-lg font-bold">PL</p></div>
                    <div className='pb-2'><p className="text-lg font-bold">W</p></div>
                    <div className='pb-2'><p className="text-lg font-bold">D</p></div>
                    <div className='pb-2'><p className="text-lg font-bold">GF</p></div>
                    <div className='pb-2'><p className="text-lg font-bold">GA</p></div>
                    <div className='pb-2'><Crown size={24} className="text-yellow-500 mx-auto" /></div>

                    {/* Values */}
                    <p className="text-3xl font-extrabold text-yellow-400">{played}</p>
                    <p className="text-3xl font-extrabold text-yellow-400">{wins}</p>
                    <p className="text-3xl font-extrabold text-yellow-400">{draws}</p>
                    <p className="text-3xl font-extrabold text-yellow-400">{goalsFor}</p>
                    <p className="text-3xl font-extrabold text-yellow-400">{goalsAgainst}</p>
                    <p className="text-3xl font-extrabold text-yellow-400">{titles}</p>
                </div>

                {/* Footer Info */}
                <p className="text-xs text-gray-400 mt-4 border-t border-gray-700 pt-2">
                    eFootball 26 | cobegbd.com | Nov 10, 25
                </p>
            </div>
        </motion.div>
    );
};

export default PlayerStatusCard;