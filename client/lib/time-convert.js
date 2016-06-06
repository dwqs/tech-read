/**
 * Created by pomy on 16/4/23.
 */

'use strict';

//闰年判断
//能被4整除且不能被100整除 或 能被100整除且能被400整除
function isLeapYear (year){
    if(!isNaN(parseInt(year))){
        if((year%4 === 0 && year%100 !== 0)||(year%100 === 0 && year%400 === 0)){
            return true;
        }else{
            return false;
        }
    }
}

//大小月判断
function isBigMonth (month) {
    return [1,3,5,7,8,10,12].some((m) => {
        return m === +month;
    });
}

function isSmallMonth (month) {
    return [4,6,9,11].some((m) => {
        return m === +month;
    });
}

export let timeConvert = function (curDate) {

    let dateArr = curDate.split('-');
    let day = +dateArr[2];
    let month = +dateArr[1];
    let year = +dateArr[0];

    let prevDay = day - 1;
    let prevMonth = month - 1;
    let prevYear = year - 1;

    //同月
    if(prevDay !== 0) {
        prevDay = prevDay < 10 ? '0'+prevDay : prevDay;
        dateArr[2] = prevDay;
        return dateArr.join('-');
    }

    if(prevDay === 0) {
        //翻月
        if(prevMonth !== 0){
            prevMonth = prevMonth < 10 ? '0' + prevMonth : prevMonth;

            if(+prevMonth === 2){
                prevDay = isLeapYear(year) ? 29 : 28;
            }

            if(isBigMonth(prevMonth)){
                prevDay = 31;
            }

            if(isSmallMonth(prevMonth)){
                prevDay = 30;
            }

            dateArr[1] = prevMonth;
            dateArr[2] = prevDay;
            return dateArr.join('-');
        }

        //翻年
        if(prevMonth === 0) {
            dateArr[0] = prevYear;
            dateArr[1] = 12;
            dateArr[2] = 31;
            return dateArr.join('-');
        }
    }
};