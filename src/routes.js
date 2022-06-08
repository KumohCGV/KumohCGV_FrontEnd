import MainLayout from "components/Main/MainLayout";
import Main from "components/Main/main"
import AllMovie from "components/AllMovie/AllMovie"

const routes = [

	{
		path: "/",
		element: <MainLayout />,
		children: [
			{ path: "/", element: <Main />},
			{ path: "allmovie", element: <AllMovie />} 
		 ],
   
	},

];

export default routes;