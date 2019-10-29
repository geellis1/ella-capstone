/* You're going to eliminate the possibility of duplicate code by making a module
whose sole responsibility is to interact with the API.*/

const remoteURL = "http://localhost:5002"

export default {
    get(resource, id) {
      return fetch(`${remoteURL}/${resource}/${id}`).then(result => result.json())
    },
    getRecommendation(resource, id) {
      return fetch(`${remoteURL}/${resource}/?_expand=doctor`).then(result => result.json())
    },

    getAll(resource) {
      return fetch(`${remoteURL}/${resource}`).then(result => result.json())
    },
  

    delete(resource ,id) {
      return fetch(`http://localhost:5002/${resource}/${id}`, {
        method: "DELETE"
    })
      .then(result => result.json())
  },
  post(resource, newResource) {
    return fetch(`${remoteURL}/${resource}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newResource)
    }).then(data => data.json())
  },
  update(resource, editedResource) {
    console.log(editedResource.id)
    return fetch(`${remoteURL}/${resource}/${editedResource.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(editedResource)
    }).then(data => data.json());
  },
  getUserPharmacy(resource, userId) {
    return fetch(`${remoteURL}/${resource}?userId=${userId}`).then(result => result.json())
  },
  getUserPrescription(resource, userId) {
    return fetch(`${remoteURL}/${resource}?userId=${userId}`).then(result => result.json())
  },
  getUserAppointment(resource, userId) {
    return fetch(`${remoteURL}/${resource}?userId=${userId}`).then(result => result.json())
  },
  getUserRecommendation(resource, userId) {
    return fetch(`${remoteURL}/${resource}?userId=${userId}&_expand=doctor`).then(result => result.json())
  },
  getUserHealth(resource, userId) {
    return fetch(`${remoteURL}/${resource}?userId=${userId}`).then(result => result.json())
  }
  }