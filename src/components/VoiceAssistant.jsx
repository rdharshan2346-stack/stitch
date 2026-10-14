import { useState, useRef, useEffect, useCallback } from "react";

const LANGUAGES = [
  { code: "en", label: "English",  flag: "🇺🇸", bcp47: "en-US" },
  { code: "hi", label: "हिन्दी",   flag: "🇮🇳", bcp47: "hi-IN" },
  { code: "te", label: "తెలుగు",   flag: "🇮🇳", bcp47: "te-IN" },
  { code: "ta", label: "தமிழ்",    flag: "🇮🇳", bcp47: "ta-IN" },
  { code: "kn", label: "ಕನ್ನಡ",    flag: "🇮🇳", bcp47: "kn-IN" },
  { code: "ml", label: "മലയാളം",   flag: "🇮🇳", bcp47: "ml-IN" },
  { code: "fr", label: "Français", flag: "🇫🇷", bcp47: "fr-FR" },
  { code: "es", label: "Español",  flag: "🇪🇸", bcp47: "es-ES" },
  { code: "ar", label: "العربية",  flag: "🇸🇦", bcp47: "ar-SA" },
  { code: "zh", label: "中文",     flag: "🇨🇳", bcp47: "zh-CN" },
];

// Maps i18next language codes → our LANGUAGES list
const I18N_MAP = { en: "en", hi: "hi", te: "te", ta: "ta", kn: "kn", ml: "ml" };

const UI = {
  en: { title: "AgriSense Assistant", listening: "Listening...", thinking: "Thinking...", placeholder: "Ask about your sensors or fields...", clear: "Clear chat" },
  hi: { title: "AgriSense सहायक",     listening: "सुन रहा हूँ...", thinking: "सोच रहा हूँ...", placeholder: "सेंसर या खेत के बारे में पूछें...", clear: "साफ़ करें" },
  te: { title: "AgriSense సహాయకుడు", listening: "వింటున్నాను...", thinking: "ఆలోచిస్తున్నాను...", placeholder: "సెన్సార్లు గురించి అడగండి...", clear: "తొలగించు" },
  ta: { title: "AgriSense உதவியாளர்", listening: "கேட்கிறேன்...", thinking: "யோசிக்கிறேன்...", placeholder: "சென்சார்கள் பற்றி கேளுங்கள்...", clear: "அழி" },
  kn: { title: "AgriSense ಸಹಾಯಕ",    listening: "ಕೇಳುತ್ತಿದ್ದೇನೆ...", thinking: "ಯೋಚಿಸುತ್ತಿದ್ದೇನೆ...", placeholder: "ಸೆನ್ಸರ್‌ಗಳ ಬಗ್ಗೆ ಕೇಳಿ...", clear: "ತೆರವು" },
  ml: { title: "AgriSense സഹായി",     listening: "കേൾക്കുന്നു...", thinking: "ചിന്തിക്കുന്നു...", placeholder: "സെൻസറുകളെ കുറിച്ച് ചോദിക്കൂ...", clear: "മായ്ക്കുക" },
  fr: { title: "Assistant AgriSense", listening: "J'écoute...", thinking: "Je réfléchis...", placeholder: "Posez vos questions...", clear: "Effacer" },
  es: { title: "Asistente AgriSense", listening: "Escuchando...", thinking: "Pensando...", placeholder: "Pregunta sobre tus sensores...", clear: "Borrar" },
  ar: { title: "مساعد AgriSense",     listening: "أستمع...", thinking: "أفكر...", placeholder: "اسأل عن المستشعرات...", clear: "مسح" },
  zh: { title: "AgriSense 助手",       listening: "正在聆听...", thinking: "正在思考...", placeholder: "询问传感器相关问题...", clear: "清除" },
};

