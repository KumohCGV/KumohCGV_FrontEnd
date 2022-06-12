import MainLayout from "components/Main/MainLayout";
import Main from "components/Main/Main"
import AllMovie from "components/AllMovie/AllMovie"
import SignUp from "components/SignUp/Signup";
import Login from "components/SignIn/Login";
import Info from "components/Mypage/Info";
import Theater from "components/Theaters/Theater";
import Ticket from "components/Tickets/Ticket";
import TicketLayout from "components/Tickets/TicketLayout";
import TicketDetail from "components/Tickets/TicketDetail";
import Step02 from "components/Tickets/seat";
import MovieDetail from "components/MovieDetail/MovieDetail";
import PrivateRoutes from "access/PrivateRoutes";
import isLogin from "access/isLogin";
import AdminScreenPage from "components/AdminPage/AdminPage";

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
	{
		path: "cinema",
		element: <Theater/>
	},
	{
		path: "seats",
		element: <Step02/>
	},
	{
		path: "ticket",
		element: <TicketLayout />,
		children: [
		  { path: "", element: <Ticket /> },
		  { path: "detail", element: <PrivateRoutes user={isLogin()}><TicketDetail /></PrivateRoutes> }
		],
	},
	{
		path: "signup",
		element: <SignUp />
	},
	{
		path: "login",
		element: <Login />
	},
	{
		path: "mypage",
		element: <Info />,
	},
	{
		path: "admin",
		element: <AdminScreenPage />,
		children: [
			{ path: "allmovie", element: <AllMovie />},
			{ path: "detail/:id", element: <MovieDetail />} 
		 ],
   
	},

];

export default routes;