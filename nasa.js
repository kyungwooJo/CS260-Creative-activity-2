function onClick1(e) {
    e.preventDefault();
    // setup URL
    let url = "https://api.nasa.gov/planetary/apod?api_key=8c3WzO9nJ0AZWnQyweOW0BADhlTOr4B7WELaKQDe";
    // call API
    fetch(url)
      .then(function(response) {
        // make sure the request was successful
        if (response.status != 200) {
          return {
            text: "Error calling the Numbers API service: " + response.statusText
          }
        }
        return response.json();
      }).then(function(json) {
        // update DOM with response
        document.getElementById('imageDate').innerHTML = json.date;
        document.getElementById('imageTitle').innerHTML = json.title;
        updateResult(json.hdurl);
        document.getElementById('imageExplanation').innerHTML = json.explanation
      });
  }

  function eventBtnClick(e) {
    e.preventDefault();
    //get values
    let di = document.getElementById('disasterSelector');
    let disasterCategory = di.options[di.selectedIndex].value;
    let ev = document.getElementById('eventNumSelector');
    let totalEventNum = ev.options[ev.selectedIndex].value;
  
    // setup URL
    let url = "https://eonet.sci.gsfc.nasa.gov/api/v3/categories/" + disasterCategory + "?limit=" + totalEventNum;
    // call API
    fetch(url)
      .then(function(response) {
        // make sure the request was successful
        if (response.status != 200) {
          return {
            text: "Error calling the Numbers API service: " + response.statusText
          }
        }
        return response.json();
      }).then(function(json) {
        // update DOM with response
        let eventSummary = "";
        
        if(disasterCategory === "wildfires"){
        for(let i=0; i < json.events.length; i++){
            eventSummary += "<h3>" +  json.events[i].title + "</h3>";
            eventSummary += "<p>"  +  moment(json.events[i].geometry[0].date).format('MMMM Do YYYY, h:mm:ss a') + "</p>";
            eventSummary += "<p>Location: "+ json.events[i].geometry[0].coordinates[0] + "(longitude) " + json.events[i].geometry[0].coordinates[1] + "(latitude)</p>"
            eventSummary += "<a href = " + json.events[i].sources[0].url + ">Related Link" + "</a>"; 
          }
     }

        if(disasterCategory === "volcanoes"){
            for(let i=0; i < json.events.length; i++){
            eventSummary += "<h3>" +  json.events[i].title + "</h3>";
            eventSummary += "<p>"  +  moment(json.events[i].geometry[0].date).format('MMMM Do YYYY, h:mm:ss a') + "</p>";
            eventSummary += "<p>Location: "+ json.events[i].geometry[0].coordinates[0] + "(longitude) " + json.events[i].geometry[0].coordinates[1] + "(latitude)</p>"
            eventSummary += "<a href = " + json.events[i].sources[0].url + ">Related Link" + "</a>"; 
            }        
        }

        if(disasterCategory === "severeStorms"){
          for(let i=0; i < json.events.length; i++){
            eventSummary += "<h3>" +  json.events[i].title + "</h3>";
            eventSummary += "<p>"  +  moment(json.events[i].geometry[0].date).format('MMMM Do YYYY, h:mm:ss a') + "</p>";
            eventSummary += "<p>Location: "+ json.events[i].geometry[0].coordinates[0] + "(longitude) " + json.events[i].geometry[0].coordinates[1] + "(latitude)</p>"
            eventSummary += "<a href = " + json.events[i].sources[0].url + ">Related Link" + "</a>"; 
            }   
        }

       document.getElementById("eventResults").innerHTML = eventSummary;
        
      });
  }

  function sunsetBtnClick(e) {
    e.preventDefault();
    
    //Get information from the box
    let latitude = document.getElementById('latInputBox').value;
    let longitude = document.getElementById('longInputBox').value;
    let yearSel = document.getElementById('dateYear');
    let yearSelVal = yearSel.options[yearSel.selectedIndex].value;
    let monthSel = document.getElementById('dateMonth');
    let monthSelVal = monthSel.options[monthSel.selectedIndex].value;
    let daySel = document.getElementById('dateDay');
    let daySelVal = daySel.options[daySel.selectedIndex].value;
    // setup URL
    let url = "https://api.sunrise-sunset.org/json?lat=" + latitude + "&lng=" + longitude + "&date=" +yearSelVal +"-" +monthSelVal + "-" + daySelVal;
    let eventSummary = "";
    // call API
    fetch(url)
      .then(function(response) {
        // make sure the request was successful
        if (response.status != 200) {
          return {
            text: "Error calling the Numbers API service: " + response.statusText
          }
        }
        return response.json();
      }).then(function(json) {
        // update DOM with response
        eventSummary += "<p> Expected sunrise time: " +  json.results.sunrise + "</p>";
        eventSummary += "<p> Expected sunset time: " +  json.results.sunset + "</p>";
        eventSummary += "<p> Total daytime: " +  json.results.day_length + "</p>";
        document.getElementById("sunsetResults").innerHTML = eventSummary;
      
      });
  }
  
 function updateResult(url) {
    document.getElementById('apodImg').src = url; 
 }
  
  document.getElementById('apodGetButton').addEventListener('click', onClick1);
  document.getElementById('eventGetButton').addEventListener('click',eventBtnClick);
  document.getElementById('sunsetGetButton').addEventListener('click',sunsetBtnClick);


