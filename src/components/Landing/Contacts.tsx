import { Button } from '@nextui-org/react';
import Image from 'next/image';

import { FC } from 'react';

import contactMap from '@/assets/img/contact-map.png';
import { supportEmail } from '@/constants';
import { mailToSupport } from '@/utils/helpers';

type ContactsProps = {
  id?: string;
};

const Contacts: FC<ContactsProps> = ({ id }) => (
  <div className="flex w-full justify-center bg-light-secondary" id={id}>
    <div className="flex max-w-screen-xl  gap-5 px-16 pt-16 max-md:flex-col max-md:gap-0 max-md:px-5 max-md:pt-5">
      <div className="flex w-2/5 flex-col pb-6 max-md:ml-0 max-md:w-full">
        <div className="flex flex-col text-lg leading-7 text-neutral-950 max-md:mt-10">
          <div className="text-4xl font-medium leading-[54px] tracking-tighter md:text-xl lg:text-2xl">Contacts</div>
          <div className="mt-4 text-sm leading-7 text-neutral-950 lg:text-base">
            Czech Republic PPrince s.r.o. (Na Čečelička 425/4, Smíchov, 150 00 Prague 5 Czech Republic) is incorporated
            as a limited liability company, in accordance with Czech Republic law.
            <br />
            PPrince s.r.o.company registration number 21602735 PPrince s.r.o.company registration number 21602735
          </div>
          <Button
            onClick={mailToSupport}
            className="mt-4 justify-center self-start whitespace-nowrap rounded bg-light-primary px-4 py-2 text-sm text-white"
          >
            {supportEmail}
          </Button>
        </div>
      </div>
      <div className="ml-5 flex w-3/5 flex-col justify-end max-md:ml-0 max-md:w-full">
        <Image
          alt="Contacts"
          loading="lazy"
          src={contactMap}
          className="aspect-[1.52] w-full flex-shrink-0  max-md:mt-10 max-md:max-w-full"
        />
      </div>
    </div>
  </div>
);

export default Contacts;
