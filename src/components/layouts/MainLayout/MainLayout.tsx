import { type FC } from 'react';
import { Header } from '@/components';
import { Outlet } from 'react-router-dom';

// styles
import * as S from './MainLayout.styled';

export const MainLayout: FC = () => {
  return (
    <S.MainLayout>
      <Header />
      <Outlet />
    </S.MainLayout>
  );
};
