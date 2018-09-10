const Chart = require ('chart.js');
const request = require ('request');

let startDate;
let endDate;

var params = window
    .location
    .search
    .replace('?','')
    .split('&')
    .reduce(
        function(p,e){
            var a = e.split('=');
            p[ decodeURIComponent(a[0])] = decodeURIComponent(a[1]);
            return p;
        },
        {}
    );

if (typeof params['currency'] != 'undefined' && params['currency'] != '') {
    document.getElementById("currency").value = ''+params['currency']+'';
} else {
    document.getElementById("currency").value = 'USD';
}

let e = document.getElementById("currency");
let currency = e.options[e.selectedIndex].text;
let Cur_ID = '';

if(currency == 'USD'){
    Cur_ID = 145;
} else if(currency == 'EUR'){
    Cur_ID = 292;
} else if(currency == 'RUR'){
    Cur_ID = 298;
}

startDate = new Date();
endDate = new Date();
startDate.setDate(endDate.getDate()-7);
startDate = `${startDate.getFullYear()}-${startDate.getMonth()+1}-${startDate.getDate()}`;
endDate = `${endDate.getFullYear()}-${endDate.getMonth()+1}-${endDate.getDate()}`;
let url = `http://www.nbrb.by/API/ExRates/Rates/Dynamics/${Cur_ID}?startDate=${startDate}&endDate=${endDate}`;

request(url, function (error, response, body) {
    let vault = JSON.parse(body);
    let allWeek = [];
    let course = [];
    for (i=0; i<7; i++){
        allWeek.push(vault[i].Date);
        course.push(vault[i].Cur_OfficialRate);
    }

    new Chart(document.getElementById("line-chart"), {
        type: 'line',
        data: {
            labels: allWeek,
            datasets: [{
                data: course,
                borderColor: "#3e95cd",
                fill: false
            }]
        },
        options: {
            legend: { display: false },
            title: {
                display: true,
                text: `Курс ${currency}`
            }
        }
    });
});