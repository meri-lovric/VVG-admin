import React from 'react';
import { API } from 'aws-amplify';
import * as queries from '../graphql/queries';

const AllPhoto = async () => {
  // Simple query
  const allTodos = await API.graphql({ query: queries.listReports });
  console.log(allTodos); // result: { "data": { "listTodos": { "items": [/* ..... */] } } }

  // Query using a parameter
  const oneTodo = await API.graphql({ query: queries.listReports });
  console.log("Todos", oneTodo);
  return (
    // oneTodo.map(todo =><IonContent>{todo}</IonContent>)
    <div></div>
  );
};
export default AllPhoto;