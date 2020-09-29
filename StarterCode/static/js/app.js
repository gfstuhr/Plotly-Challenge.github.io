d3.json("samples.json").then((data)=>{
    // creating bar plot
    function bar_plot(){
        // var top_10=data.sort((a,b)=>b.samples[0].sample_values-a.samples[0].sample_values);
        // top_10=top_10.slice(0,10);
        
        // creating data arrays
        var x_data=data.samples.map(row => row.sample_values);
        var y_data=data.samples.map(row => row.otu_ids);
        var y_hover=data.samples.map(row => row.otu_labels);
        // console.log(top_10);
        
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

    // calling plot functions
    bar_plot();
    bubble_chart();

});