import * as functions from "firebase-functions";
import * as admin from "firebase-admin"

// PASSO OBRIGATÓRIO
admin.initializeApp(functions.config().firebase)

exports.alertFriends = functions
  .region('europe-west1')
  .firestore.document('posts/{postID}')
  .onCreate(async (snapshot, context) => {
    const data = snapshot.data();

    /*
    O data contém os dados "post" da pessoa que fez o post
    */

    const uid = data.uid; // o UID da pessoa que postou
    console.log("DATA: ", JSON.stringify(data));
    console.log("UID: ", uid);
    const db = admin.firestore();

    // 1º Buscar os seguidores da pessoa que postou 
    const followersRef = db.collection('userDetails').where("following", "array-contains", uid);
    const followers = await followersRef.get();

    const tokens: string[] = [];
    
    followers.forEach((res) => {
      tokens.push( res.data()['token']);// 2º buscar os tokens de cada seguidor
      console.log(res.data().username, 'exists!')
    });

    console.log('TOKENS ', tokens);

    // 3º Criar o payload
    // Aqui Vou definir o que vou enviar na notificação

    const notificationPayload: admin.messaging.NotificationMessagePayload = {
      title: `${data.username} published something new on Stiletto!`,
      body: data.description,
      imageUrl: data.imagepath,
    };
    
    const dataPayload: admin.messaging.DataMessagePayload = {
      "idpost": data.idpost,
    }

    const payload: admin.messaging.MessagingPayload = {
      data:dataPayload,
      notification: notificationPayload,
    };

    return admin.messaging().sendToDevice(tokens, payload);
  });


/*
O token é guardado va variável token no fireService (ver final do codigo do fireService para métodos do token)

com este token:

NA PAGINA DO LOGIN -> verificar se o token é igual ao token guarado na base de dados (ainda nao criei o sitio onde vai ficar o token, provavelmente fica no userDetails), se nao for igual entâo atualizar a base e dados com o novo token. (já feito)

NA PÁGINA DE CRIAR USERNAME -> quando submetes os dados para a bd, incluir o token (Já feito)


*/