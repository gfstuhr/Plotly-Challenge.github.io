d3.json("samples.json").then((data)=>{
    // creating bar plot
    function bar_plot(index){
        // var top_10=data.sort((a,b)=>b.samples[0].sample_values-a.samples[0].sample_values);
        // top_10=top_10.slice(0,10);
        
        // creating data arrays
        var x_data=data.samples.map(row => row.sample_values);
        var y_data=data.samples.map(row => row.otu_ids);
        var y_hover=data.samples.map(row => row.otu_labels);
        
        // creating bar chart trace
        var trace1 = {
            x: x_data[index],
            y: y_data[index],
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
            yaxis:{
                tickprefix: "OTU "
            }
        };

        // creating plot
        Plotly.newPlot("bar",plot_data,layout);
    };

    // creating bubble_chart
    function bubble_chart(index){
        
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
    };

    // Filling in demographic info
    function demo_info(index){
        var id = data.metadata[index].id;
        var ethnicity = data.metadata[index].ethnicity;
        var gender = data.metadata[index].gender;
        var age = data.metadata[index].age;
        var location = data.metadata[index].location;
        var bbtype = data.metadata[index].bbtype;
        var wfreq = data.metadata[index].wfreq;

        var panel=d3.select("#sample-metadata")
            .append("p").text(`id: ${id}`)
            .append("p").text(`ethnicity: ${ethnicity}`)
            .append("p").text(`gender: ${gender}`)
            .append("p").text(`age: ${age}`)
            .append("p").text(`location: ${location}`)
            .append("p").text(`bbtype: ${bbtype}`)
            .append("p").text(`wfreq: ${wfreq}`)
    };
    function drop_down(){
        // selecting drop_down
        var dropdownMenu=d3.select("#selDataset");
        // Inserting names into drop down menu
        names = data.names
        names.forEach((name)=>{
            var currentname = dropdownMenu.append("option");
            currentname.text(name);
            currentname.property("value",name);
        });
    };

    // calling functions
    bar_plot(0);
    bubble_chart(0);
    demo_info(0);
    drop_down();

});