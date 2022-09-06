const functions = require("firebase-functions");
const admin=require("firebase-admin")
admin.initializeApp()
const db=admin.firestore()


exports.pubsub=functions.region("europe-west3").pubsub.schedule("20 15 * * *").timeZone("Europe/Istanbul")
    .onRun(async (context)=>{

        await db.collection("users").get().then(async (res)=>{
            const docs=res.docs

            for(const doc of docs){

                const user=doc.data()
                user.life+=10

                await db.collection("users").doc(user.uid).update(user)

            }

        })


    })


exports.helloWorldTOFunctions = functions.https.onRequest((request, response) => {
    functions.logger.info("Hello logs!", {structuredData: true});
    response.send("Hello from Firebase functions!");
});






