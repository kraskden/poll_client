import NamedTable from "../components/table";
import Field from "../model/field";

import NetUtil from './util'

let Net = {}

const SERVER_PATH = "http://localhost:4000/api"
const TOKEN_KEY = "QUEST_JWT"

Net.authGetReq = async (url, method = "GET") => {
    let token = localStorage.getItem(TOKEN_KEY);
    if (!token) {
        return Promise.reject();
    }

    return fetch(`${SERVER_PATH}${url}`, {
        headers: {
            "Authorization": `Bearer:${token}`
        },
        method: method
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

    return rawFields.map(f => NetUtil.convertRawToField(f))
}

Net.updateField = async (id, field) => {
    let res = await Net.authPostReq(`/fields/update/${id}`, NetUtil.converFieldToRaw(field))
    let text = await res.text()
    return text;
}

Net.addField = async (field) => {
    let res = await Net.authPostReq('/fields/add', NetUtil.converFieldToRaw(field))
    return await res.text()
}

Net.deleteField = async (id) => {
    let res = await Net.authGetReq(`/fields/delete/${id}`, "DELETE")
    return await res.text()
}

export default Net;