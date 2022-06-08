import MainLayout from "components/Main/MainLayout";

const routes = [

	{
		path: "/",
		element: <MainLayout />,
		children: [
			// { path: "/", element: <Main />}
		 ],
   
	},

];

export default routes;