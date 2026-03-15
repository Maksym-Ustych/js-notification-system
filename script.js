const notificationsContainer = document.getElementById("notifications");
const buttons = document.querySelectorAll(".btn");
const positionSelect = document.getElementById("positionSelect");

const maxNotifications = 3;

positionSelect.addEventListener("change", function () {
    notificationsContainer.className = "notifications " + positionSelect.value;
});

buttons.forEach(button => {
    button.addEventListener("click", function () {
        const type = button.dataset.type;
        showNotification(type);
    });
});

function showNotification(type) {
    if (notificationsContainer.children.length >= maxNotifications) {
        notificationsContainer.firstElementChild.remove();
    }

    const notification = document.createElement("div");
    notification.classList.add("notification", type);

    let title = "";
    let message = "";

    if (type === "success") {
        title = "Success";
        message = "Операцію успішно виконано.";
    } else if (type === "error") {
        title = "Error";
        message = "Сталася помилка під час виконання дії.";
    } else if (type === "warning") {
        title = "Warning";
        message = "Увага! Перевірте введені дані.";
    } else if (type === "info") {
        title = "Info";
        message = "Інформаційне повідомлення для користувача.";
    }

    notification.innerHTML = `
        <button class="close-btn">&times;</button>
        <div class="notification-title">${title}</div>
        <div class="notification-message">${message}</div>
        <div class="notification-actions">
            <button class="action-btn ok-btn">OK</button>
        </div>
        <div class="progress">
            <div class="progress-bar"></div>
        </div>
    `;

    notificationsContainer.appendChild(notification);

    const closeBtn = notification.querySelector(".close-btn");
    const okBtn = notification.querySelector(".ok-btn");

    closeBtn.addEventListener("click", function () {
        notification.remove();
    });

    okBtn.addEventListener("click", function () {
        alert("Дію підтверджено");
        notification.remove();
    });

    setTimeout(function () {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 4000);
}