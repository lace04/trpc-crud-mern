import { z } from 'zod';
import { publicProcedure, router } from '../trpc';
import Note from '../models/note.model';

const getNotes = publicProcedure.query(async () => {
  const notes = await Note.find();
  return notes;
});

const createNote = publicProcedure
  .input(
    z.object({
      title: z.string().min(1).max(50),
      description: z.string().min(1).max(500),
      done: z.boolean().default(false),
    })
  )
  .mutation(async ({ input }) => {
    const newNote = new Note({
      title: input.title,
      description: input.description,
    });
    await newNote.save();
    return newNote;
  });

const deleteNote = publicProcedure
  .input(z.string())
  .mutation(async ({ input }) => {
    const noteFound = await Note.findByIdAndDelete(input);
    if (!noteFound) throw new Error('Note not found');

    return true;
  });

const toggleDone = publicProcedure
  .input(z.string())
  .mutation(async ({ input }) => {
    try {
      const noteFound = await Note.findById(input);
      if (!noteFound) throw new Error('Note not found');

      noteFound.done = !noteFound.done;
      await noteFound.save();

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  });

export const notesRouter = router({
  get: getNotes,
  create: createNote,
  delete: deleteNote,
  toggleDone,
});
