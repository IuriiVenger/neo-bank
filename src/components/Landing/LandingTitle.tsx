import { Button } from '@nextui-org/react';
import Link from 'next/link';
import { FC } from 'react';
import { FiArrowRightCircle } from 'react-icons/fi';

type HighlightProps = {
  text: string;
  bgColor: string;
  textColor: string;
};

type LandingTitleProps = {
  id?: string;
  isUserLoggedIn: boolean;
};

const Highlight: React.FC<HighlightProps> = ({ text, bgColor, textColor }) => (
  <span className={`justify-center rounded-lg p-3 ${bgColor} ${textColor} max-md:text-4xl`}>{text}</span>
);

const LandingTitle: FC<LandingTitleProps> = ({ id, isUserLoggedIn }) => (
  <div
    className="flex w-full items-center justify-center bg-custom-lavander-gradient py-12 text-6xl font-semibold max-md:px-5 max-md:text-4xl lg:px-12 lg:py-24"
    id={id}
  >
    <section className="flex w-[848px] max-w-full flex-col items-center max-md:text-4xl">
      <h1 className="text-center leading-[150%] tracking-tighter text-neutral-950 max-md:max-w-full max-md:text-4xl">
        We make crypto
      </h1>
      <div className="mt-3 flex max-w-full gap-3 whitespace-nowrap leading-[100%] tracking-tighter max-md:text-4xl">
        <Highlight text="clear" bgColor=" bg-light-primary" textColor="text-white" />
        <span className="flex items-center text-neutral-950 max-md:text-4xl">&</span>
        <Highlight text="simple" bgColor="bg-white" textColor="text-light-primary shadow-lg" />
      </div>
      <Button
        as={Link}
        href={isUserLoggedIn ? '/dashboard' : '/auth/login'}
        color="primary"
        radius="sm"
        className="mt-12 w-full max-w-56 md:mt-20 md:max-w-72 "
      >
        <span>Get started</span>
        <FiArrowRightCircle />
      </Button>
      <section className="mt-24 justify-center self-stretch border-b border-t border-solid border-gray-200 py-8 text-center text-base font-medium leading-6 text-neutral-950 max-md:mt-10 max-md:max-w-full">
        Embark on a journey into the future of finance with our advanced cryptocurrency wallet. Merging security and
        innovation flawlessly, our wallet allows you to navigate the digital asset landscape with confidence. Welcome to
        the gateway of tomorrow`&apos;`s financial world.
      </section>
    </section>
  </div>
);

export default LandingTitle;
