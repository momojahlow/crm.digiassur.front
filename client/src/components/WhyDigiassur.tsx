export default function WhyDigiassur() {
  const reasons = [
    {
      icon: "/images/why-mobile.svg",
      title: "Accélération du traitement des sinistres via l’application mobile",
    },
    {
      icon: "/images/why-legal.svg",
      title: "Accompagnement juridique et administratif",
    },
    {
      icon: "/images/why-support.svg",
      title: "Centre de relation client H24",
    },
    {
      icon: "/images/why-shipping.svg",
      title: "Livraison gratuite",
    },
    {
      icon: "/images/why-espace.svg",
      title: "Espace client en ligne et sur l’application mobile",
    },
    {
      icon: "/images/why-card.svg",
      title: "Paiement par mensualité (crédit gratuit sofac)",
    },
    {
      icon: "/images/why-psy.svg",
      title: "Plateforme d’écoute psychologique en cas d’accident",
    },
  ];

  return (
    <section className="py-20 bg-[#4b7f9c] text-white shadow-inner">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight mb-4">
            Pourquoi choisir Digiassur ?
          </h2>
          <div className="w-16 h-1 bg-[#f48161] mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-center">
          {reasons.slice(0, 4).map((item, index) => (
            <div key={index} className="flex flex-col items-center text-center group">
              <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center shadow-lg mb-5 transform group-hover:scale-110 transition duration-300 p-5">
                <img src={item.icon} alt="" className="w-12 h-12 object-contain" />
              </div>
              <p className="font-semibold text-sm lg:text-base leading-snug max-w-[240px]">
                {item.title}
              </p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 justify-center max-w-4xl mx-auto mt-12">
          {reasons.slice(4).map((item, index) => (
            <div key={index} className="flex flex-col items-center text-center group">
              <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center shadow-lg mb-5 transform group-hover:scale-110 transition duration-300 p-5">
                <img src={item.icon} alt="" className="w-12 h-12 object-contain" />
              </div>
              <p className="font-semibold text-sm lg:text-base leading-snug max-w-[240px]">
                {item.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
