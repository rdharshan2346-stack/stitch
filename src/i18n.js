import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "nav_home": "Home",
      "nav_plant": "Plant Helper",
      "nav_animal": "Animal Care",
      "nav_cow": "Cow Tracker",
      "nav_weather": "Weather",
      "nav_chat": "Chat",
      "nav_stories": "Soil Stories",
      "common": {
        "coming_soon": "Feature Coming Soon!",
        "try_this": "Let's Try This",
        "syncing_db": "Syncing with database...",
        "upload_image": "Upload Image",
        "click_drag": "Click to browse or drag and drop",
        "supports_formats": "Supports JPG, PNG (Max 5MB)",
        "waiting_upload": "Waiting for image upload...",
        "status": "Status",
        "match": "Match",
        "region": "IN"
      },
      "status": {
        "active": "Active",
        "inactive": "Inactive",
        "high_priority": "High Priority",
        "low_priority": "Low Priority",
        "resting": "Resting"
      },
      "home": {
        "hero_title": "Your Farming Companion That Truly Cares",
        "hero_subtitle": "Like Having an Expert Friend by Your Side",
        "hero_desc": "We know how much your crops mean to you. That's why we've created a caring companion that helps you protect what you've worked so hard to grow.",
        "card1_title": "Quick Answers",
        "card1_desc": "Get helpful insights in moments, so you can act fast when your plants need you.",
        "card2_title": "Caring Guidance",
        "card2_desc": "Get step-by-step help that's easy to follow, just like advice from a trusted friend.",
        "card3_title": "Always Here",
        "card3_desc": "Whether it's early morning or late evening, we're here whenever you need us.",
        "btn_primary": "Let's Help Your Farm Thrive",
        "btn_secondary": "Tell Me More",
        "features_title": "Everything You Need, All in One Place",
        "features_desc": "We've brought together all the tools that matter most to you as a farmer.",
        "feat_plant_title": "Plant Health Checker",
        "feat_plant_desc": "Worried about your plants? Just take a photo and we'll help you figure out what's wrong and how to fix it.",
        "feat_animal_title": "Animal Health Care",
        "feat_animal_desc": "Your animals are family too! Upload photos of sick animals and get instant diagnosis.",
        "live_dash_title": "Live Farm Infrastructure",
        "active_sensor_grid": "Active Sensor Grid",
        "no_sensors": "No sensors detected in the database.",
        "sensor": "Sensor",
        "zone": "Zone",
        "system_alerts": "System Alerts",
        "all_clear": "All clear! No alerts."
      },
      "plant": {
        "title": "Plant Health AI",
        "desc": "Upload a clear photo of your plant's leaves, and our vision model will diagnose any potential issues.",
        "analyzing": "Analyzing Pixels...",
        "btn_analyze": "Analyze Plant Health",
        "report_title": "Diagnosis Report",
        "running_model": "Running computer vision models...",
        "detected_issue": "Detected Issue",
        "recommended_action": "Recommended Action"
      },
      "animal": {
        "title": "Livestock Health AI",
        "desc": "Upload a clear photo of your animal, and our veterinary vision model will help identify potential issues.",
        "analyzing": "Consulting AI Vet...",
        "btn_analyze": "Analyze Animal Health",
        "report_title": "Veterinary Report",
        "running_model": "Running veterinary analysis...",
        "observation": "Observation",
        "care_recommendation": "Care Recommendation"
      },
      "cow": {
        "title": "Live Herd Tracker",
        "desc": "Real-time GPS positioning and vitals from smart collars.",
        "last_ping": "Last Ping",
        "connecting": "Connecting...",
        "sector_title": "North Pasture Sector",
        "active_collars": "Active Collars",
        "searching": "Searching for signals..."
      },
      "weather": {
        "syncing": "Syncing with weather satellites...",
        "unavailable": "Weather data unavailable.",
        "title": "Your Weather Friend",
        "desc": "Hyper-local forecasts tailored specifically for your farm's needs.",
        "humidity": "Humidity",
        "wind": "Wind",
        "advice_title": "Today's Farming Advice"
      },
      "chat": {
        "initial_msg": "Hello! I'm your Smart Farm AI assistant. Whether you need advice on crop rotation, pest control, or soil health, I'm here to help. What's on your mind today?",
        "error_msg": "Sorry, I'm having trouble connecting to my servers right now.",
        "title": "Farm Assistant AI",
        "desc": "Ask me anything about farming, livestock, or agriculture.",
        "placeholder": "Ask about crops, fertilizers, weather impacts..."
      },
      "soil": {
        "title": "Soil Stories",
        "desc": "Community journals, crop successes, and shared farming wisdom.",
        "btn_share": "Share Your Story",
        "loading": "Loading community journals...",
        "by": "By",
        "growing": "Growing"
      }
    }
  },
  hi: {
    translation: {
      "nav_home": "होम",
      "nav_plant": "पौधों की सहायता",
      "nav_animal": "पशु देखभाल",
      "nav_cow": "गाय ट्रैकर",
      "nav_weather": "मौसम",
      "nav_chat": "चैट करें",
      "nav_stories": "मिट्टी की कहानियाँ",
      "common": {
        "coming_soon": "सुविधा जल्द ही आ रही है!",
        "try_this": "इसे आज़माएं",
        "syncing_db": "डेटाबेस के साथ सिंक हो रहा है...",
        "upload_image": "छवि अपलोड करें",
        "click_drag": "ब्राउज़ करने के लिए क्लिक करें या खींचें",
        "supports_formats": "JPG, PNG का समर्थन करता है (अधिकतम 5MB)",
        "waiting_upload": "छवि अपलोड की प्रतीक्षा है...",
        "status": "स्थिति",
        "match": "मिलान",
        "region": "IN"
      },
      "status": {
        "active": "सक्रिय",
        "inactive": "निष्क्रिय",
        "high_priority": "उच्च प्राथमिकता",
        "low_priority": "कम प्राथमिकता",
        "resting": "विश्राम"
      },
      "home": {
        "hero_title": "आपका खेती साथी जो वास्तव में परवाह करता है",
        "hero_subtitle": "जैसे एक विशेषज्ञ मित्र आपके साथ हो",
        "hero_desc": "हम जानते हैं कि आपकी फसलें आपके लिए कितनी महत्वपूर्ण हैं। इसीलिए हमने एक देखभाल करने वाला साथी बनाया है जो आपकी मेहनत की रक्षा करने में मदद करता है।",
        "card1_title": "त्वरित उत्तर",
        "card1_desc": "क्षणों में उपयोगी जानकारी प्राप्त करें, ताकि जब आपके पौधों को आपकी आवश्यकता हो तो आप तेज़ी से कार्य कर सकें।",
        "card2_title": "देखभालपूर्ण मार्गदर्शन",
        "card2_desc": "कदम-दर-कदम सहायता प्राप्त करें जिसका पालन करना आसान है, ठीक एक भरोसेमंद दोस्त की सलाह की तरह।",
        "card3_title": "हमेशा यहाँ",
        "card3_desc": "चाहे सुबह जल्दी हो या देर शाम, जब भी आपको हमारी ज़रूरत हो हम यहाँ हैं।",
        "btn_primary": "खेत को समृद्ध बनाने में मदद करें",
        "btn_secondary": "मुझे और बताएं",
        "features_title": "आपकी ज़रूरत की हर चीज़, एक ही जगह पर",
        "features_desc": "हमने उन सभी उपकरणों को एक साथ लाया है जो एक किसान के रूप में आपके लिए सबसे अधिक मायने रखते हैं।",
        "feat_plant_title": "पौधे का स्वास्थ्य परीक्षक",
        "feat_plant_desc": "पौधों की चिंता है? बस एक फोटो लें और हम यह पता लगाने में आपकी मदद करेंगे कि क्या गलत है और इसे कैसे ठीक किया जाए।",
        "feat_animal_title": "पशु स्वास्थ्य देखभाल",
        "feat_animal_desc": "आपके जानवर भी परिवार हैं! बीमार जानवरों की तस्वीरें अपलोड करें और तुरंत निदान प्राप्त करें।",
        "live_dash_title": "लाइव फार्म बुनियादी ढांचा",
        "active_sensor_grid": "सक्रिय सेंसर ग्रिड",
        "no_sensors": "डेटाबेस में कोई सेंसर नहीं मिला।",
        "sensor": "सेंसर",
        "zone": "क्षेत्र",
        "system_alerts": "सिस्टम अलर्ट",
        "all_clear": "सब साफ़ है! कोई अलर्ट नहीं।"
      },
      "plant": {
        "title": "पौधा स्वास्थ्य AI",
        "desc": "अपने पौधे की पत्तियों की एक स्पष्ट तस्वीर अपलोड करें, और हमारा मॉडल समस्याओं का निदान करेगा।",
        "analyzing": "पिक्सेल का विश्लेषण कर रहा है...",
        "btn_analyze": "पौधे के स्वास्थ्य का विश्लेषण करें",
        "report_title": "निदान रिपोर्ट",
        "running_model": "कंप्यूटर विज़न मॉडल चल रहे हैं...",
        "detected_issue": "पता चली समस्या",
        "recommended_action": "अनुशंसित कार्रवाई"
      },
      "animal": {
        "title": "पशुधन स्वास्थ्य AI",
        "desc": "अपने जानवर की एक स्पष्ट फोटो अपलोड करें, और हमारा AI पशु चिकित्सक समस्याओं की पहचान करने में मदद करेगा।",
        "analyzing": "AI पशु चिकित्सक से परामर्श कर रहा है...",
        "btn_analyze": "पशु स्वास्थ्य का विश्लेषण करें",
        "report_title": "पशु चिकित्सा रिपोर्ट",
        "running_model": "पशु चिकित्सा विश्लेषण चल रहा है...",
        "observation": "अवलोकन",
        "care_recommendation": "देखभाल की सिफारिश"
      },
      "cow": {
        "title": "लाइव झुंड ट्रैकर",
        "desc": "स्मार्ट कॉलर से वास्तविक समय की GPS स्थिति और महत्वपूर्ण संकेत।",
        "last_ping": "अंतिम पिंग",
        "connecting": "कनेक्ट हो रहा है...",
        "sector_title": "उत्तर चारागाह क्षेत्र",
        "active_collars": "सक्रिय कॉलर",
        "searching": "सिग्नल की तलाश है..."
      },
      "weather": {
        "syncing": "मौसम उपग्रहों के साथ सिंक हो रहा है...",
        "unavailable": "मौसम डेटा अनुपलब्ध है।",
        "title": "आपका मौसम मित्र",
        "desc": "विशेष रूप से आपके खेत की जरूरतों के लिए तैयार स्थानीय पूर्वानुमान।",
        "humidity": "नमी",
        "wind": "हवा",
        "advice_title": "आज की खेती की सलाह"
      },
      "chat": {
        "initial_msg": "नमस्ते! मैं आपका स्मार्ट फार्म AI सहायक हूँ। आपको फसल रोटेशन या कीट नियंत्रण पर सलाह चाहिए? मैं यहाँ हूँ।",
        "error_msg": "क्षमा करें, मुझे अभी सर्वर से जुड़ने में समस्या हो रही है।",
        "title": "फार्म सहायक AI",
        "desc": "खेती, पशुधन या कृषि के बारे में कुछ भी पूछें।",
        "placeholder": "फसल, उर्वरक, मौसम के प्रभाव के बारे में पूछें..."
      },
      "soil": {
        "title": "मिट्टी की कहानियाँ",
        "desc": "सामुदायिक पत्रिकाएँ, फसल की सफलताएँ और साझा कृषि ज्ञान।",
        "btn_share": "अपनी कहानी साझा करें",
        "loading": "सामुदायिक पत्रिकाओं को लोड किया जा रहा है...",
        "by": "द्वारा",
        "growing": "उगा रहे हैं"
      }
    }
  },
  te: {
    translation: {
      "nav_home": "హోమ్",
      "nav_plant": "మొక్కల సహాయం",
      "nav_animal": "జంతువుల సంరక్షణ",
      "nav_cow": "ఆవుల ట్రాకర్",
      "nav_weather": "వాతావరణం",
      "nav_chat": "చాట్",
      "nav_stories": "మట్టి కథలు",
      "common": {
        "coming_soon": "ఈ సౌకర్యం త్వరలో అందుబాటులోకి వస్తుంది!",
        "try_this": "ప్రయత్నించండి",
        "syncing_db": "డేటాబేస్‌తో అనుసంధానించబడుతోంది...",
        "upload_image": "ఫోటో అప్‌లోడ్ చేయండి",
        "click_drag": "క్లిక్ చేయండి లేదా ఇక్కడకు లాగండి",
        "supports_formats": "JPG, PNG సపోర్ట్ చేస్తుంది (గరిష్టంగా 5MB)",
        "waiting_upload": "ఫోటో అప్‌లోడ్ కోసం వేచి ఉంది...",
        "status": "స్థితి",
        "match": "సరిపోలిక",
        "region": "IN"
      },
      "status": {
        "active": "చురుకుగా ఉంది",
        "inactive": "నిష్క్రియంగా ఉంది",
        "high_priority": "అత్యవసరం",
        "low_priority": "తక్కువ ప్రాధాన్యత",
        "resting": "విశ్రాంతి"
      },
      "home": {
        "hero_title": "నిజంగా శ్రద్ధ వహించే మీ వ్యవసాయ నేస్తం",
        "hero_subtitle": "ఒక నిపుణుడు మీ పక్కనే ఉన్నట్లు",
        "hero_desc": "మీ పంటలు మీకు ఎంత ముఖ్యమో మాకు తెలుసు. అందుకే మీరు కష్టపడి పండించిన వాటిని కాపాడుకోవడంలో సహాయపడే ఒక నేస్తాన్ని మేము సృష్టించాము.",
        "card1_title": "శీఘ్ర సమాధానాలు",
        "card1_desc": "క్షణాల్లో ఉపయోగకరమైన సమాచారాన్ని పొందండి, తద్వారా మీ మొక్కలకు అవసరమైనప్పుడు మీరు వేగంగా స్పందించవచ్చు.",
        "card2_title": "అవగాహనతో కూడిన మార్గదర్శకత్వం",
        "card2_desc": "నమ్మకమైన స్నేహితుడి సలహా లాగా, అనుసరించడానికి సులభమైన దశల వారీ సహాయం పొందండి.",
        "card3_title": "ఎల్లప్పుడూ ఇక్కడే",
        "card3_desc": "ఉదయం త్వరగా అయినా లేదా రాత్రి ఆలస్యంగా అయినా, మీకు అవసరమైనప్పుడు మేము ఇక్కడే ఉంటాము.",
        "btn_primary": "మీ వ్యవసాయం అభివృద్ధి చెందడానికి సహాయపడండి",
        "btn_secondary": "మరింత సమాచారం",
        "features_title": "మీకు కావలసినవన్నీ ఒకే చోట",
        "features_desc": "రైతుగా మీకు అత్యంత ముఖ్యమైన అన్ని సాధనాలను మేము ఒకచోట చేర్చాము.",
        "feat_plant_title": "మొక్కల ఆరోగ్య పరీక్ష",
        "feat_plant_desc": "మొక్కల గురించి ఆందోళన చెందుతున్నారా? ఒక ఫోటో తీయండి, సమస్య ఏమిటో మరియు దానిని ఎలా పరిష్కరించాలో మేము మీకు సహాయం చేస్తాము.",
        "feat_animal_title": "జంతువుల ఆరోగ్య సంరక్షణ",
        "feat_animal_desc": "మీ జంతువులు కూడా కుటుంబ సభ్యులే! అనారోగ్యంతో ఉన్న జంతువుల ఫోటోలను అప్‌లోడ్ చేయండి మరియు తక్షణ నిర్ధారణ పొందండి.",
        "live_dash_title": "లైవ్ ఫార్మ్ ఇన్ఫ్రాస్ట్రక్చర్",
        "active_sensor_grid": "యాక్టివ్ సెన్సార్ గ్రిడ్",
        "no_sensors": "డేటాబేస్‌లో సెన్సార్లు కనుగొనబడలేదు.",
        "sensor": "సెన్సార్",
        "zone": "జోన్",
        "system_alerts": "సిస్టమ్ హెచ్చరికలు",
        "all_clear": "అన్నీ బాగున్నాయి! హెచ్చరికలు లేవు."
      },
      "plant": {
        "title": "మొక్కల ఆరోగ్యం AI",
        "desc": "మీ మొక్క ఆకులను స్పష్టమైన ఫోటో తీసి అప్‌లోడ్ చేయండి, సమస్యను గుర్తించడానికి మా AI సహాయపడుతుంది.",
        "analyzing": "విశ్లేషిస్తోంది...",
        "btn_analyze": "మొక్కల ఆరోగ్యాన్ని విశ్లేషించండి",
        "report_title": "రోగ నిర్ధారణ నివేదిక",
        "running_model": "కంప్యూటర్ విజన్ మోడల్స్ రన్ అవుతున్నాయి...",
        "detected_issue": "గుర్తించిన సమస్య",
        "recommended_action": "సూచించిన చర్య"
      },
      "animal": {
        "title": "పశువుల ఆరోగ్యం AI",
        "desc": "మీ పశువు ఫోటో అప్‌లోడ్ చేయండి, మా AI పశువైద్యుడు సమస్యను గుర్తించడంలో సహాయపడతారు.",
        "analyzing": "AI డాక్టరును సంప్రదిస్తోంది...",
        "btn_analyze": "పశువుల ఆరోగ్యాన్ని విశ్లేషించండి",
        "report_title": "వెటర్నరీ నివేదిక",
        "running_model": "విశ్లేషణ జరుగుతోంది...",
        "observation": "పరిశీలన",
        "care_recommendation": "సంరక్షణ సూచనలు"
      },
      "cow": {
        "title": "లైవ్ పశువుల ట్రాకర్",
        "desc": "స్మార్ట్ కాలర్ల ద్వారా ప్రత్యక్ష GPS స్థానం మరియు ఆరోగ్య సమాచారం.",
        "last_ping": "చివరి అప్‌డేట్",
        "connecting": "కనెక్ట్ అవుతోంది...",
        "sector_title": "ఉత్తర పచ్చిక బయళ్ళు",
        "active_collars": "యాక్టివ్ కాలర్లు",
        "searching": "సిగ్నల్ కోసం వెతుకుతోంది..."
      },
      "weather": {
        "syncing": "వాతావరణ సమాచారం సేకరిస్తోంది...",
        "unavailable": "వాతావరణ సమాచారం అందుబాటులో లేదు.",
        "title": "మీ వాతావరణ నేస్తం",
        "desc": "మీ పొలం కోసం ప్రత్యేకమైన వాతావరణ అంచనాలు.",
        "humidity": "తేమ",
        "wind": "గాలి వేగం",
        "advice_title": "నేటి వ్యవసాయ సలహా"
      },
      "chat": {
        "initial_msg": "నమస్కారం! నేను మీ స్మార్ట్ ఫార్మ్ AI సహాయకుడిని. మీకు పంట మార్పిడి లేదా పురుగుల నివారణపై సలహా కావాలా? నేను ఇక్కడే ఉన్నాను.",
        "error_msg": "క్షమించండి, సర్వర్ కనెక్ట్ అవ్వడంలో సమస్య ఉంది.",
        "title": "ఫార్మ్ అసిస్టెంట్ AI",
        "desc": "వ్యవసాయం లేదా పశువుల గురించి ఏదైనా అడగండి.",
        "placeholder": "పంటలు, ఎరువులు, వాతావరణం గురించి అడగండి..."
      },
      "soil": {
        "title": "మట్టి కథలు",
        "desc": "వ్యవసాయ అనుభవాలు, సాగు విజయాలు మరియు సామూహిక జ్ఞానం.",
        "btn_share": "మీ కథను పంచుకోండి",
        "loading": "కథలను లోడ్ చేస్తోంది...",
        "by": "ద్వారా",
        "growing": "పండిస్తున్న పంట"
      }
    }
  },
  ta: {
    translation: {
      "nav_home": "முகப்பு",
      "nav_plant": "பயிர் உதவி",
      "nav_animal": "கால்நடை பராமரிப்பு",
      "nav_cow": "பசு கண்காணிப்பு",
      "nav_weather": "வானிலை",
      "nav_chat": "உரையாடல்",
      "nav_stories": "மண் கதைகள்",
      "common": {
        "coming_soon": "இந்த அம்சம் விரைவில் வரும்!",
        "try_this": "முயற்சி செய்து பாருங்கள்",
        "syncing_db": "தரவுத்தளத்துடன் இணைக்கப்படுகிறது...",
        "upload_image": "படத்தைப் பதிவேற்றவும்",
        "click_drag": "தேர்வு செய்ய கிளிக் செய்யவும் அல்லது இழுத்து விடவும்",
        "supports_formats": "JPG, PNG ஆதரிக்கிறது (அதிகபட்சம் 5MB)",
        "waiting_upload": "பட பதிவேற்றத்திற்காக காத்திருக்கிறது...",
        "status": "நிலை",
        "match": "பொருத்தம்",
        "region": "IN"
      },
      "status": {
        "active": "செயலில் உள்ளது",
        "inactive": "செயலிழந்துள்ளது",
        "high_priority": "அதி முக்கியம்",
        "low_priority": "குறைந்த முக்கியத்துவம்",
        "resting": "ஓய்வெடுக்கிறது"
      },
      "home": {
        "hero_title": "உண்மையில் அக்கறை காட்டும் உங்கள் விவசாயத் தோழன்",
        "hero_subtitle": "ஒரு நிபுணர் உங்கள் அருகில் இருப்பது போல",
        "hero_desc": "உங்கள் பயிர்கள் உங்களுக்கு எவ்வளவு முக்கியம் என்பதை நாங்கள் அறிவோம். அதனால்தான் உங்கள் உழைப்பைப் பாதுகாக்க உதவும் ஒரு தோழனை நாங்கள் உருவாக்கியுள்ளோம்.",
        "card1_title": "விரைவான பதில்கள்",
        "card1_desc": "உங்கள் பயிர்களுக்குத் தேவைப்படும்போது விரைவாகச் செயல்பட பயனுள்ள தகவல்களைப் பெறுங்கள்.",
        "card2_title": "பராமரிப்பு வழிகாட்டுதல்",
        "card2_desc": "ஒரு நம்பகமான நண்பரின் ஆலோசனையைப் போல, எளிதாகப் பின்பற்றக்கூடிய படிப்படியான உதவியைப் பெறுங்கள்.",
        "card3_title": "எப்போதும் உங்களுடன்",
        "card3_desc": "அதிகாலையாக இருந்தாலும் அல்லது நள்ளிரவாக இருந்தாலும், உங்களுக்குத் தேவைப்படும்போது நாங்கள் இங்கே இருக்கிறோம்.",
        "btn_primary": "விவசாயம் செழிக்க உதவுங்கள்",
        "btn_secondary": "மேலும் தெரிந்து கொள்ள",
        "features_title": "உங்களுக்கு தேவையான அனைத்தும் ஒரே இடத்தில்",
        "features_desc": "ஒரு விவசாயியாக உங்களுக்குத் தேவையான அனைத்து கருவிகளையும் நாங்கள் ஒன்றாகக் கொண்டு வந்துள்ளோம்.",
        "feat_plant_title": "பயிர் சுகாதார பரிசோதனை",
        "feat_plant_desc": "பயிர்களைப் பற்றி கவலையா? ஒரு புகைப்படம் எடுங்கள், பிரச்சனை என்ன மற்றும் அதை எப்படி சரி செய்வது என்று நாங்கள் உங்களுக்கு உதவுவோம்.",
        "feat_animal_title": "கால்நடை சுகாதார பராமரிப்பு",
        "feat_animal_desc": "உங்கள் விலங்குகளும் குடும்ப உறுப்பினர்களே! நோய்வாய்ப்பட்ட விலங்குகளின் படங்களை பதிவேற்றி உடனடி தீர்வு பெறுங்கள்.",
        "live_dash_title": "நேரடி பண்ணை உள்கட்டமைப்பு",
        "active_sensor_grid": "செயலில் உள்ள சென்சார் கட்டம்",
        "no_sensors": "தரவுத்தளத்தில் சென்சார்கள் எதுவும் இல்லை.",
        "sensor": "சென்சார்",
        "zone": "மண்டலம்",
        "system_alerts": "கணினி எச்சரிக்கைகள்",
        "all_clear": "எல்லாம் சரியாக உள்ளது! எச்சரிக்கைகள் இல்லை."
      },
      "plant": {
        "title": "பயிர் சுகாதார AI",
        "desc": "உங்கள் பயிர் இலைகளின் தெளிவான புகைப்படத்தைப் பதிவேற்றவும், எங்கள் AI பிரச்சனைகளைக் கண்டறிய உதவும்.",
        "analyzing": "ஆய்வு செய்கிறது...",
        "btn_analyze": "பயிர் ஆரோக்கியத்தை ஆய்வு செய்",
        "report_title": "கண்டறிதல் அறிக்கை",
        "running_model": "கணினி ஆய்வு மாதிரிகள் இயங்குகின்றன...",
        "detected_issue": "கண்டறியப்பட்ட பிரச்சனை",
        "recommended_action": "பரிந்துரைக்கப்பட்ட நடவடிக்கை"
      },
      "animal": {
        "title": "கால்நடை சுகாதார AI",
        "desc": "உங்கள் விலங்கின் தெளிவான புகைப்படத்தைப் பதிவேற்றவும், எங்கள் AI மருத்துவர் பிரச்சனைகளைக் கண்டறிய உதவுவார்.",
        "analyzing": "AI மருத்துவருடன் கலந்தாலோசிக்கிறது...",
        "btn_analyze": "கால்நடை ஆரோக்கியத்தை ஆய்வு செய்",
        "report_title": "கால்நடை மருத்துவ அறிக்கை",
        "running_model": "மருத்துவ ஆய்வு நடைபெறுகிறது...",
        "observation": "கவனிப்பு",
        "care_recommendation": "பராமரிப்பு பரிந்துரை"
      },
      "cow": {
        "title": "நேரடி மந்தை கண்காணிப்பு",
        "desc": "ஸ்மார்ட் காலர்கள் மூலம் நேரடி ஜிபிஎஸ் நிலை மற்றும் சுகாதாரத் தரவு.",
        "last_ping": "கடைசி புதுப்பிப்பு",
        "connecting": "இணைகிறது...",
        "sector_title": "வடக்கு மேய்ச்சல் பகுதி",
        "active_collars": "செயலில் உள்ள காலர்கள்",
        "searching": "சிக்னலைத் தேடுகிறது..."
      },
      "weather": {
        "syncing": "வானிலை தகவல்களைச் சேகரிக்கிறது...",
        "unavailable": "வானிலை தரவு கிடைக்கவில்லை.",
        "title": "உங்கள் வானிலை நண்பன்",
        "desc": "உங்கள் பண்ணைக்காக பிரத்யேகமாக வடிவமைக்கப்பட்ட வானிலை முன்னறிவிப்புகள்.",
        "humidity": "ஈரப்பதம்",
        "wind": "காற்றின் வேகம்",
        "advice_title": "இன்றைய விவசாய ஆலோசனை"
      },
      "chat": {
        "initial_msg": "வணக்கம்! நான் உங்கள் ஸ்மார்ட் பண்ணை AI உதவியாளர். பயிர் சுழற்சி அல்லது பூச்சிக் கட்டுப்பாடு பற்றி ஆலோசனை வேண்டுமா? நான் உங்களுக்கு உதவுகிறேன்.",
        "error_msg": "மன்னிக்கவும், சர்வரில் இணைவதில் சிக்கல் உள்ளது.",
        "title": "பண்ணை உதவியாளர் AI",
        "desc": "விவசாயம் அல்லது கால்நடைகள் பற்றி எதையும் கேளுங்கள்.",
        "placeholder": "பயிர்கள், உரங்கள், வானிலை பற்றி கேளுங்கள்..."
      },
      "soil": {
        "title": "மண் கதைகள்",
        "desc": "சமூக இதழ்கள், பயிர் வெற்றிகள் மற்றும் பகிரப்பட்ட விவசாய அறிவு.",
        "btn_share": "உங்கள் கதையைப் பகிரவும்",
        "loading": "கதைகளை ஏற்றுகிறது...",
        "by": "ஆக்கியவர்",
        "growing": "வளர்க்கப்படும் பயிர்"
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en", 
    fallbackLng: "en",
    interpolation: {
      escapeValue: false 
    }
  });

export default i18n;