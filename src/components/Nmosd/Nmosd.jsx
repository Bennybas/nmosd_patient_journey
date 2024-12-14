import React, { useState } from 'react';
import JourneyStage from '../JourneyStage/JourneyStage';
import { journeyData } from '../../Germandata/journeyData';
import { journeyDataF } from '../../Francedata/journeyDataF';
import { ArrowLeft } from 'lucide-react';
import {  Pill } from 'lucide-react'

const NmosD = () => {
  const [selectedCountry, setSelectedCountry] = useState('germany');
 

  const toggleCountry = () => {
    setSelectedCountry(selectedCountry === 'germany' ? 'france' : 'germany');

  };
  const [isLoading, setIsLoading] = useState(false);  // Add loading state
  const handleBackClick = () => {
    setIsLoading(true);
    window.location.href = '';
  };


  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex items-center mb-4">
      <button 
          onClick={handleBackClick} 
          className="p-2 hover:bg-gray-100 rounded-full transition-colors flex items-center"
          aria-label="Go back"
        >
          <ArrowLeft className="text-gray-700 w-6 h-6" />
        </button>
        <h1 className="text-xl font-bold ml-4">NMOSD Patient Journey</h1>
      </div>

      <div className="absolute top-8 right-20 z-10">
        <button
          onClick={toggleCountry}
          className="relative flex items-center bg-gray-100 border border-gray-200 rounded-full p-1 w-44 h-10 shadow-sm transition-all duration-300 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          aria-label="Toggle Country"
        >
          <div
            className={`absolute inset-0 bg-blue-100 rounded-full transform transition-all duration-300 ${
              selectedCountry === 'germany' ? 'translate-x-0 w-1/2' : 'translate-x-full w-1/2'
            }`}
          />
          <div
            className={`absolute z-10 w-1/2 h-7 bg-white rounded-full shadow-md transform transition-transform ease-in-out duration-300 ${
              selectedCountry === 'germany' ? 'translate-x-0' : 'translate-x-full'
            }`}
          />
          <span
            className={`relative z-20 w-1/2 text-center text-xs font-semibold transition-colors duration-300 ${
              selectedCountry === 'germany' ? 'text-blue-800' : 'text-gray-500'
            }`}
          >
            Germany
          </span>
          <span
            className={`relative z-20 w-1/2 text-center text-xs font-semibold transition-colors duration-300 ${
              selectedCountry === 'france' ? 'text-blue-800' : 'text-gray-500'
            }`}
          >
            France
          </span>
        </button>
      </div>

      <div className="space-y-12">
        {selectedCountry === 'germany' &&
          journeyData.map((stage, idx) => (
            <JourneyStage
              key={idx}
              stage={stage}
              metrics={stage.metrics}
              barriers={stage.barriers}
              findings={stage.findings}
              selectedCountry={selectedCountry}
            />
          ))}

        {selectedCountry === 'france' &&
          journeyDataF.map((stage, idx) => (
            <JourneyStage
              key={idx}
              fstage={stage}
              fmetrics={stage.metrics}
              fbarriers={stage.barriers}
              ffindings={stage.findings}
              selectedCountry={selectedCountry}
            />
          ))}

{isLoading && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 opacity-50 flex items-center justify-center z-50">
          <div className="text-white text-3xl flex items-center space-x-4">
            <Pill className="animate-spin w-12 h-12" /> {/* Use the rotating Pill icon */}
            <span>Loading...</span>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default NmosD;
