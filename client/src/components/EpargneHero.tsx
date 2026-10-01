import { ArrowRight, Sparkles } from "lucide-react";

type EpargneHeroProps = {
  onSimulate: () => void;
};

export default function EpargneHero({ onSimulate }: EpargneHeroProps) {
  return (
    <section className="relative w-full pt-[116px] lg:pt-[116px] bg-slate-50">
      {/* Desktop Hero Container (Desktop - 24) */}
      <div className="hidden md:block w-full">
        <div className="relative w-full h-[470px] bg-[#4d7f9a] overflow-hidden shadow-md">
          {/* 2-Column Split: Image on Left, Content on Right */}
          <div className="absolute inset-0 flex">
            {/* Left Image Section */}
            <div className="w-1/2 h-full relative overflow-hidden">
              <img
                src="/images/banner-epargne.jpg"
                alt="Assurez votre épargne Digiassur"
                className="w-full h-full object-cover object-center"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = "https://digiassur.ma/assets/img-front/banner-epargne.jpg";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20" />
            </div>

            {/* Right Blue Box Section */}
            <div className="w-1/2 h-full relative flex items-center bg-[#4d7f9a] text-white px-12 lg:px-20 overflow-hidden">
              {/* Piggy Bank Watermark Drawing */}
              <img
                src="/images/epargne-drawer.png"
                alt=""
                aria-hidden="true"
                className="absolute -bottom-10 right-0 h-[480px] w-auto opacity-35 pointer-events-none select-none"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = "https://digiassur.ma/assets/img/epargne-drawer.png";
                }}
              />

              {/* Foreground Hero Content */}
              <div className="relative z-10 max-w-[560px]">
                <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-xs text-white/95 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-5">
                  <Sparkles className="w-3.5 h-3.5 text-[#f48161]" />
                  <span>Votre avenir garanti</span>
                </div>

                <h1 className="font-bold text-3xl lg:text-[40px] xl:text-[44px] leading-tight tracking-tight text-white mb-4 drop-shadow-xs">
                  Assurez vous une épargne confortable pour réaliser vos projets
                </h1>

                <p className="text-xl lg:text-2xl text-cyan-50 font-normal py-2 mb-8">
                  Epargnez pour réaliser vos rêves.
                </p>

                {/* Coral CTA Button */}
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={onSimulate}
                    className="inline-flex items-center gap-3 bg-[#f48161] hover:bg-[#e46e4e] text-white font-bold text-sm tracking-wider uppercase px-8 py-4 rounded-none shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 cursor-pointer"
                  >
                    <span>OBTENIR UNE SIMULATION</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Center Circular Badge Divider */}
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center">
            <div className="w-[96px] h-[96px] rounded-full bg-[#eefcfc] shadow-2xl flex items-center justify-center border-4 border-white/60 transition hover:scale-105 duration-300">
              <img
                src="/images/money-icon.svg"
                alt="Epargne"
                className="w-12 h-12 object-contain"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = "https://digiassur.ma/assets/img/fluent-money-hand-20-regular-1.svg";
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Hero (iPhone 14 Pro Max - 15) */}
      <div className="block md:hidden relative">
        <div
          className="relative min-h-[460px] bg-cover bg-center overflow-hidden flex items-center"
          style={{ backgroundImage: `url('/images/banner-epargne.jpg')` }}
        >
          {/* Blue Overlay */}
          <div className="absolute inset-0 bg-[#4d7f9a]/90 backdrop-blur-2xs" />

          {/* Mobile Content */}
          <div className="relative z-10 p-6 text-center text-white w-full">
            <div className="w-20 h-20 rounded-full bg-[#eefcfc] shadow-xl flex items-center justify-center mx-auto mb-6 border-4 border-white/80">
              <img
                src="/images/money-icon.svg"
                alt="Epargne"
                className="w-10 h-10 object-contain"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = "https://digiassur.ma/assets/img/fluent-money-hand-20-regular-1.svg";
                }}
              />
            </div>

            <h1 className="font-bold text-2xl leading-snug uppercase mb-3">
              Assurez vous une épargne confortable pour réaliser vos projets
            </h1>

            <p className="text-lg text-cyan-100 font-light mb-8">
              Epargnez pour réaliser vos rêves.
            </p>

            <button
              type="button"
              onClick={onSimulate}
              className="w-full max-w-xs mx-auto bg-[#f48161] hover:bg-[#e46e4e] text-white font-bold text-sm uppercase py-4 px-6 shadow-xl transition-all"
            >
              OBTENIR UNE SIMULATION
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
