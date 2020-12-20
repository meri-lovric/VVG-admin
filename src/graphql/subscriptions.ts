/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateTodo = /* GraphQL */ `
  subscription OnCreateTodo {
    onCreateTodo {
      id
      number
      person
      file {
        bucket
        region
        key
      }
      createdAt
      updatedAt
      description
    }
  }
`;
export const onUpdateTodo = /* GraphQL */ `
  subscription OnUpdateTodo {
    onUpdateTodo {
      id
      number
      person
      file {
        bucket
        region
        key
      }
      createdAt
      updatedAt
      description
    }
  }
`;
export const onDeleteTodo = /* GraphQL */ `
  subscription OnDeleteTodo {
    onDeleteTodo {
      id
      number
      person
      file {
        bucket
        region
        key
      }
      createdAt
      updatedAt
      description
    }
  }
`;
