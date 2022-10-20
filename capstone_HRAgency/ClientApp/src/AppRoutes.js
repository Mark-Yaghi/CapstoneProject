import ApiAuthorzationRoutes from "./components/api-authorization/ApiAuthorizationRoutes";

import { FetchData } from "./components/FetchData";
import { Home } from "./components/Home";
import { DecreaseCounter } from "./components/DecreaseCounter";
import { FileUpload } from "./components/FileUpload";
import ExpertSolution from "./components/ExpertSolution";
import AddNewClient from "./components/AddNewClient/AddNewClient";
import Company from "./components/Company";
import CompanyDetail from "./components/CompanyDetail";

const AppRoutes = [
	{
		path: "/",
		requireAuth: true,
		element: <Home />,
	},

	{
		path: "/fetch-data",
		requireAuth: true,
		element: <FetchData />,
	},
	{
		path: "/decreasecounter",
		requireAuth: true,
		element: <DecreaseCounter />,
	},
	{
		path: "/company",
		requireAuth: true,
		element: <Company />,
	},
	{
		path: "/companyDetail/:companyID",
		requireAuth: true,
		element: <CompanyDetail />,
	},
	{
		path: "/fileupload",
		requireAuth: true,
		element: <FileUpload />,
	},
	{
		path: "/expert-solution",
		requireAuth: true,
		element: <ExpertSolution />,
	},
	{
		path: "/addClient",
		requireAuth: true,
		element: <AddNewClient />,
	},

	...ApiAuthorzationRoutes,
];

export default AppRoutes;

// index: true,
