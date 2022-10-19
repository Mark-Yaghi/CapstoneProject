import ApiAuthorzationRoutes from "./components/api-authorization/ApiAuthorizationRoutes";

import { FetchData } from "./components/FetchData";
import { Home } from "./components/Home";
import { DecreaseCounter } from "./components/DecreaseCounter";
import { Company } from "./components/Company";
import { FileUpload } from "./components/FileUpload";
import ExpertSolution from "./components/ExpertSolution";

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
    {
        path: '/expert-solution',
        requireAuth: true,
        element: <ExpertSolution />
    },

  ...ApiAuthorzationRoutes
	
];

export default AppRoutes;
