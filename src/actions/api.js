import fetch from "isomorphic-fetch";
import {storage} from "../utils/tools"
import {host} from "./hostConf";
import warning from 'fbjs/lib/warning'
import objectAssign  from 'object-assign'
export function request(options){
    if(options.url){
        let url = `${host}`;
        const bodyParams = parseParams(options.data);        
        
        let params = {
            method: options.method || 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': options.type=='from'?'application/x-www-form-urlencoded;charset=UTF-8':'application/json',
                "token": storage.get("token")||''
            }
        }
        if(options.method=="POST"){
            url = `${host}${options.url}`
            if(options.type=="payload"){
                objectAssign(params,{body: JSON.stringify(options.data)})
            }else{
                objectAssign(params,{body:bodyParams})
            }

        }else{
            const  tarUrl = options.data == null ? options.url : `${options.url}?${bodyParams}`;
            url = `${host}${tarUrl}`
        }

        return fetch(url, params).then(checkStatus).then(response=>  response.json())
    }else{
        warning(false, '请传入请求地址')
        return false
    }
    
}
function fromData(data){
    let form = new FormData(data);
    for (let i in data) {
        if ((typeof data[i] === "object") && (data[i].constructor === Array)) {
            data[i].map((item, index) => {
                form.append(i + "[" + index + "]", item)
            })
        } else {
            form.append(i, data[i])
        }
    }
    return form
}
function parseParams(data) {
    if (data == null) {
        return '';
    }
    let list = [];
    for (let item in data) {
        list.push(`${item}=${data[item]}`)
    }
    return list.join("&");
}

function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return response
    } else {
      var error = new Error(response.statusText)
      error.response = response
      throw error
    }
  }