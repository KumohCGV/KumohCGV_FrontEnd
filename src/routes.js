import MainLayout from "components/Main/MainLayout";
import Main from "components/Main/Main"
import AllMovie from "components/AllMovie/AllMovie"
import MovieDetail from "components/MovieDetail/MovieDetail"

const routes = [

	{
		path: "/",
		element: <MainLayout />,
		children: [
			{ path: "/", element: <Main />},
			{ path: "allmovie", element: <AllMovie />},
			{ path: "detail/:id", element: <MovieDetail />} 
		 ],
   
	},

];

export default routes;