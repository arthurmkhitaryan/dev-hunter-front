import { type FC, useEffect, useState } from 'react';
import { CreateSubscriptionForm, StandardLayout } from '@/components';
import { useGetSubscriptionsQuery } from '@/services/subscriptionApi/subscriptionApi';
import { SubscriptionCard } from '@/components/cards/SubscriptionCard';
import { useSocket } from '@/hooks/useSocket';
import type { Subscription } from '@/services';

import * as S from './ManageSubscriptions.styled';

interface ManageSubscriptionsProps {
  selectedSubscriptionId: string;
  setSelectedSubscriptionId: (id: string) => void;
}

export const ManageSubscriptions: FC<ManageSubscriptionsProps> = ({
  selectedSubscriptionId,
  setSelectedSubscriptionId,
}) => {
  const { data: subscriptions, isLoading } = useGetSubscriptionsQuery();
  const socketRef = useSocket();

  const [liveSubs, setLiveSubs] = useState<Subscription[]>([]);

  useEffect(() => {
    if (subscriptions) {
      setLiveSubs(subscriptions);
    }
  }, [subscriptions]);

  useEffect(() => {
    const socket = socketRef.current;
    if (!socket) return;

    const onCreated = (newSub: Subscription) => {
      setLiveSubs((prev) => {
        if (prev.find((s) => s._id === newSub._id)) return prev;
        return [newSub, ...prev];
      });
    };

    socket.on('subscriptionCreated', onCreated);
    return () => {
      socket.off('subscriptionCreated', onCreated);
    };
  }, [socketRef]);

  const handleSelect = (subscriptionId: string) => {
    setSelectedSubscriptionId(subscriptionId);

    const socket = socketRef.current;
    if (socket) {
      socket.emit('subscribe', { subscriptionId });
    }
  };

  useEffect(() => {
    const socket = socketRef.current;
    return () => {
      if (socket && selectedSubscriptionId) {
        socket.emit('unsubscribe', { subscriptionId: selectedSubscriptionId });
      }
    };
  }, [selectedSubscriptionId, socketRef]);

  return (
    <S.ManageContainer>
      <CreateSubscriptionForm />
      {!isLoading && liveSubs.length > 0 ? (
        <StandardLayout title="Your subscriptions">
          <S.Subscriptions>
            {liveSubs.map((item) => (
              <SubscriptionCard
                key={item._id}
                onClick={handleSelect}
                subscription={item}
                isSelected={selectedSubscriptionId === item._id}
              />
            ))}
          </S.Subscriptions>
        </StandardLayout>
      ) : (
        <S.NoMatched>
          <S.Title>No matching</S.Title>
          <S.Description>We will let you know when a match is found</S.Description>
        </S.NoMatched>
      )}
    </S.ManageContainer>
  );
};
