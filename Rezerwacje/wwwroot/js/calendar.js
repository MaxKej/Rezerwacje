async function getAllUserBookings() {
    try {
        const response = await fetch("/api/userbooking/getAll");
        if (response.ok) {
            const userBookings = await response.json();
            displayUserBookings(userBookings);
            addUserBookings(userBookings);
        } else {
            console.error("Error loading user bookings:", response.statusText);
        }
    } catch (error) {
        console.error("Error fetching user bookings:", error);
    }
}

function displayUserBookings(userBookings) {
    const userBookingsList = document.getElementById("userBookingsList");
    userBookingsList.innerHTML = "";
    userBookings.forEach(userBooking => {
        const userBookingItem = document.createElement("div");
        userBookingItem.innerText = `ID: ${userBooking.id}, Name: ${userBooking.userName}, Description: ${userBooking.description}, Start: ${userBooking.beginOfBooking}, End: ${userBooking.endOfBooking}`;
        displayDate(userBooking.beginOfBooking);
        userBookingsList.appendChild(userBookingItem);
    });
}

function addUserBookings(userBookings) {
    const dayNames = ["Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota", "Niedziela"];
    const columns = document.querySelectorAll(".column");

    userBookings.forEach((booking, index) => {
        const bookingDate_s = new Date(booking.beginOfBooking);
        const bookingDate_e = new Date(booking.endOfBooking);
        const dayName = dayNames[bookingDate_s.getDay()];
        const columnIndex = bookingDate_s.getDay();

        const hours_s = bookingDate_s.getHours();
        const minutes_s = bookingDate_s.getMinutes().toString().padStart(2, '0');

        const hours_e = bookingDate_e.getHours();
        const minutes_e = bookingDate_e.getMinutes().toString().padStart(2, '0');

        const bookingDiv = document.createElement("div");
        bookingDiv.classList.add("booking");
        bookingDiv.innerHTML = `${hours_s}:${minutes_s} - ${hours_e}:${minutes_e} <br> ${booking.username}`;

        const tooltipText = document.createElement("p");
        tooltipText.classList.add("tooltip-text");
        tooltipText.textContent = booking.description;
        bookingDiv.appendChild(tooltipText);

        if (index === 0) {
            columns[columnIndex].prepend(bookingDiv);
        } else {
            columns[columnIndex].appendChild(bookingDiv);
        }
    });
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

document.addEventListener("DOMContentLoaded", (event) => {
    getAllUserBookings();
});
