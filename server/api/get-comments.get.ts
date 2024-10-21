import express from 'express';
import { PrismaClient } from '@prisma/client';
import verifyToken from './middleware/verifyToken';

const prisma = new PrismaClient();
const router = express.Router();

router.get('/get-comments', verifyToken, async (req, res) => {
  try {
    const comments = await prisma.guestbookEntry.findMany();
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).send('Failed to fetch comments');
  }
});

export default router;