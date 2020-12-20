import {
	IonContent,
	IonHeader,
	IonPage,
	IonSearchbar,
	IonTitle,
	IonToolbar,
} from "@ionic/react";
import React, { useState } from "react";
import ExploreContainer from "../components/ExploreContainer";
import "./Home.css";
import logo from "../assets/vvg-logo.png";
const Home: React.FC = () => {
	const [searchText, setSearchText] = useState("");
	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle>
						{" "}
						<div className="header-content">
							<img className="logo" src={logo} alt="logo"></img>VVG Admin
						</div>
					</IonTitle>
				</IonToolbar>
				<IonSearchbar
					type="number"
					placeholder="Pretraži radne naloge"
					value={searchText}
					onIonChange={(e) => {
						setSearchText(e.detail.value!);
					}}
					showCancelButton="focus"
				></IonSearchbar>
			</IonHeader>
			<IonContent fullscreen>
				<ExploreContainer searchTerm={searchText} />
			</IonContent>
		</IonPage>
	);
};

export default Home;
