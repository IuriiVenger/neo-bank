import 'react-toastify/dist/ReactToastify.css';
import { FC, Suspense } from 'react';

// import Footer from '@/components/Footer';
import SetWebEnviroment from '../../../components/initialization/SetWebEnviroment';

import Header from '@/components/Header';
import LayoutModalContainer from '@/components/modals/LayoutModalContainer';
import Loader from '@/components/ui/Loader';

type RootLayoutProps = Readonly<{ children: React.ReactNode }>;

const MainLayout: FC<RootLayoutProps> = ({ children }) => (
  <>
    <Header />
    <SetWebEnviroment />
    <main className="flex w-full max-w-screen-2xl flex-grow justify-center p-5 pb-20 md:px-10 md:pt-8 ">
      <Suspense fallback={<Loader />}>{children}</Suspense>
    </main>
    {/* <Footer /> */}
    <LayoutModalContainer />
  </>
);

export default MainLayout;
