import type { FC } from 'react';
import { Button } from '@/components';
import { useGenerateEngineersMutation, useGetSubscriptionsQuery } from '@/services';

// styles
import * as S from './Header.styled';

// images
import LogoSvg from '@/assets/logo.svg';

export const Header: FC = () => {
  const [generateCandidates] = useGenerateEngineersMutation();
  const { refetch: refetchSubscriptions } = useGetSubscriptionsQuery();

  const handleGenerateCandidates = async () => {
    try {
      await generateCandidates(4);
      await refetchSubscriptions();
    } catch (e) {
      console.error('Error:', e);
    }
  };

  return (
    <S.Header>
      <S.Logo src={LogoSvg} alt="dev-hunter-logo" />
      <Button onClick={handleGenerateCandidates}>Generate new candidate</Button>
    </S.Header>
  );
};
