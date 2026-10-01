export default function AssurwiBanner() {
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
        <p className="text-xs sm:text-sm text-slate-500 max-w-4xl leading-relaxed">
          Le site DigiAssur appartient à <strong className="text-[#153954]">Assur'wi</strong>, courtier d’assurance et de réassurance,
          régi par la loi n°17-99 par décision du 16 Mai 2018 portant le numéro <strong className="text-slate-700">C340893782018780</strong>,
          ayant son siège social sis 27, Rue Ain Asserdoune, Rez de jardin, CIL, Casablanca, Maroc.
          <br className="hidden sm:inline" />
          Les traitements des données personnelles réalisés par <strong className="text-[#153954]">Assur'wi</strong> dans le cadre de DigiAssur ont été déclarés à la CNDP sous le numéro: <strong className="text-slate-700">A-GC-232/2023</strong>.
        </p>
      </div>
    </section>
  );
}
