import { Button } from '@nextui-org/react';

import cn from 'classnames';
import Image from 'next/image';

import { FC } from 'react';

import arrows from '@/assets/svg/arrows.svg';
import shield from '@/assets/svg/shield.svg';
import { supportEmail } from '@/constants';
import { landingCryptoIcons } from '@/utils/financial';

import { mailToSupport } from '@/utils/helpers';

type FeatureProps = {
  title: string;
  description: string;
  icon: string;
  buttonTitle: string;
  onClick: () => void;
  className?: string;
  id?: string;
};

const features = [
  {
    title: '24/7 access to full \nservice customer \nsupport',
    description: 'Always available and accessible \nfull-service customer support \naround the clock.',
    icon: shield,
    buttonTitle: 'Contact us',
    onClick: mailToSupport,
  },
  {
    title: 'OTC exchange with \nVIP assistance',
    description:
      'PPrince OTC streamlines direct crypto asset trading, \nreducing slippage.\nEnjoy profound liquidity and tailored services.\nTrade Bitcoin, Ethereum, USDT and more with \npersonal assistance.',
    icon: arrows,
    buttonTitle: supportEmail,
    onClick: mailToSupport,
  },
];

const Feature: FC<FeatureProps> = (props) => {
  const { title, description, icon, buttonTitle, onClick, className, id } = props;

  return (
    <div
      className={cn(
        'flex max-w-xs flex-col items-center gap-4 lg:h-[260px] lg:max-w-none lg:flex-row lg:items-start lg:gap-8',
        className,
      )}
      id={id}
    >
      <Image src={icon} alt="Icon" className="w-16 md:w-auto" />
      <div className="flex h-full flex-col items-center justify-between gap-2 text-center lg:items-start lg:gap-0 lg:text-start">
        <h4 className="text-xl font-medium lg:whitespace-pre lg:text-2.5xl">{title}</h4>
        <p className="text-sm lg:whitespace-pre lg:text-base">{description}</p>
        <Button onClick={onClick} className="mt-2 w-fit rounded bg-light-primary px-4 py-2 text-sm text-white lg:mt-0">
          {buttonTitle}
        </Button>
      </div>
    </div>
  );
};

type HaveMoreQuestionsProps = {
  id?: string;
};

const HaveMoreQuestions: FC<HaveMoreQuestionsProps> = ({ id }) => (
  <section className="flex w-full flex-col bg-custom-lavander-gradient" id={id}>
    <div className="px-4 py-12 lg:px-12 lg:py-24">
      <h3 className="m-auto max-w-xs text-center text-xl font-medium text-neutral-950 sm:max-w-none lg:text-2.5xl xl:text-4xl">
        Cryptocurrencies available on PPrince platform
      </h3>
      <div className=" mt-8 grid grid-cols-[repeat(4,max-content)] justify-center gap-2 md:grid-cols-[repeat(10,max-content)] 2xl:grid-cols-[repeat(20,max-content)]">
        {landingCryptoIcons.map((icon, index) => (
          <Image key={index + 1} src={icon} alt="Cryptocurrency icon" />
        ))}
      </div>
    </div>
    <div className=" flex h-60 w-full items-center justify-center bg-light-primary py-6 sm:py-12">
      <div className="flex flex-col gap-6 sm:flex-row sm:gap-20">
        <h3 className="self-center whitespace-nowrap text-center text-3xl font-bold leading-[54px] tracking-tighter text-white sm:text-4xl">
          Have more questions?
        </h3>

        <Button onClick={mailToSupport} className="bg-white px-12" radius="sm" size="lg">
          Contact us
        </Button>
      </div>
    </div>
    <div
      className="m-auto flex w-full max-w-screen-2xl flex-col items-center justify-around gap-20 px-4 py-12 lg:flex-row  lg:px-12 lg:py-24"
      id="otc"
    >
      {features.map((feature, index) => (
        <Feature key={index} {...feature} />
      ))}
    </div>
  </section>
);

export default HaveMoreQuestions;
