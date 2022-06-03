import isUsernameAvailable from "./isUsernameAvailabe";

const randomUsername = async() =>{
    let username: string = ""

    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < 8; i++ ) {
        username += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    username = username.replace(/ /g, '')

    const bool = await isUsernameAvailable(username);

    if(bool) return username;
    else randomUsername()
}

export default randomUsername;