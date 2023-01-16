const moment=require("moment");



exports.dateFromNow=(date)=>{
}


/**
 * 새 10분을 기반으로 새글인지 판단
 * @date 2023-01-12
 * @param {string} date 
 * @returns {boolean}
 */
exports.isNewFeed=(date)=>{
    let currentTime=moment().add(-10,'minute');
    let feedDate=moment(date);

    return feedDate.isAfter(currentTime);
}