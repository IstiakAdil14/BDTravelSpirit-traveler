export type Faq = {
  id: string;
  tourId: string;
  question: string;
  answer: string;
  helpful?: number;
  createdAt: string; // ISO string
};
