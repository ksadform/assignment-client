import { gql, useMutation, useQuery } from "@apollo/client";
import { apolloClient } from "../../apollo";

const GET_NOTIFICATIONS = gql`
  query GetNotifications($input: GetNotificationInput) {
    getNotifications(input: $input) {
      _id
      name
      type
    }
  }
`;

const CREATE_NOTIFICATION = gql`
  mutation Mutation($input: NotificationInput) {
    createNotification(input: $input) {
      name
      type
    }
  }
`;

export const useNotificationsQuery = () => useQuery(GET_NOTIFICATIONS);
export const useCreateNotificationMutation = () =>
  useMutation(CREATE_NOTIFICATION);

export const getNotificationQuery = (input) =>
  apolloClient.query({ query: GET_NOTIFICATIONS, variables: { input } });
