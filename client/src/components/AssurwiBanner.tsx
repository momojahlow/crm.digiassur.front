import { useLanguage } from "@/contexts/LanguageContext";

export default function AssurwiBanner() {
  const { language } = useLanguage();

  return (
    <section className="py-12 bg-white border-t border-slate-100">
      <div className="max-w-[1200px] mx-auto px-4 lg:px-8 flex flex-col items-center text-center">
        <img
          src="/images/assurwi.png"
          alt="Assur'wi courtier d'assurance"
          className="h-12 w-auto object-contain mb-6 filter contrast-125"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = "https://digiassur.ma/assets/img/group-138@2x.png";
          }}
        />
        {language === "ar" ? (
          <p className="text-xs sm:text-sm text-slate-500 max-w-4xl leading-relaxed">
            ينتمي موقع ديجي آسور إلى شركة <strong className="text-[#153954]">Assur'wi</strong>، وسيط التأمين وإعادة التأمين،
            الخاضع للقانون رقم 17-99 بموجب قرار 16 ماي 2018 رقم <strong className="text-slate-700">C340893782018780</strong>،
            ومقرها الاجتماعي بـ 27، زنقة عين أسردون، طابق الحديقة، CIL، الدار البيضاء، المغرب.
            <br className="hidden sm:inline" />
            معالجة المعطيات الشخصية المنجزة من طرف <strong className="text-[#153954]">Assur'wi</strong> في إطار ديجي آسور مصرح بها لدى اللجنة الوطنية لمراقبة حماية المعطيات ذات الطابع الشخصي (CNDP) تحت رقم: <strong className="text-slate-700">A-GC-232/2023</strong>.
          </p>
        ) : language === "en" ? (
          <p className="text-xs sm:text-sm text-slate-500 max-w-4xl leading-relaxed">
            The DigiAssur website belongs to <strong className="text-[#153954]">Assur'wi</strong>, insurance and reinsurance broker,
            governed by law no. 17-99 by decision of May 16, 2018 bearing number <strong className="text-slate-700">C340893782018780</strong>,
            headquartered at 27, Rue Ain Asserdoune, Rez de jardin, CIL, Casablanca, Morocco.
            <br className="hidden sm:inline" />
            Personal data processing carried out by <strong className="text-[#153954]">Assur'wi</strong> has been declared to the CNDP under number: <strong className="text-slate-700">A-GC-232/2023</strong>.
          </p>
        ) : (
          <p className="text-xs sm:text-sm text-slate-500 max-w-4xl leading-relaxed">
            Le site DigiAssur appartient à <strong className="text-[#153954]">Assur'wi</strong>, courtier d’assurance et de réassurance,
            régi par la loi n°17-99 par décision du 16 Mai 2018 portant le numéro <strong className="text-slate-700">C340893782018780</strong>,
            ayant son siège social sis 27, Rue Ain Asserdoune, Rez de jardin, CIL, Casablanca, Maroc.
            <br className="hidden sm:inline" />
            Les traitements des données personnelles réalisés par <strong className="text-[#153954]">Assur'wi</strong> dans le cadre de DigiAssur ont été déclarés à la CNDP sous le numéro: <strong className="text-slate-700">A-GC-232/2023</strong>.
          </p>
        )}
      </div>
    </section>
  );
}

