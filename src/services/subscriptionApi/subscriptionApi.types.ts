export interface CreateSubscriptionDto {
  techLanguages: string[];
  position: string[];
  experience: string;
  salaryRange: [number, number];
}

export interface Subscription {
  _id: string;
  techLanguages: string[];
  position: string[];
  experience: string;
  salaryRange: [number, number];
  notifiedEngineers: string[];
  createdAt: string;
  updatedAt: string;
}

export interface SubscriptionStats {
  totalCount: number;
  newCount: number;
}
