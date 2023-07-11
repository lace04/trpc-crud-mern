import { useState } from 'react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { trpc } from './utils/trpc';
import { httpBatchLink } from '@trpc/client';
import NoteList from './components/NotesList';
import NoteForm from './components/NoteForm';

function App() {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() => {
    return trpc.createClient({
      links: [
        httpBatchLink({
          url: 'http://localhost:3000/trpc',
        }),
      ],
    });
  });
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <NoteForm />
        <NoteList />
      </QueryClientProvider>
    </trpc.Provider>
  );
}

export default App;
