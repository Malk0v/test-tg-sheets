const API_URL =
  "https://script.google.com/macros/s/AKfycbxZt3mZZCHNz2tkekAXYHeWKEHcUxFZLAEdsSzEVrkdAYaQs0rxCBkZcs9ZWMmUT9GB/exec";

async function testOrder() {
  const testOrder = {
    name: "Тестовый клиент",

    phone: "+380991234567",

    product: "Тестовый мангал",

    productId: "TEST-001",

    quantity: 1,

    price: 4500,

    delivery: "Новая Почта",

    city: "Одесса",

    branch: "Отделение №25",

    comment: "Это тестовая заявка",
  };

  console.log("Отправляем тестовую заявку...");

  console.log(testOrder);

  try {
    const response = await fetch(API_URL, {
      method: "POST",

      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },

      body: JSON.stringify(testOrder),
    });

    const result = await response.json();

    console.log("Ответ Google Apps Script:", result);

    if (result.success) {
      document.getElementById("result").textContent =
        "✅ Заявка #" + result.orderId + " успешно отправлена!";
    } else {
      document.getElementById("result").textContent =
        "❌ Ошибка: " + result.message;
    }
  } catch (error) {
    console.error("Ошибка:", error);

    document.getElementById("result").textContent =
      "❌ Ошибка соединения: " + error.message;
  }
}
