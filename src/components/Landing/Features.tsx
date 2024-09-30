import cn from 'classnames';
import { FC } from 'react';
import { IconType } from 'react-icons';
import { PiLayout, PiMoney, PiShieldCheck, PiThumbsUp } from 'react-icons/pi';

type FeatureCardProps = {
  Icon: IconType;
  title: string;
  description: string;
  className?: string;
};

type FeaturesProps = {
  id?: string;
};

const features: FeatureCardProps[] = [
  {
    title: 'Simple interface',
    description: 'User-friendly interface designed for easy navigation and accessibility.',
    Icon: PiLayout,
  },
  {
    title: 'Trusted platform',
    description: 'Secure platform ensuring reliability and confidence.',
    Icon: PiThumbsUp,
  },
  {
    title: 'Secure transactions',
    description: 'Safe and protected transactions guaranteeing your security',
    Icon: PiShieldCheck,
  },
  {
    title: 'Simple way transfer',
    description: 'Streamlined and straightforward process for hassle-free fund transfer.',
    Icon: PiMoney,
  },
];

const FeatureCard: FC<FeatureCardProps> = ({ Icon, title, description, className }) => (
  <div
    className={cn(
      'flex h-52 w-72 grow flex-col items-center gap-2 rounded-3xl bg-white p-6 text-center shadow-lg',
      className,
    )}
  >
    <Icon className=" flex-shrink-0 text-5xl text-primary " />
    <h3 className="text-xl font-medium">{title}</h3>
    <p className="text-center text-sm">{description}</p>
  </div>
);

const Features: FC<FeaturesProps> = ({ id }) => (
  <section
    className="=items-center 2 grid grid-cols-1 gap-4 py-12 sm:grid-cols-2 md:p-16 lg:px-12 lg:py-24  xl:grid-cols-4"
    id={id}
  >
    {features.map((feature, index) => (
      <FeatureCard key={index} {...feature} />
    ))}
  </section>
);

export default Features;
