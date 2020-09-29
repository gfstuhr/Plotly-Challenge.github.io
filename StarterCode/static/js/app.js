d3.json("samples.json").then((data)=>{
    // var top_10=data.sort((a,b)=>b.samples[0].sample_values-a.samples[0].sample_values);
    // top_10=top_10.slice(0,10);

    var x_data=data.samples.map(row => row.sample_values);
    var y_data=data.samples.map(row => row.otu_ids);
    var y_hover=data.samples.map(row => row.otu_labels);
    // console.log(top_10);
    
    var trace1 = {
        x: x_data[0],
        y: y_data[0],
        type: 'bar',
        orientation: 'h',
        mode: 'markers',
        marker: {size:16},
        text: y_hover[0]
    };

    var plot_data = [trace1];

    var layout = {
        yaxis:{
            tickprefix: "OTU "
        }
    };

    Plotly.newPlot("bubble",plot_data,layout);
});