const WELCOME = {
  en: "Hello! I'm your AgriSense AI assistant. Ask me anything about your sensors, fields, or irrigation.",
  hi: "नमस्ते! मैं आपका AgriSense सहायक हूँ। सेंसर, खेत या सिंचाई के बारे में पूछें।",
  te: "నమస్కారం! నేను మీ AgriSense సహాయకుడిని. సెన్సార్లు లేదా పొలాల గురించి అడగండి.",
  ta: "வணக்கம்! நான் உங்கள் AgriSense உதவியாளர். சென்சார்கள் பற்றி கேளுங்கள்.",
  kn: "ನಮಸ್ಕಾರ! ನಾನು ನಿಮ್ಮ AgriSense ಸಹಾಯಕ. ಸೆನ್ಸರ್‌ಗಳು ಅಥವಾ ಹೊಲಗಳ ಬಗ್ಗೆ ಕೇಳಿ.",
  ml: "നമസ്കാരം! ഞാൻ നിങ്ങളുടെ AgriSense സഹായിയാണ്. സെൻസറുകൾ അല്ലെങ്കിൽ വയലുകളെ കുറിച്ച് ചോദിക്കൂ.",
  fr: "Bonjour! Je suis votre assistant AgriSense. Posez des questions sur vos capteurs ou champs.",
  es: "¡Hola! Soy tu asistente AgriSense. Pregunta sobre tus sensores o campos.",
  ar: "مرحباً! أنا مساعد AgriSense. اسألني عن أجهزة الاستشعار أو الحقول.",
  zh: "您好！我是 AgriSense 助手。请询问有关传感器或田地的问题。",
};

function PulseRings() {
  return (
    <>
      {[1, 2, 3].map((i) => (
        <span
          key={i}
          className="absolute inline-flex rounded-full border-2 border-green-500 opacity-0"
          style={{
            width: `${48 + i * 20}px`,
            height: `${48 + i * 20}px`,
            animation: `ping 1.2s ease-out infinite`,
            animationDelay: `${i * 0.25}s`,
          }}
        />
      ))}
    </>
  );
}

function ThinkingDots() {
  return (
    <div className="flex items-center gap-1.5 px-4 py-3">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="w-2 h-2 rounded-full bg-slate-300 inline-block"
          style={{ animation: "bounce 1s infinite", animationDelay: `${i * 0.15}s` }}
        />
      ))}
    </div>
  );
}

