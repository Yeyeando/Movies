// Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
  import {  getDatabase, ref, onValue, push} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const FIREBASE_CONFIG = {
    apiKey: "AIzaSyDIq-TNv8HlSnvx5pQ7A5nB263evVv4btQ",
    authDomain: "today-s-movies.firebaseapp.com",
    databaseURL: "https://today-s-movies-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "today-s-movies",
    storageBucket: "today-s-movies.appspot.com",
    messagingSenderId: "387304233849",
    appId: "1:387304233849:web:3c761f776287b95716ada8",
    measurementId: "G-YFS9HM3P3F"
  };

  // Initialize Firebase
  initializeApp(FIREBASE_CONFIG);

    const DB = getDatabase();
    function initialize() {


    const CHAT_FORM = document.getElementById("chat-form");
    CHAT_FORM.addEventListener("submit", addNewMessage);


    const MESSAGES_REF = ref(DB, "message/");
    onValue(MESSAGES_REF, showMessages);
}

function showMessages(patata) { //se suele poner snapshot 
    const MESSAGES_FROM_FIREBASE = patata.val();

    const MESSAGE_LIST = document.getElementById("message-list");

    MESSAGE_LIST.innerHTML = ``;
    for (let m in MESSAGES_FROM_FIREBASE) {
        const TEXT = MESSAGES_FROM_FIREBASE[m].text;
        const SENDER = MESSAGES_FROM_FIREBASE[m].sender;

        MESSAGE_LIST.innerHTML += `<p>${SENDER}: ${TEXT}</p>`;
    }

}

function addNewMessage(event) {
    event.preventDefault();

    const SENDER = event.target["message-sender"].value;
    const TEXT = event.target["message-text"].value;

    const newMessage = {
        sender: SENDER, 
        text: TEXT,
    }
    const MESSAGES_REF = ref(DB, "message/");

    const newAnswer = {
        sender: "Assistant",
        text: "Sorry, the AI is under maintenance.",
    }

    push(MESSAGES_REF, newMessage);
    push(MESSAGES_REF, newAnswer);
    
    
    event.target["message-text"].value = "";
}

initialize();