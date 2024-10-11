import { Switch, SwitchProps } from '@nextui-org/react';

import { FC } from 'react';
import { RiMoonFill, RiSunFill } from 'react-icons/ri';

import { CustomTheme } from '@/constants';
import { useAppDispatch, useAppSelector } from '@/store';
import { selectActiveTheme } from '@/store/selectors';
import { setActiveTheme } from '@/store/slices/ui';

const ThemeSwitcher: FC<SwitchProps> = (props) => {
  const dispatch = useAppDispatch();

  const activeTheme = useAppSelector(selectActiveTheme);
  const isDarkModeSelected = activeTheme === CustomTheme.DARK;

  const toogleTheme = () => {
    const targetTheme = isDarkModeSelected ? CustomTheme.LIGHT : CustomTheme.DARK;
    dispatch(setActiveTheme(targetTheme));
  };

  return (
    <Switch
      isSelected={isDarkModeSelected}
      color="secondary"
      startContent={<RiMoonFill />}
      endContent={<RiSunFill />}
      onChange={toogleTheme}
      {...props}
    />
  );
};

export default ThemeSwitcher;