// ── Props ─────────────────────────────────────────────────────────────────────
// isOpen      : boolean — show/hide panel
// onClose     : fn      — close handler
// appLang     : string  — i18next language code from NavBar (e.g. "hi", "te")
// sensorData  : array   — live sensors from API [ { type, location_zone, status } ]
// ─────────────────────────────────────────────────────────────────────────────
export default function VoiceAssistant({ isOpen, onClose, appLang, sensorData }) {
  const [lang, setLang] = useState("en");
  const [messages, setMessages] = useState([{ role: "assistant", content: WELCOME.en }]);
  const [input, setInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [error, setError] = useState("");

  const recognitionRef = useRef(null);
  const bottomRef = useRef(null);
  const ui = UI[lang] || UI.en;
  const currentLang = LANGUAGES.find((l) => l.code === lang) || LANGUAGES[0];

  // Polish #3 — sync with app-level i18n
  useEffect(() => {
    if (appLang && I18N_MAP[appLang]) {
      setLang(I18N_MAP[appLang]);
    }
  }, [appLang]);

  // Reset welcome message when language changes
  useEffect(() => {
    setMessages([{ role: "assistant", content: WELCOME[lang] || WELCOME.en }]);
  }, [lang]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isThinking]);

  // Polish #5 — stop speech & mic when panel closes
  const handleClose = useCallback(() => {
    window.speechSynthesis?.cancel();
    recognitionRef.current?.stop();
    setIsListening(false);
    onClose();
  }, [onClose]);

  const stopListening = useCallback(() => {
    recognitionRef.current?.stop();
    setIsListening(false);
  }, []);

  const startListening = useCallback(() => {
    setError("");
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) {
      setError("Speech recognition not supported. Please type instead.");
      return;
    }
    const recognition = new SR();
    recognition.lang = currentLang.bcp47;
    recognition.interimResults = false;
    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (e) => {
      setInput(e.results[0][0].transcript);
      setIsListening(false);
    };
    recognition.onerror = (e) => {
      setIsListening(false);
      if (e.error !== "aborted") setError("Mic error: " + e.error);
    };
    recognition.onend = () => setIsListening(false);
    recognitionRef.current = recognition;
    recognition.start();
  }, [currentLang]);

  const speak = useCallback((text) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utt = new SpeechSynthesisUtterance(text);
    utt.lang = currentLang.bcp47;
    utt.rate = 0.95;
    window.speechSynthesis.speak(utt);
  }, [currentLang]);

  const sendMessage = useCallback(async (text) => {
    const trimmed = text.trim();
    if (!trimmed || isThinking) return;
    setError("");
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: trimmed }]);
    setIsThinking(true);

    try {
      // Polish #1 — real sensor data when available, fallback to sample
      const sensorContext = sensorData && sensorData.length > 0
        ? `Live sensor data (${sensorData.length} sensors): ${sensorData.map(s =>
            `${s.type} sensor at zone ${s.location_zone} — ${s.status}`
          ).join("; ")}.`
        : "Sample data: 128 sensors active. SN-204 moisture 42% Sector B-4 (Active), SN-108 moisture 12% Sector A-1 (Warning), SN-205 moisture 38% Sector B-4 (Active).";

      const systemPrompt = `You are AgriSense AI, an expert agricultural assistant for a smart sensor monitoring system.
You help farmers understand sensor data, manage irrigation, and optimize crop health.
${sensorContext}
IMPORTANT: Always respond in the SAME LANGUAGE the user writes in. Keep answers concise (2-3 sentences), practical, and farm-focused.`;

      // Call our own backend (Gemini) instead of calling an AI API from the browser
      const history = messages
        .slice(-6)
        .map((m) => `${m.role === "user" ? "Farmer" : "Assistant"}: ${m.content}`)
        .join("\n");
      const res = await fetch("https://stitch-api-za7e.onrender.com/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: `${systemPrompt}\n\n${history ? history + "\n" : ""}Farmer: ${trimmed}`,
        }),
      });

      if (!res.ok) throw new Error("Chat backend error");
      const data = await res.json();
      const reply = data.reply || "Sorry, I couldn't process that. Please try again.";
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
      speak(reply);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Connection error. Please try again." },
      ]);
    } finally {
      setIsThinking(false);
    }
  }, [messages, isThinking, speak, sensorData]);

  const handleMic = () => {
    if (isListening) stopListening();
    else startListening();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm" onClick={handleClose} />

      {/* Panel */}
      <div
        className="fixed bottom-6 right-6 z-50 flex flex-col rounded-2xl shadow-2xl border border-slate-200 overflow-hidden bg-[#F8FAFC]"
        style={{ width: 380, height: 580 }}
      >
        {/* Header */}
        <div className="bg-green-900 px-5 py-3.5 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-green-500/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-green-400" style={{ fontSize: 20 }}>smart_toy</span>
            </div>
            <div>
              <p className="text-white text-sm font-semibold leading-tight">{ui.title}</p>
              <p className="text-green-400 text-xs">Powered by Gemini</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Language selector */}
            <div className="relative">
              <button
                onClick={() => setShowLangMenu((p) => !p)}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-medium transition-colors"
              >
                {currentLang?.flag} {currentLang?.code.toUpperCase()}
                <span className="material-symbols-outlined" style={{ fontSize: 14 }}>expand_more</span>
              </button>
              {showLangMenu && (
                <div className="absolute right-0 top-full mt-1.5 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden z-10 w-44">
                  {LANGUAGES.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => { setLang(l.code); setShowLangMenu(false); }}
                      className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-left hover:bg-slate-50 transition-colors ${lang === l.code ? "text-green-600 font-semibold" : "text-slate-700"}`}
                    >
                      <span>{l.flag}</span>
                      <span>{l.label}</span>
                      {lang === l.code && (
                        <span className="ml-auto material-symbols-outlined text-green-600" style={{ fontSize: 15 }}>check</span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Clear */}
            <button
              onClick={() => setMessages([{ role: "assistant", content: WELCOME[lang] }])}
              title={ui.clear}
              className="w-8 h-8 flex items-center justify-center rounded-lg text-green-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <span className="material-symbols-outlined" style={{ fontSize: 18 }}>refresh</span>
            </button>

            {/* Close — Polish #5 uses handleClose */}
            <button
              onClick={handleClose}
              className="w-8 h-8 flex items-center justify-center rounded-lg text-green-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <span className="material-symbols-outlined" style={{ fontSize: 20 }}>close</span>
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              {msg.role === "assistant" && (
                <div className="w-7 h-7 rounded-full bg-green-100 flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-green-600" style={{ fontSize: 14 }}>eco</span>
                </div>
              )}
              <div
                className={`max-w-[80%] text-sm rounded-2xl px-4 py-2.5 leading-relaxed shadow-sm ${
                  msg.role === "user"
                    ? "bg-green-700 text-white rounded-br-sm"
                    : "bg-white text-slate-700 border border-slate-100 rounded-bl-sm"
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}

          {isThinking && (
            <div className="flex justify-start">
              <div className="w-7 h-7 rounded-full bg-green-100 flex items-center justify-center mr-2 flex-shrink-0">
                <span className="material-symbols-outlined text-green-600" style={{ fontSize: 14 }}>eco</span>
              </div>
              <div className="bg-white border border-slate-100 rounded-2xl rounded-bl-sm shadow-sm">
                <ThinkingDots />
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Mic visualizer */}
        {isListening && (
          <div className="flex flex-col items-center py-4 border-t border-slate-100 bg-white flex-shrink-0">
            <div className="relative flex items-center justify-center w-12 h-12 mb-1">
              <PulseRings />
              <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center z-10">
                <span className="material-symbols-outlined text-white" style={{ fontSize: 22, fontVariationSettings: "'FILL' 1" }}>mic</span>
              </div>
            </div>
            <p className="text-xs text-green-600 font-medium">{ui.listening}</p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="mx-4 mb-1 px-3 py-2 bg-red-50 border border-red-100 rounded-lg text-xs text-red-500 flex gap-1.5 items-center flex-shrink-0">
            <span className="material-symbols-outlined" style={{ fontSize: 15 }}>error</span>
            {error}
          </div>
        )}

        {/* Input */}
        <div className="px-4 pb-4 pt-2 bg-white border-t border-slate-100 flex-shrink-0">
          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 focus-within:border-green-400 transition-colors">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(input); } }}
              placeholder={ui.placeholder}
              className="flex-1 bg-transparent text-sm text-slate-700 outline-none placeholder-slate-400"
            />
            <button
              onClick={handleMic}
              title="Voice input"
              className={`w-8 h-8 flex items-center justify-center rounded-lg transition-colors ${
                isListening ? "bg-red-500 text-white" : "text-slate-400 hover:text-green-600 hover:bg-green-50"
              }`}
            >
              <span className="material-symbols-outlined" style={{ fontSize: 18, fontVariationSettings: isListening ? "'FILL' 1" : "'FILL' 0" }}>
                {isListening ? "mic_off" : "mic"}
              </span>
            </button>
            <button
              onClick={() => sendMessage(input)}
              disabled={!input.trim() || isThinking}
              className="w-8 h-8 flex items-center justify-center rounded-lg bg-green-600 text-white disabled:opacity-40 hover:bg-green-700 transition-colors"
            >
              <span className="material-symbols-outlined" style={{ fontSize: 18 }}>send</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
