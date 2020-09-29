d3.json("samples.json").then((data)=>{
    // creating bar plot
    function bar_plot(){
        // var top_10=data.sort((a,b)=>b.samples[0].sample_values-a.samples[0].sample_values);
        // top_10=top_10.slice(0,10);
        
        // creating data arrays
        var x_data=data.samples.map(row => row.sample_values);
        var y_data=data.samples.map(row => row.otu_ids);
        var y_hover=data.samples.map(row => row.otu_labels);
        
        // creating bar chart trace
        var trace1 = {
            x: x_data[0],
            y: y_data[0],
            type: 'bar',
            orientation: 'h',
            mode: 'markers',
            marker: {size:16},
            text: y_hover[0]
        };

        // defining bar chart data as an array
        var plot_data = [trace1];

        // plot layout
        var layout = {
            yaxis:{
                tickprefix: "OTU "
            }
        };

        // creating plot
        Plotly.newPlot("bar",plot_data,layout);
    };

    // creating bubble_chart
    function bubble_chart(){
        
        // creating data arrays
        var x_data=data.samples.map(row => row.otu_ids);
        var y_data = data.samples.map(row => row.sample_values);
        var text_values = data.samples.map(row => row.otu_labels);

        // creating bubble chart trace
        var trace1 = {
            x: x_data[0],
            y: y_data[0],
            mode: 'markers',
            marker: {
                size: y_data[0],
                color: x_data[0] 
            },
            text: text_values[0]
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
    };

    // Filling in demographic info
    function demo_info(){
        var id = data.metadata[0].id;
        var ethnicity = data.metadata[0].ethnicity;
        var gender = data.metadata[0].gender;
        var age = data.metadata[0].age;
        var location = data.metadata[0].location;
        var bbtype = data.metadata[0].bbtype;
        var wfreq = data.metadata[0].wfreq;

        var panel=d3.select("#sample-metadata")
            .append("p").text(`id: ${id}`)
            .append("p").text(`ethnicity: ${ethnicity}`)
            .append("p").text(`gender: ${gender}`)
            .append("p").text(`age: ${age}`)
            .append("p").text(`location: ${location}`)
            .append("p").text(`bbtype: ${bbtype}`)
            .append("p").text(`wfreq: ${wfreq}`)
    };

    // calling functions
    bar_plot();
    bubble_chart();
    demo_info();

});