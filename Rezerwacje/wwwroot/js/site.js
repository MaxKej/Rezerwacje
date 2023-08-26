// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

//async function saveUserBooking() {
//    const usernameResponse = await fetch("/api/user/get/username");
//    const user = await usernameResponse.text();

//    const description = (document.getElementById("description")).value;
//    const beginOfBooking = (document.getElementById("beginOfBooking")).value;
//    const endOfBooking = (document.getElementById("endOfBooking")).value;

//    const userBooking = {
//        bookingId: 3,
//        userName: user,
//        description: description,
//        beginOfBooking: new Date(beginOfBooking),
//        endOfBooking: new Date(endOfBooking)
//    };

//    try {
//        const response = await fetch("/api/userbooking/save", {
//            method: "POST",
//            headers: {
//                "Content-Type": "application/json",
//            },
//            body: JSON.stringify(userBooking),
//        });

//        if (response.ok) {
//            console.log("User booking saved successfully!");
//            // You can perform additional actions here after the category is saved
//        } else {
//            console.error("Failed to save user booking");
//        }
//    } catch (error) {
//        console.error("An error occurred:", error);
//    }

//}

//async function getAllUserBookings() {
//    try {
//        const response = await fetch("/api/userbooking/getAll");
//        if (response.ok) {
//            const userBookings = await response.json();
//            displayUserBookings(userBookings);
//        } else {
//            console.error("Error loading categories:", response.statusText);
//        }
//    } catch (error) {
//        console.error("Error fetching categories:", error);
//    }
//}

//function displayUserBookings(userBookings) {
//    const userBookingsList = document.getElementById("userBookingsList");
//    userBookingsList.innerHTML = "";
//    userBookings.forEach(userBooking => {
//        const userBookingItem = document.createElement("div");
//        userBookingItem.innerText = `ID: ${userBooking.id}, Name: ${userBooking.userName}, Description: ${userBooking.description}, Start: ${userBooking.beginOfBooking}, End: ${userBooking.endOfBooking}`;
//        userBookingsList.appendChild(userBookingItem);
//    });
//}


async function saveCategory() {
    const category = {
        name: "Example Category",
        bookings: [],
    };
    console.log("started fetch")
    try {
        const response = await fetch("/api/category/save", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(category),
        });
        if (response.ok) {
            console.log("Category saved successfully!");
            // You can perform additional actions here after the category is saved
        } else {
            console.error("Failed to save category");
        }
    } catch (error) {
        console.error("An error occurred:", error);
    }
}
async function deleteCategory() {
    const categoryId = 1001; // Replace with the actual ID of the category you want to delete
    try {
        const response = await fetch(`/api/category/delete/${categoryId}`, {
            method: "DELETE",
        });
        if (response.ok) {
            console.log("Category deleted successfully!");
            // You can perform additional actions here after the category is deleted
        } else if (response.status === 404) {
            console.error("Category not found");
        } else {
            console.error("Failed to delete category");
        }
    } catch (error) {
        console.error("An error occurred:", error);
    }
}
function getCategoryByID() {
    const categoryDisplay = document.getElementById("categoryDisplay");
    const categoryIdElement = document.getElementById("categoryId");
    const categoryNameElement = document.getElementById("categoryName");
    (async () => {
        try {
            const categoryId = 1; // Change this to the desired category ID
            const response = await fetch(`/api/category/get/${categoryId}`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const category = await response.json(); // Assuming Category is the interface
            console.log(category.id);
            console.log(category.name);
            // Update the display with the retrieved category
            categoryIdElement.textContent = String(category.id);
            categoryNameElement.textContent = category.name;
            categoryDisplay.style.display = "block"; // Show the display area
        } catch (error) {
            console.error("Error fetching category:", error);
        }
    })();
}
// Fetch categories from the API
async function fetchAllCategories() {
    try {
        const response = await fetch("/api/category/getAll");
        if (response.ok) {
            const categories = await response.json();
            displayCategories(categories);
        } else {
            console.error("Error loading categories:", response.statusText);
        }
    } catch (error) {
        console.error("Error fetching categories:", error);
    }
}
// Display categories in the categoryList element
function displayCategories(categories) {
    const categoryList = document.getElementById("categoryList");
    categoryList.innerHTML = "";
    categories.forEach(category => {
        const categoryItem = document.createElement("div");
        categoryItem.innerText = `ID: ${category.id}, Name: ${category.name}`;
        categoryList.appendChild(categoryItem);
    });
}


async function saveBooking() {
    const booking = {
        name: "Example Category",
        categoryId: 2,
        userBookings: [],
    };
    console.log("started fetch")
    try {
        const response = await fetch("/api/booking/save", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(booking),
        });
        if (response.ok) {
            console.log("Booking saved successfully!");
            // You can perform additional actions here after the category is saved
        } else {
            console.error("Failed to save Booking");
        }
    } catch (error) {
        console.error("An error occurred:", error);
    }
}
async function deleteBooking() {
    const bookingId = 1001;
    try {
        const response = await fetch(`/api/booking/delete/${bookingId}`, {
            method: "DELETE",
        });
        if (response.ok) {
            console.log("Booking deleted successfully!");
        } else if (response.status === 404) {
            console.error("Booking not found");
        } else {
            console.error("Failed to delete category");
        }
    } catch (error) {
        console.error("An error occurred:", error);
    }
}


function getBooking() {
    const bookingDisplay = document.getElementById("bookingDisplay");
    const bookingIdElement = document.getElementById("bookingId");
    const bookingNameElement = document.getElementById("bookingName");
    const bookingCategoryIDElement = document.getElementById("bookingCategoryID");
    (async () => {
        try {
            const bookingId = 1; // Change this to the desired category ID
            const response = await fetch(`/api/booking/get/${bookingId}`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const booking = await response.json(); // Assuming Category is the interface
            console.log(booking.id);
            console.log(booking.name);
            // Update the display with the retrieved category
            bookingIdElement.textContent = String(booking.id);
            bookingNameElement.textContent = booking.name;
            bookingCategoryIDElement.textContent = String(booking.categoryId);
            bookingDisplay.style.display = "block"; // Show the display area
        } catch (error) {
            console.error("Error fetching category:", error);
        }
    })();
}
async function fetchAllBookings() {
    try {
        const response = await fetch("/api/booking/getAll");
        if (response.ok) {
            const bookings = await response.json();
            displayBookings(bookings);
        } else {
            console.error("Error loading bookings:", response.statusText);
        }
    } catch (error) {
        console.error("Error fetching bookings:", error);
    }
}
function displayBookings(bookings) {
    const bookingList = document.getElementById("bookingList");
    bookingList.innerHTML = "";
    bookings.forEach(booking => {
        const bookingItem = document.createElement("div");
        bookingItem.innerText = `ID: ${booking.id}, Name: ${booking.name}, Category ID: ${booking.categoryId}`;
        bookingList.appendChild(bookingItem);
    });
    //const fieldNames = Object.keys(bookings[0]);
    //// Print the field names
    //console.log("Field names:", fieldNames);
}