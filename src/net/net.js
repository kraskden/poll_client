let Net = {}

const SERVER_PATH = "http://localhost:4000/api"
const TOKEN_KEY = "QUEST_JWT"

Net.authGetReq = async (url) => {
    let token = localStorage.getItem(TOKEN_KEY);
    if (!token) {
        return Promise.reject();
    }

    return fetch(`${SERVER_PATH}${url}`, {
        headers: {
            "Authorization": `Bearer:${token}`
        }
    }).then((res) => {
        if (res.status !== 200) {
            return Promise.reject(res.status);
        } else {
            return res;
        }
    })
}

Net.getReq = async (url) => {
    let res = await fetch(`${SERVER_PATH}${url}`)
    return res.status === 200 ? res : Promise.reject(res);
}

Net.postReq = async (url, body) => {

    return fetch(`${SERVER_PATH}${url}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    }).then((res) => {
        if (res.status !== 200) {
            return Promise.reject(res.status);
        } else {
            return res;
        }
    })
}


Net.getProfileInfo = async () => {
    let res = await Net.authGetReq("/profile/");
    return await res.json();
}

Net.login = async (email, password) => {
    let res = await Net.postReq("/auth/login", {
        email: email, 
        password: password
    })
    let credentials = await res.json();
    
    localStorage.setItem(TOKEN_KEY, credentials.token);
}

Net.logout = () => {
    localStorage.removeItem(TOKEN_KEY);
}

Net.signUp = async (signUpReq) => {
    let res = await Net.postReq("/auth/register", signUpReq);
    let text =  res.text()
    return text;
}

export default Net;