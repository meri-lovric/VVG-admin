import {
	IonContent,
	IonHeader,
	IonPage,
	IonTitle,
	IonToolbar,
} from "@ionic/react";
import React from "react";
import ExploreContainer from "../components/ExploreContainer";
import "./Home.css";
import logo from "../assets/vvg-logo.png";
const Home: React.FC = () => {
	return (
		<IonPage>
			<IonHeader>
				<IonToolbar >
				
					<IonTitle>	<div className="header-content"><img className="logo" src={logo} alt="logo"></img>VVG Admin</div></IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen>
				<ExploreContainer />
			</IonContent>
		</IonPage>
	);
};

export default Home;
