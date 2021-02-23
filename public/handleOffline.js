// Create new db request for "budget" IndexedDB
let db;
const request = indexedDB.open('budgetIDDB', 1);

// Create new object store if needed
request.onupgradeneeded = function (event) {
    db = event.target.result;
    console.log("onupgradeneeded db: ", db);
    db.createObjectStore("pending", { autoIncrement: true });
}
// Check if browser is online initially
request.onsuccess = function (event) {
    db = event.target.result;

    // if online, check budgetIDDB for records
    if (navigator.onLine) {
        checkIDDB();
        console.log("request.onsuccess => navigator.onLine: ", navigator.onLine)
    }
}

// Check IndexedDB for records
let checkIDDB = function () {

    // Create a transaction, access the pending store and get all IDDB records
    const transaction = db.transaction("pending", "readwrite");
    const store = transaction.objectStore("pending");
    const allTransactions = store.getAll();

    console.log("checkIDDB => transaction: ", transaction)
    console.log("checkIDDB => store: ", store)

    // Wait until transaction request is complete
    allTransactions.onsuccess = function () {
        console.log("checkIDDB => allTransactions: ", allTransactions)

        // If there are records, post to budget MongoDB


    }
}

// Post transactions to MongoDB
// let postTransactions = function () {

// }

// If error, print error

// Save record in budget IndexedDB
function saveRecord(record) {
    console.log("saveRecord called...");

    // Create a transaction, access the pending store and add record to IDDB
    const transaction = db.transaction("pending", "readwrite");
    const store = transaction.objectStore("pending");
    store.add(record);

}

// listen for when browser comes online
// window.addEventListener("online", checkDatabase);
