let userBookings;
const startDayOfWeek = 0;
let date_today = new Date();
let startDate, endDate;

async function userData() {
    try {
        const userIdResponse = await fetch("/api/user/get/userid");
        const usernameResponse = await fetch("/api/user/get/username");

        if (userIdResponse.ok && usernameResponse.ok) {
            const userId = await userIdResponse.text();
            const username = await usernameResponse.text();

            console.log("User ID:", userId);
            console.log("Username:", username);
            return username;
        } else {
            console.error("Error fetching user information.");
            return null;
        }
    } catch (error) {
        console.error("An error occurred:", error);
        return null;
    }
}

async function getAllUserBookings() {
    try {
        const response = await fetch("/api/userbooking/getAll");
        if (response.ok) {
            const userBookings = await response.json();
            return userBookings;
        } else {
            console.error("Error loading user bookings:", response.statusText);
            return null;
        }
    } catch (error) {
        console.error("Error fetching user bookings:", error);
        return null;
    }
}

function displayUserBookings(userBookings, userName) {
    const userBookingsList = document.getElementById("userBookingsList");
    userBookingsList.innerHTML = "";
    userBookings.forEach(userBooking => {
        if (userBooking.userName === userName) {
            const userBookingItem = document.createElement("div");
            userBookingItem.innerText = `ID: ${userBooking.id}, Name: ${userBooking.userName}, Description: ${userBooking.description}, Start: ${userBooking.beginOfBooking}, End: ${userBooking.endOfBooking}`;
            displayDate(userBooking.beginOfBooking);
            userBookingsList.appendChild(userBookingItem);
        }
    });
}

function showBookingForm() {
    const bookingForm = document.getElementById("bookingForm");
    if (bookingForm.style.display === "block")
        bookingForm.style.display = "none";
    else
        bookingForm.style.display = "block";
}

function addUserBookings(userBookings, startOfWeek, endOfWeek) {
    const dayNames = ["Niedziela", "Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota"];
    const columns = document.querySelectorAll(".column");


    userBookings.forEach((booking) => {
        const bookingDate_s = new Date(booking.beginOfBooking);
        const bookingDate_e = new Date(booking.endOfBooking);

        // Check if booking is within the displayed week
        if (bookingDate_s >= startOfWeek && bookingDate_e <= endOfWeek) {
            const dayName = dayNames[bookingDate_s.getDay()];
            const columnIndex = bookingDate_s.getDay();

            const hours_s = bookingDate_s.getHours();
            const minutes_s = bookingDate_s.getMinutes().toString().padStart(2, '0');

            const hours_e = bookingDate_e.getHours();
            const minutes_e = bookingDate_e.getMinutes().toString().padStart(2, '0');
            const bookingDiv = document.createElement("div");
            bookingDiv.classList.add("booking");

            let user = booking.userName.split("@");

            bookingDiv.innerHTML = `${hours_s}:${minutes_s} - ${hours_e}:${minutes_e} <br> ${user[0]}`;

            const tooltipText = document.createElement("p");
            tooltipText.classList.add("tooltip-text");
            tooltipText.textContent = booking.description;
            bookingDiv.appendChild(tooltipText);

            columns[columnIndex].appendChild(bookingDiv);
        }
    });
}


async function saveUserBooking() {
    const usernameResponse = await fetch("/api/user/get/username");
    const user = await usernameResponse.text();

    const description = (document.getElementById("description")).value;
    const beginOfBooking = (document.getElementById("beginOfBooking")).value;
    const endOfBooking = (document.getElementById("endOfBooking")).value;

    if (beginOfBooking > endOfBooking) {
        document.getElementById("result").textContent = "Druga data nie jest późniejsza.";
        return;
    }

    collision = await Collision(new Date(beginOfBooking), new Date(endOfBooking));
    if (collision) {
        document.getElementById("result").textContent = "Termin niedostępny!";
        return;
    }

    if (areDifferentDays(new Date(beginOfBooking), new Date(endOfBooking))) {
        document.getElementById("result").textContent = "Początek i koniec muszą być tego samego dnia!";
        return;
    }

    const userBooking = {
        bookingId: 3,
        userName: user,
        description: description,
        beginOfBooking: new Date(beginOfBooking),
        endOfBooking: new Date(endOfBooking)
    };

    try {
        const response = await fetch("/api/userbooking/save", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userBooking),
        });

        if (response.ok) {
            console.log("User booking saved successfully!");
            // You can perform additional actions here after the category is saved
        } else {
            console.error("Failed to save user booking");
        }
    } catch (error) {
        console.error("An error occurred:", error);
    }

}

