import mongoose from 'mongoose';

const creditSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    lastUpdated: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

creditSchema.index({ userId: 1 }, { unique: true });

const Credit = mongoose.models.Credit || mongoose.model('Credit', creditSchema);
export default Credit;