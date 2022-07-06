const simplifyArray = (arr = []) => {
    const res = [];
    arr.forEach(element => {
       element.forEach(el => {
          res.push(el);
       });
    });
    return res;
 };

 module.exports = {simplifyArray}