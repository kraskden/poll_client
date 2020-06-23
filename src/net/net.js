import NamedTable from "../components/table";
import Field from "../model/field";

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

Net.authPostReq = async (url, body) => {

    let token = localStorage.getItem(TOKEN_KEY);
    if (!token) {
        return Promise.reject();
    }

    return fetch(`${SERVER_PATH}${url}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer:${token}`
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
    let text = await res.text()
    return text;
}

Net.updateProfile = async (updateReq) => {
    let res = await Net.authPostReq("/profile/update", updateReq);
    let text = await res.text()
    return text
}

Net.changePassword = async (curr, updated) =>  {
    let req = {
        current: curr,
        updated: updated
    }

    let res = await Net.authPostReq("/profile/passChange", req);
    let text = await res.text()
    return text
}

Net.getFields = async () => {
    let res = await Net.authGetReq("/fields/")
    let rawFields = (await res.json()).fields;
    
    function convertType(rawType) {
        switch (rawType) {
            case "SINGLE_TEXT":
                return "text";
            case "MULTI_TEXT":
                return "multitext"
            default:
                return rawType.toLowerCase()
        }
    }

    return rawFields.map((f) => new Field(
        f.id,
        f.name,
        convertType(f.fieldType),
        f.properties,
        f.isRequired,
        f.isEnabled
    ))
}

export default Net;