import ApiAuthorzationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import { Home } from "./components/Home";
import { DecreaseCounter } from "./components/DecreaseCounter";
import { Company } from './components/Company';
import { FileUpload } from './components/FileUpload';

const AppRoutes = [
  {
    index: true,
    element: <Home />
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
        path: '/companyinfo',
        requireAuth: true,
        element: <Company />
    },
    {
        path: '/fileupload',
        requireAuth: true,
        element: <FileUpload />
    },
  ...ApiAuthorzationRoutes
];

export default AppRoutes;
