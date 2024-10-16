import MainPageContent from './(main_layout)/_components/MainPageContent';
import MainLayout from './(main_layout)/layout';

import DashboardPage from '@/app/(web)/(main_layout)/dashboard/page';
import whiteLabelConfig from '@/config/whitelabel';

const Home = async () => (
  <MainLayout>{whiteLabelConfig.disableLanding ? <DashboardPage /> : <MainPageContent />}</MainLayout>
);

export default Home;
