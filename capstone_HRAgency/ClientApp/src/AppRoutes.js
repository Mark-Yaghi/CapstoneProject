import ApiAuthorzationRoutes from "./components/api-authorization/ApiAuthorizationRoutes";
import { Home } from "./components/Home";
import { DecreaseCounter } from "./components/DecreaseCounter";
import { Company } from "./components/Company";
import { FileUpload } from "./components/FileUpload";
import ExpertSolution from "./components/ExpertSolution";
import AddNewClient from "./components/AddNewClient/AddNewClient";
import Company from "./components/Company";
import CompanyDetail from "./components/CompanyDetail";
import EditClient from "./components/EditClient/EditClient";

const AppRoutes = [
	{
		path: "/",
		requireAuth: true,
		element: <Home />,
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
	{
		path: "/editClient",
		requireAuth: true,
		element: <EditClient />,
	},

	...ApiAuthorzationRoutes,
];

export default AppRoutes;

// index: true,
