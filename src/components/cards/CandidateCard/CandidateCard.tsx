import { type FC } from 'react';

// styles
import * as S from './CandidateCard.styled';
import { Tag } from '@/components';
import type { Engineer, Subscription } from '@/services';

interface CandidateCardProps {
  candidate: Engineer;
  subscription: Subscription;
}

export const CandidateCard: FC<CandidateCardProps> = ({ candidate, subscription }) => {
  const {
    techLanguages: subTech,
    experience: subExp,
    salaryRange: subSalaryRange,
    position: subPos,
  } = subscription;

  const isExperienceMatch = candidate.experience === subExp;
  const [subMin, subMax] = subSalaryRange;
  const [engMin, engMax] = candidate.salaryRange;
  const isSalaryMatch = engMax <= subMax && engMin >= subMin;

  return (
    <S.CandidateCardContainer>
      {candidate.isNew && <S.New>New</S.New>}
      <S.CandidateFullName>
        {candidate.firstName} {candidate.lastName}
      </S.CandidateFullName>
      <S.Conditions>
        <S.ConditionItem $minHeight={80}>
          <S.ConditionLabel>Tech Languages</S.ConditionLabel>
          <S.TagsWrapper>
            {candidate.techLanguages.map((item) => (
              <Tag key={candidate._id + item} isMatched={subTech.includes(item)}>
                {item}
              </Tag>
            ))}
          </S.TagsWrapper>
        </S.ConditionItem>
        <S.ConditionItem>
          <S.ConditionLabel>Experience</S.ConditionLabel>
          <S.TagsWrapper>
            <Tag isMatched={isExperienceMatch}>{candidate.experience}</Tag>
          </S.TagsWrapper>
        </S.ConditionItem>
        <S.ConditionItem>
          <S.ConditionLabel>Salary range</S.ConditionLabel>
          <S.TagsWrapper>
            <Tag isMatched={isSalaryMatch}>
              {candidate.salaryRange[0].toLocaleString('en-US')} –{' '}
              {candidate.salaryRange[1].toLocaleString('en-US')} AMD
            </Tag>
          </S.TagsWrapper>
        </S.ConditionItem>
        <S.ConditionItem>
          <S.ConditionLabel>Position</S.ConditionLabel>
          <S.TagsWrapper>
            {candidate.position.map((item) => (
              <Tag isMatched={subPos.includes(item)} key={candidate._id + item}>
                {item}
              </Tag>
            ))}
          </S.TagsWrapper>
        </S.ConditionItem>
      </S.Conditions>
    </S.CandidateCardContainer>
  );
};
