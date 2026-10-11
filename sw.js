self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const action = event.action || 'normal';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        client.postMessage({ action: action });
        client.focus();
        break;
      }
    })
  );
});
