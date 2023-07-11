import { trpc } from '../utils/trpc';
import { NoteCard } from './NoteCard';

function NoteList() {
  const { data, isLoading, isError, error } = trpc.note.get.useQuery();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div className='flex flex-wrap justify-center gap-x-2'>
      {data?.map((note: any) => (
        <NoteCard note={note} key={note._id} />
      ))}
    </div>
  );
}

export default NoteList;
