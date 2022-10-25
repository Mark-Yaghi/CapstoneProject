import ApiAuthorzationRoutes from "./components/api-authorization/ApiAuthorizationRoutes";
import { Home } from "./components/Home";
import Company from "./components/Company";
import { FileUpload } from "./components/FileUpload";
import ExpertSolution from "./components/ExpertSolution";
import AddNewClient from "./components/AddNewClient/AddNewClient";
import CompanyDetail from "./components/CompanyDetail";
import EditClient from "./components/EditClient/EditClient";
import { EditClientForm } from "./components/EditClient/EditClientForm";

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
		path: "/editClient/:companyID",
		requireAuth: true,
		element: <EditClientForm />,
	},

	...ApiAuthorzationRoutes,
];

export default AppRoutes;

// index: true,
