import { HslSearch } from './components/HslSearch';
import { Home } from './components/Home';

const AppRoutes = [
  {
    index: true,
    element: <Home />,
  },
  {
    path: '/haku',
    element: <HslSearch />,
  },
];

export default AppRoutes;
