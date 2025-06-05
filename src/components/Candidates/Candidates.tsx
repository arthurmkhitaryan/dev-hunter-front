import { type FC, useEffect, useState, useCallback } from 'react';
import { useGetEngineersQuery } from '@/services/engineerApi/engineerApi';
import {
  useGetSubscriptionByIdQuery,
  useGetSubscriptionStatsQuery,
} from '@/services/subscriptionApi/subscriptionApi';
import { useSocket } from '@/hooks/useSocket';
import { CandidateCard } from '@/components/cards/CandidateCard';
import type { Engineer } from '@/services';

import * as S from './Candidates.styled';

interface CandidatesProps {
  selectedSubscriptionId: string;
}

export const Candidates: FC<CandidatesProps> = ({ selectedSubscriptionId }) => {
  const socketRef = useSocket();

  const { data: subscription } = useGetSubscriptionByIdQuery(selectedSubscriptionId, {
    skip: !selectedSubscriptionId,
  });

  const { refetch: refetchStats } = useGetSubscriptionStatsQuery(selectedSubscriptionId);

  const {
    data: initialEngineers,
    isLoading: isLoadingInitial,
    refetch,
  } = useGetEngineersQuery(
    selectedSubscriptionId ? { subscriptionId: selectedSubscriptionId } : undefined,
    { skip: !selectedSubscriptionId },
  );

  const [liveEngineers, setLiveEngineers] = useState<(Engineer & { isNew: boolean })[]>([]);

  useEffect(() => {
    if (initialEngineers) {
      setLiveEngineers(
        initialEngineers.map((eng) => ({
          ...eng,
          isNew: false,
        })),
      );
    } else {
      setLiveEngineers([]);
    }
  }, [initialEngineers]);

  const handleNewCandidates = useCallback(
    (payload: { subscriptionId: string; engineers: Engineer[] }) => {
      const { engineers: newcomers } = payload;
      setLiveEngineers((prev) => {
        const existingIds = new Set(prev.map((e) => e._id));
        const toAdd = newcomers
          .filter((e) => !existingIds.has(e._id))
          .map((e) => ({ ...e, isNew: true }));
        return toAdd.length ? [...toAdd, ...prev] : prev;
      });
      refetchStats();
    },
    [],
  );

  useEffect(() => {
    const socket = socketRef.current;

    if (!socket || !selectedSubscriptionId) {
      return;
    }

    socket.emit('subscribe', { subscriptionId: selectedSubscriptionId });

    const onSubscribed = () => {
      socket.on('newCandidates', handleNewCandidates);
    };
    socket.on('subscribed', onSubscribed);

    return () => {
      socket.emit('unsubscribe', { subscriptionId: selectedSubscriptionId });
      socket.off('subscribed', onSubscribed);
      socket.off('newCandidates', handleNewCandidates);
    };
  }, [socketRef, selectedSubscriptionId, handleNewCandidates]);

  useEffect(() => {
    if (selectedSubscriptionId) {
      refetch();
    } else {
      setLiveEngineers([]);
    }
  }, [selectedSubscriptionId, refetch]);

  return (
    <S.CandidatesContainer>
      {selectedSubscriptionId ? (
        <S.Title>Candidates</S.Title>
      ) : (
        <h2>Please select a subscription to see candidates</h2>
      )}

      {isLoadingInitial && <p>Loading engineers…</p>}

      {!isLoadingInitial && liveEngineers.length > 0 && subscription && (
        <S.CardsGrid>
          {liveEngineers.map((eng) => (
            <CandidateCard key={eng._id} candidate={eng} subscription={subscription} />
          ))}
        </S.CardsGrid>
      )}

      {!isLoadingInitial && selectedSubscriptionId && liveEngineers.length === 0 && (
        <p>No matching engineers found.</p>
      )}
    </S.CandidatesContainer>
  );
};
