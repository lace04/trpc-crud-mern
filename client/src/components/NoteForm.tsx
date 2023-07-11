import { ChangeEvent, FormEvent, useState } from 'react';
import { trpc } from '../utils/trpc';

function NoteForm() {
  const [note, setNote] = useState({
    title: '',
    description: '',
  });

  const addNote = trpc.note.create.useMutation();
  const utils = trpc.useContext();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addNote.mutate(note, {
      onSuccess: () => {
        utils.note.get.invalidate();
        setNote({
          title: '',
          description: '',
        });
      },
    });
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div className='flex justify-center items-center h-full'>
      <div className='w-full max-w-md'>
        <h1 className='text-2xl font-bold text-white m-5 text-center'>
          Create Task
        </h1>
        <form onSubmit={handleSubmit} className='bg-zinc-800 rounded-md p-4'>
          <label className='text-white font-bold text-xl mb-2 block w-full'>
            Title
          </label>
          <input
            type='text'
            placeholder='Write a title'
            name='title'
            autoFocus
            className='text-white bg-zinc-700 py-2 px-3 rounded-md w-full'
            onChange={handleChange}
          />

          <label className='text-white font-bold text-xl mb-2 mt-4 block'>
            Description
          </label>
          <textarea
            name='description'
            rows={3}
            placeholder='Write a description'
            className='text-white bg-zinc-700 py-2 px-3 rounded-md w-full'
            onChange={handleChange}
          />

          <button
            type='submit'
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded block w-full mt-4'
          >
            Create Note
          </button>
        </form>
      </div>
    </div>
  );
}

export default NoteForm;
