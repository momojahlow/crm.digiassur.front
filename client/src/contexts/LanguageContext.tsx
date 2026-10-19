import React, { createContext, useContext, useState, useEffect } from "react";
import { translations, Language } from "@/i18n/translations";
import { ARABIC_DICTIONARY } from "@/i18n/arDictionary";
import { ENGLISH_DICTIONARY } from "@/i18n/enDictionary";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  isRTL: boolean;
  t: (path: string, fallback?: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function translatePhrase(text: string, lang: Language): string {
  if (!text || typeof text !== "string" || lang === "fr") return text;
  const leadMatch = text.match(/^\s*/);
  const trailMatch = text.match(/\s*$/);
  const lead = leadMatch ? leadMatch[0] : "";
  const trail = trailMatch ? trailMatch[0] : "";
  const trimmed = text.trim();
  if (!trimmed || trimmed.length < 2) return text;

  const dict = lang === "ar" ? ARABIC_DICTIONARY : ENGLISH_DICTIONARY;

  // 1. Direct match
  if (dict[trimmed]) {
    return lead + dict[trimmed] + trail;
  }

  // 2. Normalized apostrophes
  const norm = trimmed.replace(/’/g, "'");
  if (dict[norm]) {
    return lead + dict[norm] + trail;
  }

  // 3. Punctuation stripped
  const strip = norm.replace(/[:?*!.]+$/, "").trim();
  if (dict[strip]) {
    const punct = norm.slice(strip.length);
    const mappedPunct = lang === "ar" ? punct.replace(/\?/g, "؟").replace(/:/g, " :") : punct;
    return lead + dict[strip] + mappedPunct + trail;
  }

  // 4. Currency and price formatting
  let res = text;
  if (lang === "ar") {
    res = res.replace(/(\d+(?:\.\d+)?)\s*DHS\s*TTC\s*\/\s*Mois/gi, "$1 درهم شامل الضريبة / شهرياً");
    res = res.replace(/(\d+(?:\.\d+)?)\s*DHS\s*TTC\s*\/\s*An/gi, "$1 درهم شامل الضريبة / سنوياً");
    res = res.replace(/(\d+(?:\.\d+)?)\s*DHS\s*TTC/gi, "$1 درهم شامل الضريبة");
    res = res.replace(/(\d+(?:\.\d+)?)\s*DHS\s*\/\s*Mois/gi, "$1 درهم / شهرياً");
    res = res.replace(/(\d+(?:\.\d+)?)\s*DH\s*\/\s*an/gi, "$1 درهم / سنوياً");
    res = res.replace(/(\d+(?:\.\d+)?)\s*DHS/gi, "$1 درهم");
    res = res.replace(/(\d+(?:\.\d+)?)\s*DH/gi, "$1 درهم");
  } else if (lang === "en") {
    res = res.replace(/(\d+(?:\.\d+)?)\s*DHS\s*TTC\s*\/\s*Mois/gi, "$1 MAD incl. VAT / Month");
    res = res.replace(/(\d+(?:\.\d+)?)\s*DHS\s*TTC\s*\/\s*An/gi, "$1 MAD incl. VAT / Year");
    res = res.replace(/(\d+(?:\.\d+)?)\s*DHS\s*TTC/gi, "$1 MAD incl. VAT");
    res = res.replace(/(\d+(?:\.\d+)?)\s*DHS\s*\/\s*Mois/gi, "$1 MAD / Month");
    res = res.replace(/(\d+(?:\.\d+)?)\s*DH\s*\/\s*an/gi, "$1 MAD / Year");
    res = res.replace(/(\d+(?:\.\d+)?)\s*DHS/gi, "$1 MAD");
    res = res.replace(/(\d+(?:\.\d+)?)\s*DH/gi, "$1 MAD");
  }

  return res;
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("digiassur_lang") as Language;
      if (saved && (saved === "fr" || saved === "en" || saved === "ar")) {
        return saved;
      }
    }
    return "fr";
  });

  const isRTL = language === "ar";

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== "undefined") {
      localStorage.setItem("digiassur_lang", lang);
    }
  };

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = language;
      document.documentElement.dir = isRTL ? "rtl" : "ltr";
      if (isRTL) {
        document.documentElement.classList.add("rtl");
      } else {
        document.documentElement.classList.remove("rtl");
      }
    }
  }, [language, isRTL]);

  // Real-time DOM translation engine for complete site coverage
  useEffect(() => {
    if (typeof document === "undefined") return;

    let isTranslating = false;

    const translateDomTree = (root: Node) => {
      if (isTranslating) return;
      isTranslating = true;

      try {
        const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
          acceptNode(node) {
            const parent = node.parentElement;
            if (!parent) return NodeFilter.FILTER_REJECT;
            const tag = parent.tagName.toLowerCase();
            if (["script", "style", "textarea", "input", "pre", "code"].includes(tag)) {
              return NodeFilter.FILTER_REJECT;
            }
            if (parent.isContentEditable) return NodeFilter.FILTER_REJECT;
            const val = node.nodeValue;
            if (!val || val.trim().length < 2) return NodeFilter.FILTER_REJECT;
            return NodeFilter.FILTER_ACCEPT;
          },
        });

        const textNodes: Text[] = [];
        let currentNode = walker.nextNode();
        while (currentNode) {
          textNodes.push(currentNode as Text);
          currentNode = walker.nextNode();
        }

        for (const textNode of textNodes) {
          const anyNode = textNode as any;
          if (anyNode.__origText === undefined) {
            anyNode.__origText = textNode.nodeValue;
          }

          const source = anyNode.__origText;
          if (!source || source.trim().length < 2) continue;

          if (language === "fr") {
            if (textNode.nodeValue !== source) {
              textNode.nodeValue = source;
            }
          } else {
            const translated = translatePhrase(source, language);
            if (translated && translated !== source && textNode.nodeValue !== translated) {
              textNode.nodeValue = translated;
            }
          }
        }

        // Also translate placeholder attributes
        const rootEl = root as HTMLElement;
        if (rootEl.querySelectorAll) {
          const inputs = rootEl.querySelectorAll("input[placeholder]");
          inputs.forEach((input: any) => {
            if (input.getAttribute("data-orig-placeholder") === null) {
              input.setAttribute("data-orig-placeholder", input.placeholder || "");
            }
            const origPlaceholder = input.getAttribute("data-orig-placeholder");
            if (origPlaceholder) {
              if (language === "fr") {
                input.placeholder = origPlaceholder;
              } else {
                input.placeholder = translatePhrase(origPlaceholder, language);
              }
            }
          });
        }
      } catch (err) {
        console.warn("Translation engine error:", err);
      } finally {
        isTranslating = false;
      }
    };

    // Run on initial render / language switch
    translateDomTree(document.body);

    // Observe changes across route transitions and dynamically rendered steps
    const observer = new MutationObserver((mutations) => {
      if (isTranslating) return;
      for (const mutation of mutations) {
        if (mutation.type === "childList") {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE || node.nodeType === Node.TEXT_NODE) {
              translateDomTree(node);
            }
          });
        }
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
    };
  }, [language]);

  const t = (path: string, fallback?: string): string => {
    const keys = path.split(".");
    let current: any = translations[language];

    if (keys.length > 1) {
      for (const key of keys) {
        if (current && typeof current === "object" && key in current) {
          current = current[key];
        } else {
          current = undefined;
          break;
        }
      }
      if (typeof current === "string") return current;
    }

    // Try dictionary translation
    const candidate = fallback || path;
    if (language !== "fr") {
      const translated = translatePhrase(candidate, language);
      if (translated !== candidate) return translated;
    }

    // Fallback to French in translations
    let fallbackVal: any = translations["fr"];
    if (keys.length > 1) {
      for (const fKey of keys) {
        if (fallbackVal && typeof fallbackVal === "object" && fKey in fallbackVal) {
          fallbackVal = fallbackVal[fKey];
        } else {
          fallbackVal = undefined;
          break;
        }
      }
      if (typeof fallbackVal === "string") return fallbackVal;
    }

    return fallback || path;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, isRTL, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

