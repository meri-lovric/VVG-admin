import React from "react";
import "./ExploreContainer.css";
import { API } from "aws-amplify";
import * as queries from "../graphql/queries";
import {
	IonCard,
	IonCardContent,
	IonCardHeader,
	IonCardSubtitle,
	IonCardTitle,
	IonCol,
	IonGrid,
	IonImg,
	IonProgressBar,
	IonRow,
} from "@ionic/react";
interface ExploreContainerProps {}
interface ExploreContainerState {
	data: any;
	isLoaded: Boolean;
}

class ExploreContainer extends React.Component<{}, ExploreContainerState> {
	constructor(props: any) {
		super(props);
		this.state = {
			data: [],
			isLoaded: false,
		};
	}
	async componentDidMount() {
		try {
			let allTodos = await API.graphql({ query: queries.listTodos });
			// @ts-ignore
			this.setState({ data: allTodos.data.listTodos.items, isLoaded: true });
			console.log(this.state.data);
		} catch {
			console.log("Error");
		}
	}
	render() {
		if (this.state.isLoaded) {
			return (
				<IonGrid>
					<IonRow>
						{this.state.data.map((_element: any) => {
							return (
								<>
									<IonCol size="4">
										<IonCard>
											<IonCardHeader>
												<IonCardSubtitle>
													{new Date(_element.createdAt).toUTCString()}
												</IonCardSubtitle>
												<IonCardTitle>
													<b>{_element.number}</b>
												</IonCardTitle>
											</IonCardHeader>

											<IonCardContent className="content">
												<IonImg
												className="image"
													src={
														"https://s3-eu-central-1.amazonaws.com/" +
														_element.file.bucket +
														"/" +
														_element.file.key
													}
												/>
											</IonCardContent>
										</IonCard>
									</IonCol>
								</>
							);
						})}
					</IonRow>
				</IonGrid>
			);
		} else {
			return (
				<div>
					{" "}
					<IonProgressBar type="indeterminate" reversed={true}></IonProgressBar>
					<br />
				</div>
			);
		}
	}
}

export default ExploreContainer;
