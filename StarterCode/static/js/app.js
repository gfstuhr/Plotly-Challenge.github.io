    // creating bar plot
function bar_plot(index){
    d3.json("samples.json").then((data)=>{

        
        // creating data arrays
        var x_data=data.samples.map(row => row.sample_values);
        var y_data=data.samples.map(row => row.otu_ids);
        var y_hover=data.samples.map(row => row.otu_labels);
        
        y_data = y_data[index].slice(0,10);
        y_data = y_data.map(number => `OTU ${number}`)
        y_data.reverse();

        x_data = x_data[index].slice(0,10);
        x_data.reverse();

        // creating bar chart trace
        var trace1 = {
            x: x_data,
            y: y_data,
            type: 'bar',
            orientation: 'h',
            mode: 'markers',
            marker: {size:16},
            text: y_hover[index]
        };

        // defining bar chart data as an array
        var plot_data = [trace1];

        // plot layout
        var layout = {
        };

        // creating plot
        Plotly.newPlot("bar",plot_data,layout);
    });
};

    // creating bubble_chart
function bubble_chart(index){
    d3.json("samples.json").then((data)=>{

        // creating data arrays
        var x_data=data.samples.map(row => row.otu_ids);
        var y_data = data.samples.map(row => row.sample_values);
        var text_values = data.samples.map(row => row.otu_labels);

        // creating bubble chart trace
        var trace1 = {
            x: x_data[index],
            y: y_data[index],
            mode: 'markers',
            marker: {
                size: y_data[index],
                color: x_data[index] 
            },
            text: text_values[index]
        };

        // defining bubble chart data as an array
        var bubble_data = [trace1];

        // creating bubble chart layout
        var layout = {
            xaxis:{
                title: "OTU IDs"
            },
            showlegend: false
        };

        // creating bubble chart
        Plotly.newPlot("bubble",bubble_data,layout);
    });
};

// function gauge(index){
//     d3.json("samples.json").then((data)=>{
//         //Find Wash Frequency
//         var wash_data = data.metadata[index].wfreq

//         //Guage parameters
//         var data = [
//             {
//                 domain: { x: [0, 1], y: [0, 1] },
//                 value: 270,
//                 title: { text: "Belly Button Washing Frequency,<br>Washes per Week"},
//                 type: "indicator",
//                 mode: "gauge+number+delta"
//             }
//         ];
    
//     var layout = { width: 600, height: 500, margin: { t: 0, b: 0 } };
//     Plotly.newPlot('gauge', data, layout);

//     });
// };


// Filling in demographic info
function demo_info(index){
    d3.json("samples.json").then((data)=>{
        // creating bubble chart
        var id = data.metadata[index].id;
        var ethnicity = data.metadata[index].ethnicity;
        var gender = data.metadata[index].gender;
        var age = data.metadata[index].age;
        var location = data.metadata[index].location;
        var bbtype = data.metadata[index].bbtype;
        var wfreq = data.metadata[index].wfreq;

        var panel=d3.select("#sample-metadata")
            .html("")
            .append("p").text(`id: ${id}`)
            .append("p").text(`ethnicity: ${ethnicity}`)
            .append("p").text(`gender: ${gender}`)
            .append("p").text(`age: ${age}`)
            .append("p").text(`location: ${location}`)
            .append("p").text(`bbtype: ${bbtype}`)
            .append("p").text(`wfreq: ${wfreq}`)
    });
};
function drop_down(){
    d3.json("samples.json").then((data)=>{
// selecting drop_down
        var dropdownMenu=d3.select("#selDataset");
        // Inserting names into drop down menu
        names = data.names
        names.forEach((name)=>{
            var currentname = dropdownMenu.append("option");
            currentname.text(name);
            currentname.property("value",name);
        });
    });
};

function optionChanged(drop_down_value){
    d3.json("samples.json").then((data)=>{
        var index_results = data.names.findIndex(name => name === drop_down_value);
        bar_plot(index_results);
        bubble_chart(index_results);
        demo_info(index_results);
        gauge(index_results);
    });
};

// calling functions
// d3.selectAll("body").on("change",optionChanged);
bar_plot(0);
bubble_chart(0);
demo_info(0);
gauge(0);
drop_down();