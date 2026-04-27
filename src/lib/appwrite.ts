import { Client, Account, Databases, ID, Query } from 'appwrite';

export const client = new Client()
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT ?? 'https://fra.cloud.appwrite.io/v1')
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID ?? '69e62515000e9e781653');

export const account  = new Account(client);
export const databases = new Databases(client);

export const DB_ID              = 'chat-db';
export const MESSAGES_COLLECTION = 'messages';

export { ID, Query };
