export interface ElasticResultModel {
  ProductID: number;
  ProductName: string;
  ProductBrand: string;
  Gender: string;
  Price_INR: number; // Converted "Price (INR)" to camelCase for TypeScript compatibility
  NumImages: number;
  Description: string;
  PrimaryColor: string;
  DescriptionVector: number[]; // Array of numbers to represent the vector
}
