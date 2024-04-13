import React, { useState } from 'react';

const Test = () => {
    const [selectedSeat, setSelectedSeat] = useState(null);

    const handleSeatClick = (seatNumber) => {
        setSelectedSeat(seatNumber);
    };

    return (
        <div className="seat-booking">
            <h1 className="text-3xl font-semibold mb-4">Movie Theatre Seat Booking</h1>
            <div className="flex justify-center mb-4">
                <span className="font-semibold text-lg">Screen</span>
            </div>
            <svg
                className="w-3/4 mx-auto mb-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 100 10"
            >
                <path
                    d="M0 5 C 25 -2, 75 -2, 100 5"
                    fill="none"
                    stroke="black"
                    strokeWidth="0.3"
                />
            </svg>
            <div className="flex justify-between gap-4">
                <div className="flex flex-col gap-2">
                    {[...Array(9).keys()].map(row => (
                        <div key={row} className="flex gap-2">
                            {[...Array(6).keys()].map(col => (
                                <div
                                    key={col}
                                    className={`seat bg-gray-200 border border-gray-400 p-2 text-center cursor-pointer ${selectedSeat === row * 5 + col ? 'bg-yellow-400' : ''}`}
                                    onClick={() => handleSeatClick(row * 5 + col)}
                                >
                                    <span className="block w-5 h-6">{row * 5 + col + 1}</span>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
                <div className="w-4"></div> {/* Entrance space */}
                <div className="flex flex-col gap-2">
                    {[...Array(10).keys()].map(row => (
                        <div key={row} className="flex gap-2">
                            {[...Array(12).keys()].map(col => (
                                <div
                                    key={col}
                                    className={`seat bg-gray-200 border border-gray-400 p-2 text-center cursor-pointer ${selectedSeat === 25 + row * 7 + col ? 'bg-yellow-400' : ''}`}
                                    onClick={() => handleSeatClick(25 + row * 7 + col)}
                                >
                                    <span className="block w-5 h-6">{25 + row * 7 + col + 1}</span>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
                <div className="w-4"></div> {/* Entrance space */}
                <div className="flex flex-col gap-2">
                    {[...Array(9).keys()].map(row => (
                        <div key={row} className="flex gap-2">
                            {[...Array(6).keys()].map(col => (
                                <div
                                    key={col}
                                    className={`seat bg-gray-200 border border-gray-400 p-2 text-center cursor-pointer ${selectedSeat === 155 + row * 5 + col ? 'bg-yellow-400' : ''}`}
                                    onClick={() => handleSeatClick(155 + row * 5 + col)}
                                >
                                    <span className="block w-5 h-6">{155 + row * 5 + col + 1}</span>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex justify-center mt-4 mb-4">
                <span className="font-semibold text-lg">Entrance</span>
            </div>
            <div className="flex justify-between gap-4">
                <div className="flex flex-col gap-2">
                    {[...Array(7).keys()].map(row => (
                        <div key={row} className="flex gap-2">
                            {[...Array(7).keys()].map(col => (
                                <div
                                    key={col}
                                    className={`seat bg-gray-200 border border-gray-400 p-2 text-center cursor-pointer ${selectedSeat === 180 + row * 7 + col ? 'bg-yellow-400' : ''}`}
                                    onClick={() => handleSeatClick(180 + row * 7 + col)}
                                >
                                    <span className="block w-5 h-6">{180 + row * 7 + col + 1}</span>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>

                <div className="w-4"></div> {/* Entrance space */}
                <div className="flex flex-col gap-2">
                    {[...Array(5).keys()].map(row => (
                        <div key={row} className="flex gap-2">
                            {[...Array(5).keys()].map(col => (
                                <div
                                    key={col}
                                    className={`seat bg-gray-200 border border-gray-400 p-2 text-center cursor-pointer ${selectedSeat === 221 + row * 5 + col ? 'bg-yellow-400' : ''}`}
                                    onClick={() => handleSeatClick(221 + row * 5 + col)}
                                >
                                    <span className="block w-5 h-6">{221 + row * 5 + col + 1}</span>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
                <div className="w-4"></div> {/* Entrance space */}
                <div className="flex flex-col gap-2">
                    {[...Array(7).keys()].map(row => (
                        <div key={row} className="flex gap-2">
                            {[...Array(7).keys()].map(col => (
                                <div
                                    key={col}
                                    className={`seat bg-gray-200 border border-gray-400 p-2 text-center cursor-pointer ${selectedSeat === 246 + row * 7 + col ? 'bg-yellow-400' : ''}`}
                                    onClick={() => handleSeatClick(246 + row * 7 + col)}
                                >
                                    <span className="block w-5 h-6">{246 + row * 7 + col + 1}</span>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Test;
