// import React, {Component} from 'react';
// import PushNotificationIOS from '@react-native-community/push-notification-ios';
// import PushNotification from 'react-native-push-notification';
// import { setGlobalVarAndPersist } from './CommonFunctions';
// import messaging from '@react-native-firebase/messaging';

// export const notificationInit = () => {
//     PushNotification.createChannel(
//         {
//             channelId: 'fcm_FirebaseNotifiction_default_channel',
//             channelName: 'TGI Connect',
//             importance: 4,
//             channelDescription: 'TGI Connect',
//             soundName: 'sampleaudio.wav',
//             playSound: true,
//             vibrate: true
//         },
//         (created) => console.log("created channel", created)
//     );

//     PushNotification.configure({
//         onRegister: function (token) {
//             console.log("TOKEN:", token.token);
//             setGlobalVarAndPersist('PNToken', token.token)
//         },
//         onNotification: function (notification) {
//             console.log("inn onNotification ", notification)
//                 if(notification.userInteraction) {
//                     onClickPushNotification(notification);
//                 }
//             notification.finish(PushNotificationIOS.FetchResult.NoData);
//         },
//         popInitialNotification: true,
//         requestPermissions: true
//     })

//     messaging().onMessage(async message => {
//         console.log("in onMessageListener", message)
//         if(message && message.notification) {
//             showLocalNotification(message.notification)
//         }
//     });

//     // messaging().setBackgroundMessageHandler(async remoteMessage => {
//     //     console.log("inn setBackgroundMessageHandler", remoteMessage)
//     //     showLocalNotification(remoteMessage)
//     //   });

// }

// export const showLocalNotification = (notification) => {
//     if(notification.title) {
//         PushNotification.localNotification({
//             channelId:'fcm_FirebaseNotifiction_default_channel',
//             title: notification.title,
//             message: notification.body,
//             autoCancel: true,
//             priority: "high",
//             // userInfo: notification.data,
//         })
//     }
// }

// export const onClickPushNotification = (notificationData) => {
//     console.log("inn onClickPushNotification", notificationData)
// }
