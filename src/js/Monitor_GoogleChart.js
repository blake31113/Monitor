/**
 * Created by Blake on 2014/5/19.
 */
function drawAreaChart_ComponentInfo()
{
    for(var i=0;i<area_chart_data.length;i++)
    {
        area_chart_data[i] = google.visualization.arrayToDataTable(area_chart_data_array[i]);//google arrayToDateTable
        area_chart_options = //the parameter of the area chart
        {
            title: 'CPU&RAM using',
            hAxis: {title: '',  titleTextStyle: {color: '#333333'}},
            vAxis: {minValue: 0,maxValue:100},
            width: 500
        };
        var divName='area_chart'+ i.toString();
        area_chart[i] = new google.visualization.AreaChart(document.getElementById(divName));//chart will display on area_div
        area_chart[i].draw(area_chart_data[i], area_chart_options);
    }
}
function updateAreaChart()
{
    for(var j=0;j<area_chart_data.length;j++)
    {
        var now=new Date();
        for(var i=0;i<(area_chart_data[j].getNumberOfRows()-1);i++)//update data of area chart(past data is replaced by present data)
        {
            area_chart_data[j].setValue(i,0,area_chart_data[j].getValue(i+1,0).toString());//update CPU of area chart(0~99)
            area_chart_data[j].setValue(i,1,area_chart_data[j].getValue(i+1,1));//update CPU of area chart(0~99)
            area_chart_data[j].setValue(i,2,area_chart_data[j].getValue(i+1,2));//update RAM of area chart(0~99)
        }
        area_chart_data[j].setValue((area_chart_data[j].getNumberOfRows()-1),0,now.getMinutes().toString()+"'"+now.getSeconds().toString()+"\"");////update CPU of area chart(100)
        if(componentBucket[AreaChartSelect[j]]!=null&&componentBucket[AreaChartSelect[j]].dataInfo!=null)
        {
            area_chart_data[j].setValue((area_chart_data[j].getNumberOfRows()-1),1,componentBucket[AreaChartSelect[j]].dataInfo.getValue(0,1));////update CPU of area chart(100)
            area_chart_data[j].setValue((area_chart_data[j].getNumberOfRows()-1),2,componentBucket[AreaChartSelect[j]].dataInfo.getValue(1,1));//update RAM of area chart(100)
        }
        area_chart[j].draw(area_chart_data[j], area_chart_options);//repaint area_chart

    }
}
function changeAreaChart(numberOfChart)
{
    var DOMName="select_component_chart"+numberOfChart.toString();
    var select=document.getElementById(DOMName).value;
    AreaChartSelect[numberOfChart]=select;
    for(var i=0;i<(area_chart_data[numberOfChart].getNumberOfRows());i++)//update data of area chart(past data is replaced by present data)
    {
//        area_chart_data[select].setValue(i,0,area_chart_data[select].getValue(i+1,0).toString());//update CPU of area chart(0~99)
        area_chart_data[numberOfChart].setValue(i,1,0);//update CPU of area chart(0~99)
        area_chart_data[numberOfChart].setValue(i,2,0);//update RAM of area chart(0~99)
    }
}
function updateSelectAreaChart()
{
    for(var i=0;i<3;i++)
    {
        var DOMName="select_component_chart"+i.toString();
        var select=document.getElementById(DOMName);
//        console.log(select);
        select.innerHTML=null;
        for(var j=0;j<componentBucket.length;j++)
        {
            var type=Math.floor(componentBucket[j].componentType/10);
            if(type==1)
            {
                var option=document.createElement("option");
                option.innerHTML=componentBucket[j].componentName;
                option.setAttribute("value",j);
                select.appendChild(option);
            }
        }
    }
}
function setAreaChartSelect()
{
    var area=0;
    for(var i=0;i<3;i++)
    {
        while(area<componentBucket.length)
        {
            var type=Math.floor(componentBucket[area].componentType/10);
            if(type==1)
            {
                document.getElementById("select_component_chart"+ i.toString()).value=area;
                AreaChartSelect[i]=area;
                console.log(area);
                area++;
                break;
            }
            area++;
        }
    }
}