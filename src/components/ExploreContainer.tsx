import {
	IonCard,
	IonCardContent,
	IonCardHeader,
	IonCardSubtitle,
	IonCol,
	IonGrid,
	IonHeader,
	IonImg,
	IonProgressBar,
	IonRow,
	IonTitle,
	IonToolbar,
} from "@ionic/react";
import { API } from "aws-amplify";
import React from "react";
import * as queries from "../graphql/queries";
import "./ExploreContainer.css";
interface ExploreContainerProps {
	searchTerm: string;
}
interface ExploreContainerState {
	data: any;
	isLoaded: Boolean;
}

class ExploreContainer extends React.Component<
	ExploreContainerProps,
	ExploreContainerState
> {
	groupedData: any;
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
			let posts = allTodos.data.listTodos.items;

			let group = posts.reduce((r: any, a: any) => {
				r[a.number] = [...(r[a.number] || []), a];
				return r;
			}, {});
			var result = Object.keys(group).map((key) => [Number(key), group[key]]);

			function compare(a: any, b: any) {
				if (a[1][0].createdAt > b[1][0].createdAt) {
					return -1;
				}
				if (a[1][0].createdAt < b[1][0].createdAt) {
					return 1;
				}
				return 0;
			}

			result.sort(compare);
			this.setState({ data: result, isLoaded: true });
			/* 
			const map: Array<any> = [];
			this.state.data.forEach((element: any) => {
				const { key, value } = element;
				if (map[key]) {
					map[key].push(value);
				} else {
					map[key] = [value];
				}
			});
			console.log("MAP: ",map); */
			/* this.groupBy(this.state.data, this.state.data.number);
			console.log(this.state.data);
	 */
		} catch {
			console.log("Error");
		}
	}

	/* groupBy = (objectArray: any, ...properties: any) => {
		return [
			...Object.values(
				objectArray.reduce((accumulator:any, object:any) => {
					const key = JSON.stringify(properties.map((x: number) => object[x] || null));

					if (!accumulator[key]) {
						accumulator[key] = [];
					}
					accumulator[key].push(object);
					return accumulator;
				}, {})
			),
		];
 */
	/* 	 groupBy = function(data: any, key: any) { // `data` is an array of objects, `key` is the key (or property accessor) to group by
	// reduce runs this anonymous function on each element of `data` (the `item` parameter,
	// returning the `storage` parameter at the end
	return data.reduce(function(storage: any, item: any) {
	  // get the first instance of the key by which we're grouping
	  var group = item[key];
	  // set `storage` for this instance of group to the outer scope (if not empty) or initialize it
	  storage[group] = storage[group] || [];
	  // add this item to its group within `storage`
	  storage[group].push(item);
	  // return the updated storage to the reduce function, which will then loop through the next 
	  
	  return storage; 
	}, {}); // {} is the initial value of the storage 
	};
 */
	render() {
		if (this.state.isLoaded) {
			if (!this.props.searchTerm) {
				return (
					<IonGrid>
						{
							/* this.state.data.sort((_el1: any, _el2: any) =>
							_el1.createdAt > _el2.createdAt
								? -1
								: _el1.createdAt < _el2.createdAt
								? 1
								: 0
						) &&
							// this.groupBy(this.state.data,'createdAt')
							// && */
							this.state.data.map((_element: any, index: number) => {
								return (
									<div key={index}>
										<IonHeader>
											<IonToolbar>
												<IonTitle className="order-title">
													{_element[1][0].number}
												</IonTitle>
												<IonCardSubtitle className="order-subtitle-person">
													{_element[1][0].person}
												</IonCardSubtitle>
												<IonCardSubtitle className="order-subtitle">
													{_element[1][0].description}
												</IonCardSubtitle>
											</IonToolbar>
										</IonHeader>

										<IonRow className="card-row">
											{" "}
											{_element[1].map((_el: any, index: number) => {
												return (
													<IonCol key={index} className="column">
														<IonCard className="card">
															<IonCardHeader>
																<IonCardSubtitle>
																	{new Date(_el.createdAt).toUTCString()}
																</IonCardSubtitle>
															</IonCardHeader>

															<IonCardContent className="content">
																<IonImg
																	className="image"
																	src={
																		"https://s3-eu-central-1.amazonaws.com/" +
																		_el.file.bucket +
																		"/public/" +
																		_el.file.key
																	}
																/>
															</IonCardContent>
														</IonCard>
													</IonCol>
												);
											})}
										</IonRow>
									</div>
								);
							})
						}
					</IonGrid>
				);
			} else {
				const result = this.state.data.filter((_element: any) =>
					_element[1][0].number.includes(this.props.searchTerm)
				);

				return (
					<IonGrid>
						{
							/* this.state.data.sort((_el1: any, _el2: any) =>
							_el1.createdAt > _el2.createdAt
								? -1
								: _el1.createdAt < _el2.createdAt
								? 1
								: 0
						) &&
							// this.groupBy(this.state.data,'createdAt')
							// && */
							result.map((_element: any, index: number) => {
								return (
									<div key={index}>
										<IonHeader>
											<IonToolbar>
												<IonTitle className="order-title">
													{_element[1][0].number}
												</IonTitle>
												<IonCardSubtitle className="order-subtitle-person">
													{_element[1][0].person}
												</IonCardSubtitle>
												<IonCardSubtitle className="order-subtitle">
													{_element[1][0].description}
												</IonCardSubtitle>
											</IonToolbar>
										</IonHeader>

										<IonRow className="card-row">
											{" "}
											{_element[1].map((_el: any) => {
												return (
													<IonCol className="column">
														<IonCard className="card">
															<IonCardHeader>
																<IonCardSubtitle>
																	{new Date(_el.createdAt).toUTCString()}
																</IonCardSubtitle>
															</IonCardHeader>

															<IonCardContent className="content">
																<IonImg
																	className="image"
																	src={
																		"https://s3-eu-central-1.amazonaws.com/" +
																		_el.file.bucket +
																		"/public/" +
																		_el.file.key
																	}
																/>
															</IonCardContent>
														</IonCard>
													</IonCol>
												);
											})}
										</IonRow>
									</div>
								);
							})
						}
					</IonGrid>
				);
			}
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
