import { useState } from "react";
import { 
  Headphones, 
  MapPin, 
  Mail, 
  MessageCircle, 
  X, 
  Send, 
  Bot,
  User
} from "lucide-react";

export default function FloatingWidgets() {
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ sender: "bot" | "user"; text: string }>>([
    {
      sender: "bot",
      text: "Bonjour ! Je suis Digibot, votre conseiller virtuel Digiassur. Comment puis-je vous aider pour votre projet d'épargne aujourd'hui ?",
    },
  ]);
  const [inputValue, setInputValue] = useState("");

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userText = inputValue.trim();
    setMessages((prev) => [...prev, { sender: "user", text: userText }]);
    setInputValue("");

    setTimeout(() => {
      let reply = "Je transmets votre demande à notre conseiller expert épargne. Vous pouvez également remplir le simulateur ci-dessus ou nous contacter au (+212) 522 36 81 82.";
      const lower = userText.toLowerCase();
      if (lower.includes("taux") || lower.includes("rendement")) {
        reply = "Nos contrats d'épargne partenaires offrent des rendements attractifs nets d'impôts avec capital garanti. Remplissez notre formulaire pour une simulation sur mesure !";
      } else if (lower.includes("retraite")) {
        reply = "L'assurance retraite complémentaire Digiassur vous permet de constituer un capital ou une rente à vie avec de réels avantages fiscaux.";
      } else if (lower.includes("devis") || lower.includes("simulation")) {
        reply = "Vous pouvez faire votre simulation immédiatement dans la section 'Simulateur & Devis Gratuit' sur cette page !";
      }

      setMessages((prev) => [...prev, { sender: "bot", text: reply }]);
    }, 600);
  };

  return (
    <>
      {/* Side Quick Action Bar (Floating on Right Edge) */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-40 flex flex-col bg-[#fe977b] rounded-l-lg shadow-xl overflow-hidden divide-y divide-white/20">
        <a
          href="tel:+212522368182"
          className="p-2.5 hover:bg-[#f48161] text-white flex items-center justify-center transition"
          title="Appelez un conseiller"
        >
          <Headphones className="w-5 h-5" />
        </a>
        <a
          href="#contact"
          className="p-2.5 hover:bg-[#f48161] text-white flex items-center justify-center transition"
          title="Notre agence à Casablanca"
        >
          <MapPin className="w-5 h-5" />
        </a>
        <a
          href="mailto:contact@digiassur.ma"
          className="p-2.5 hover:bg-[#f48161] text-white flex items-center justify-center transition"
          title="Nous envoyer un email"
        >
          <Mail className="w-5 h-5" />
        </a>
        <a
          href="https://api.whatsapp.com/send/?phone=212711454567&text=Bonjour,%20je%20souhaite%20des%20informations%20sur%20l'epargne"
          target="_blank"
          rel="noreferrer"
          className="p-2.5 hover:bg-[#f48161] text-white flex items-center justify-center transition"
          title="Discuter sur WhatsApp"
        >
          <img
            src="/images/whatsapp.png"
            alt="WhatsApp"
            className="w-5 h-5 object-contain"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = "https://digiassur.ma/assets/img/whatsapp-icon.png";
            }}
          />
        </a>
      </div>

      {/* Floating Bottom-Right Pill: Digibot à l'écoute */}
      <div className="fixed right-4 bottom-5 z-40">
        <button
          type="button"
          onClick={() => setChatOpen(!chatOpen)}
          className="flex items-center gap-3 bg-[#f48161] hover:bg-[#e46e4e] text-white px-4 py-2.5 rounded-full shadow-2xl transition transform hover:scale-105 cursor-pointer"
        >
          <div className="w-9 h-9 rounded-full bg-[#fef1eb] flex items-center justify-center text-[#f48161]">
            <MessageCircle className="w-5 h-5 fill-current" />
          </div>
          <span className="font-bold text-xs sm:text-sm tracking-wide pr-1">
            Digibot à l'écoute
          </span>
        </button>
      </div>

      {/* Interactive Chat Popup */}
      {chatOpen && (
        <div className="fixed right-4 bottom-20 z-50 w-[340px] sm:w-[380px] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="bg-[#153954] text-white px-5 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#f48161] flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-sm">Digibot</h4>
                <span className="text-[11px] text-emerald-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  En ligne • Conseiller Digiassur
                </span>
              </div>
            </div>
            <button
              onClick={() => setChatOpen(false)}
              className="text-white/70 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages list */}
          <div className="p-4 h-[300px] overflow-y-auto space-y-3 bg-slate-50 text-xs">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex gap-2.5 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.sender === "bot" && (
                  <div className="w-6 h-6 rounded-full bg-[#153954] text-white flex items-center justify-center shrink-0 mt-0.5">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                )}
                <div
                  className={`p-3 rounded-2xl max-w-[80%] leading-relaxed ${
                    msg.sender === "user"
                      ? "bg-[#f48161] text-white rounded-br-none"
                      : "bg-white text-slate-700 shadow-xs border border-slate-100 rounded-bl-none"
                  }`}
                >
                  {msg.text}
                </div>
                {msg.sender === "user" && (
                  <div className="w-6 h-6 rounded-full bg-orange-200 text-[#f48161] flex items-center justify-center shrink-0 mt-0.5">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Input form */}
          <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-slate-100 flex gap-2">
            <input
              type="text"
              placeholder="Posez votre question sur l'épargne..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="flex-1 bg-slate-50 border border-slate-200 rounded-full px-4 py-2 text-xs focus:outline-none focus:border-[#568ba9]"
            />
            <button
              type="submit"
              className="bg-[#f48161] hover:bg-[#e46e4e] text-white p-2.5 rounded-full transition cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
