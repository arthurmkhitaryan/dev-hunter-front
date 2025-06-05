import { Candidates, ManageSubscriptions } from '@/components';

// styles
import * as S from './Main.styled.ts';
import { useState } from 'react';

export default function MainPage() {
  const [selectedSubscriptionId, setSelectedSubscriptionId] = useState<string>('');

  return (
    <S.MainContainer>
      <S.MainTitle>Welcome to Dev Hunter</S.MainTitle>
      <ManageSubscriptions
        selectedSubscriptionId={selectedSubscriptionId}
        setSelectedSubscriptionId={setSelectedSubscriptionId}
      />
      <Candidates selectedSubscriptionId={selectedSubscriptionId} />
    </S.MainContainer>
  );
}
