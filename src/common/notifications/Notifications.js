import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import axios from "axios";

const PUSH_REGISTRATION_ENDPOINT = 'http://back-b2b-production.sditrmidsj.us-west-2.elasticbeanstalk.com/notification/token';

export default async function registerForPushNotificationsAsync(username) {
  const { status: existingStatus } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  );
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    return;
  }

  const token = await Notifications.getExpoPushTokenAsync();

  axios({
    method: 'post',
    url: PUSH_REGISTRATION_ENDPOINT,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    data: {
      token,
      username,
    }
  });
}
