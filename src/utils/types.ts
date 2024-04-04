export type Review = {
  customer: string;
  review: string;
  score: number;
};

export interface Sale {
  weekEnding: string;
  retailSales: number;
  wholesaleSales: number;
  unitsSold: number;
  retailerMargin: number;
  [key: string]: string | number; // This allows any string to be used as a key
}


export type Product = {
  id: string;
  title: string;
  image: string;
  subtitle: string;
  brand: string;
  reviews: Review[];
  retailer: string;
  details: string[];
  tags: string[];
  sales: Sale[];
};

export interface SortIndicatorProps {
  field: string;
  sortField: string;
  sortDirection: "asc" | "desc";
  onSort: (field: string) => void;
}