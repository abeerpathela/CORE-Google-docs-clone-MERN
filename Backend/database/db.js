import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const Connection = async () => {
    const URL = process.env.MONGODB_URI || 'mongodb://localhost:27017/google-docs-clone';

    try {
        await mongoose.connect(URL, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
        console.log('✅ Database connected successfully');
    } catch (error) {
        console.error('❌ Error while connecting to the database:', error.message);
        process.exit(1);
    }
};

export default Connection;