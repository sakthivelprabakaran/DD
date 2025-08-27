// src/services/NotificationService.js
// This service simulates the handling of in-app and push notifications.
// In a real application, this would interface with a service like
// Firebase Cloud Messaging (FCM) or Apple Push Notification service (APNs).

class NotificationService {
  /**
   * Triggers a notification for a specific user and event type.
   * @param {string} userId - The ID of the user who should receive the notification.
   * @param {'NEW_FOLLOWER' | 'NEW_LIKE' | 'NEW_COMMENT' | 'BOOKING_CONFIRMATION' | 'SESSION_REMINDER' | 'BOOKING_CANCELLATION'} type - The type of notification.
   * @param {object} data - The data payload associated with the notification (e.g., who liked the post).
   * @returns {Promise<{ success: boolean }>}
   */
  static triggerNotification(userId, type, data) {
    const message = this.getNotificationMessage(type, data);
    console.log(`-- NOTIFICATION --`);
    console.log(`To: User ${userId}`);
    console.log(`Type: ${type}`);
    console.log(`Message: "${message}"`);
    console.log(`------------------`);

    // In a real app, this function would:
    // 1. Send a push notification to the user's device via a backend service.
    // 2. Add a notification record to the user's notification list in the database.
    return Promise.resolve({ success: true });
  }

  /**
   * Fetches the list of historical notifications for a user.
   * @param {string} userId - The ID of the user whose notifications are being fetched.
   * @returns {Promise<{ notifications: Array }>}
   */
  static getNotifications(userId) {
    console.log(`Fetching notification history for user ${userId}`);
    const mockNotifications = [
      { id: 'notif_1', type: 'BOOKING_CONFIRMATION', text: 'Your session with GadgetGuru is confirmed for Nov 10.', timestamp: '1 day ago', read: false },
      { id: 'notif_2', type: 'NEW_FOLLOWER', text: 'TechFan started following you.', timestamp: '2 days ago', read: false },
      { id: 'notif_3', type: 'NEW_COMMENT', text: 'ReplyGuy commented on your post "Exploring the new M3 MacBook Air".', timestamp: '2 days ago', read: true },
      { id: 'notif_4', type: 'NEW_LIKE', text: 'JaneDoe liked your post "Exploring the new M3 MacBook Air".', timestamp: '3 days ago', read: true },
    ];
    return Promise.resolve({ notifications: mockNotifications });
  }

  /**
   * Helper to generate a human-readable message.
   */
  static getNotificationMessage(type, data) {
    switch(type) {
      case 'NEW_FOLLOWER': return `${data.followerName} started following you.`;
      case 'NEW_LIKE': return `${data.likerName} liked your post: "${data.postTitle}"`;
      case 'NEW_COMMENT': return `${data.commenterName} commented on your post: "${data.postTitle}"`;
      case 'BOOKING_CONFIRMATION': return `Your session with ${data.authorName} is confirmed!`;
      case 'SESSION_REMINDER': return `Your session with ${data.authorName} starts in 15 minutes.`;
      case 'BOOKING_CANCELLATION': return `Your session with ${data.authorName} has been cancelled.`;
      default: return 'You have a new notification.';
    }
  }
}

export default NotificationService;
