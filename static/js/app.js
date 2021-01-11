function compareDesc(a,b) {
    return b-a
};
function compareAsc(a,b) {
    return a-b
};

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
        var ploty = [trace1];
        Plotly.newPlot("bar", ploty);

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
        Plotly.newPlot("bubble", ploty2)

        
    }
})