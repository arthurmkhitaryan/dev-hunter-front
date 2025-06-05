export interface CreateEngineerDto {
  firstName: string;
  lastName: string;
  techLanguages: string[];
  salaryRange: [number, number];
  experience: string;
  position: string[];
}

export interface Engineer {
  _id: string;
  firstName: string;
  lastName: string;
  techLanguages: string[];
  salaryRange: [number, number];
  experience: string;
  position: string[];
  isNew?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface GetBySubscriptionArg {
  subscriptionId: string;
}

export type GetEngineersArg = GetBySubscriptionArg | void;

export type GenerateEngineersResponse = Engineer[];
