import { type FC } from 'react';
import { Controller, type FieldErrors, useForm } from 'react-hook-form';
import { useCreateSubscriptionMutation } from '@/services/subscriptionApi/subscriptionApi';
import type { CreateSubscriptionDto } from '@/services/subscriptionApi/subscriptionApi.types';

import * as S from './CreateSubscription.styled';
import { MultiSelect } from '@/components';
import { techLanguageOptions, experienceOptions, positionOptions } from './constants';
import type { SubscriptionFormValues } from './types';

export const CreateSubscriptionForm: FC = () => {
  const [createSubscription, { isLoading: isCreating, error: createError }] =
    useCreateSubscriptionMutation();

  const {
    handleSubmit,
    control,
    register,
    reset,
    watch,
    formState: { errors },
  } = useForm<SubscriptionFormValues>({
    defaultValues: {
      techLanguages: [],
      position: [],
      experience: '',
      salaryMin: '',
      salaryMax: '',
    },
  });

  const salaryMin = watch('salaryMin');
  const salaryMax = watch('salaryMax');

  const onSubmit = async (data: SubscriptionFormValues) => {
    const parsedMin = Number(data.salaryMin);
    const parsedMax = Number(data.salaryMax);

    if (isNaN(parsedMin) || isNaN(parsedMax)) {
      return;
    }

    const dto: CreateSubscriptionDto = {
      techLanguages: data.techLanguages,
      position: data.position,
      experience: data.experience,
      salaryRange: [parsedMin, parsedMax],
    };

    try {
      await createSubscription(dto).unwrap();
      reset();
    } catch (err) {
      console.error('Error:', err);
    }
  };

  const renderError = (fieldErrors: FieldErrors, name: keyof SubscriptionFormValues) => {
    const err = fieldErrors[name];
    return err ? <S.ErrorText>{(err as any).message}</S.ErrorText> : null;
  };

  return (
    <S.FormContainer onSubmit={handleSubmit(onSubmit)}>
      <S.FieldContainer>
        <S.Label>Tech Languages</S.Label>
        <Controller
          name="techLanguages"
          control={control}
          rules={{
            validate: (val) =>
              Array.isArray(val) && val.length > 0 ? true : 'Select at least one language',
          }}
          render={({ field: { value, onChange } }) => (
            <MultiSelect
              options={techLanguageOptions}
              value={value}
              onChange={onChange}
              placeholder="Select"
            />
          )}
        />
        {renderError(errors, 'techLanguages')}
      </S.FieldContainer>

      <S.FieldContainer>
        <S.Label>Position</S.Label>
        <Controller
          name="position"
          control={control}
          rules={{ required: 'Position is required' }}
          render={({ field: { value, onChange } }) => (
            <MultiSelect
              options={positionOptions}
              value={value}
              onChange={onChange}
              placeholder="Select"
            />
          )}
        />
        {renderError(errors, 'position')}
      </S.FieldContainer>

      <S.FieldContainer>
        <S.Label>Salary range</S.Label>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <div style={{ flex: 1 }}>
            <S.StyledInput
              type="number"
              placeholder="e.g. 500000"
              {...register('salaryMin', {
                required: 'Enter min salary',
                min: { value: 0, message: 'Must be ≥ 0' },
                validate: (val) =>
                  salaryMax === '' || Number(val) <= Number(salaryMax) ? true : 'Min ≤ Max',
              })}
            />
            {renderError(errors, 'salaryMin')}
          </div>

          <div style={{ flex: 1 }}>
            <S.StyledInput
              type="number"
              placeholder="e.g. 1000000"
              {...register('salaryMax', {
                required: 'Enter max salary',
                min: { value: 0, message: 'Must be ≥ 0' },
                validate: (val) =>
                  salaryMin === '' || Number(val) >= Number(salaryMin) ? true : 'Max ≥ Min',
              })}
            />
            {renderError(errors, 'salaryMax')}
          </div>
        </div>
      </S.FieldContainer>

      <S.FieldContainer>
        <S.Label>Experience</S.Label>
        <Controller
          name="experience"
          control={control}
          rules={{ required: 'Experience is required' }}
          render={({ field: { value, onChange } }) => (
            <MultiSelect
              options={experienceOptions}
              value={value}
              onChange={onChange}
              multiple={false}
              placeholder="Select"
            />
          )}
        />
        {renderError(errors, 'experience')}
      </S.FieldContainer>

      <S.CreateSubscriptionButton type="submit" disabled={isCreating}>
        {isCreating ? 'Creating…' : 'Create Subscription'}
      </S.CreateSubscriptionButton>

      {createError && <S.ErrorText>Failed to create subscription</S.ErrorText>}
    </S.FormContainer>
  );
};
