/**
 * Created by pomy on 16/4/23.
 */

export let timeConvert = function (utc) {
    if(!utc){
        return void 0;
    }
    var date = new Date(utc),
        Y = date.getFullYear() + '-',
        M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-',
        D = (date.getDate() < 10 ? ('0' + date.getDate()) : (date.getDate())) + ' ';
    return (Y + M + D);
};