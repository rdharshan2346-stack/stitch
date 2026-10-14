import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Home, Camera, Heart, MapPin, CloudSun, MessageCircle, BookOpen, Globe, ArrowRight, UploadCloud, CheckCircle2, Sprout, ThumbsUp, Droplets, Wind, Send, Bot, User } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import VoiceAssistant from "./components/VoiceAssistant";
import ImageUploader from './ImageUploader'; // Adjust the path if you didn't put it in a 'components' folder
import i18n from './i18n';
// ==========================================
// 1. PLACEHOLDER COMPONENT
// ==========================================
const ComingSoon = ({ title }) => {
  const { t } = useTranslation();
  return (
    <div className="flex h-[70vh] items-center justify-center">
      <h2 className="text-3xl font-bold text-gray-400">{title} {t('common.coming_soon')}</h2>
    </div>
  );
};

// ==========================================
// 2. HOME PAGE COMPONENT
// ==========================================
const HomePage = () => {
  const { t } = useTranslation();
  const [sensors, setSensors] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('https://stitch-api-za7e.onrender.com/api/sensors').then(res => res.json()),
      fetch('https://stitch-api-za7e.onrender.com/api/alerts').then(res => res.json())
    ])
      .then(([sensorData, alertData]) => {
        setSensors(sensorData);
        setAlerts(alertData);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch data:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex flex-col items-center w-full pb-20 font-sans">
      
      {/* Hero Section */}
      <div className="text-center max-w-4xl mt-16 mb-12 px-4 animate-in fade-in duration-700">
        <h1 className="text-5xl font-bold text-green-600 mb-4 tracking-tight">{t('home.hero_title')}</h1>
        <h2 className="text-2xl text-gray-700 font-medium mb-6">{t('home.hero_subtitle')}</h2>
        <p className="text-gray-500 max-w-3xl mx-auto text-lg">
          {t('home.hero_desc')}
        </p>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 max-w-5xl px-4 w-full">
        <div className="border border-green-100 rounded-xl p-6 shadow-sm bg-white hover:shadow-md transition">
          <h3 className="text-green-700 font-bold mb-2">{t('home.card1_title')}</h3>
          <p className="text-sm text-gray-500">{t('home.card1_desc')}</p>
        </div>
        <div className="border border-green-100 rounded-xl p-6 shadow-sm bg-white hover:shadow-md transition">
          <h3 className="text-green-700 font-bold mb-2">{t('home.card2_title')}</h3>
          <p className="text-sm text-gray-500">{t('home.card2_desc')}</p>
        </div>
        <div className="border border-green-100 rounded-xl p-6 shadow-sm bg-white hover:shadow-md transition">
          <h3 className="text-green-700 font-bold mb-2">{t('home.card3_title')}</h3>
          <p className="text-sm text-gray-500">{t('home.card3_desc')}</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-20">
        <button className="flex items-center gap-2 bg-green-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-green-700 transition shadow-lg">
          {t('home.btn_primary')} <ArrowRight size={20} />
        </button>
        <button className="border-2 border-green-600 text-green-600 px-8 py-3 rounded-lg font-bold hover:bg-green-50 transition">
          {t('home.btn_secondary')}
        </button>
      </div>

      {/* Features Grid */}
      <div className="w-full bg-green-50 py-16 px-4 flex flex-col items-center border-t border-b border-green-100">
        <div className="text-center max-w-3xl mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">{t('home.features_title')}</h2>
          <p className="text-gray-600">{t('home.features_desc')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl w-full">
          <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-green-50 rounded-lg text-green-600"><Camera size={28} /></div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{t('home.feat_plant_title')}</h3>
                <p className="text-gray-500 text-sm mb-4">{t('home.feat_plant_desc')}</p>
                <Link to="/plant" className="text-sm font-semibold text-gray-700 hover:text-green-600 flex items-center gap-1">{t('common.try_this')} <ArrowRight size={14} /></Link>
              </div>
            </div>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-pink-50 rounded-lg text-pink-600"><Heart size={28} /></div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{t('home.feat_animal_title')}</h3>
                <p className="text-gray-500 text-sm mb-4">{t('home.feat_animal_desc')}</p>
                <Link to="/animal" className="text-sm font-semibold text-gray-700 hover:text-pink-600 flex items-center gap-1">{t('common.try_this')} <ArrowRight size={14} /></Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Live Database Dashboard */}
      <div className="max-w-6xl w-full px-4 mt-16">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-green-500 pb-2">{t('home.live_dash_title')}</h2>
          {loading && <span className="text-sm text-gray-400 animate-pulse">{t('common.syncing_db')}</span>}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-lg font-bold text-gray-700 flex items-center gap-2">
               <span className="w-2 h-2 rounded-full bg-green-500 animate-ping"></span>
               {t('home.active_sensor_grid')} ({sensors.length})
            </h3>
            {sensors.length === 0 && !loading ? (
               <div className="bg-gray-50 border border-dashed border-gray-300 rounded-lg p-8 text-center text-gray-500">
                 {t('home.no_sensors')}
               </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {sensors.map((sensor) => (
                  <div key={sensor.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-bold text-gray-800 uppercase text-sm tracking-wider">{sensor.type} {t('home.sensor')}</span>
                      <span className={`px-2 py-0.5 text-[10px] font-bold rounded uppercase ${sensor.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {sensor.status === 'active' ? t('status.active') : t('status.inactive')}
                      </span>
                    </div>
                    <p className="text-gray-500 text-sm">{t('home.zone')}: <span className="text-gray-800 font-medium">{sensor.location_zone}</span></p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-700">{t('home.system_alerts')}</h3>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              {alerts.length === 0 && !loading ? (
                 <div className="p-6 text-center text-gray-500 text-sm">{t('home.all_clear')}</div>
              ) : (
                <div className="divide-y divide-gray-50">
                  {alerts.map((alert) => (
                    <div key={alert.id} className="p-4">
                       <div className="flex justify-between items-center mb-1">
                          <span className={`text-[10px] font-bold uppercase ${alert.severity === 'high' ? 'text-red-500' : 'text-yellow-500'}`}>
                            {alert.severity === 'high' ? t('status.high_priority') : t('status.low_priority')}
                          </span>
                       </div>
                       <p className="text-sm text-gray-700">{alert.message}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 3. PLANT HELPER COMPONENT
// ==========================================
const PlantHelper = () => {
  const { t,il8n} = useTranslation();
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
      setAnalysisResult(null); 
    }
  };

  const handleAnalyze = async () => {
    if (!selectedFile) return;
    setIsAnalyzing(true);
    
    const formData = new FormData();
    formData.append("file", selectedFile);
    
    formData.append("file", selectedFile);
    formData.append("language", i18n.language); // <-- Add this new line here!
    try {
      const response = await fetch('https://stitch-api-za7e.onrender.com/api/analyze-plant', {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) throw new Error("Backend AI connection failed");
      const data = await response.json();
      setAnalysisResult(data);
    } catch (error) {
      console.error("AI Error:", error);
      setAnalysisResult({
        status: t('error.system_error'),
        diagnosis: t('error.ai_connect_failed'),
        confidence: "0%",
        treatment: t('error.check_docker')
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 animate-in fade-in duration-500">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold text-green-700 mb-4 flex items-center justify-center gap-3">
          <Camera size={36} className="text-green-600" />
          {t('plant.title')}
        </h2>
        <p className="text-gray-600 text-lg">{t('plant.desc')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col h-full">
          <h3 className="text-xl font-bold text-gray-800 mb-4">{t('common.upload_image')}</h3>
          
          <ImageUploader preview={preview} onImageChange={handleImageChange} theme="pink" />

          <button 
            onClick={handleAnalyze}
            disabled={!selectedFile || isAnalyzing}
            className={`mt-6 w-full py-3 rounded-lg font-bold text-white transition-all shadow-md flex justify-center items-center gap-2 ${
              !selectedFile ? 'bg-gray-300 cursor-not-allowed shadow-none' : 
              isAnalyzing ? 'bg-green-500 animate-pulse' : 'bg-green-600 hover:bg-green-700'
            }`}
          >
            {isAnalyzing ? t('plant.analyzing') : t('plant.btn_analyze')}
          </button>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col h-full">
          <h3 className="text-xl font-bold text-gray-800 mb-4">{t('plant.report_title')}</h3>
          
          {!analysisResult && !isAnalyzing && (
            <div className="flex-1 flex items-center justify-center text-gray-400 text-center border-2 border-dashed border-gray-100 rounded-xl p-6">
              {t('common.waiting_upload')}
            </div>
          )}

          {isAnalyzing && (
            <div className="flex-1 flex flex-col items-center justify-center text-green-600 space-y-4">
              <div className="w-12 h-12 border-4 border-green-200 border-t-green-600 rounded-full animate-spin"></div>
              <p className="font-medium animate-pulse">{t('plant.running_model')}</p>
            </div>
          )}

          {analysisResult && (
            <div className="flex-1 bg-yellow-50 rounded-xl p-6 border border-yellow-100 flex flex-col gap-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-xs font-bold text-yellow-600 uppercase tracking-wider mb-1">{t('common.status')}</p>
                  <p className="text-xl font-bold text-gray-800 flex items-center gap-2">{analysisResult.status}</p>
                </div>
                <div className="bg-white px-3 py-1 rounded-full border border-yellow-200 text-xs font-bold text-yellow-700">
                  {analysisResult.confidence} {t('common.match')}
                </div>
              </div>

              <div>
                <p className="text-xs font-bold text-yellow-600 uppercase tracking-wider mb-1">{t('plant.detected_issue')}</p>
                <p className="text-gray-800 font-medium">{analysisResult.diagnosis}</p>
              </div>

              <div className="mt-auto pt-4 border-t border-yellow-200">
                <p className="text-xs font-bold text-green-700 uppercase tracking-wider mb-2 flex items-center gap-1">
                  <CheckCircle2 size={14} /> {t('plant.recommended_action')}
                </p>
                <p className="text-sm text-gray-700 leading-relaxed">{analysisResult.treatment}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 3.5 ANIMAL CARE COMPONENT
// ==========================================
const AnimalCare = () => {
  const { t } = useTranslation();
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
      setAnalysisResult(null); 
    }
  };

  const handleAnalyze = async () => {
    if (!selectedFile) return;
    setIsAnalyzing(true);
    
    const formData = new FormData();
    formData.append("file", selectedFile);
    
    try {
      const response = await fetch('https://stitch-api-za7e.onrender.com/api/analyze-animal', {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) throw new Error("Backend connection failed");
      const data = await response.json();
      setAnalysisResult(data);
    } catch (error) {
      console.error("AI Error:", error);
      setAnalysisResult({
        status: t('error.system_error'),
        diagnosis: t('error.ai_connect_failed'),
        confidence: "0%",
        treatment: t('error.check_docker')
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 animate-in fade-in duration-500">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold text-pink-700 mb-4 flex items-center justify-center gap-3">
          <Heart size={36} className="text-pink-600" />
          {t('animal.title')}
        </h2>
        <p className="text-gray-600 text-lg">{t('animal.desc')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col h-full">
          <h3 className="text-xl font-bold text-gray-800 mb-4">{t('common.upload_image')}</h3>
          
          <ImageUploader preview={preview} onImageChange={handleImageChange} theme="pink" />

          <button 
            onClick={handleAnalyze}
            disabled={!selectedFile || isAnalyzing}
            className={`mt-6 w-full py-3 rounded-lg font-bold text-white transition-all shadow-md flex justify-center items-center gap-2 ${
              !selectedFile ? 'bg-gray-300 cursor-not-allowed shadow-none' : 
              isAnalyzing ? 'bg-pink-500 animate-pulse' : 'bg-pink-600 hover:bg-pink-700'
            }`}
          >
            {isAnalyzing ? t('animal.analyzing') : t('animal.btn_analyze')}
          </button>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col h-full">
          <h3 className="text-xl font-bold text-gray-800 mb-4">{t('animal.report_title')}</h3>
          
          {!analysisResult && !isAnalyzing && (
            <div className="flex-1 flex items-center justify-center text-gray-400 text-center border-2 border-dashed border-gray-100 rounded-xl p-6">
              {t('common.waiting_upload')}
            </div>
          )}

          {isAnalyzing && (
            <div className="flex-1 flex flex-col items-center justify-center text-pink-600 space-y-4">
              <div className="w-12 h-12 border-4 border-pink-200 border-t-pink-600 rounded-full animate-spin"></div>
              <p className="font-medium animate-pulse">{t('animal.running_model')}</p>
            </div>
          )}

          {analysisResult && (
            <div className="flex-1 bg-rose-50 rounded-xl p-6 border border-rose-100 flex flex-col gap-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-xs font-bold text-rose-600 uppercase tracking-wider mb-1">{t('common.status')}</p>
                  <p className="text-xl font-bold text-gray-800 flex items-center gap-2">{analysisResult.status}</p>
                </div>
                <div className="bg-white px-3 py-1 rounded-full border border-rose-200 text-xs font-bold text-rose-700">
                  {analysisResult.confidence} {t('common.match')}
                </div>
              </div>

              <div>
                <p className="text-xs font-bold text-rose-600 uppercase tracking-wider mb-1">{t('animal.observation')}</p>
                <p className="text-gray-800 font-medium">{analysisResult.diagnosis}</p>
              </div>

              <div className="mt-auto pt-4 border-t border-rose-200">
                <p className="text-xs font-bold text-pink-700 uppercase tracking-wider mb-2 flex items-center gap-1">
                  <CheckCircle2 size={14} /> {t('animal.care_recommendation')}
                </p>
                <p className="text-sm text-gray-700 leading-relaxed">{analysisResult.treatment}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 3.7 COW TRACKER COMPONENT
// ==========================================
const CowTracker = () => {
  const { t } = useTranslation();
  const [herd, setHerd] = useState([]);
  const [lastUpdated, setLastUpdated] = useState("");

  const fetchCowData = () => {
    fetch('https://stitch-api-za7e.onrender.com/api/cows')
      .then(res => res.json())
      .then(data => {
        setHerd(data);
        const now = new Date();
        setLastUpdated(now.toLocaleTimeString());
      })
      .catch(err => console.error("Failed to fetch GPS data:", err));
  };

  useEffect(() => {
    fetchCowData();
    const interval = setInterval(fetchCowData, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
        <div>
          <h2 className="text-4xl font-bold text-purple-700 mb-2 flex items-center gap-3">
            <MapPin size={36} className="text-purple-600" />
            {t('cow.title')}
          </h2>
          <p className="text-gray-600">{t('cow.desc')}</p>
        </div>
        <div className="bg-purple-50 text-purple-700 px-4 py-2 rounded-lg font-mono text-sm border border-purple-100 flex items-center gap-2 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></span>
          {t('cow.last_ping')}: {lastUpdated || t('cow.connecting')}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
          <h3 className="text-lg font-bold text-gray-800 mb-4 px-2">{t('cow.sector_title')}</h3>
          
          <div className="relative w-full aspect-[4/3] bg-green-100 rounded-xl overflow-hidden border-2 border-green-200 shadow-inner">
            <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(#22c55e22 1px, transparent 1px), linear-gradient(90deg, #22c55e22 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
            
            {herd.map(cow => (
              <div 
                key={cow.id}
                className="absolute flex flex-col items-center justify-center transition-all duration-1000 ease-in-out transform -translate-x-1/2 -translate-y-1/2 group z-10"
                style={{ left: `${cow.position.x}%`, top: `${cow.position.y}%` }}
              >
                <div className="absolute w-8 h-8 bg-purple-400 rounded-full opacity-0 group-hover:animate-ping"></div>
                <div className={`w-4 h-4 rounded-full border-2 border-white shadow-md z-10 ${cow.color}`}></div>
                <div className="mt-2 bg-gray-900 text-white text-[10px] font-bold px-2 py-1 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {cow.name} ({cow.status === 'Resting' ? t('status.resting') : t('status.active')})
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-4">{t('cow.active_collars')} ({herd.length})</h3>
          
          <div className="flex flex-col gap-3">
            {herd.length === 0 && <p className="text-gray-400 text-sm">{t('cow.searching')}</p>}
            
            {herd.map(cow => (
              <div key={cow.id} className="p-3 border border-gray-100 rounded-xl hover:bg-purple-50 transition cursor-default">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-gray-800 flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${cow.color} border border-gray-300`}></div>
                    {cow.name}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${cow.status === 'Resting' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>
                    {cow.status === 'Resting' ? t('status.resting') : t('status.active')}
                  </span>
                </div>
                
                <div className="flex justify-between text-xs text-gray-500 font-mono">
                  <span>BPM: <span className="text-red-500 font-bold">{cow.heart_rate}</span></span>
                  <span>BAT: <span className={`${cow.battery < 50 ? 'text-yellow-500' : 'text-green-500'} font-bold`}>{cow.battery}%</span></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 3.8 WEATHER FRIEND COMPONENT
// ==========================================
const WeatherFriend = () => {
  const { t } = useTranslation();
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://stitch-api-za7e.onrender.com/api/weather')
      .then(res => res.json())
      .then(data => {
        setWeather(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch weather:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-12 text-center text-blue-500 animate-pulse">{t('weather.syncing')}</div>;
  if (!weather) return <div className="p-12 text-center text-red-500">{t('weather.unavailable')}</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 animate-in fade-in duration-500">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold text-blue-700 mb-4 flex items-center justify-center gap-3">
          <CloudSun size={36} className="text-blue-500" />
          {t('weather.title')}
        </h2>
        <p className="text-gray-600 text-lg">{t('weather.desc')}</p>
      </div>

      <div className="bg-gradient-to-br from-blue-50 to-sky-100 rounded-3xl p-8 shadow-sm border border-blue-100">
        <div className="flex flex-col md:flex-row justify-between items-center border-b border-blue-200 pb-8 mb-8">
          <div className="flex items-center gap-6 mb-6 md:mb-0">
            <CloudSun size={80} className="text-blue-600" />
            <div>
              <h3 className="text-5xl font-bold text-gray-800">{weather.current.temperature}°C</h3>
              <p className="text-xl text-blue-700 font-medium">{weather.current.condition}</p>
            </div>
          </div>
          
          <div className="flex gap-6">
            <div className="flex flex-col items-center bg-white p-3 rounded-xl shadow-sm min-w-[100px]">
              <Droplets size={24} className="text-blue-400 mb-1" />
              <span className="text-sm text-gray-500">{t('weather.humidity')}</span>
              <span className="font-bold text-gray-800">{weather.current.humidity}%</span>
            </div>
            <div className="flex flex-col items-center bg-white p-3 rounded-xl shadow-sm min-w-[100px]">
              <Wind size={24} className="text-gray-400 mb-1" />
              <span className="text-sm text-gray-500">{t('weather.wind')}</span>
              <span className="font-bold text-gray-800">{weather.current.wind_speed} km/h</span>
            </div>
          </div>
        </div>

        <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 mb-8 border border-white">
          <h4 className="text-sm font-bold text-blue-800 uppercase tracking-wider mb-2">{t('weather.advice_title')}</h4>
          <p className="text-gray-700 leading-relaxed">{weather.advice}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {weather.forecast.map((day, idx) => (
            <div key={idx} className="bg-white p-4 rounded-xl shadow-sm text-center border border-blue-50">
              <p className="font-bold text-gray-800 mb-2">{day.day}</p>
              <p className="text-2xl font-bold text-blue-600 mb-1">{day.temp}°C</p>
              <p className="text-sm text-gray-500">{day.condition}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 3.9 CHAT WITH ME COMPONENT
// ==========================================
const ChatWithMe = () => {
  const { t, i18n } = useTranslation(); // Destructure i18n to access the current language
  const [messages, setMessages] = useState([
    { role: 'assistant', content: t('chat.initial_msg') }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await fetch('https://stitch-api-za7e.onrender.com/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: input,
          language: i18n.language // Sends 'en', 'hi', 'te', or 'ta' to your Python backend
        }),
      });
      
      const data = await response.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
    } catch (err) {
      console.error("Chat Error:", err);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: t('chat.error_msg') 
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-[80vh] max-w-4xl mx-auto p-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">{t('chat.title')}</h1>
        <p className="text-gray-500">{t('chat.desc')}</p>
      </div>

      <div className="flex-1 bg-white border border-green-100 rounded-2xl shadow-sm overflow-hidden flex flex-col">
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] p-4 rounded-2xl ${
                msg.role === 'user' 
                  ? 'bg-green-600 text-white rounded-tr-none' 
                  : 'bg-green-50 text-gray-800 rounded-tl-none'
              }`}>
                {msg.content}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-green-50 text-gray-400 p-4 rounded-2xl rounded-tl-none animate-pulse">
                AI is thinking...
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-green-100 bg-gray-50">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder={t('chat.placeholder')}
              className="flex-1 p-3 border border-green-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:outline-none bg-white"
            />
            <button 
              onClick={sendMessage}
              className="bg-green-600 text-white p-3 rounded-xl hover:bg-green-700 transition shadow-md"
            >
              <MessageCircle size={24} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 3.10 SOIL STORIES COMPONENT
// ==========================================
const SoilStories = () => {
  const { t } = useTranslation();
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://stitch-api-za7e.onrender.com/api/stories')
      .then(res => res.json())
      .then(data => {
        setStories(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch stories:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
        <div>
          <h2 className="text-4xl font-bold text-amber-700 mb-2 flex items-center gap-3">
            <BookOpen size={36} className="text-amber-600" />
            {t('soil.title')}
          </h2>
          <p className="text-gray-600 text-lg">{t('soil.desc')}</p>
        </div>
        <button className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 px-6 rounded-xl shadow-sm transition-all flex items-center gap-2">
          <Sprout size={20} />
          {t('soil.btn_share')}
        </button>
      </div>

      {loading ? (
        <div className="text-center py-12 text-amber-600 animate-pulse font-medium">{t('soil.loading')}</div>
      ) : (
        <div className="space-y-6">
          {stories.map(story => (
            <div key={story.id} className="bg-white rounded-2xl p-6 shadow-sm border border-amber-100 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-800 hover:text-amber-700 cursor-pointer transition-colors">{story.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {t('soil.by')} <span className="font-bold text-gray-700">{story.author}</span> • {story.date} • {t('soil.growing')}: {story.crop}
                  </p>
                </div>
                <div className="bg-amber-50 text-amber-700 px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1 cursor-pointer hover:bg-amber-100 transition-colors">
                  <ThumbsUp size={14} /> {story.likes}
                </div>
              </div>
              
              <p className="text-gray-700 leading-relaxed mb-4">"{story.content}"</p>
              
              <div className="flex flex-wrap gap-2">
                {story.tags.map(tag => (
                  <span key={tag} className="text-xs font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded-md">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ==========================================
// 4. NAVIGATION BAR COMPONENT
// ==========================================
function NavBar() {
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const changeLanguage = (e) => { i18n.changeLanguage(e.target.value); };
  
  const navItems = [
    { path: '/', label: t('nav_home'), icon: Home },
    { path: '/plant', label: t('nav_plant'), icon: Camera },
    { path: '/animal', label: t('nav_animal'), icon: Heart },
    { path: '/cow', label: t('nav_cow'), icon: MapPin },
    { path: '/weather', label: t('nav_weather'), icon: CloudSun },
    { path: '/chat', label: t('nav_chat'), icon: MessageCircle },
    { path: '/soil', label: t('nav_stories'), icon: BookOpen }
  ];

  return (
    <nav className="bg-white shadow-sm border-b px-6 py-3 flex items-center justify-between">
      <div className="flex items-center gap-2 text-green-600 font-bold text-xl">
        <span className="text-2xl">🍃</span>
        <div>
          <span className="block leading-none">Smart</span>
          <span className="block leading-none">Farm</span>
        </div>
      </div>

      <div className="hidden md:flex space-x-1 overflow-x-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-2 px-3 py-2 rounded-full transition whitespace-nowrap ${
                isActive ? 'bg-green-50 text-green-700 font-semibold' : 'text-gray-500 hover:bg-gray-50 hover:text-green-600'
              }`}
            >
              <Icon size={18} />
              <span className="text-sm">{item.label}</span>
            </Link>
          );
        })}
      </div>

      <div className="flex items-center gap-2 text-gray-500 cursor-pointer hover:text-green-600">
        <div className="flex items-center gap-2">
          <Globe size={20} className="text-gray-500" />
          <select onChange={changeLanguage} className="bg-transparent border-none text-gray-700 font-medium focus:ring-0 cursor-pointer">
            <option value="en">English</option>
            <option value="hi">हिंदी (Hindi)</option>
            <option value="te">తెలుగు (Telugu)</option>
            <option value="ta">தமிழ் (Tamil)</option>
            <option value="kn">ಕನ್ನಡ (Kannada)</option>
            <option value="ml">മലയാളം (Malayalam)</option>
          </select>
        </div> 
        <span className="text-sm font-medium">{t('common.region', { defaultValue: 'IN' })}</span>
      </div>
    </nav>
  );
}


// ==========================================
// 5. MAIN APP ROUTER
// ==========================================
export default function App() {
  const [assistantOpen, setAssistantOpen] = useState(false);
  return (
    <Router>
      <div className="min-h-screen bg-white font-sans">
        <NavBar />
        <main className="max-w-7xl mx-auto">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/plant" element={<PlantHelper />} />
            <Route path="/animal" element={<AnimalCare />} />
            <Route path="/cow" element={<CowTracker />} />
            <Route path="/weather" element={<WeatherFriend />} />
            <Route path="/chat" element={<ChatWithMe />} />
            <Route path="/soil" element={<SoilStories />} />
          </Routes>
        </main>
        {/* Floating voice assistant button */}
        <button
          onClick={() => setAssistantOpen(true)}
          className="fixed bottom-6 right-6 z-30 w-14 h-14 rounded-full bg-green-600 shadow-lg flex items-center justify-center hover:bg-green-700 transition-colors"
        >
          <span className="material-symbols-outlined text-white" style={{ fontSize: 26 }}>mic</span>
        </button>

        <VoiceAssistant isOpen={assistantOpen} onClose={() => setAssistantOpen(false)} />
      </div>
      
    </Router>
  );
}
