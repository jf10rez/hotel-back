const getDatesInRange = (startDate, endDate) => {

    const dateInitial =  new Date(startDate)
    const dateFinal =  new Date(endDate)
    
  
    const dates = [];
  
    while (dateInitial.getTime() < dateFinal.getTime()) {
      dates.push(new Date(dateInitial));
      dateInitial.setDate(dateInitial.getDate() + 1);
    }
  
    return dates;
}

module.exports = { getDatesInRange }