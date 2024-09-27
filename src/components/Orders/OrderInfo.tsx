'use client';

import { Button } from '@nextui-org/react';
import Link from 'next/link';
import { FC } from 'react';

import { IconType } from 'react-icons';
import { GoHistory, GoNoEntry, GoVerified } from 'react-icons/go';

import { API } from '@/api/types';
import { DashboardTabs, OrderStatuses, OrderTypes } from '@/constants';

import { getDateAndTime } from '@/utils/converters';

type OrderInfoProps = {
  order: API.Orders.Status.Response;
};

type OrderStatusesInfo = {
  [key in OrderStatuses]: {
    title: string;
    description: string;
    icon: IconType;
    buttonColor: 'default' | 'success' | 'warning' | 'primary';
    iconColorClassname: string;
  };
};

const orderStatusesInfo: OrderStatusesInfo = {
  [OrderStatuses.PENDING]: {
    title: 'Pending',
    description: 'Your order is pending. Please wait for the confirmation.',
    icon: GoHistory,
    buttonColor: 'default',
    iconColorClassname: 'text-gray-500',
  },
  [OrderStatuses.COMPLETE]: {
    title: 'Complete',
    description: 'Your order has been completed.',
    icon: GoVerified,
    buttonColor: 'primary',
    iconColorClassname: 'text-primary ',
  },
  [OrderStatuses.CANCELED]: {
    title: 'Canceled',
    description: 'Your order has been canceled.',
    icon: GoNoEntry,
    buttonColor: 'warning',
    iconColorClassname: 'text-red-500',
  },
  [OrderStatuses.FAILED]: {
    title: 'Failed',
    description: 'Your order has failed.',
    icon: GoNoEntry,
    buttonColor: 'warning',
    iconColorClassname: 'text-red-500',
  },
  [OrderStatuses.NEW]: {
    title: 'New',
    description: 'Your order succesfully created.',
    icon: GoHistory,
    buttonColor: 'default',
    iconColorClassname: 'text-gray-500',
  },
  [OrderStatuses.ERROR]: {
    title: 'Error',
    description: 'An error occurred while processing your order.',
    icon: GoNoEntry,
    buttonColor: 'warning',
    iconColorClassname: 'text-red-500',
  },
};

const orderTypeTitle = {
  [OrderTypes.CRYPTO_WITHDRAWAL]: 'crypto withdrawal',
  [OrderTypes.OFFRAMP]: 'fiat withdrawal',
  [OrderTypes.ONRAMP]: 'fiat deposit',
};

const OrderInfo: FC<OrderInfoProps> = ({ order }) => {
  const orderStatusInfo = orderStatusesInfo[order.status];

  return (
    <section className="mt-20 flex flex-col items-center gap-4">
      <orderStatusInfo.icon className={`h-24 w-24 ${orderStatusInfo.iconColorClassname}`} />
      <h1 className={`text-2xl font-bold ${orderStatusInfo.iconColorClassname}`}>{orderStatusInfo.title}</h1>
      <p>{orderStatusInfo.description}</p>
      <div className="mt-8 flex flex-col gap-1 text-start">
        <p>Date: {getDateAndTime(order.created_at)}</p>
        <p>UUID: {order.order_uuid}</p>
        <p>Type: {orderTypeTitle[order.type]}</p>
        {order.amount && <p>Order amount: {order.amount}</p>}
      </div>
      <Button
        as={Link}
        href="/dashboard"
        color={orderStatusInfo.buttonColor}
        className="mt-8 w-60 text-white"
        radius="sm"
      >
        Go to dashboard
      </Button>
    </section>
  );
};

export default OrderInfo;
