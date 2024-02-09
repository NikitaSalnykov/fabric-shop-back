const { TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID } = process.env;


// Trigger the telegram bot to send a message
async function sendNotification(order) {
  
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    return
  }

  const message = buildMessage(order);
  const telegramApiUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

  const chatIds = [
    TELEGRAM_CHAT_ID,
  ];

  for (const chatId of chatIds) {
    if (chatId) {
      try {
        const response = await fetch(telegramApiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: chatId,
            text: message,
            parse_mode: 'HTML',
            disable_web_page_preview: false,
          }),
        });
        
        if (!response.ok) {
          throw new Error('Failed to send message to Telegram');
        }
      } catch (error) {
        console.error('Error sending message to Telegram:', error);
      }
    }
  }
}


function buildMessage(order) {
	// Build the message to send to telegram
	return `<b>⚡️У нас новый заказ!</b>
  
Только что был оформлен новый заказ, информация о заказе:

<b>Номер заказа: ${order.orderNumber}</b>

1. Имя заказчика: ${order.name} ${order.surname}
3. Имя заказчика: ${order.name} ${order.surname}
4. Телефон: ${order.tel}
5. Способ доставки: ${
  order.delivery !== "" ? order.delivery : "Не указан"
}

Информация о заказе: ${order.info}

<b>💲Общая сумма заказа: ${order.total}</b>

<b>Хорошего дня! ✌️</b>`;
}

module.exports = sendNotification