/*
* 路由API router.js
* */

window.addEventListener('hashchange',function(e){
    Router.switching("."+Router.getHash());
});
function fetchPage( path ){
    return fetch(path).then( response => {
        return response.text();
    });
}

const Router = {
    registerBefore: function (_before) {
        if (typeof _before === "function") {
            this.__before__ = _before;
        }
    },
    registerFinally: function( _finally ){
        if (typeof _finally === "function") {
            this.__finally__ = _finally;
        }
    },
    /**
     * 获得 URL 中 `#` 之后的内容
     * @returns {string}
     */
    getHash: function () {
        return window.location.hash.replace("#", "");
    },
    /**
     * 路由注册
     * @param path 注册地址
     * @param callback 回调方法
     */
    map: function (path, callback) {
        this.__routers__[path] = callback;
    },
    switching: function (path) {
        let callback = this.__routers__[path];
        if(typeof callback !== "function"){
            callback = () => {};
        }
        let _before = this.__before__;
        let _finally = this.__finally__;
        if(_before( path )){
            fetchPage(path).then( body =>{
                callback(body);
                return {path,body};
            }).then( result => {
                _finally(result.path);
            });
        }else{
            _finally(path);
        }
    },
    __history__: [],
    __routers__: {},
    __finally__: () => {},
    __before__: () => true
};