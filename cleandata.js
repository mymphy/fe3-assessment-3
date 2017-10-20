/*---------------------------------
    Data cleanen
----------------------------------*/

var doc = d3.text('./index.csv')
.mimeType('text/plain;charset=iso88591') // Removed the strange signs from the data.
.get(onload);

function onload(err, doc) {
if (err) throw err;

doc = doc.replace(/"/g, '') // Remove doube quotes (stackoverflow)
doc = doc.replace(/;/g, ', ') // Remove semicolon

var header = doc.indexOf('2005');
var footer = doc.indexOf('© Centraal');

doc = doc.slice(header, footer); //Removes the header and footer

// First data set
var vacation = d3.csvParseRows(doc, vacationNum)
function vacationNum(d) {
  return {
    year: d[0],
    totaalNed: Number(d[3]),
    totaalBuiten: Number(d[28]) 
  }
}

//Second data set
var dataCountries = d3.csvParseRows(doc, countries)
function countries(d) {
    // Vakanties buiten Nederland
    return {
        year: d[0], 
        Country: [
            "België", "Luxemburg", "Frankrijk", "Spanje", "Portugal","Oostenrijk", "Zwitserland"
        ], 
        Code: ["BEL", "LUX", "FRA", "ESP", "PRT", "AUT", "CHE"],
        vacationNum: [
            Number(d[29]), 
            Number(d[30]), 
            Number(d[31]), 
            Number(d[32]), 
            Number(d[33]), 
            Number(d[34]), 
            Number(d[35]), 
        ]
    }
}

// console.log(vacation)
// console.log(dataCountries)

}
