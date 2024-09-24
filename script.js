let users = [];
let currentUserId = null;

document
  .getElementById("userForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("userName").value;
    const age = document.getElementById("userAge").value;

    if (currentUserId === null) {
      // CREATE
      createUser({ name, age });
    } else {
      // UPDATE
      updateUser(currentUserId, { name, age });
    }

    resetForm();
    displayUsers();
  });

document.getElementById("cancelButton").addEventListener("click", function () {
  resetForm();
});

// Função para criar um novo usuário
function createUser(user) {
  const id = users.length ? users[users.length - 1].id + 1 : 1;
  users.push({ id, ...user });
}

// Função para exibir os usuários
function displayUsers() {
  const tbody = document.getElementById("userTableBody");
  tbody.innerHTML = ""; // Limpa a tabela antes de exibir novamente

  users.forEach((user) => {
    const row = document.createElement("tr");

    row.innerHTML = `
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.age}</td>
            <td>
                <button onclick="editUser(${user.id})">Editar</button>
                <button onclick="deleteUser(${user.id})">Deletar</button>
            </td>
        `;

    tbody.appendChild(row);
  });
}

// Função para editar um usuário
function editUser(id) {
  const user = users.find((u) => u.id === id);
  if (user) {
    document.getElementById("userId").value = user.id;
    document.getElementById("userName").value = user.name;
    document.getElementById("userAge").value = user.age;

    currentUserId = id;
    document.getElementById("cancelButton").style.display = "inline";
  }
}

// Função para atualizar um usuário
function updateUser(id, updatedData) {
  const index = users.findIndex((user) => user.id === id);
  if (index !== -1) {
    users[index] = { ...users[index], ...updatedData };
  }
}

// Função para deletar um usuário
function deleteUser(id) {
  users = users.filter((user) => user.id !== id);
  displayUsers();
}

// Função para resetar o formulário
function resetForm() {
  document.getElementById("userId").value = "";
  document.getElementById("userName").value = "";
  document.getElementById("userAge").value = "";
  currentUserId = null;
  document.getElementById("cancelButton").style.display = "none";
}

displayUsers();
