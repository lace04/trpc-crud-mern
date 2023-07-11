import { trpc } from '../utils/trpc';

interface NoteCardProps {
  note: {
    _id: string;
    title: string;
    description: string;
    done: boolean;
  };
}

export function NoteCard({ note }: NoteCardProps) {
  const deleteNote = trpc.note.delete.useMutation();
  const toggleDoneNote = trpc.note.toggleDone.useMutation();
  const utils = trpc.useContext();

  const onDeleteNote = () => {
    deleteNote.mutate(note._id, {
      onSuccess(data) {
        if (data) {
          utils.note.get.invalidate();
        }
      },
      onError(error) {
        alert(error.message);
      },
    });
  };

  const onToggleDone = () => {
    toggleDoneNote.mutate(note._id, {
      onSuccess(data) {
        if (data) {
          utils.note.get.invalidate();
        }
      },
    });
  };

  return (
    <div className='bg-zinc-800 rounded-md p-4 mt-8'>
      <h2 className='text-xl font-bold text-center text-white mt-5 sm:text-center'>
        {note.title}
      </h2>
      <p className='text-base font-semibold text-white mt-5'>
        {note.description}
      </p>
      <div className='flex gap-x-1 justify-end'>
        <button
          onClick={() => onDeleteNote()}
          className='bg-zinc-500 hover:bg-zinc-600 text-white font-bold py-1 px-2 text-xs rounded sm:py-1 sm:px-1 sm:text-xs'
        >
          Delete
        </button>
        <button
          onClick={() => onToggleDone()}
          className='bg-zinc-500 hover:bg-zinc-600 text-white font-bold py-1 px-2 text-xs rounded sm:py-1 sm:px-1 sm:text-xs'
        >
          {note.done ? 'Undone' : 'Done'}
        </button>
      </div>
    </div>
  );
}
