import express from 'express';

const router = express.Router();

const BOOKS = [
  { id: 1, title: 'Atomic Habits', description: 'Build better habits', image:'https://www.womantowomanmentoring.org/wp-content/uploads/atomic-habits-cover@8x.png' },
  { id: 2, title: 'Deep Work', description: 'Focus deeply', image:'https://m.media-amazon.com/images/I/61zt25yYrCL.jpg' },
  { id: 3, title: 'Rich Dad Poor Dad', description: 'Money mindset', image:'https://images-cdn.ubuy.co.in/66288ea1a006406b0b219f14-rich-dad-poor-dad-was-die-reichen-ihren.jpg' },
  { id: 4, title: 'Think Like a Monk', description: 'Peaceful life', image:'https://d28hgpri8am2if.cloudfront.net/book_images/onix/cvr9781982134488/think-like-a-monk-9781982134488_hr.jpg' }
];

router.get('/', (req, res) => {
  res.json(BOOKS);
});

router.get('/:id', (req, res) => {
  const book = BOOKS.find(b => b.id == req.params.id);
  res.json(book);
});

export default router;
