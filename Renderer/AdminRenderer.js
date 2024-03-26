document.addEventListener("DOMContentLoaded", (event) => {
  const getImg = document.getElementById("get-Video");

  window.electronAPI.getVideo((event, Videodata) => {
    getImg.src = Videodata;
  });

  window.electronAPI.UpdateMsg((event, message) => {
    console.log(message);
    document.getElementById("update").innerHTML = message;
  });

  window.electronAPI.getEmployeeRequest();

  
  window.electronAPI.getEmployee((event, gotemployee) => {
    const employeeListElement = document.getElementById("employee-list");
    if (!gotemployee) {
      employeeListElement.innerHTML =
        '<tr><td colspan="6">Error loading employee data</td></tr>';
      return;
    }

    gotemployee.forEach((employee) => {
      const row = document.createElement("tr");

      const empId = document.createElement("td");
      empId.textContent = employee.id;
      row.appendChild(empId);

      const empName = document.createElement("td");
      empName.textContent = employee.name;
      row.appendChild(empName);

      const empEmail = document.createElement("td");
      empEmail.textContent = employee.email;
      row.appendChild(empEmail);

      const editButtonCell = document.createElement("td");
      const editButton = document.createElement("button");
      editButton.textContent = "Edit";
      editButton.addEventListener("click", () => {
        // Handle edit functionality
      });
      editButtonCell.appendChild(editButton);
      row.appendChild(editButtonCell);

      const deleteButtonCell = document.createElement("td");
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.addEventListener("click", () => {
        window.electronAPI.DeletEmployee(employee.id);
        document.addEventListener("onload", (event) => {});
      });
      deleteButtonCell.appendChild(deleteButton);
      row.appendChild(deleteButtonCell);

      const viewButtonCell = document.createElement("td");
      const viewButton = document.createElement("button");
      viewButton.textContent = "View Employee Log";
      viewButton.addEventListener("click", () => {
        
        window.electronAPI.viewEmployeeLog(employee.id);
      });
      viewButtonCell.appendChild(viewButton);
      row.appendChild(viewButtonCell);

      const assignTask = document.createElement("td");
      const assignButton = document.createElement("button");
      assignButton.textContent = "Assign Task";
      assignButton.addEventListener("click", () => {
        console
        window.electronAPI.taskAssign(employee.id);
      });
      viewButtonCell.appendChild(assignButton);
      row.appendChild(assignTask);

      employeeListElement.appendChild(row);
    });
  });

  
});
window.electronAPI.getLogImage((event, imageBase64) => {
  console.log(imageBase64);
  const imageContainer = document.getElementById("image-container");
  imageBase64.forEach((image) => {
  const uint8Array = new Uint8Array(image);
  const blob = new Blob([uint8Array]);
  const urlCreator = window.URL || window.webkitURL;
  const imageUrl = urlCreator.createObjectURL(blob);
  const imgElement = document.createElement('img');
  console.log(imageUrl);
  imgElement.src = imageUrl;
  imageContainer.appendChild(imgElement);
  })
});
