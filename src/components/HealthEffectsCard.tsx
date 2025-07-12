
import React from 'react';
import { AlertCircle, Activity, Heart, Users, Wind, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HealthEffect {
  title: string;
  description: string;
  icon: React.ReactNode;
  severity: 'low' | 'moderate' | 'high' | 'severe';
}

interface HealthEffectsCardProps {
  aqiValue: number;
  aqiCategory: string;
  generalAdvice: string;
}

const HealthEffectsCard: React.FC<HealthEffectsCardProps> = ({
  aqiValue,
  aqiCategory,
  generalAdvice
}) => {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low':
        return 'text-green-600 bg-green-50';
      case 'moderate':
        return 'text-amber-600 bg-amber-50';
      case 'high':
        return 'text-orange-600 bg-orange-50';
      case 'severe':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-slate-600 bg-slate-50';
    }
  };

  const getHealthEffects = (aqi: number): HealthEffect[] => {
    if (aqi <= 50) {
      return [
        {
          title: 'General Health',
          description: 'Air quality is considered satisfactory, and air pollution poses little or no risk.',
          icon: <User />,
          severity: 'low'
        },
        {
          title: 'Respiratory',
          description: 'No respiratory discomfort expected.',
          icon: <Activity />,
          severity: 'low'
        },
        {
          title: 'Cardiovascular',
          description: 'No cardiovascular effects expected.',
          icon: <Heart />,
          severity: 'low'
        }
      ];
    } else if (aqi <= 100) {
      return [
        {
          title: 'Sensitive Groups',
          description: 'Active children and adults, and people with respiratory disease, such as asthma, should limit prolonged outdoor exertion.',
          icon: <Users />,
          severity: 'moderate'
        },
        {
          title: 'Respiratory',
          description: 'May cause minor breathing discomfort for sensitive individuals.',
          icon: <Activity />,
          severity: 'moderate'
        },
        {
          title: 'Air Pollutants',
          description: 'Moderate levels of pollutants in the air, primarily from PM2.5 and PM10 particles.',
          icon: <Wind />,
          severity: 'moderate'
        }
      ];
    } else if (aqi <= 150) {
      return [
        {
          title: 'General Health',
          description: 'Everyone may begin to experience health effects; members of sensitive groups may experience more serious effects.',
          icon: <User />,
          severity: 'high'
        },
        {
          title: 'Respiratory',
          description: 'Increased likelihood of respiratory symptoms in sensitive individuals, aggravation of heart or lung disease.',
          icon: <Activity />,
          severity: 'high'
        },
        {
          title: 'Cardiovascular',
          description: 'Increased aggravation of heart or lung disease and premature mortality in persons with cardiopulmonary disease and the elderly.',
          icon: <Heart />,
          severity: 'high'
        }
      ];
    } else {
      return [
        {
          title: 'General Population',
          description: 'Everyone may experience more serious health effects. Emergency conditions may be triggered.',
          icon: <AlertCircle />,
          severity: 'severe'
        },
        {
          title: 'Respiratory',
          description: 'Serious aggravation of heart or lung disease and premature mortality in persons with cardiopulmonary disease and the elderly.',
          icon: <Activity />,
          severity: 'severe'
        },
        {
          title: 'Physical Activity',
          description: 'Avoid all physical activity outdoors. Sensitive groups should remain indoors and keep activity levels low.',
          icon: <Activity />,
          severity: 'severe'
        }
      ];
    }
  };

  const healthEffects = getHealthEffects(aqiValue);

  return (
    <div className="w-full max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">Health Effects & Recommendations</h2>
      
      <div className="glass-card rounded-2xl overflow-hidden mb-6">
        <div className={cn(
          "p-4 border-l-4",
          aqiValue <= 50 ? "border-green-500 bg-green-50/70 dark:bg-green-900/20" :
          aqiValue <= 100 ? "border-amber-500 bg-amber-50/70 dark:bg-amber-900/20" :
          aqiValue <= 150 ? "border-orange-500 bg-orange-50/70 dark:bg-orange-900/20" :
          "border-red-500 bg-red-50/70 dark:bg-red-900/20"
        )}>
          <div className="flex items-start">
            <div className={cn(
              "h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0",
              aqiValue <= 50 ? "bg-green-100 text-green-600 dark:bg-green-900/40 dark:text-green-400" :
              aqiValue <= 100 ? "bg-amber-100 text-amber-600 dark:bg-amber-900/40 dark:text-amber-400" :
              aqiValue <= 150 ? "bg-orange-100 text-orange-600 dark:bg-orange-900/40 dark:text-orange-400" :
              "bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-400"
            )}>
              <AlertCircle className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <h3 className={cn(
                "font-bold text-lg",
                aqiValue <= 50 ? "text-green-800 dark:text-green-300" :
                aqiValue <= 100 ? "text-amber-800 dark:text-amber-300" :
                aqiValue <= 150 ? "text-orange-800 dark:text-orange-300" :
                "text-red-800 dark:text-red-300"
              )}>
                Air Quality: {aqiCategory}
              </h3>
              <p className="text-slate-700 dark:text-slate-300 mt-1 text-sm md:text-base">
                {generalAdvice}
              </p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6 bg-white dark:bg-slate-900">
          {healthEffects.map((effect, index) => (
            <div key={index} className="bg-slate-50 dark:bg-slate-800 rounded-xl p-4 hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center mb-3">
                <div className={cn(
                  "h-9 w-9 rounded-full flex items-center justify-center",
                  getSeverityColor(effect.severity)
                )}>
                  {effect.icon}
                </div>
                <h3 className="font-medium text-slate-800 dark:text-slate-200 ml-3">
                  {effect.title}
                </h3>
              </div>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                {effect.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="glass-card rounded-2xl overflow-hidden mb-6">
        <div className="p-6 bg-white dark:bg-slate-900">
          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-4">Air Quality Sources</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4">
              <h4 className="font-medium text-slate-800 dark:text-slate-200 mb-2">PM2.5 (Fine Particulate Matter)</h4>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Sources include combustion activities (motor vehicles, power plants), industrial processes, and natural sources like wildfires. These tiny particles can penetrate deep into the lungs and even enter the bloodstream.
              </p>
            </div>
            
            <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4">
              <h4 className="font-medium text-slate-800 dark:text-slate-200 mb-2">PM10 (Coarse Particulate Matter)</h4>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Sources include road dust, construction sites, industrial processes, and natural sources like pollen and mold. These particles can enter the respiratory system and cause irritation.
              </p>
            </div>
            
            <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4">
              <h4 className="font-medium text-slate-800 dark:text-slate-200 mb-2">Ozone (O₃)</h4>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Formed by chemical reactions between NOx and VOCs in the presence of sunlight. Sources include vehicle exhaust, industrial emissions, and chemical solvents. Ozone can trigger respiratory problems and exacerbate asthma.
              </p>
            </div>
            
            <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4">
              <h4 className="font-medium text-slate-800 dark:text-slate-200 mb-2">Nitrogen Dioxide (NO₂)</h4>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Sources include vehicle emissions, power plants, and industrial operations. NO₂ can cause respiratory irritation and contribute to the formation of ozone and particulate matter.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthEffectsCard;
