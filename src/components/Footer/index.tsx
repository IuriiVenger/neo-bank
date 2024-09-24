import Link from 'next/link';
import { FC } from 'react';

import logo from '@/assets/svg/tenant/footer_logo.svg';
import whiteLabelConfig from '@/config/whitelabel';

interface ImageProps {
  src: string;
  alt: string;
  className?: string;
}

const Image: FC<ImageProps> = ({ src, alt, className }) => (
  <img src={src} alt={alt} className={className} loading="lazy" />
);

const Footer: FC = () => (
  <footer className="flex items-center justify-center self-stretch bg-primary px-16 py-10 md:py-20 max-md:px-5">
    <div className="flex w-full max-w-screen-xl flex-col gap-16">
      <div className="flex w-full justify-between gap-5 gap-y-16 max-md:max-w-full max-md:flex-wrap">
        <Image src={logo.src} alt="Company Logo" className="aspect-[4.55] w-36 max-w-full shrink-0" />
        {!whiteLabelConfig.disableStaticPages && (
          <div className="flex gap-4 text-white">
            <Link className="hover:opacity-80" href="/terms">
              Terms of Service
            </Link>
            <Link className="hover:opacity-80" href="/privacy">
              Privacy Policy
            </Link>
            <Link className="hover:opacity-80" href="/aml">
              AML/KYC
            </Link>
          </div>
        )}
      </div>
      {!whiteLabelConfig.disableStaticPages && (
        <section className="text-xs leading-5 text-white max-md:max-w-full">
          2024 © All rights reserved
          <div className="mt-2 opacity-60">
            <p>
              PPrince s.r.o.– a limited liability company registred in Czech Republic with registration number 21602735
            </p>
          </div>
        </section>
      )}
    </div>
  </footer>
);

export default Footer;
