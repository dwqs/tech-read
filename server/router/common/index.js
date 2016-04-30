/**
 * Created by pomy on 4/30/16.
 */


//设置通用的响应头
function* common(next) {
    this.response.set("Content-Type", "application/json;charset=utf-8");
    //max-age:以秒为单位
    this.response.set("Cache-Control", "max-age=3600");
    yield next;
}

module.exports.register = (router) => {
    router.get('*', common);
};