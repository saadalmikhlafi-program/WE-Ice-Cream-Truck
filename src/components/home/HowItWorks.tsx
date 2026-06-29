export default function HowItWorks() {
  const steps = [
    {
      title: "Select Your Experience",
      description: "Browse our premium fleet and select the perfect vintage truck or modern van tailored for your specific guest count and aesthetic.",
    },
    {
      title: "Reserve Your Date",
      description: "Provide your event details through our seamless booking portal to instantly secure your date on our calendar.",
    },
    {
      title: "The Sweet Delivery",
      description: "Our professional team arrives on time, impeccably dressed, ready to serve your guests and create an unforgettable moment.",
    },
  ];

  return (
    <section className="relative py-24 md:py-40">
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          {/* Sticky Header Column */}
          <div className="lg:col-span-5 lg:sticky lg:top-40 h-fit">
            <span className="font-sans font-bold tracking-widest uppercase text-coral text-[0.75rem] mb-6 block">
              The Process
            </span>
            <h2 className="font-display font-light text-[clamp(3rem,5vw,4.5rem)] leading-[1.05] text-navy mb-6 tracking-tighter">
              Effortless.<br />
              <span className="italic">Unforgettable.</span>
            </h2>
            <p className="font-sans text-navy/70 text-lg max-w-md leading-relaxed">
              We've refined our booking process to be as smooth as our signature soft serve. Three simple steps to elevate your next celebration.
            </p>
          </div>

          {/* Steps Column */}
          <div className="lg:col-span-7 flex flex-col gap-20 md:gap-32 mt-12 lg:mt-0">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col sm:flex-row gap-6 md:gap-12 group">
                <div className="font-display font-light text-[clamp(4rem,8vw,6.5rem)] leading-none text-navy/10 shrink-0 group-hover:text-coral transition-colors duration-500">
                  0{index + 1}
                </div>
                <div className="pt-2 sm:pt-6">
                  <h3 className="font-sans font-medium text-2xl md:text-3xl text-navy mb-4 tracking-tight">
                    {step.title}
                  </h3>
                  <p className="font-sans text-navy/70 text-[1.125rem] leading-relaxed max-w-md">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
