import mongoose from 'mongoose';

export const dbConnect = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/trpcdb');
    console.log('Connected to database');
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
};
