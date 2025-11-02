import React, { useEffect, useState } from "react";

const PlayerInfo = () => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:13000/players")
      .then(res => res.json())
      .then(data => setPlayers(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">All Players</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {players.map(player => (
          <div key={player._id} className="bg-gray-800 p-4 rounded-lg text-white">
            <img src={player.photo} alt={player.name} className="w-24 h-24 rounded-full object-cover mb-2" />
            <h3 className="font-bold">{player.name}</h3>
            <p>Email: {player.email}</p>
            <p>Phone: {player.phone}</p>
            <p>District: {player.district}</p>
            <p>Blood: {player.bloodGroup}</p>
            {player.facebook && <a href={player.facebook} target="_blank" className="text-blue-400">Facebook</a>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlayerInfo;
