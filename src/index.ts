import app from './app';
import { dbConnect } from './db/db';

dbConnect();
app.listen(3000, () => {
  console.log('Server running on port 3000');
});
