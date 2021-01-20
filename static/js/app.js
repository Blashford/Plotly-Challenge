d3.json("data/samples.json").then(data => {
    data.names.forEach(id => {
        
        d3.select("#selDataset").append("option").text(id)
    })
    
    d3.select("#selDataset").on("change", updateDash)

    function updateDash() {
        var input = d3.select("#selDataset").property("value")
        console.log(input)
        var inputData = data.samples.find(x => {
            if (input === x.id) {
                return x
            };
        }); 

        var samVal = inputData.sample_values
        var barVal = samVal.slice(0,10);
        console.log(barVal);

        var samId = inputData.otu_ids
        var barId = samId.map(i => "OTU " + i).slice(0,10);
        console.log(barId);

        var hovText = inputData.otu_labels
        var barLab = hovText.slice(0,10);
        console.log(barLab);

        var trace1 = {
            y: barId,
            x: barVal,
            text: barLab,
            type: "bar",
            orientation: "h"
        };
        var config = {responsive: true};
        var ploty = [trace1];
        var layout1 = {
            xaxis: {title: "Sample Values"},
            yaxis: {title: "OTU IDs"}
        }
        Plotly.newPlot("bar", ploty, layout1, config);

        var trace2 = {
            x: samId,
            y: samVal,
            text: hovText,
            mode: "markers",
            marker: {
                color: samId,
                size: samVal,
                sizeref: 1.25
            }
        };
        var ploty2 = [trace2];
        var layout2 = {
            xaxis: {title: "OTU IDs"}
        }
        Plotly.newPlot("bubble", ploty2, layout2)

        var inputMeta = data.metadata.find(x=>{
            if(parseInt(input) === x.id){
                return x
            };
        });
        console.log(inputMeta)
        d3.select("#sample-metadata").text("")
        for (var y in inputMeta) {
            d3.select("#sample-metadata").append("p").text(`${y}: ${inputMeta[y]}`).attr("class", "text-wrap");
        };
        var washy = inputMeta.wfreq
        var trace3 = {
            domain: {x:[0,1], y:[0,1]},
            value: washy,
            title: {text: "Belly Button Washing Frequency"},
            type: "indicator",
            mode: "gauge",
            gauge: {
                axis: {range: [null, 9]},
                steps: [
                    {range: [0,1], color: "#ffffcc"},
                    {range: [1,2], color: "#ffff99"},
                    {range: [2,3], color: "#ffff66"},
                    {range: [3,4], color: "#b3ffb3"},
                    {range: [4,5], color: "#99ff99"},
                    {range: [5,6], color: "#80ff80"},
                    {range: [6,7], color: "#99ff66"},
                    {range: [7,8], color: "#66ff66"},
                    {range: [8,9], color: "#33cc33"}
                ]
            },
        }
        var ploty3 = [trace3]
        Plotly.newPlot("gauge", ploty3, config)
    };
    updateDash()
});
