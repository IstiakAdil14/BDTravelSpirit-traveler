export type Review = {
  id: string;
  tourId: string;
  author: string;
  rating: number;
  text: string;
  createdAt: string; // ISO string for props
};
