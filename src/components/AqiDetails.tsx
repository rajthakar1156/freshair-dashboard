
import React from 'react';
import { Clock, MapPin, Heart, Share2, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AqiDetailsProps {
  aqiValue: number;
  location: string;
  lastUpdated: string;
  pm10: number;
  pm25: number;
  temperature: number;
  humidity: number;
  windSpeed: number;
  uvIndex: number;
  cityRank: number;
  comparison: string;
}

const getAqiCategory = (aqi: number): { 
  label: string, 
  color: string,
  textColor: string,
  bgColor: string
} => {
  if (aqi <= 50) {
    return { 
      label: 'Good', 
      color: 'bg-aqi-good', 
      textColor: 'text-green-800',
      bgColor: 'bg-green-100'
    };
  } else if (aqi <= 100) {
    return { 
      label: 'Moderate', 
      color: 'bg-aqi-moderate', 
      textColor: 'text-amber-800',
      bgColor: 'bg-amber-100'
    };
  } else if (aqi <= 150) {
    return { 
      label: 'Poor', 
      color: 'bg-aqi-poor', 
      textColor: 'text-orange-800',
      bgColor: 'bg-orange-100'
    };
  } else if (aqi <= 200) {
    return { 
      label: 'Unhealthy', 
      color: 'bg-aqi-unhealthy', 
      textColor: 'text-red-800',
      bgColor: 'bg-red-100'
    };
  } else if (aqi <= 300) {
    return { 
      label: 'Severe', 
      color: 'bg-aqi-severe', 
      textColor: 'text-purple-800',
      bgColor: 'bg-purple-100'
    };
  } else {
    return { 
      label: 'Hazardous', 
      color: 'bg-aqi-hazardous', 
      textColor: 'text-pink-800',
      bgColor: 'bg-pink-100'
    };
  }
};

const AqiDetails: React.FC<AqiDetailsProps> = ({
  aqiValue,
  location,
  lastUpdated,
  pm10,
  pm25,
  temperature,
  humidity,
  windSpeed,
  uvIndex,
  cityRank,
  comparison
}) => {
  const aqiCategory = getAqiCategory(aqiValue);
  
  return (
    <div className="glass-card rounded-3xl overflow-hidden relative w-full max-w-3xl mx-auto animate-fade-in-up">
      <div className={cn(
        "p-6 aqi-gradient", 
        aqiValue <= 50 ? "bg-gradient-to-br from-green-100 via-green-200 to-green-300" :
        aqiValue <= 100 ? "bg-gradient-to-br from-yellow-100 via-amber-200 to-amber-300" :
        aqiValue <= 150 ? "bg-gradient-to-br from-orange-100 via-orange-200 to-orange-300" :
        aqiValue <= 200 ? "bg-gradient-to-br from-red-100 via-red-200 to-red-300" :
        aqiValue <= 300 ? "bg-gradient-to-br from-purple-100 via-purple-200 to-purple-300" :
        "bg-gradient-to-br from-pink-100 via-pink-200 to-pink-300"
      )}>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2 mb-1">
              Real-time Air Quality Index (AQI)
            </h1>
            <div className="flex items-center gap-2 text-slate-600">
              <MapPin className="h-4 w-4" />
              <a href="#" className="text-primary underline-offset-4 hover:underline">
                {location}
              </a>
            </div>
            <div className="flex items-center gap-2 text-slate-600 text-sm mt-1">
              <Clock className="h-3 w-3" />
              <span>Last Updated: {lastUpdated}</span>
            </div>
          </div>
          
          <div className="flex gap-2 mt-4 md:mt-0">
            <button className="p-2 rounded-full bg-white/30 hover:bg-white/50 transition-colors">
              <Heart className="h-5 w-5 text-slate-700" />
            </button>
            <button className="p-2 rounded-full bg-white/30 hover:bg-white/50 transition-colors">
              <Share2 className="h-5 w-5 text-slate-700" />
            </button>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row items-center mt-8 gap-6">
          <div className="relative">
            <div className="text-center">
              <div className="inline-flex items-center">
                <span className="text-8xl font-bold text-slate-800">{aqiValue}</span>
                <div className="ml-4 px-3 py-1 rounded-lg bg-white/50 backdrop-blur-sm text-slate-800 font-medium">
                  Live AQI
                </div>
              </div>
              <div className="mt-2">
                <span className={cn(
                  "px-4 py-1.5 rounded-full font-medium text-lg",
                  aqiCategory.bgColor,
                  aqiCategory.textColor
                )}>
                  {aqiCategory.label}
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            <div className="bg-white/30 rounded-xl p-4">
              <div className="text-slate-600 text-sm">PM10</div>
              <div className="text-2xl font-bold text-slate-800 flex items-end gap-1">
                {pm10} <span className="text-xs font-normal mb-1">μg/m³</span>
              </div>
              <div className="mt-2 relative h-2 bg-white/50 rounded-full overflow-hidden">
                <div className="h-full rounded-full bg-aqi-moderate" style={{ width: `${Math.min(100, (pm10/200) * 100)}%` }}></div>
              </div>
            </div>
            
            <div className="bg-white/30 rounded-xl p-4">
              <div className="text-slate-600 text-sm">PM2.5</div>
              <div className="text-2xl font-bold text-slate-800 flex items-end gap-1">
                {pm25} <span className="text-xs font-normal mb-1">μg/m³</span>
              </div>
              <div className="mt-2 relative h-2 bg-white/50 rounded-full overflow-hidden">
                <div className="h-full rounded-full bg-aqi-moderate" style={{ width: `${Math.min(100, (pm25/100) * 100)}%` }}></div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-4 pt-2">
          <div className="relative h-2 bg-white/40 rounded-full overflow-hidden flex">
            <div className="h-full bg-aqi-good" style={{ width: '20%' }}></div>
            <div className="h-full bg-aqi-moderate" style={{ width: '20%' }}></div>
            <div className="h-full bg-aqi-poor" style={{ width: '20%' }}></div>
            <div className="h-full bg-aqi-unhealthy" style={{ width: '20%' }}></div>
            <div className="h-full bg-aqi-severe" style={{ width: '10%' }}></div>
            <div className="h-full bg-aqi-hazardous" style={{ width: '10%' }}></div>
          </div>
          <div className="flex justify-between text-xs text-slate-600 mt-1">
            <div>Good</div>
            <div>Moderate</div>
            <div>Poor</div>
            <div>Unhealthy</div>
            <div>Severe</div>
            <div>Hazardous</div>
          </div>
          <div className="flex justify-between text-xs text-slate-600 mt-1">
            <div>0</div>
            <div>50</div>
            <div>100</div>
            <div>150</div>
            <div>200</div>
            <div>300</div>
            <div>301+</div>
          </div>
        </div>
      </div>
      
      <div className="p-6 bg-white dark:bg-slate-900">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl">
            <div className="text-slate-500 dark:text-slate-400 text-xs mb-1">
              Temperature
            </div>
            <div className="flex items-baseline">
              <span className="text-2xl font-bold text-slate-800 dark:text-slate-100">{temperature}</span>
              <span className="text-sm text-slate-600 dark:text-slate-300 ml-1">°C</span>
            </div>
            <div className="text-slate-600 dark:text-slate-300 text-sm mt-1">Sunny</div>
          </div>
          
          <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl">
            <div className="text-slate-500 dark:text-slate-400 text-xs mb-1">
              Humidity
            </div>
            <div className="flex items-baseline">
              <span className="text-2xl font-bold text-slate-800 dark:text-slate-100">{humidity}</span>
              <span className="text-sm text-slate-600 dark:text-slate-300 ml-1">%</span>
            </div>
          </div>
          
          <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl">
            <div className="text-slate-500 dark:text-slate-400 text-xs mb-1">
              Wind Speed
            </div>
            <div className="flex items-baseline">
              <span className="text-2xl font-bold text-slate-800 dark:text-slate-100">{windSpeed}</span>
              <span className="text-sm text-slate-600 dark:text-slate-300 ml-1">km/h</span>
            </div>
          </div>
          
          <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl">
            <div className="text-slate-500 dark:text-slate-400 text-xs mb-1">
              UV Index
            </div>
            <div className="flex items-baseline">
              <span className="text-2xl font-bold text-slate-800 dark:text-slate-100">{uvIndex}</span>
            </div>
          </div>
        </div>
        
        <div className="mt-6 grid grid-cols-1 gap-4">
          <div className="flex items-center justify-between p-4 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-100 dark:border-red-900/30">
            <div className="flex items-center">
              <div className="h-10 w-10 flex items-center justify-center bg-red-100 dark:bg-red-900/30 rounded-full">
                <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
              </div>
              <div className="ml-4">
                <div className="font-semibold text-slate-800 dark:text-slate-200 flex items-center">
                  <span className="text-lg font-bold mr-2">Rank</span>
                  <span className="text-2xl font-bold text-red-600 dark:text-red-500">{cityRank}<sup>th</sup></span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Currently, Surat ranks {cityRank}th among the most polluted cities globally.
                </p>
              </div>
            </div>
          </div>
          
          <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-100 dark:border-green-900/30">
            <div className="flex items-center">
              <div className="text-3xl font-bold text-green-600 dark:text-green-500 mr-2">1.57x</div>
              <div className="text-xl font-semibold text-slate-700 dark:text-slate-300">Below</div>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              {comparison}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AqiDetails;
