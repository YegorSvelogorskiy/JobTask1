let photosUrl = "https://services.odata.org/V4/(S(1ygqx11nztz5vjjx22ow10jk))/TripPinServiceRW/Photos?$count=true&$format=application/json;odata.metadata=none&";
let peopleUrl = "https://services.odata.org/V4/(S(1ygqx11nztz5vjjx22ow10jk))/TripPinServiceRW/People?$count=true&$format=application/json;odata.metadata=none&";
let baseUrl = "https://services.odata.org/V4/(S(1ygqx11nztz5vjjx22ow10jk))/TripPinServiceRW/";

$(function(){
    //orderBy
    makeRequest( "Photos order by id asc",`${photosUrl}$orderby=Id asc`);
    //search
    makeRequest( "Search people by value 'Russell'",`${[peopleUrl]}$search=Russell`);
    //top
    makeRequest( "Top 2 persons",`${[peopleUrl]}$top=2`);
    //select
    makeRequest( "Select UserName, FirstName",`${[peopleUrl]}$select=UserName, FirstName`);
    //skip
    makeRequest( "Skip 4 photoes",`${[photosUrl]}$skip=4`);
    //filter
    makeRequest( "Filter by firstName start with S",`${[peopleUrl]}$filter=startswith(FirstName, 'S')`);
    //filter with 3 params
    makeRequest( "Filter by Email endsWith 'contoso.com' or City contains 'Bo' and has Male Gender ",
        `${[peopleUrl]}$filter=(Emails/any(s:endswith(s, 'contoso.com')))
                           or (AddressInfo/any(r:contains(r/City/Name, 'Bo'))) 
                           and (Gender eq Microsoft.OData.SampleService.Models.TripPin.PersonGender'Male')`);
});

function makeRequest(name, url) {

    $.getJSON(url, function(data) {
        let items = [];

        $.each(data.value, function (key, value) {

            let item = "";

            $.each(value, function (key, value) {
                item += `<td>${value}</td>`;
            });

            items.push(`<tr id='${key}'>${item}</tr>`);
        });

        items.push(`<tr><td>Count: ${data["@odata.count"]}</td></tr>`);

        $("<h1/>", {
            html: `${name}`
        }).appendTo("#container");

        $("<table/>", {
            class: "table table-striped",
            // id: "content" + name,
            html: `<tbody>${items.join("")}</tbody>`
        }).appendTo("#container");
    });
}