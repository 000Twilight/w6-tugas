import { defineEventHandler, getQuery } from 'h3';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const search = typeof query.search === 'string' ? query.search : '';

  if (!search) {
    return { error: 'Search term is required.' };
  }

  try {
    const result = await prisma.guestbookEntry.findMany({
      where: {
        comment: {
          contains: search || '',
        },
      },
    });

    return result;
  } catch (e) {
    console.error('Error executing SQL query:', e);
    return { error: 'Error executing SQL query' };
  }
});

