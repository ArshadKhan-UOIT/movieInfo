$(document).ready(function() {
    var startDate = new Date(2022, 0, 4);

    $("#datepicker").datepicker();
    $("#datepicker").datepicker("setDate", startDate);

    let div = document.createElement('div');
    div.setAttribute('class','row');

    $("#button").click(function() {
        console.log("button clicked!");
        $("#showtimes").empty();
        var loc = $('#loc').find(":selected").text();
        console.log(loc);
        
        var date = $('#datepicker').val();
        console.log(date);
        let day = date.split('/')[0];
        console.log(day);
        let month = date.split('/')[1];
        console.log(month);
        let year = date.split('/')[2];
        console.log(year);
        

        let table = document.createElement('table');
        table.setAttribute('id','showtimes');
        table.setAttribute('class','showtimes column');
        let tr, td, title, times;

        fetch(`showtimes.json`)
        .then(response => response.json())
        .then(json => {
            for (let i=0;i<json.length; i++) {
                let jyear = json[i].date.split('/')[0];
                let jmonth = json[i].date.split('/')[1];
                let jday = json[i].date.split('/')[2];
                if (json[i].location == loc && jyear == year && jmonth == month && jday == day) {
                    console.log(json[i]);
                    tr = document.createElement('tr');
                    tr.setAttribute('id','' + json[i].id);
                    tr.setAttribute('class','trCss');
                    title = document.createElement('td');
                    title.setAttribute('id','' + json[i].id);
                    title.textContent = json[i].title;
                    title.setAttribute('class','tdCss');
                    tr.appendChild(title);
                    td = document.createElement('td');
                    td.setAttribute('class','tdCss');
                    td.setAttribute('id','' + json[i].id);
                    for (let j=0;j<json[i].times.length;j++) {
                        times = document.createElement('p');
                        times.textContent = json[i].times[j];
                        // tr.appendChild(times);
                        td.appendChild(times);
                    }
                    tr.appendChild(td);
                    table.appendChild(tr);
                }
            }
            console.log(json);
            console.log(json.length);
            console.log(json[0].location);
        });
        div.appendChild(table);
        document.body.appendChild(div);
        // $("#showtimes").click(function(event) {
        //     console.log("showtime clicked!")
        //     console.log(event.target.id); 
        // });

        $(".showtimes").click(function(event) {
            console.log("tr clicked!")
            let movieID = event.target.id
            console.log(movieID);
            $('#movieInfo').remove();

            let newdiv = document.createElement('div');
            newdiv.setAttribute('class','column');
            newdiv.setAttribute('id','movieInfo');

            fetch(`https://www.omdbapi.com/?i=${movieID}&apikey=319e0a9a`)
            .then(response => response.json())
            .then(json => {
                let table, tr, td;
                table = document.createElement('table');
                table.setAttribute('class','details');

                console.log(json);

                const details = ['Title', 'Year', 'Genre', 'Runtime', 'Director', 'Writer', 'Actors'];
                const jsonDetails = [json.Title, json.Year, json.Genre, json.Runtime, json.Director, json.Writer, json.Actors];

                var img = new Image(); 
                img.src = json.Poster;
                newdiv.appendChild(img);
                
                for (let i=0; i<details.length; i++) {
                    tr = document.createElement('tr');
                    td = document.createElement('td');
                    td.textContent = details[i] + ':';
                    td.setAttribute('class','headings');
                    tr.appendChild(td);

                    td = document.createElement('td');
                    td.setAttribute('class','info');
                    td.textContent = jsonDetails[i];
                    tr.appendChild(td);

                    table.appendChild(tr);
                }
                newdiv.appendChild(table);

                div.appendChild(newdiv);
                document.body.appendChild(div);

            });

        });


    });
    // api: https://www.omdbapi.com/?i=tt3896198&apikey=319e0a9a

});