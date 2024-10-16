'use client';

import DashboardPage from '@/app/(common_pages)/_dashboard';
import privateRoute from '@/components/privateRoute';

const MiniAppPage = () => <DashboardPage />;

export default privateRoute(MiniAppPage);
