
let getBody = (str) => {
    let reg = /<\/head><body>(.+)<\/body><\/html>/ig;
    return reg.exec(str);
}

let ajax = (options) => {
    let _ = Object.assign({
        url: null, // 接口地址
        data: null, // 提交数据
        type: 'get', // 请求类型
        dataType: 'json', // 数据类型
        loadType: null, // 请求的文档类型
        success: () => false, // 成功
        error: () => false // 失败
    }, options);

    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4) {
            if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
                if(_.loadType && _.loadType === 'html') {
                    _.success.call(null, getBody(xhr.responseText)[1]);
                    return;
                }
                var data = JSON.parse(xhr.responseText);
                _.success.call(null, data);
            } else {
                _.error.call(null, xhr);
            }
        }
    }

    xhr.open(_.type, _.url, true);
    xhr.setRequestHeader('Content-Type', 'application/' + _.dataType + ';charset=utf-8');
    xhr.send(_.data);
}

export default ajax;
