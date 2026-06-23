import mongoose from "mongoose";

export interface PaymentEventDocument {
  eventKey: string;
  event: string;
  reference?: string;
  transactionId?: string;
  status?: string;
  payload: unknown;
  processedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const paymentEventSchema =
  new mongoose.Schema<PaymentEventDocument>(
    {
      eventKey: {
        type: String,
        required: true,
        unique: true,
      },

      event: {
        type: String,
        required: true,
      },

      reference: {
        type: String,
        default: null,
        index: true,
      },

      transactionId: {
        type: String,
        default: null,
      },

      status: {
        type: String,
        default: null,
      },

      payload: {
        type:
          mongoose.Schema.Types.Mixed,
        required: true,
      },

      processedAt: {
        type: Date,
        default:
          Date.now,
      },
    },
    {
      timestamps: true,
    }
  );

export default mongoose.model(
  "PaymentEvent",
  paymentEventSchema
);
