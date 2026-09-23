const API_URL =
  "https://script.google.com/macros/s/AKfycbwr9evtVEBnFAcH4gqO22SRUBqKf7wquERw2zkyWVJUamAraFOTM4EekLR7J7D1DbUx/exec";
const form = document.getElementById("orderForm");

const result = document.getElementById("result");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const button = form.querySelector("button");

  const order = {
    name: document.getElementById("name").value.trim(),

    phone: document.getElementById("phone").value.trim(),

    product: document.getElementById("product").value.trim(),

    productId: "TEST-001",

    quantity: Number(document.getElementById("quantity").value),

    price: Number(document.getElementById("price").value),

    delivery: "Новая Почта",

    city: document.getElementById("city").value.trim(),

    branch: document.getElementById("branch").value.trim(),

    comment: document.getElementById("comment").value.trim(),
  };

  button.disabled = true;

  button.textContent = "Отправляем...";

  result.textContent = "";

  try {
    const response = await fetch(API_URL, {
      method: "POST",

      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },

      body: JSON.stringify(order),
    });

    const data = await response.json();

    if (data.success) {
      result.textContent = "✅ Заказ #" + data.orderId + " отправлен!";

      form.reset();
    } else {
      result.textContent = "❌ " + (data.message || "Ошибка API");
    }
  } catch (error) {
    console.error(error);

    result.textContent = "❌ Ошибка соединения. " + "Смотри Console (F12).";
  }

  button.disabled = false;

  button.textContent = "Отправить тестовый заказ";
});
