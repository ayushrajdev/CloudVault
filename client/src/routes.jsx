import { Route } from 'react-router';
import ShowFiles from './features/Home/page';
import IndiviualFile from './features/IndiviualFile/page';


const Routes = () => {
  return (
    <Routes>
      {/* <Route path="/" Component={<ShowFiles />} /> */}
      <Route path="/" Component={<ShowFiles />}>
        <Route path=":id" Component={<IndiviualFile />} />
      </Route>
    </Routes>
  );
}

export default Routes
