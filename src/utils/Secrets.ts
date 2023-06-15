export const MONGODB_URI = 'mongodb://localhost:27017/typescript';

if (!MONGODB_URI) {
    console.log("No mongo connection string. Set MONGODB_URI environment variable.");
    process.exit(1);
}

export const JWT_SECRET = 'GNnfpvpnBTQVJu4tQD9ZEZt6CldTT5du';

if (!JWT_SECRET) {
    console.log("No JWT secret string. Set JWT_SECRET environment variable.");
    process.exit(1);
}