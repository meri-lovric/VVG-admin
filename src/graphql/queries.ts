/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getReport = /* GraphQL */ `
  query GetReport($id: ID!) {
    getReport(id: $id) {
      id
      number
      person
      file {
        bucket
        region
        key
      }
      description
      createdAt
      updatedAt
    }
  }
`;
export const listReports = /* GraphQL */ `
  query ListReports(
    $filter: ModelReportFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listReports(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        number
        person
        file {
          bucket
          region
          key
        }
        description
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;

export const recentReports = `
query MyQuery($today: String!, $before: String!, $limit: Int) {
  listReports(filter: {updatedAt: { between: [$before, $today]}}, limit: $limit) {
    items {
      number
      description
      person
      updatedAt
    }
  }
}`;
