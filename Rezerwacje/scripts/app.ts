import axios from 'axios';

/*const apiUrl = 'http://localhost:5050/api/category';*/

interface Category {
    id: number;
    name: string;
    bookings: Booking[];
}

interface CategorySave {
    name: string;
    bookings: Booking[];
}

interface Booking {
    id: number;
    name: string;
    categoryId: number;
}

interface BookingSave {
    name: string;
    categoryId: number;
    userBookings: UserBooking[];
}


interface UserBooking {
    id: number;
    bookingId: number;
    userName: string;
    description: string;
    beginOfBooking: Date;
    endOfBooking: Date;

}

interface UserBookingSave {
    bookingId: number;
    userName: string;
    description: string;
    beginOfBooking: Date;
    endOfBooking: Date;
}


async function userData() {
    try {
        const userIdResponse = await fetch("/api/user/get/userid");
        const usernameResponse = await fetch("/api/user/get/username");

        if (userIdResponse.ok && usernameResponse.ok) {
            const userId = await userIdResponse.text();
            const username = await usernameResponse.text();

            console.log("User ID:", userId);
            console.log("Username:", username);

            // Now you can display the values in your HTML or update your UI
            document.getElementById("userId").textContent = userId;
            document.getElementById("username").textContent = username;
        } else {
            console.error("Error fetching user information.");
        }
    } catch (error) {
        console.error("An error occurred:", error);
    }
}

async function saveUserBooking() {
    const usernameResponse = await fetch("/api/user/get/username");
    const user = await usernameResponse.text();

    const description = (<HTMLTextAreaElement>document.getElementById("description")).value;
    const beginOfBooking = (<HTMLInputElement>document.getElementById("beginOfBooking")).value;
    const endOfBooking = (<HTMLInputElement>document.getElementById("endOfBooking")).value;

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