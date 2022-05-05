
var cli=[[111111111,"Yuval" , "Yahod" , "Petah Tikva" , "1998-06-24", "Female" , "2"] ,
        [222222222,"Maayan" , "Sulimani" , "Rehovot" , "1995-05-23", "Female" , "0"],
        [333333333,"rita" , "levi" , "tel aviv" , "1979-08-12", "Female" , "5"],
        [444444444,"noam" , "levi" , "tel aviv" , "1960-02-21", "Male" , "1"],
        [555555555,"shir" , "lama" , "ariel" , "1967-01-27", "Female" , "7"],
        [333333333,"sarit" , "hadad" , "ariel" , "1993-02-19", "Male" , "8"],
        [333333333,"hana" , "zelda" , "ariel" , "2001-03-18", "Female" , "8"],
        [333333333,"eitan" , "or" , "yehod" , "2001-04-17", "Male" , "9"],
        [333333333,"malka" , "nasih" , "yehod" , "1992-05-16", "Female" , "2"],
        [333333333,"rona" , "li" , "yehod" , "1999-06-15", "Female" , "3"],
        [333333333,"oren" , "perlemuter" , "or akiva" , "1990-07-14", "Male" , "5"],
        [333333333,"lavi" , "perlemuter" , "or akiva" , "1989-07-13", "Male" , "5"],
        [333333333,"tamar" , "davis" , "ramat gan" , "1989-08-11", "Female" , "3"],
        [333333333,"shira" , "davis" , "ramat gan" , "1986-09-10", "Female" , "3"],
        [333333333,"ofer" , "suli" , "ramat gan" , "1984-10-09", "Male" , "3"],
        [333333333,"ksenia" , "tera" , "ramat gan" , "1981-11-08", "Female" , "10"],
        [333333333,"svetlana" , "moshkovit" , "givataiim" , "1991-12-07", "Female" , "0"],
        [333333333,"dan" , "adavar" , "givataiim" , "1993-12-06", "Male" , "1"],
        [333333333,"daniel" , "haim" , "givataiim" , "1999-02-05", "Male" , "2"],
        [333333333,"ori" , "yahod" , "givat shmuel" , "1989-03-04", "Male" , "2"],
        [333333333,"eyel" , "shlom" , "givat shmuel" , "1979-04-03", "Male" , "5"],
        [333333333,"gal" , "gadol" , "givat shmuel" , "1969-05-02", "Male" , "6"],
        [333333333,"rotem" , "sela" , "givat shmuel" , "1960-06-01", "Female" , "4"]];

const clients = require('../clients.json');

function rrendClientFromList(){  
    var ind = Math.floor(Math.random() * 23)
    return cli[ind];
}
// // const clients = require('../clients.json');
// var arr =[];
// for(var i = 0 ; i < clients.length ; i++){
//     arr.push(clients[i]);
// }

// function rrendClientFromList2(){ 
     
//     var ind = Math.floor(Math.random() * clients.length);
//     console.log(arr[ind]);
//     return arr[ind];
// }
