import mongoose from 'mongoose';

const subscriptionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    stripeCustomerId: {
      type: String,
      required: true,
    },
    stripeSubscriptionId: {
      type: String,
      required: true,
    },
    stripePriceId: {
      type: String,
      required: true,
    },
    stripeCurrentPeriodEnd: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ['active', 'canceled', 'incomplete', 'incomplete_expired', 'past_due', 'trialing', 'unpaid'],
      required: true,
    },
    plan: {
      type: String,
      enum: ['free','pro', 'Elite'],
      required: true,
    },
  },
  { timestamps: true }
);

subscriptionSchema.index({ userId: 1 }, { unique: true });

const Subscription = mongoose.models.Subscription || mongoose.model('Subscription', subscriptionSchema);
export default Subscription;