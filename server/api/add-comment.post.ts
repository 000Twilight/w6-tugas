import express from 'express';
import { PrismaClient } from '@prisma/client';
import verifyToken from './middleware/verifyToken';

const prisma = new PrismaClient();
const router = express.Router();

router.post('/add-comment', verifyToken, async (req, res) => {
  const { name, email, comment } = req.body;

  try {
    await prisma.guestbookEntry.create({
      data: {
        name,
        email,
        comment
      },
    });

    res.status(200).send('Comment added successfully');
  } catch (error) {
    res.status(500).send('Failed to add comment');
  }
});

export default router;