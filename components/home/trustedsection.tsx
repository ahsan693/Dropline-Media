import Image from "next/image";

const logos = [
  "/images/clients/icl.svg",
  "/images/clients/rootura.svg",
  "/images/clients/kudocard.svg",
  "/images/clients/nn.svg",
  "/images/clients/nexalley.svg",
];

export default function TrustedSection() {
  return (
    <section className="bg-white py-12">
      <div className="section-shell text-center">
        <h3 className="text-xl font-medium text-black mb-6">Trusted by</h3>

        <div className="flex items-center justify-center gap-8 flex-wrap">
          {logos.map((src, i) => (
            <div key={i} className="w-[5.25rem] h-12 sm:w-[6.875rem] md:w-[8.75rem] flex items-center justify-center opacity-80">
              <Image src={src} alt={`client-${i}`} width={140} height={48} className="object-contain" sizes="(max-width: 640px) 80px, 140px" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
