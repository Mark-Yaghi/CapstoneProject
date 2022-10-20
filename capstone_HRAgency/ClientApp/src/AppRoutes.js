import ApiAuthorzationRoutes from "./components/api-authorization/ApiAuthorizationRoutes";
import { Home } from "./components/Home";
import { Company } from "./components/Company";
import { FileUpload } from "./components/FileUpload";
import ExpertSolution from "./components/ExpertSolution";
import AddNewClient from "./components/AddNewClient/AddNewClient";
import EditClient from "./components/EditClient/EditClient";

const AppRoutes = [
	{
		path: "/",
		requireAuth: true,
		element: <Home />,
	},
	{
		path: "/companyinfo",
		requireAuth: true,
		element: <Company />,
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
