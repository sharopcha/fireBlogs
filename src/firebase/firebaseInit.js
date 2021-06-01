import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCh-1j-8iPp7Szz13nmwzpineDGo9LV1MY",
    authDomain: "fireblog-5af7f.firebaseapp.com",
    projectId: "fireblog-5af7f",
    storageBucket: "fireblog-5af7f.appspot.com",
    messagingSenderId: "865620231100",
    appId: "1:865620231100:web:40896c7a07fc5c1e44e1b9"
}

const firebaseApp = firebase.initializeApp(firebaseConfig)
const timestamp = firebase.firestore.FieldValue.serverTimestamp

export { timestamp }
export default firebaseApp.firestore()