export interface Quote {
  _id: string;

  quoteNumber: string;

  customerName: string;

  customerEmail: string;

  customerPhone: string;

  projectType: string;

  width: number;

  height: number;

  depth: number;

  estimatedCost: number;

  status:
    | "pending"
    | "reviewing"
    | "approved"
    | "rejected";

  createdAt: string;

  updatedAt: string;
}

export interface CreateQuotePayload {
  customerName: string;
  customerEmail: string;
  customerPhone: string;

  projectType: string;

  width: number;
  height: number;
  depth: number;

  estimatedCost: number;
}