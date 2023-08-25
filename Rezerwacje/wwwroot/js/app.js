var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function userData() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userIdResponse = yield fetch("/api/user/get/userid");
            const usernameResponse = yield fetch("/api/user/get/username");
            if (userIdResponse.ok && usernameResponse.ok) {
                const userId = yield userIdResponse.text();
                const username = yield usernameResponse.text();
                console.log("User ID:", userId);
                console.log("Username:", username);
                // Now you can display the values in your HTML or update your UI
                document.getElementById("userId").textContent = userId;
                document.getElementById("username").textContent = username;
            }
            else {
                console.error("Error fetching user information.");
            }
        }
        catch (error) {
            console.error("An error occurred:", error);
        }
    });
}
function saveUserBooking() {
    return __awaiter(this, void 0, void 0, function* () {
        const usernameResponse = yield fetch("/api/user/get/username");
        const user = yield usernameResponse.text();
        const description = document.getElementById("description").value;
        const beginOfBooking = document.getElementById("beginOfBooking").value;
        const endOfBooking = document.getElementById("endOfBooking").value;
        const userBooking = {
            bookingId: 3,
            userName: user,
            description: description,
            beginOfBooking: new Date(beginOfBooking),
            endOfBooking: new Date(endOfBooking)
        };
        try {
            const response = yield fetch("/api/userbooking/save", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userBooking),
            });
            if (response.ok) {
                console.log("User booking saved successfully!");
                // You can perform additional actions here after the category is saved
            }
            else {
                console.error("Failed to save user booking");
            }
        }
        catch (error) {
            console.error("An error occurred:", error);
        }
    });
}
export {};
//# sourceMappingURL=app.js.map