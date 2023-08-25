//import { UserBookingSave, UserBooking } from './app';
//async function userData() {
//    try {
//        const userIdResponse = await fetch("/api/user/get/userid");
//        const usernameResponse = await fetch("/api/user/get/username");
//        if (userIdResponse.ok && usernameResponse.ok) {
//            const userId = await userIdResponse.text();
//            const username = await usernameResponse.text();
//            console.log("User ID:", userId);
//            console.log("Username:", username);
//            // Now you can display the values in your HTML or update your UI
//            document.getElementById("userId").textContent = userId;
//            document.getElementById("username").textContent = username;
//        } else {
//            console.error("Error fetching user information.");
//        }
//    } catch (error) {
//        console.error("An error occurred:", error);
//    }
//}
//async function saveUserBooking() {
//    const usernameResponse = await fetch("/api/user/get/username");
//    const user = await usernameResponse.text();
//    const description = (<HTMLTextAreaElement>document.getElementById("description")).value;
//    const beginOfBooking = (<HTMLInputElement>document.getElementById("beginOfBooking")).value;
//    const endOfBooking = (<HTMLInputElement>document.getElementById("endOfBooking")).value;
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
//# sourceMappingURL=user.js.map