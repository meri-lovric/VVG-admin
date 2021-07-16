import {
  IonButton,
  IonCol,
  IonGrid,
  IonProgressBar,
  IonRow
} from "@ionic/react";
import { API, graphqlOperation } from "aws-amplify";
import React from "react";
import * as queries from "../graphql/queries";
import "./ExploreContainer.css";
interface ExploreContainerProps {
  searchTerm: string;
}
interface ExploreContainerState {
  data: any;
  isLoaded: Boolean;
  rerenderData: any;
}

class ExploreContainer extends React.Component<
  ExploreContainerProps,
  ExploreContainerState
> {
  groupedData: any;
  todos: any;
  constructor(props: any) {
    super(props);
    this.state = {
      data: [],
      isLoaded: false,
      rerenderData: 0
    };
  }

  async componentDidMount() {
    try {
      this.todos = await API.graphql(
        graphqlOperation(queries.recentReports, {
          today: new Date(Date.now() + 24 * 60 * 60 * 1000),
          before: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000),
          limit: 100000
        })
      )

      // @ts-ignore
      let posts = this.todos.data.listReports.items;

      let group = posts.reduce((r: any, a: any) => {
        r[a.number] = [...(r[a.number] || []), a];
        return r;
      }, {});
      var result = Object.keys(group).map((key) => [Number(key), group[key]]);

      function compare(a: any, b: any) {
        if (a[1][0].updatedAt > b[1][0].updatedAt) {
          return -1;
        }
        if (a[1][0].updatedAt < b[1][0].updatedAt) {
          return 1;
        }
        return 0;
      }

      result.sort(compare);

      this.setState({ data: result, isLoaded: true });

    } catch {
      console.log("Error");
    }
  }

  async fetchData() {
    this.setState({ rerenderData: this.state.rerenderData + 1 })
    try {
      this.todos = this.todos = await API.graphql(
        graphqlOperation(queries.recentReports, {
          today: new Date().toLocaleString() + "",
          before: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000),
          limit: 100000
        })
      )

      let posts = this.todos.data.listReports.items;

      let group = posts.reduce((r: any, a: any) => {
        r[a.number] = [...(r[a.number] || []), a];
        return r;
      }, {});
      var result = Object.keys(group).map((key) => [Number(key), group[key]]);

      function compare(a: any, b: any) {
        if (a[1][0].updatedAt > b[1][0].updatedAt) {
          return -1;
        }
        if (a[1][0].updatedAt < b[1][0].updatedAt) {
          return 1;
        }
        return 0;
      }

      result.sort(compare);

      this.setState({ data: result, isLoaded: true });
    } catch {
      console.log("Error");
    }
  }

  toLocal(dateISO: any) {
    let date = new Date(dateISO);
    return (date.toLocaleString('en-GB'));
  }

  render() {
    if (this.state.isLoaded) {
      if (!this.props.searchTerm) {
        return (
          <IonGrid key={this.state.rerenderData}>
            <IonButton
              onClick={() => this.fetchData()}
              className="btn"
            >
              Dohvati
            </IonButton>
            {/* <div>{this.state.rerenderData}</div> */}
            {
              this.state.data.map((_element: any, index: number) => {
                return (
                  <div key={index}>
                    {_element[1][0].description !== '' &&
                      <IonRow class="row-border">
                        <IonCol size="3">
                          <div className="order-title">
                            {_element[1][0].number}
                          </div>
                          <div className="order-subtitle-person">
                            {_element[1][0].person}
                          </div>
                        </IonCol>
                        <IonCol size="2" className="desc ion-hide-md-down">
                          <div className="order-subtitle">
                            {this.toLocal(_element[1][0].updatedAt)}
                          </div>
                        </IonCol>
                        <IonCol size="7" className="desc">
                          <div className="order-subtitle">
                            {_element[1][0].description}
                          </div>
                        </IonCol>
                      </IonRow>}
                  </div>
                );
              })
            }
          </IonGrid >
        );
      } else {
        const result = this.state.data.filter((_element: any) =>
          _element[1][0].number.includes(this.props.searchTerm)
        );

        return (
          <IonGrid key={this.state.data}>
            {
              result.map((_element: any, index: number) => {
                return (
                  <div key={index}>
                    {_element[1][0].description !== '' &&
                      <IonRow class="row-border">
                        <IonCol size="3">
                          <div className="order-title">
                            {_element[1][0].number}
                          </div>
                          <div className="order-subtitle-person">
                            {_element[1][0].person}
                          </div>
                        </IonCol>
                        <IonCol size="2" className="desc ion-hide-md-down">
                          <div className="order-subtitle">
                            {this.toLocal(_element[1][0].updatedAt)}
                          </div>
                        </IonCol>
                        <IonCol size="7" className="desc">
                          <div className="order-subtitle">
                            {_element[1][0].description}
                          </div>
                        </IonCol>
                      </IonRow>}
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
