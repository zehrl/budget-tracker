// Create new db request for "budget" IndexedDB
let db;
const request = indexedDB.open('budgetIDDB', 1);

// Create new object store if needed
request.onupgradeneeded = function(event) {
    db = event.target.result;
    console.log("onupgradeneeded db: ", db);
    db.createObjectStore("pending", {autoIncrement: true});
}

// Check if browser is online

// Check IndexedDB for records and add to MongoDB if online

// If error, print error

// Save record in budget IndexedDB
