import ApiAuthorzationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import { Home } from "./components/Home";
import { DecreaseCounter } from "./components/DecreaseCounter";
import { FileUpload } from './components/FileUpload';

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/counter',
    element: <Counter />
  },
  {
    path: '/fetch-data',
    requireAuth: true,
    element: <FetchData />
    },
    {
        path: '/decreasecounter',
        requireAuth: true,
        element: <DecreaseCounter />
    },
    {
        path: '/fileupload',
        requireAuth: true,
        element: <FileUpload />
    },
  ...ApiAuthorzationRoutes
];

export default AppRoutes;
