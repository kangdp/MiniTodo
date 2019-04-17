
/**
 * 获取改月份的最大天数
 */
const getCurMaxDays = (year,month) => {

    let date = new Date(year,month,0)

    return date.getDate()
}

const getCurDate = () => {
  return new Date()
}



const getDateDatas = () => {
  let date = new Date()
  let years = []
  let months = []
  let days = []
  for (let i = date.getFullYear(); i <= date.getFullYear()+50; i++) {
    years.push(i)
  }
  for (let i = 1; i <= 12; i++) {
    months.push(i)
  }
  return {year: years,month: months}
}


module.exports = {
  getCurMaxDays: getCurMaxDays,
  getDateDatas: getDateDatas,
  getCurDate: getCurDate
}