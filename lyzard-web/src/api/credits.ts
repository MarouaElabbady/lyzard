import apiClient from './client';

export interface CreditsResponse {
  credits: number;
}

export interface PurchaseResponse {
  message: string;
  credits: number;
}

export const getCredits = (): Promise<CreditsResponse> =>
  apiClient.get('/v1/credits').then((r) => r.data);

export const purchaseCredits = (): Promise<PurchaseResponse> =>
  apiClient.post('/v1/credits/purchase').then((r) => r.data);
