////import { Category, CategorySave } from './app';
//function onLoadCategoriesClick() {
//    fetchAllCategories();
//}
//async function saveCategory() {
//    const category: CategorySave = {
//        name: "Example Category",
//        bookings: [],
//    };
//    console.log("started fetch")
//    try {
//        const response = await fetch("/api/category/save", {
//            method: "POST",
//            headers: {
//                "Content-Type": "application/json",
//            },
//            body: JSON.stringify(category),
//        });
//        if (response.ok) {
//            console.log("Category saved successfully!");
//            // You can perform additional actions here after the category is saved
//        } else {
//            console.error("Failed to save category");
//        }
//    } catch (error) {
//        console.error("An error occurred:", error);
//    }
//}
//async function deleteCategory() {
//    const categoryId = 1001; // Replace with the actual ID of the category you want to delete
//    try {
//        const response = await fetch(`/api/category/delete/${categoryId}`, {
//            method: "DELETE",
//        });
//        if (response.ok) {
//            console.log("Category deleted successfully!");
//            // You can perform additional actions here after the category is deleted
//        } else if (response.status === 404) {
//            console.error("Category not found");
//        } else {
//            console.error("Failed to delete category");
//        }
//    } catch (error) {
//        console.error("An error occurred:", error);
//    }
//}
//function getCategoryByID() {
//    const categoryDisplay = document.getElementById("categoryDisplay");
//    const categoryIdElement = document.getElementById("categoryId");
//    const categoryNameElement = document.getElementById("categoryName");
//    (async () => {
//        try {
//            const categoryId = 1; // Change this to the desired category ID
//            const response = await fetch(`/api/category/get/${categoryId}`);
//            if (!response.ok) {
//                throw new Error(`HTTP error! Status: ${response.status}`);
//            }
//            const category: Category = await response.json(); // Assuming Category is the interface
//            console.log(category.id);
//            console.log(category.name);
//            // Update the display with the retrieved category
//            categoryIdElement.textContent = String(category.id);
//            categoryNameElement.textContent = category.name;
//            categoryDisplay.style.display = "block"; // Show the display area
//        } catch (error) {
//            console.error("Error fetching category:", error);
//        }
//    })();
//}
//// Fetch categories from the API
//async function fetchAllCategories() {
//    try {
//        const response = await fetch("/api/category/getAll");
//        if (response.ok) {
//            const categories = await response.json();
//            displayCategories(categories);
//        } else {
//            console.error("Error loading categories:", response.statusText);
//        }
//    } catch (error) {
//        console.error("Error fetching categories:", error);
//    }
//}
//// Display categories in the categoryList element
//function displayCategories(categories) {
//    const categoryList = document.getElementById("categoryList");
//    categoryList.innerHTML = "";
//    categories.forEach(category => {
//        const categoryItem = document.createElement("div");
//        categoryItem.innerText = `ID: ${category.id}, Name: ${category.name}`;
//        categoryList.appendChild(categoryItem);
//    });
//}
//# sourceMappingURL=category.js.map