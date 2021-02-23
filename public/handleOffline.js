// Create new db request for "budget" IndexedDB
let db;
const request = indexedDB.open('budgetIDDB', 1);

// Create new object store if needed
request.onupgradeneeded = function (event) {
    db = event.target.result;
    db.createObjectStore("pending", { autoIncrement: true });
}
// Check if browser is online initially
request.onsuccess = function (event) {
    db = event.target.result;

    // if online, check budgetIDDB for records
    if (navigator.onLine) {
        checkIDDB();
    }
}

// If error, print error
request.onerror = function (error) {
    console.log("IDDB request failed. Error: ", error);
}

// Check IndexedDB for records
let checkIDDB = function () {

    // Create a transaction, access the pending store and get all IDDB records
    const transaction = db.transaction("pending", "readwrite");
    const store = transaction.objectStore("pending");
    const allTransactions = store.getAll();

    // Wait until transaction request is complete
    allTransactions.onsuccess = function () {

        // If there are records, post to budget MongoDB
        if (allTransactions.result.length) { postTransactions(allTransactions.result) }

    }
}

// Post transactions to MongoDB
let postTransactions = function (transactions) {
    fetch("/api/transaction/bulk", {
        method: "POST",
        body: JSON.stringify(transactions),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    })
        // Log success message
        .then(response => {
            response.json();
            console.log("Offline records successfully saved.");
        })
        // Delete IDDB pending store records
        .then(deleteRecords)
}


// Delete all records in budget IndexedDB
function deleteRecords() {
    // Create a transaction, access the pending store and add record to IDDB
    const transaction = db.transaction("pending", "readwrite");
    const store = transaction.objectStore("pending");
    store.clear();
}

// Save record in budget IndexedDB
function saveRecord(record) {

    // Create a transaction, access the pending store and add record to IDDB
    const transaction = db.transaction("pending", "readwrite");
    const store = transaction.objectStore("pending");
    store.add(record);

}

// listen for when browser comes online
window.addEventListener("online", checkIDDB);
