var cities = [{
    cityEng: "Jerusalem",
    cityHeb: "ירושלים"
},
{
    cityEng: "Naaria",
    cityHeb: "נהריה"
},
{
    cityEng: "Haifa",
    cityHeb: "חיפה"
},
{
    cityEng: "Tel-Aviv",
    cityHeb: "תל אביב"
},
{
    cityEng: "Ashdod",
    cityHeb: "אשדוד"
},
{
    cityEng: "Ashkelon",
    cityHeb: "אשקלון"
},
{
    cityEng: "Beer-Sheva",
    cityHeb: "באר שבע"
}
]

var topics = [{
    topicEng: "Medical",
    topicHeb: "טיפול רפואי"
},
{
    topicEng: "Drugs",
    topicHeb: "תרופות"
},
{
    topicEng: "Food",
    topicHeb: "מזון"
},
{
    topicEng: "Water",
    topicHeb: "מים"
},
{
    topicEng: "Shelter",
    topicHeb: "מיגון"
},
{
    topicEng: "Information",
    topicHeb: "מידע"
},
{
    topicEng: "Evacuation",
    topicHeb: "פינוי"
}
]

var languages = [{
    langEng: "Hebrew",
    langHeb: "עברית"
},
{
    langEng: "English",
    langHeb: "אנגלית"
},
{
    langEng: "Amharic",
    langHeb: "אמהרית"
},
{
    langEng: "Russian",
    langHeb: "רוסית"
},
{
    langEng: "Arabic",
    langHeb: "ערבית"
},
{
    langEng: "Thai",
    langHeb: "תאילנדית"
}
]

var genders = [{
    genderEng: "Male",
    genderHeb: "גבר"
},
{
    genderEng: "Female",
    genderHeb: "אישה"
}]
var c1=[111111111,"Yuval" , "Yahod" , "Petah Tikva" , "1998-06-24", "Female" , "0"];
var c2=[222222222,"Maayan" , "Sulimani" , "Rehovot" , "1995-05-24", "Female" , "0"];
var c3=[333333333,"Dvir" , "Cohen" , "Rehovot" , "1999-02-24", "Male" , "0"];
var cli=[c1 , c2,c3];

function rrendClientFromList(){  
    var ind = Math.floor(Math.random() * 3)
    return cli[ind];
}
try{
    module.exports = {genders, languages, cities, topics}
}
catch(error){
    
}