export function Footer() {
  return (
    <footer className="py-8 lg:py-[30px] flex flex-col items-center gap-6 lg:gap-5 w-full bg-transparent px-4">
      <div className="mobile-col flex flex-row items-center justify-center gap-8 lg:gap-0 w-full max-w-[1200px]">
        {/* Location */}
        <div className="flex flex-col items-center gap-2 lg:px-8 text-white text-[13px]">
          <img
            src="/images/icons/pin.png"
            alt="Location"
            className="w-5 h-5 object-contain opacity-80"
          />
          <span>Istanbul, Turkey</span>
        </div>

        {/* Divider */}
        <div className="lg-hidden hidden lg:block w-[1px] h-10 bg-white/30" />

        {/* Email */}
        <div className="flex flex-col items-center gap-2 lg:px-8 text-white text-[13px]">
          <img
            src="/images/icons/email.png"
            alt="Email"
            className="w-6 h-5 object-contain opacity-80"
          />
          <a
            href="mailto:contact@meritteks.com"
            className="text-white hover:text-[#f0d5d5] transition-colors"
          >
            contact@meritteks.com
          </a>
        </div>

        {/* Divider */}
        <div className="lg-hidden hidden lg:block w-[1px] h-10 bg-white/30" />

        {/* Phone */}
        <div className="flex flex-col items-center gap-2 lg:px-8 text-white text-[13px]">
          <img
            src="/images/icons/phone.png"
            alt="Phone"
            className="w-[19px] h-5 object-contain opacity-80"
          />
          <span>+90 216 425 71 46</span>
        </div>
      </div>

      <div className="w-full text-center lg:text-left lg:fixed lg:bottom-2 lg:left-4 py-4 lg:py-0">
        <p className="text-[12px] lg:text-[13px] text-white/60">
          © {new Date().getFullYear()} Merit Textile LTD. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
