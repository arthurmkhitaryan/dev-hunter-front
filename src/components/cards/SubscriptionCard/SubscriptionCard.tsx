import { type FC, type MouseEvent } from 'react';
import { Tag } from '@/components';
import { type Subscription, useGetSubscriptionStatsQuery } from '@/services';

// styles
import * as S from './SubscriptionCard.styled.ts';

// images
import SelectedSVG from '@/assets/selected.svg';

interface SubscriptionCardProps {
  subscription: Subscription;
  isSelected?: boolean;
  onClick?: (subscriptionId: string) => void;
}
export const SubscriptionCard: FC<SubscriptionCardProps> = ({
  subscription,
  isSelected = false,
  onClick,
}) => {
  const { data: stats, refetch: refetchStats } = useGetSubscriptionStatsQuery(subscription._id);

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (onClick) {
      onClick(subscription._id);
      refetchStats();
    }
  };

  return (
    <S.SubscriptionCardContainer $selected={isSelected} onClick={handleClick}>
      {isSelected && <S.Icon src={SelectedSVG} alt="Selected Subscription" />}
      <S.CandidatesCount>
        Total candidates {stats?.totalCount ?? 0} | New candidates {stats?.newCount ?? 0}
      </S.CandidatesCount>
      <S.Conditions>
        <S.ConditionItem $minHeight={80}>
          <S.ConditionLabel>Tech Languages</S.ConditionLabel>
          <S.TagsWrapper>
            {subscription.techLanguages.map((item, index) => (
              <Tag key={item + index}>{item}</Tag>
            ))}
          </S.TagsWrapper>
        </S.ConditionItem>

        <S.ConditionItem>
          <S.ConditionLabel>Experience</S.ConditionLabel>
          <S.TagsWrapper>
            <Tag>{subscription.experience}</Tag>
          </S.TagsWrapper>
        </S.ConditionItem>

        <S.ConditionItem>
          <S.ConditionLabel>Salary range</S.ConditionLabel>
          <S.TagsWrapper>
            <Tag>
              {subscription.salaryRange[0].toLocaleString('en-US')} –{' '}
              {subscription.salaryRange[1].toLocaleString('en-US')} AMD
            </Tag>
          </S.TagsWrapper>
        </S.ConditionItem>

        <S.ConditionItem>
          <S.ConditionLabel>Position</S.ConditionLabel>
          <S.TagsWrapper>
            {subscription.position.map((item, index) => (
              <Tag key={item + index}>{item}</Tag>
            ))}
          </S.TagsWrapper>
        </S.ConditionItem>
      </S.Conditions>
    </S.SubscriptionCardContainer>
  );
};
