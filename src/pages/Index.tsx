
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import AirQualityMap from '@/components/AirQualityMap';
import AqiDetails from '@/components/AqiDetails';
import HealthEffectsCard from '@/components/HealthEffectsCard';

const getAqiCategory = (aqi: number): string => {
  if (aqi <= 50) return 'Good';
  if (aqi <= 100) return 'Moderate';
  if (aqi <= 150) return 'Poor';
  if (aqi <= 200) return 'Unhealthy';
  if (aqi <= 300) return 'Severe';
  return 'Hazardous';
};

const getHealthAdvice = (aqi: number): string => {
  if (aqi <= 50) {
    return 'Air quality is considered satisfactory, and air pollution poses little or no risk.';
  } else if (aqi <= 100) {
    return 'Air quality is acceptable; however, some pollutants may be a moderate health concern for a small number of individuals who are unusually sensitive to air pollution.';
  } else if (aqi <= 150) {
    return 'Members of sensitive groups may experience health effects. The general public is less likely to be affected.';
  } else if (aqi <= 200) {
    return 'Everyone may begin to experience health effects; members of sensitive groups may experience more serious health effects.';
  } else if (aqi <= 300) {
    return 'Health alert: Everyone may experience more serious health effects.';
  } else {
    return 'Health warnings of emergency conditions. The entire population is more likely to be affected.';
  }
};

const Index = () => {
  const [loading, setLoading] = useState(true);
  const [aqiData, setAqiData] = useState({
    aqiValue: 98,
    location: 'Surat, Gujarat, India',
    lastUpdated: '15 minutes ago',
    pm10: 96,
    pm25: 34,
    temperature: 33,
    humidity: 33,
    windSpeed: 10,
    uvIndex: 9,
    cityRank: 397,
    comparison: 'AQI in Surat is 1.57 times Below than in Gujarat'
  });

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen relative bg-slate-100 dark:bg-slate-900 overflow-x-hidden">
      <AirQualityMap />
      <Header />
      
      <main className="pt-28 pb-16 px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="flex items-center justify-center min-h-[50vh]">
              <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
            </div>
          ) : (
            <>
              <AqiDetails 
                aqiValue={aqiData.aqiValue}
                location={aqiData.location}
                lastUpdated={aqiData.lastUpdated}
                pm10={aqiData.pm10}
                pm25={aqiData.pm25}
                temperature={aqiData.temperature}
                humidity={aqiData.humidity}
                windSpeed={aqiData.windSpeed}
                uvIndex={aqiData.uvIndex}
                cityRank={aqiData.cityRank}
                comparison={aqiData.comparison}
              />
              
              <div className="mt-8 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                <HealthEffectsCard 
                  aqiValue={aqiData.aqiValue}
                  aqiCategory={getAqiCategory(aqiData.aqiValue)}
                  generalAdvice={getHealthAdvice(aqiData.aqiValue)}
                />
              </div>
            </>
          )}
        </div>
      </main>
      
      <footer className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 py-6 px-4 relative z-10">
        <div className="max-w-7xl mx-auto text-center text-sm text-slate-500 dark:text-slate-400">
          <p>Air Quality data is provided for informational purposes only. Always check with local authorities for the most accurate information.</p>
          <p className="mt-2">© 2023 Air Quality Index Dashboard</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
