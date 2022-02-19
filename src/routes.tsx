import ChannelListPage from "pages/channels";
import AddChannelView from "pages/channels/AddChannelView";
import ChannelDetails from "pages/channels/ChannelDetails";
import LoginPage from "pages/login";
import React from "react";
import {
	BrowserRouter as Router,
	Redirect,
	Route,
	Switch,
} from "react-router-dom";
import Frontlayout from "./layouts/Frontlayout";
import HomePage from "./pages";
interface IProp {
	component: React.ElementType;
	layout: React.ElementType;
	path?: string;
	exact?: boolean;
	isAuth?: boolean;
	proctected: boolean;
}

const AppRoutes = ({
	component: Component,
	layout: Layout,
	isAuth,
	proctected,
	...rest
}: IProp) => {
	return (
		<Route
			{...rest}
			render={(props) => {
				if (proctected) {
					if (isAuth) {
						return (
							<Layout>
								<Component {...props} />
							</Layout>
						);
					} else {
						return <Redirect to="/login" />;
					}
				} else {
					return (
						<Layout>
							<Component {...props} />
						</Layout>
					);
				}
			}}
		/>
	);
};

const RouterComp = ({ isAuth }: { isAuth: boolean }) => {
	return (
		<Router>
			<Switch>
				<AppRoutes
					proctected={false}
					path="/"
					component={HomePage}
					exact
					layout={Frontlayout}
					isAuth={isAuth}
				/>
				<AppRoutes
					proctected={true}
					path="/channels"
					component={ChannelListPage}
					exact
					layout={Frontlayout}
					isAuth={isAuth}
				/>
				<AppRoutes
					proctected={true}
					path="/channels/new"
					component={AddChannelView}
					layout={Frontlayout}
					isAuth={isAuth}
				/>
				<AppRoutes
					proctected={true}
					path="/channels/:id"
					component={ChannelDetails}
					exact
					layout={Frontlayout}
					isAuth={isAuth}
				/>
				<AppRoutes
					proctected={true}
					path="/login"
					component={LoginPage}
					layout={Frontlayout}
					isAuth={!isAuth}
				/>
			</Switch>
		</Router>
	);
};

export default RouterComp;
