// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

function showBookingForm() {
    const bookingForm = document.getElementById("bookingCreationForm");
    if (bookingForm.style.display === "block")
        bookingForm.style.display = "none";
    else
        bookingForm.style.display = "block";
}
function showCategoryForm() {
    const bookingForm = document.getElementById("categoryCreationForm");
    if (bookingForm.style.display === "block")
        bookingForm.style.display = "none";
    else
        bookingForm.style.display = "block";
}

async function saveCategory() {
    const name = (document.getElementById("categoryName")).value;

    const category = {
        name: name,
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
            document.getElementById("categoryCreationForm").reset();
            document.getElementById("categoryResult").textContent = "Dodano rezerwację!";
            document.getElementById("categoryResult").style.color = "green";
        } else {
            console.error("Failed to save category");
        }
    } catch (error) {
        console.error("An error occurred:", error);
    }
}
async function deleteCategory(categoryId) {
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
            return categories;
        } else {
            console.error("Error loading categories:", response.statusText);
            return null;
        }
    } catch (error) {
        console.error("Error fetching categories:", error);
        return null;
    }
}
// Display categories in the categoryList element
function displayCategories(categories) {
    const categoryList = document.getElementById("categoryList");
    categoryList.innerHTML = "";
    categories.forEach(category => {
        const categoryItem = document.createElement("div");
        categoryItem.id = `category-${category.id}`; // Unikalne id kafelka
        console.log(categoryItem.id)

        categoryItem.innerHTML = `${category.name}`;
        categoryItem.style.backgroundColor = "lightgreen";
        categoryItem.classList.add('kafelka');

        categoryItem.addEventListener("click", () => {
            const modal = document.getElementById("categoryModal");
            modal.style.display = "block";

            const confirmButton = document.getElementById("confirmCategoryDelete");
            const cancelButton = document.getElementById("cancelCategoryDelete");

            confirmButton.addEventListener("click", async () => {
                // Pobierz ID rezerwacji z atrybutu data-category-id przycisku Usuń
                const categoryId = categoryItem.id.split("-")[1];

                await deleteCategory(categoryId);
                modal.style.display = "none";
                categoryItem.remove(); // Usuń kafelek po usunięciu
            });

            cancelButton.addEventListener("click", () => {
                modal.style.display = "none";
            });
        });
        categoryList.appendChild(categoryItem);
    });
}


async function saveBooking() {
    const name = (document.getElementById("bookingName")).value;
    console.log(name);
    const booking = {
        name: name,
        categoryId: 2
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
            document.getElementById("bookingCreationForm").reset();
            document.getElementById("bookingResult").textContent = "Dodano rezerwację!";
            document.getElementById("bookingResult").style.color = "green";
        } else {
            console.error("Failed to save Booking");
        }
    } catch (error) {
        console.error("An error occurred:", error);
    }
}
async function deleteBooking(bookingId) {
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
            return bookings;
        } else {
            console.error("Error loading bookings:", response.statusText);
            return null;
        }
    } catch (error) {
        console.error("Error fetching bookings:", error);
        return null;
    }
}
function displayBookings(bookings) {
    const bookingList = document.getElementById("bookingList");
    bookingList.innerHTML = "";
    bookings.forEach(booking => {
        const bookingItem = document.createElement("div");
        bookingItem.id = `booking-${booking.id}`; // Unikalne id kafelka
        console.log(bookingItem.id)
        bookingItem.innerHTML = `${booking.name}`;
        bookingItem.classList.add('kafelka');
        bookingItem.style.backgroundColor = "cyan";

        bookingItem.addEventListener("click", () => {
            const modal = document.getElementById("bookingModal");
            modal.style.display = "block";

            const confirmButton = document.getElementById("confirmBookingDelete");
            const cancelButton = document.getElementById("cancelBookingDelete");

            confirmButton.addEventListener("click", async () => {
                // Pobierz ID rezerwacji z atrybutu data-category-id przycisku Usuń
                const bookingId = bookingItem.id.split("-")[1];

                await deleteBooking(bookingId);
                modal.style.display = "none";
                bookingItem.remove(); // Usuń kafelek po usunięciu
            });

            cancelButton.addEventListener("click", () => {
                modal.style.display = "none";
            });
        });

        bookingList.appendChild(bookingItem);
    });
}