import { useState, useEffect } from "react";
import { 
  X, 
  Send, 
  Bot,
  User,
  MessageSquare
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function FloatingWidgets() {
  const { t, isRTL, language } = useLanguage();
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ sender: "bot" | "user"; text: string }>>([
    {
      sender: "bot",
      text: t("floating.botGreeting", "Bonjour ! Je suis Digibot, votre conseiller virtuel Digiassur. Comment puis-je vous aider pour votre devis d'assurance aujourd'hui ?"),
    },
  ]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    setMessages((prev) => {
      if (prev.length === 1 && prev[0].sender === "bot") {
        return [{
          sender: "bot",
          text: t("floating.botGreeting", "Bonjour ! Je suis Digibot, votre conseiller virtuel Digiassur. Comment puis-je vous aider pour votre devis d'assurance aujourd'hui ?"),
        }];
      }
      return prev;
    });
  }, [language]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userText = inputValue.trim();
    setMessages((prev) => [...prev, { sender: "user", text: userText }]);
    setInputValue("");

    setTimeout(() => {
      let reply = t("floating.autoReplyDefault", "Je transmets votre demande à notre conseiller expert. Vous pouvez également remplir notre formulaire de devis en ligne ou nous appeler au (+212) 522 36 81 82.");
      const lower = userText.toLowerCase();
      if (lower.includes("auto") || lower.includes("car") || lower.includes("سيار")) {
        reply = t("floating.autoReplyAuto", "Pour l'assurance Auto, nos tarifs démarrent à partir de 153 DHS TTC/mois avec attestation livrée à domicile. Consultez notre onglet Auto pour votre devis en direct !");
      } else if (lower.includes("moto") || lower.includes("دراج")) {
        reply = t("floating.autoReplyMoto", "Pour l'assurance Moto & Scooter, nos formules démarrent à partir de 62.5 DHS TTC/mois avec assistance 24/7.");
      } else if (lower.includes("epargne") || lower.includes("retraite") || lower.includes("saving") || lower.includes("ادخار")) {
        reply = t("floating.autoReplyEpargne", "Notre solution Épargne vous permet de constituer un capital garanti avec d'excellents rendements défiscalisés. Remplissez notre simulateur interactif pour voir votre projection !");
      }

      setMessages((prev) => [...prev, { sender: "bot", text: reply }]);
    }, 600);
  };

  return (
    <>
      {/* Side Quick Action Bar (Floating on Edge) */}
      <div className={`fixed ${isRTL ? "left-0" : "right-0"} top-[400px] z-50 flex flex-col divide-y-2 divide-white shadow-xl`}>
        <a
          href="tel:+212522368182"
          className="p-1 bg-[#fe977b] hover:bg-[#e46e4e] transition flex items-center justify-center"
          title={t("floating.phone", "Assistance téléphonique")}
          aria-label={t("floating.phone", "Assistance téléphonique")}
        >
          <img src="/images/casque-orange.png" alt="Casque" className="w-8 h-8 object-contain" />
        </a>
        <a
          href="/contact"
          className="px-1 py-1 bg-[#fe977b] hover:bg-[#e46e4e] transition flex items-center justify-center"
          title={t("floating.agency", "Adresse de l'agence")}
          aria-label={t("floating.agency", "Adresse de l'agence")}
        >
          <img src="/images/icon-pin.svg" alt="Localisation" className="w-8 h-6 mx-auto object-contain" />
        </a>
        <a
          href="/contact"
          className="p-1 bg-[#fe977b] hover:bg-[#e46e4e] transition flex items-center justify-center"
          title={t("floating.email", "Nous écrire")}
          aria-label={t("floating.email", "Nous écrire")}
        >
          <img src="/images/icon-unread-mail.svg" alt="Email" className="py-1 w-6 h-6 object-contain" />
        </a>
        <a
          href="https://api.whatsapp.com/send/?phone=212711454567&text=Bonjour,%20je%20souhaite%20un%20renseignement%20assurance"
          target="_blank"
          rel="noreferrer"
          className="p-1 bg-[#fe977b] hover:bg-[#e46e4e] transition flex items-center justify-center"
          title={t("floating.whatsapp", "WhatsApp direct")}
          aria-label={t("floating.whatsapp", "WhatsApp direct")}
        >
          <img src="/images/whatsapp.png" alt="WhatsApp" className="w-8 h-8 object-contain" />
        </a>
      </div>

      {/* Floating Circular Chat Button without text */}
      <div className={`fixed ${isRTL ? "left-4" : "right-4"} bottom-5 z-50`}>
        <button
          type="button"
          onClick={() => setChatOpen(!chatOpen)}
          className="w-14 h-14 rounded-full bg-[#f48161] hover:bg-[#e46e4e] flex items-center justify-center shadow-2xl transition transform hover:scale-105 cursor-pointer border-2 border-white ring-4 ring-[#f48161]/20"
          title="Discuter avec notre conseiller"
          aria-label="Ouvrir le chat"
        >
          <div className="w-10 h-10 rounded-full bg-[#fef1eb] flex items-center justify-center shadow-inner">
            <img src="/images/icon-digibot.svg" alt="Chat" className="w-6 h-6 object-contain" />
          </div>
        </button>
      </div>

      {/* Interactive Chat Modal */}
      {chatOpen && (
        <div className={`fixed ${isRTL ? "left-4" : "right-4"} bottom-24 z-50 w-[340px] sm:w-[380px] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-200`}>
          <div className="bg-[#153954] text-white px-5 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#f48161] flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-sm">{t("floating.botTitle", "Digibot")}</h4>
                <span className="text-[11px] text-emerald-400 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  {t("floating.botStatus", "En ligne • Conseiller Digiassur")}
                </span>
              </div>
            </div>
            <button
              onClick={() => setChatOpen(false)}
              className="text-white/70 hover:text-white p-1 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

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

          <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-slate-100 flex gap-2">
            <input
              type="text"
              placeholder={t("floating.inputPlaceholder", "Posez votre question...")}
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