async function Collision(beginOfBooking, endOfBooking) {
    const existingBookings = await getAllUserBookings();

    const isFullyContained = existingBookings.some(booking => {
        const existingBegin = new Date(booking.beginOfBooking);
        const existingEnd = new Date(booking.endOfBooking);

        return (
            existingBegin >= beginOfBooking && existingEnd <= endOfBooking
        );
    });

    if (isFullyContained)
        return true;

    const isCollisionAtStart = existingBookings.some(booking => {
        const existingBegin = new Date(booking.beginOfBooking);
        const existingEnd = new Date(booking.endOfBooking);
        return beginOfBooking >= existingBegin && beginOfBooking < existingEnd;
    });

    if (isCollisionAtStart)
        return true;

    const isCollisionAtEnd = existingBookings.some(booking => {
        const existingBegin = new Date(booking.beginOfBooking);
        const existingEnd = new Date(booking.endOfBooking);
        return endOfBooking > existingBegin && endOfBooking <= existingEnd;
    });

    if (isCollisionAtEnd)
        return true;

    return false;
}

function areDifferentDays(startDate, endDate) {
    return (
        startDate.getFullYear() !== endDate.getFullYear() ||
        startDate.getMonth() !== endDate.getMonth() ||
        startDate.getDate() !== endDate.getDate()
    );
}

function loadCurrentWeek(startDate, endDate, date_today) {
    const newStartDate = new Date(date_today);
    newStartDate.setDate(date_today.getDate() - date_today.getDay());
    newStartDate.setHours(0, 0, 0, 0);

    const newEndDate = new Date(date_today);
    newEndDate.setDate(date_today.getDate() - date_today.getDay() + 6);
    newEndDate.setHours(23, 59, 59, 999);

    startDate.setTime(newStartDate.getTime());
    endDate.setTime(newEndDate.getTime());

    const divElement = document.getElementById("daty");
    divElement.textContent = formatDate(startDate) + " - " + formatDate(endDate);
}

function displayDate(dateString) {
    const dateObj = new Date(dateString);

    const year = dateObj.getFullYear();
    const month = dateObj.getMonth() + 1; // Dodaj 1, ponieważ styczeń ma indeks 0
    const day = dateObj.getDate();

    const daysOfWeek = ["Niedziela", "Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota"];
    const dayOfWeek = daysOfWeek[dateObj.getDay()];

    const hours = dateObj.getHours();
    const minutes = dateObj.getMinutes();

    console.log(`Data: ${year}-${month}-${day}`);
    console.log(`Dzień tygodnia: ${dayOfWeek}`);
    console.log(`Czas: ${hours}:${minutes}`);
}

function formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Miesiące są numerowane od 0 do 11
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
}

function getStartOfWeek(date, startDay) {
    const day = date.getDay();
    const diff = (day - startDay + 7) % 7;
    const startDate = new Date(date);
    startDate.setDate(date.getDate() - diff);
    startDate.setHours(0, 0, 0, 0);
    return startDate;
}

function updateWeekDates(date, startDay) {
    startDate = getStartOfWeek(date, startDay);
    endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 6);
    endDate.setHours(23, 59, 59, 999);
}

function updateDisplayedDates() {
    const divElement = document.getElementById("daty");
    divElement.textContent = formatDate(startDate) + " - " + formatDate(endDate);
}

document.getElementById("arrow_left").addEventListener("click", function () {
    date_today.setDate(date_today.getDate() - 7);
    updateWeekDates(date_today, startDayOfWeek);
    clearCalendar();
    addUserBookings(userBookings, startDate, endDate);
    updateDisplayedDates();
});

document.getElementById("arrow_right").addEventListener("click", function () {
    date_today.setDate(date_today.getDate() + 7);
    updateWeekDates(date_today, startDayOfWeek);
    clearCalendar();
    addUserBookings(userBookings, startDate, endDate);
    updateDisplayedDates();
});

function clearCalendar() {
    const columns = document.querySelectorAll(".column");
    columns.forEach(column => {
        while (column.firstChild) {
            column.removeChild(column.firstChild);
        }
    });
}