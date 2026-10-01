export default function PartnersSection() {
  const partners = [
    {
      name: "AXA",
      logo: "/images/axa.svg",
      fallback: "https://digiassur.ma/assets/img/axa-768-1-2.svg",
      className: "h-12 w-auto max-w-[120px]",
    },
    {
      name: "Allianz",
      logo: "/images/allianz.svg",
      fallback: "https://digiassur.ma/assets/img/allianz-2-1-2.svg",
      className: "h-9 w-auto max-w-[140px]",
    },
    {
      name: "Sanlam",
      logo: "/images/sanlam.png",
      fallback: "https://digiassur.ma/assets/img/groupe-2798@2x.png",
      className: "h-8 w-auto max-w-[130px]",
    },
    {
      name: "RMA",
      logo: "/images/rma.svg",
      fallback: "https://digiassur.ma/assets/img/rma-1-1.svg",
      className: "h-10 w-auto max-w-[140px]",
    },
    {
      name: "Assur'wi",
      logo: "/images/assurwi.png",
      fallback: "https://digiassur.ma/assets/img/group-138@2x.png",
      className: "h-10 w-auto max-w-[130px]",
    },
    {
      name: "AtlantaSanad",
      logo: "/images/atlanta.png",
      fallback: "https://digiassur.ma/assets/img/rectangle-9@2x.png",
      className: "h-12 w-auto max-w-[150px]",
    },
  ];

  return (
    <section className="py-14 bg-slate-50/60 border-y border-slate-100">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl lg:text-3xl font-bold text-[#153954] mb-3">
            Nos partenaires
          </h2>
          <p className="text-sm text-slate-500 leading-relaxed">
            Nous sommes fiers de travailler avec une sélection de compagnies d'assurance de premier plan pour offrir à nos clients les meilleurs produits et services possibles.
          </p>
        </div>

        {/* Partners Grid / Flex */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 items-center justify-center">
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="bg-white border border-slate-100 rounded-xl shadow-xs hover:shadow-md transition-all duration-200 h-[100px] flex items-center justify-center px-4 py-2 hover:border-[#f48161]/40"
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className={`${partner.className} object-contain filter grayscale hover:grayscale-0 transition-all duration-300`}
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = partner.fallback;
                }}
              />
            </div>
          ))}
        </div>

        {/* Pagination Dots (as in Figma) */}
        <div className="flex justify-center items-center gap-2 mt-8">
          <span className="w-2.5 h-2.5 rounded-full bg-[#f48161]"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-[#f48161]/35"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-[#f48161]/35"></span>
        </div>
      </div>
    </section>
  );
}
