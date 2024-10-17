import { FC } from 'react';

import OrderStatusPageContent from './components/OrderStatusPageContent';

import { orders } from '@/api/orders';

type SuccessPaymentPageProps = {
  params: { uuid: string };
};

const SuccessPaymentPage: FC<SuccessPaymentPageProps> = async ({ params }) => {
  const getOrderInfo = async () => {
    const { data } = await orders.status.getByUuid(params.uuid);
    return data;
  };
  const orderInfo = await getOrderInfo();

  return <OrderStatusPageContent order={orderInfo} uuid={params.uuid} />;
};

export default SuccessPaymentPage;
