import { Client, Account, Databases, ID, Query } from 'appwrite';

const endpoint  = import.meta.env.VITE_APPWRITE_ENDPOINT  as string | undefined;
const projectId = import.meta.env.VITE_APPWRITE_PROJECT_ID as string | undefined;

if (!endpoint || !projectId) {
  console.warn(
    'Missing VITE_APPWRITE_ENDPOINT or VITE_APPWRITE_PROJECT_ID. ' +
    'Create a .env.local file — see README.md for details.',
  );
}

export const client = new Client()
  .setEndpoint(endpoint ?? 'https://cloud.appwrite.io/v1')
  .setProject(projectId ?? '');

export const account  = new Account(client);
export const databases = new Databases(client);

export const DB_ID              = 'chat-db';
export const MESSAGES_COLLECTION = 'messages';

export { ID, Query };
