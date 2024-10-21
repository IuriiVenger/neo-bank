'use client';

import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  NavbarContent,
  NavbarItem,
  Divider,
  cn,
} from '@nextui-org/react';

import Link from 'next/link';
import React, { FC, useMemo, useState } from 'react';

import KYCButton from '../modals/KYC/KYCButton';

import ThemeImage from '../ui/ThemeImage';
import ThemeSwitcher from '../ui/ThemeSwitcher';

import AuthButtons from './AuthButtons';

import darkHeaderLogo from '@/assets/tenant/dark/header_logo.svg';
import lightHeaderLogo from '@/assets/tenant/light/header_logo.svg';
import whiteLabelConfig from '@/config/whitelabel';
import { ModalNames, requestKYCStatuses } from '@/constants';
import useAuth from '@/hooks/useAuth';
import { useAppDispatch, useAppSelector } from '@/store';
import { selectConfig, selectIsUserLoggedIn, selectUser } from '@/store/selectors';
import { setModalVisible } from '@/store/slices/ui';

const authItems = [
  { title: 'Sign up', href: '/auth/login/otp' },
  { title: 'Sign in', href: '/auth/login' },
];

const Header: FC = () => {
  const dispatch = useAppDispatch();
  const isUserSignedIn = useAppSelector(selectIsUserLoggedIn);
  const { userData } = useAppSelector(selectUser);
  const { isWebAppInitialized } = useAppSelector(selectConfig);

  const { signOut } = useAuth(dispatch);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = useMemo(
    () => [
      { title: 'About', href: '/#title', enabled: !whiteLabelConfig.disableLanding },
      { title: 'Contacts', href: '/#contacts', enabled: !whiteLabelConfig.disableLanding },
      { title: 'Exchange', href: '/#exchange', enabled: !whiteLabelConfig.disableLanding },
      { title: 'Features', href: '/#features', enabled: !whiteLabelConfig.disableLanding },
      { title: 'OTC', href: '/#otc', enabled: !whiteLabelConfig.disableLanding },
    ],
    [whiteLabelConfig.disableLanding],
  );

  const filtredMenuItems = menuItems.filter((item) => item.enabled);
  const isKYCButtonVisible =
    userData && requestKYCStatuses.includes(userData.kyc_status) && !whiteLabelConfig.disableKYC;

  const closeMenu = () => setIsMenuOpen(false);

  const showKYCModal = () => {
    dispatch(setModalVisible(ModalNames.KYC));
    closeMenu();
  };

  return (
    <Navbar
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      className="w-full font-medium"
      isBordered
      maxWidth="2xl"
    >
      <NavbarContent className="md:hidden" justify="start">
        <NavbarMenuToggle />
      </NavbarContent>
      <NavbarContent className="pr-3 md:hidden" justify="center">
        <NavbarBrand>
          <ThemeImage
            lightSrc={lightHeaderLogo}
            darkSrc={darkHeaderLogo}
            alt="Logo"
            height={48}
            className="h-6 w-fit"
          />
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent className="hidden flex-grow gap-4 md:flex" justify="center">
        <Link className="flex-shrink-0" href="/">
          <ThemeImage lightSrc={lightHeaderLogo} darkSrc={darkHeaderLogo} alt="Logo" height={48} className="h-6" />
        </Link>

        <div className="flex w-full  justify-center gap-8">
          {filtredMenuItems.map((item, index) => (
            <NavbarItem key={`${item}-${index}`}>
              <Link className="text-sm text-primary hover:underline " href={item.href}>
                {item.title}
              </Link>
            </NavbarItem>
          ))}
        </div>
        <ThemeSwitcher className={cn(!isWebAppInitialized && 'invisible')} />
        <AuthButtons />
      </NavbarContent>

      <NavbarMenu className="gap-8">
        {filtredMenuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full text-primary "
              color={index === menuItems.length - 1 ? 'danger' : 'foreground'}
              href={item.href}
              onClick={closeMenu}
            >
              {item.title}
            </Link>
          </NavbarMenuItem>
        ))}
        <Divider />

        {isUserSignedIn ? (
          <>
            <NavbarMenuItem>
              <Link className="w-full text-primary " href="/dashboard" onClick={closeMenu}>
                Dashboard
              </Link>
            </NavbarMenuItem>
            <NavbarMenuItem>
              <button type="button" className="text-primary " onClick={signOut}>
                Logout
              </button>
            </NavbarMenuItem>
          </>
        ) : (
          authItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link className="w-full text-primary " href={item.href} onClick={closeMenu}>
                {item.title}
              </Link>
            </NavbarMenuItem>
          ))
        )}

        {isKYCButtonVisible && <KYCButton onClick={showKYCModal} status={userData?.kyc_status} />}
        <NavbarItem className="flex h-full items-end pb-6">
          <ThemeSwitcher />
        </NavbarItem>
      </NavbarMenu>
    </Navbar>
  );
};

export default Header;
