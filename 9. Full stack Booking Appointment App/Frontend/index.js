const form = document.getElementById("userForm");
const submitBtn = document.getElementById("submitBtn");
const userListContainer = document.getElementById("userList");

let users = [];
let editId = null;

// 1. Initial Load: Get data from database
window.addEventListener("DOMContentLoaded", () => {
  fetchUsers();
});

async function fetchUsers() {
  try {
    const response = await axios.get("http://localhost:3000/users");
    users = response.data;
    renderUsers();
  } catch (error) {
    console.error("Error fetching users:", error);
  }
}

// 2. Combined Submit Handler: Handles both ADD and UPDATE
form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const userData = {
    name: form.username.value,
    phone: form.phone.value,
    email: form.email.value,
  };

  try {
    if (editId) {
      // --- UPDATE LOGIC ---
      const response = await axios.put(
        `http://localhost:3000/users/update/${editId}`,
        userData
      );

      // Update local array with data returned from server
      users = users.map((u) => (u.id === editId ? response.data.data : u));

      // Reset UI state
      editId = null;
      submitBtn.textContent = "Submit";
      submitBtn.style.backgroundColor = "#007bff";
    } else {
      // --- ADD LOGIC ---
      const response = await axios.post(
        "http://localhost:3000/users/add",
        userData
      );
      users.push(response.data);
    }

    form.reset();
    renderUsers();
  } catch (err) {
    console.error(
      "Operation failed:",
      err.response ? err.response.data : err.message
    );
    alert("Operation failed! Check console for errors.");
  }
});

// 3. Render List
function renderUsers() {
  userListContainer.innerHTML = "";

  users.forEach((user) => {
    const card = document.createElement("div");
    card.className = "user-card";
    card.innerHTML = `
            <div class="user-info">
                <strong>${user.name}</strong> | 
                <span>${user.phone}</span> | 
                <span>${user.email}</span>
            </div>
            <div class="actions">
                <button class="edit-btn" onclick="editUser(${user.id})">Edit</button>
                <button class="delete-btn" onclick="deleteUser(${user.id})">Delete</button>
            </div>
        `;
    userListContainer.appendChild(card);
  });
}

// 4. Global Delete Function
window.deleteUser = async (id) => {
  try {
    await axios.delete(`http://localhost:3000/users/delete/${id}`);
    users = users.filter((user) => user.id !== id);
    renderUsers();
    console.log("User deleted successfully");
  } catch (err) {
    console.error("Delete failed:", err);
    alert("User was not deleted.");
  }
};

// 5. Global Edit Function (Populates Form)
window.editUser = (id) => {
  const user = users.find((u) => u.id === id);

  // Mapped to match your HTML input names and Model keys
  form.username.value = user.name;
  form.phone.value = user.phone;
  form.email.value = user.email;

  editId = id;
  submitBtn.textContent = "Update Data";
  submitBtn.style.backgroundColor = "#ffc107";
};
