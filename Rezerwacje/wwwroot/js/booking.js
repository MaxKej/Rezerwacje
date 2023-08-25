//import { Booking, BookingSave } from './app';
//async function saveBooking() {
//    const booking: BookingSave = {
//        name: "Example Category",
//        categoryId: 2,
//        userBookings: [],
//    };
//    console.log("started fetch")
//    try {
//        const response = await fetch("/api/booking/save", {
//            method: "POST",
//            headers: {
//                "Content-Type": "application/json",
//            },
//            body: JSON.stringify(booking),
//        });
//        if (response.ok) {
//            console.log("Booking saved successfully!");
//            // You can perform additional actions here after the category is saved
//        } else {
//            console.error("Failed to save Booking");
//        }
//    } catch (error) {
//        console.error("An error occurred:", error);
//    }
//}
//async function deleteBooking() {
//    const bookingId = 1001;
//    try {
//        const response = await fetch(`/api/booking/delete/${bookingId}`, {
//            method: "DELETE",
//        });
//        if (response.ok) {
//            console.log("Booking deleted successfully!");
//        } else if (response.status === 404) {
//            console.error("Booking not found");
//        } else {
//            console.error("Failed to delete category");
//        }
//    } catch (error) {
//        console.error("An error occurred:", error);
//    }
//}
//function onLoadBookingsClick() {
//    fetchAllBookings();
//}
//function getBookingByID() {
//    const bookingDisplay = document.getElementById("bookingDisplay");
//    const bookingIdElement = document.getElementById("bookingId");
//    const bookingNameElement = document.getElementById("bookingName");
//    const bookingCategoryIDElement = document.getElementById("bookingCategoryID");
//    (async () => {
//        try {
//            const bookingId = 1; // Change this to the desired category ID
//            const response = await fetch(`/api/booking/get/${bookingId}`);
//            if (!response.ok) {
//                throw new Error(`HTTP error! Status: ${response.status}`);
//            }
//            const booking: Booking = await response.json(); // Assuming Category is the interface
//            console.log(booking.id);
//            console.log(booking.name);
//            // Update the display with the retrieved category
//            bookingIdElement.textContent = String(booking.id);
//            bookingNameElement.textContent = booking.name;
//            bookingCategoryIDElement.textContent = String(booking.categoryId);
//            bookingDisplay.style.display = "block"; // Show the display area
//        } catch (error) {
//            console.error("Error fetching category:", error);
//        }
//    })();
//}
//async function fetchAllBookings() {
//    try {
//        const response = await fetch("/api/booking/getAll");
//        if (response.ok) {
//            const bookings = await response.json();
//            displayBookings(bookings);
//        } else {
//            console.error("Error loading bookings:", response.statusText);
//        }
//    } catch (error) {
//        console.error("Error fetching bookings:", error);
//    }
//}
//function displayBookings(bookings) {
//    const bookingList = document.getElementById("bookingList");
//    bookingList.innerHTML = "";
//    bookings.forEach(booking => {
//        const bookingItem = document.createElement("div");
//        bookingItem.innerText = `ID: ${booking.id}, Name: ${booking.name}, Category ID: ${booking.categoryId}`;
//        bookingList.appendChild(bookingItem);
//    });
//    //const fieldNames = Object.keys(bookings[0]);
//    //// Print the field names
//    //console.log("Field names:", fieldNames);
//}
//# sourceMappingURL=booking.js.map