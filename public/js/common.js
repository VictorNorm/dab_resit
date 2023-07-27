async function rentVehicle(id) {
  try {
    const response = await fetch("/vehicles/rent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ vehicleId: id }),
      credentials: "include",
    });

    if (!response.ok) {
      const responseJson = await response.json();
      throw new Error(responseJson.error);
    }

    const responseJson = await response.json();

    if (responseJson.status === "success") {
      alert(responseJson.message);
      location.reload();
    } else if (responseJson.status === "error") {
      alert("There was an error renting the vehicle");
    }

    alert("You successfully rented a vehicle.");
    location.reload();
    return responseJson;
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
}

async function cancelVehicle(id) {
  try {
    const response = await fetch("/vehicles/cancel", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ vehicleId: id }),
      credentials: "include",
    });

    if (!response.ok) {
      const responseJson = await response.json();
      throw new Error(responseJson.error);
    }

    const responseJson = await response.json();

    if (responseJson.status === "success") {
      alert(responseJson.message);
      location.reload();
    } else if (responseJson.status === "error") {
      alert("There was an error canceling the rental of the vehicle");
    }

    alert("You successfully canceled a rental of a vehicle.");
    location.reload();
    return responseJson;
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
}

async function updateColour(id) {
  console.log(id);
  try {
    const newColour = prompt("Update colour");

    const response = await fetch("/colours/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id, colour: newColour }),
    });

    if (!response.ok) {
      const message = `An error has occurred: ${response.status}`;
      throw new Error(message);
    }

    const responseJson = await response.json();

    if (responseJson.status === "success") {
      alert(responseJson.message);
      location.reload();
    } else {
      alert("There was an error updating the colour");
    }

    return responseJson;
  } catch (error) {
    console.error(error);
    alert("Only admin users can update colours.");
  }
}

async function addColour() {
  event.preventDefault();
  try {
    const newColour = prompt("Enter new colour");

    const response = await fetch("/colours/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ colour: newColour }),
    });

    if (!response.ok) {
      const message = `An error has occurred: ${response.status}`;
      throw new Error(message);
    }

    const responseJson = await response.json();

    if (responseJson.status === "success") {
      alert(responseJson.message);
      location.reload();
    } else {
      alert("There was an error creating the colour");
    }

    return responseJson;
  } catch (error) {
    console.error(error);
    alert("Only logged in admin users can create new colours.");
  }
}

async function deleteColour(id) {
  try {
    const response = await fetch(`/colours/delete/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const message = `An error has occurred: ${response.status}`;
      throw new Error(message);
    }

    const responseJson = await response.json();

    if (responseJson.status === "success") {
      alert(responseJson.message);
      location.reload();
    } else {
      alert("There was an error deleting the type");
    }

    return responseJson;
  } catch (error) {
    console.error(error);
    alert("You cannot delete colours belonging to existing vehicles.");
  }
}

async function updateType(id) {
  try {
    const newType = prompt("Update type");

    const response = await fetch("/types/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id, type: newType }),
    });

    if (!response.ok) {
      const message = `An error has occurred: ${response.status}`;
      throw new Error(message);
    }

    const responseJson = await response.json();

    if (responseJson.status === "success") {
      alert(responseJson.message);
      location.reload();
    } else {
      alert("There was an error updating the type");
    }

    return responseJson;
  } catch (error) {
    console.error(error);
    alert("An error occurred while updating the type.");
  }
}

async function addType() {
  event.preventDefault();
  try {
    const newType = prompt("Enter new type");

    const response = await fetch("/types/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ type: newType }),
    });

    if (!response.ok) {
      const message = `An error has occurred: ${response.status}`;
      throw new Error(message);
    }

    const responseJson = await response.json();

    if (responseJson.status === "success") {
      alert(responseJson.message);
      location.reload();
    } else {
      alert("There was an error creating the type");
    }

    return responseJson;
  } catch (error) {
    console.error(error);
    alert("Only logged in admin users can create new types.");
  }
}

async function deleteType(id) {
  try {
    const response = await fetch(`/types/delete/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const message = `An error has occurred: ${response.status}`;
      throw new Error(message);
    }

    const responseJson = await response.json();

    if (responseJson.status === "success") {
      alert(responseJson.message);
      location.reload();
    } else {
      alert("There was an error deleting the type");
    }

    return responseJson;
  } catch (error) {
    console.error(error);
    alert("You cannot delete vehicle types belonging to existing vehicles.");
  }
}

function currentlyRentedVehicles() {
  window.location.href = "/vehicles/rented";
}

function allVehicles() {
  window.location.href = "/vehicles";
}

function vehiclesRequiringService() {
  window.location.href = "/vehicles/service";
}

function cruiseControl() {
  window.location.href = "/vehicles/cruiseControl";
}

function popularVehicleMake() {
  window.location.href = "/vehicles/popular";
}
