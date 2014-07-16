const constDisplayTextDisplay=45;
function moveImage(target)
{
    var p=target;
    var left= p.left;
    var top= p.top;
    p.displayText.left= left;
    p.displayText.top = top+constDisplayTextDisplay;
    var diff_y1;
    var diff_x1;
    var diff_y2;
    var diff_x2;
    var diff=50;
    var NIC=p.MainComponent.NIC;
    for (var i = 0; i<NIC.length; i++)
    {
        if(NIC[i].fabricLinkComponent!=null)
        {
            diff_y1=top-NIC[i].fabricLinkComponent.y1;
            diff_x1=left-NIC[i].fabricLinkComponent.x1;
            diff_y2=top-NIC[i].fabricLinkComponent.y2;
            diff_x2=left-NIC[i].fabricLinkComponent.x2;
            if((diff_y1>-diff&&diff_y1<diff)&&(diff_x1>-diff&&diff_x1<diff))
            {
                NIC[i].fabricLinkComponent && NIC[i].fabricLinkComponent.set({ 'x1': left, 'y1': top });
                NIC[i].fabricLinkComponent.updateCoords();
                canvas.renderAll();
            }
            else if((diff_y2>-diff&&diff_y2<diff)&&(diff_x2>-diff&&diff_x2<diff))
            {
                NIC[i].fabricLinkComponent && NIC[i].fabricLinkComponent.set({ 'x2': left, 'y2': top });
                NIC[i].fabricLinkComponent.updateCoords();
                canvas.renderAll();
            }
        }
    }
}
function moveGroup(target,top,left)
{
    var p=target;
    var left= left;
    var top= top;
    p.displayText.left= left;
    p.displayText.top = top+constDisplayTextDisplay;
    var diff_y1;
    var diff_x1;
    var diff_y2;
    var diff_x2;
    var diff=50;
    var NIC=p.MainComponent.NIC;
    for (var i = 0; i<NIC.length; i++)
    {
        if(NIC[i].fabricLinkComponent!=null)
        {
            diff_y1=top-NIC[i].fabricLinkComponent.y1;
            diff_x1=left-NIC[i].fabricLinkComponent.x1;
            diff_y2=top-NIC[i].fabricLinkComponent.y2;
            diff_x2=left-NIC[i].fabricLinkComponent.x2;
            if((diff_y1>-diff&&diff_y1<diff)&&(diff_x1>-diff&&diff_x1<diff))
            {
                NIC[i].fabricLinkComponent && NIC[i].fabricLinkComponent.set({ 'x1': left, 'y1': top });
                NIC[i].fabricLinkComponent.updateCoords();
                canvas.renderAll();
            }
            else if((diff_y2>-diff&&diff_y2<diff)&&(diff_x2>-diff&&diff_x2<diff))
            {
                NIC[i].fabricLinkComponent && NIC[i].fabricLinkComponent.set({ 'x2': left, 'y2': top });
                NIC[i].fabricLinkComponent.updateCoords();
                canvas.renderAll();
            }
        }
    }
}
function createFabricComponent(tempType,X,Y,Component)
{
    var img = new Image;
    img.src = ComponentIconURLListvar[Math.floor(tempType/10)-1][tempType%10];
    var fabricComponent=new fabric.Image(img,{
        top 	:Y,
        left 	:X,
        width	:72,
        height	:72,
        hasBorders:	false,
        hasControls:false
    });
    fabricComponent.MainComponent=Component;
    fabricComponent.setDisText=function()
    {
        fabricComponent.displayText=new  fabric.Text(Component.componentName,
            {
                left: fabricComponent.left,
                top: fabricComponent.top+constDisplayTextDisplay,
                fontSize: 20
            });
        canvas.add(fabricComponent.displayText);
        fabricComponent.displayText.selectable=false;
    }
    canvas.add(fabricComponent);
    fabricComponent.setDisText();
    return fabricComponent;
}
function createFabricLinkComponent(com1_fabricComponent,com2_fabricComponent,com1_fabricLinkComponent,com2_fabricLinkComponent,index)
{
    var coords=[ com1_fabricComponent.left, com1_fabricComponent.top,com2_fabricComponent.left, com2_fabricComponent.top ];
    var link=new fabric.Line(coords,
        {
            fill: '00FA80',
            stroke: '00FA80',
            strokeWidth: 5,
            selectable: false
        });
    link.setDisText=function()
    {
        link.displayText=new  fabric.Text(index.toString(),
            {
                left: (link.x1+link.x2)/2,
                top: (link.y1+link.y2)/2,
                fontSize: 20
            });
        canvas.add(link.displayText);
        link.displayText.selectable=false;
    }
    link.updateCoords=function()
    {
        link.displayText.left=(link.x1+link.x2)/2;
        link.displayText.top=(link.y1+link.y2)/2;
    }
    link.setDisText();
    canvas.add(link);
    canvas.sendToBack(link);
    return link;
}
function changeSliceSelect()
{
    var select=document.getElementById('SliceSelect').value;

    if(select==-1)
    {
        for(var i=0;i<componentBucket.length;i++)
        {
            ComponentBringToFront(componentBucket[i]);
        }
    }
    else if(select==-2)
    {
        for(var i=0;i<componentBucket.length;i++)
        {
            if(componentBucket[i].slice==null)
                ComponentBringToFront(componentBucket[i]);
            else
                ComponentSendToBack(componentBucket[i]);
        }
    }
    else
    {
        for(var i=0;i<componentBucket.length;i++)
        {
            if(componentBucket[i].slice==SliceBucket[select])
                ComponentBringToFront(componentBucket[i]);
            else
                ComponentSendToBack(componentBucket[i]);
        }
    }
}
function ComponentBringToFront(Component)
{
    Component.fabricComponent.visible=true;
    Component.fabricComponent.displayText.visible=true;
    for(var i=0;i<Component.NIC.length;i++)
    {
        if(Component.NIC[i].fabricLinkComponent!=null)
        {
            Component.NIC[i].fabricLinkComponent.visible=true;
            Component.NIC[i].fabricLinkComponent.displayText.visible=true;
        }
    }
    canvas.renderAll();
}
function ComponentSendToBack(Component)
{
    Component.fabricComponent.visible=false;
    Component.fabricComponent.displayText.visible=false;
    for(var i=0;i<Component.NIC.length;i++)
    {
        if(Component.NIC[i].fabricLinkComponent!=null)
        {
            Component.NIC[i].fabricLinkComponent.visible=false;
            Component.NIC[i].fabricLinkComponent.displayText.visible=false;
        }
    }
    canvas.renderAll();
}
function updateSelectSlice()
{
    var select=document.getElementById('SliceSelect');
    select.innerHTML=null;
    //<option value="-1">Overview</option>
    //<option value="-2">Non-Slice</option>
    var Overview_option=document.createElement("option");
    Overview_option.innerHTML="Overview";
    Overview_option.setAttribute("value",-1);
    select.appendChild(Overview_option);

    var Non_Slice=document.createElement("option");
    Non_Slice.innerHTML="Non_Slice";
    Non_Slice.setAttribute("value",-2);
    select.appendChild(Non_Slice);

    for(var j=0;j<SliceBucket.length;j++)
    {
        var option=document.createElement("option");
        option.innerHTML=SliceBucket[j].SliceName;
        option.setAttribute("value",j);
        select.appendChild(option);
    }
}
function updateFabricComponent()
{
    for(var i=0;i<componentBucket.length;i++)
    {

        if(componentBucket[i].dataInfo!=null)
        {
            var CPURate=componentBucket[i].dataInfo.getValue(0,1);
            var RAMRate=componentBucket[i].dataInfo.getValue(1,1);
            if(CPURate>80||RAMRate>80)//<!--danger active warning success-->
                componentBucket[i].fabricComponent.stroke='red';
            else if((CPURate>50&&CPURate<=80)||(RAMRate>50&&RAMRate<=80))
            {
                componentBucket[i].fabricComponent.stroke='orange';
            }
            else
                componentBucket[i].fabricComponent.stroke=null;
            canvas.renderAll();
        }
        if(componentBucket[i].componentStatus!=null)
        {
            var status=componentBucket[i].componentStatus;
            if (status==0)//<!--danger active warning success-->
            {
                componentBucket[i].fabricComponent.stroke='red';
            }
            else if (status==1)
            {
                componentBucket[i].fabricComponent.stroke='green';
            }
            else if(status==2)
            {
                componentBucket[i].fabricComponent.stroke= "orange";
            }
            else if(status==3)
            {
                componentBucket[i].fabricComponent.stroke= "blue";
            }
            canvas.renderAll();
        }
    }
}
function updateFabricLineComponent()
{
    for(var i=0;i<componentBucket.length;i++)
    {
        if(componentBucket[i].NIC!=null)
        {
            for(var j=0;j<componentBucket[i].NIC.length;j++)
            {
                if(componentBucket[i].NIC[j].fabricLinkComponent!=null)
                {
                    var linkUtilization=componentBucket[i].NIC[j].utilization.innerData;
                    if(linkUtilization>80)//<!--danger active warning success-->
                        componentBucket[i].NIC[j].fabricLinkComponent.stroke='red';//fill: '00FA80',
                    else if((linkUtilization>50&&linkUtilization<=80))
                    {
                        componentBucket[i].NIC[j].fabricLinkComponent.stroke='orange';
                    }
                    else
                        componentBucket[i].NIC[j].fabricLinkComponent.stroke='00FA80';
                    canvas.renderAll();
                }
            }
        }
    }
}