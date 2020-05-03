document.addEventListener("DOMContentLoaded", event => {
    const app = firebase.app();
    // console.log(app)

    const db = firebase.firestore();

    // const myPost = db.collection('post').doc('firstpost');

    // myPost.get()
    //     .then(doc => {
    //         const data = doc.data();
    //         document.write(data.title + `<br>`)
    //         document.write(data.createdAt)
    //     })

    // myPost.onSnapshot(doc => {
    //     const data = doc.data();
    //     // document.write(data.title + `<br>`)
    //     // document.write(data.createdAt + `<br>`)
    //     document.querySelector("#title").innerHTML = data.title
    // })

    // const productsRef = db.collection('products')

    // const query = productsRef.where('price', '>=', 10)
    // const query = productsRef.orderBy('price', 'desc').limit(1)

    // query.get()
    //     .then(products => {
    //         products.forEach(doc => {
    //             data = doc.data()
    //             document.write(`${data.name} at $${data.price} <br>`)
    //             console.log(`${data.name} at $${data.price} <br>`)
    //         })
    //     })

});

function googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider)
        .then(result => {
            const user = result.user;
            document.write(`Hello ${user.displayName}`);
            console.log(user)
        })
        .catch(console.log)
}

function updatePost(e) {
    const db = firebase.firestore();
    const myPost = db.collection('post').doc('firstpost');
    myPost.update({ title: e.target.value })
}

function uploadFile(files) {
    const storageRef = firebase.storage().ref();
    const horseRef = storageRef.child('screenshot.png')

    const file = files.item(0)

    const task = horseRef.put(file)

    task.then(snapshot => {
        snapshot.ref.getDownloadURL().then(downloadURL => {
            document.querySelector('#imgUpload').setAttribute('src', downloadURL)
        })
    })
}