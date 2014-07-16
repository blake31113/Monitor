/**
 * Created by Blake on 2014/5/19.
 */
function createComponent(name,type,posX,posY)
{
    this.componentName=name;
    this.componentType=type;
    this.componentStatus=null;
    this.dataInfo=null;
    this.slice=null
    this.NIC=new Array();
    this.componentIndex=componentBucket.length;
    this.fabricComponent=new createFabricComponent(this.componentType,posX,posY,this);

    return this;
}
function createComponent_RanPos(name,type)
{
    var RanX;
    var RanY;
    var X_unit=170;
    var Y_unit=150;
    var X_unit2=150;
    if(Math.floor(type/10)==1)
    {
        hostNumber=hostNumber%8;
        RanX=X_unit2*hostNumber;
        RanY=Y_unit*3;
        hostNumber++;
    }
    else if(Math.floor(type/10)==2)
    {
        switchNumber=switchNumber%8;
        RanX=X_unit*switchNumber-90;
        RanY=Y_unit*2;
        switchNumber++;
    }
    else if(Math.floor(type/10)==3)
    {
        controllerNumber=controllerNumber%8;
        RanX=X_unit*controllerNumber;
        RanY=Y_unit*1;
        controllerNumber++;
    }
    componentBucket.push(new createComponent(name,type,RanX,RanY));
}
function Data(DataName,Data)
{
    this.dataname=DataName;
    this.innerData=Data;
    return this;
}
function createNIC(NICName,localIndex)
{
    this.fabricLinkComponent=null;
    this.otherComponent=null;
    this.otherComponentNIC=null;
    this.utilization=new Data("Loading",null);
    this.MacAddress=null;
    this.IPAddress=null;
    this.NICName=NICName;
    this.linkIndex=null;
    this.NICLocalIndex=localIndex;
    this.deleteLink=function()
    {
        this.fabricLinkComponent=null;
        this.otherComponent=null;
        this.otherComponentNIC=null;
        this.linkIndex=null;
        this.utilization=new Data("Loading",null);
    }
}
function linkNICToNIC(component1,component2,NIC1,NIC2)
{
    if((component1!=component2)&&(NIC1!=null)&&(NIC2!=null))
    {
        var fabriclink=new createFabricLinkComponent(component1.fabricComponent,component2.fabricComponent,NIC1.fabricLinkComponent,NIC2.fabricLinkComponent,linkBucket.length);
        fabriclink.linkIndex=linkBucket.length;
        fabriclink.Component1=component1;
        fabriclink.Component2=component2;
        fabriclink.NIC1=NIC1;
        fabriclink.NIC2=NIC2;
        NIC1.utilization.innerData=NIC2.utilization.innerData=0;
        NIC1.otherComponent=component2;
        NIC2.otherComponent=component1;
        NIC1.otherComponentNIC=NIC2;
        NIC2.otherComponentNIC=NIC1;
        NIC1.fabricLinkComponent=fabriclink;
        NIC2.fabricLinkComponent=fabriclink;
        NIC1.linkIndex=linkBucket.length;
        NIC2.linkIndex=linkBucket.length;
        linkBucket.push(fabriclink);
    }
}
function deleteLinkIndex(delete_index)
{
    for(var i=0;i<componentBucket.length;i++)
    {
        if(componentBucket[i]!=null)
        {
            for(var j=0;j<componentBucket[i].NIC.length;j++)
            {
                if(componentBucket[i].NIC[j].linkIndex!=null)
                {
                    if(componentBucket[i].NIC[j].linkIndex==delete_index)
                    {
                        var NIC=componentBucket[i].NIC[j];
                        NIC.otherComponent=null;
                        NIC.otherComponentNIC=null;
                        NIC.fabricLinkComponent=null;
                        NIC.linkIndex=null;
                    }
                }
            }
        }
    }
    canvas.remove(linkBucket[delete_index].displayText);
    canvas.remove(linkBucket[delete_index]);
    canvas.renderAll();
    delete(linkBucket[delete_index]);
}
function createSlice(SliceName)
{
    this.components=new Array();
    this.SliceName=SliceName;
    this.SliceIndex=SliceBucket.length;
    this.addComponent=function(component)
    {
        this.components.push(component);
        component.slice=this;
    }
}

function setComponentInfo(Index,Column,Value)
{
//    console.log(componentBucket.length);
//    console.log(componentBucket[Index]);
    componentBucket[Index].dataInfo.setValue(Column,1,Value);//update data of CPU
//    componentBucket[j].dataInfo.setValue(0,1,last_CPU+Math.floor(random_CPU));//update data of CPU
}
function MonitorAPIsimulation()
{
    var simuCommand;
    var RanOPCode=Math.floor(Math.random()*5);
    simuCommand=OPConde[RanOPCode];
    if(simuCommand[0]=="C")
    {
        var ran=Math.floor(Math.random()*controllerNumber.length);
        var ranStatus=Math.floor(Math.random()*4)
        simuCommand=simuCommand+"|"+componentBucket[controllerNumber[ran]].componentName+"|"+"127.0.0.1"+"|"+ranStatus.toString();
//        console.log(ran+" "+simuCommand);
    }
    else if(simuCommand[0]=="D")
    {
        var ran=Math.floor(Math.random()*hostNumber.length);
        var CPULoading=Math.floor(Math.random()*100)
        var RAMLoading=Math.floor(Math.random()*100)
        simuCommand=simuCommand+"|"+componentBucket[hostNumber[ran]].componentName+"|"+CPULoading.toString()+"|"+RAMLoading.toString();
//        console.log(ran+" "+simuCommand);
    }
    else if(simuCommand[0]=="E")
        simuCommand="";
    else if(simuCommand[0]=="F")
        simuCommand="";
    else if(simuCommand[0]=="G")
    {
        var ran=Math.floor(Math.random()*hostNumber.length);
        var CPULoading=Math.floor(Math.random()*100)
        var RAMLoading=Math.floor(Math.random()*100)
        simuCommand=simuCommand+"|"+componentBucket[hostNumber[ran]].componentName+"|"+CPULoading.toString()+"|"+RAMLoading.toString();
//        console.log(ran+" "+simuCommand);
    }
    console.log(simuCommand);

    parse_execute(simuCommand);
}
//function CountComponentType()
//{
//    for(var i=0;i<componentBucket.length;i++)
//    {
//        var type=Math.floor(componentBucket[i].componentType/10);
//        if(type==1)
//            hostNumber.push(componentBucket[i].componentIndex);
//        else if(type==2)
//            switchNumber.push(componentBucket[i].componentIndex);
//        else if(type==3)
//            controllerNumber.push(componentBucket[i].componentIndex);
//    }
//}
function parse_execute(command)
{
    if(command!=""&&command!=null)
        console.log(command);
    var commands=command.split("|");

    if(commands[0]=="C")
    {
//parse_execute("F|OpenflowVSwitch01:eth1|RYU_Controller01:eth0|RYU_Controller02:eth1");
        var controller=[];
        var switchComponent;
        switchComponent =commands[2].split(":");
        controller[0]   =commands[1].split(":");
        controller[1]   =commands[3].split(":");
        var componentIndex=[];
        var componentNICIndex=[];
        var switchComponentIndex=[];
        componentIndex[0]            =findComponentBucket(controller[0][0]);
        componentNICIndex[0]         =findComponentNICBucket(componentBucket[componentIndex[0]].componentName,controller[0][1]);
        componentIndex[1]            =findComponentBucket(controller[1][0]);
        componentNICIndex[1]         =findComponentNICBucket(componentBucket[componentIndex[1]].componentName,controller[1][1]);
        switchComponentIndex[0]      =findComponentBucket(switchComponent[0]);
        switchComponentIndex[1]      =findComponentNICBucket(componentBucket[switchComponentIndex[0]].componentName,switchComponent[1]);
        deleteLinkIndex(componentBucket[componentIndex[0]].NIC[componentNICIndex[0]].linkIndex);
        linkNICToNIC(componentBucket[switchComponentIndex[0]],componentBucket[componentIndex[1]],componentBucket[switchComponentIndex[0]].NIC[switchComponentIndex[1]],componentBucket[componentIndex[1]].NIC[componentNICIndex[1]]);
    }
    else if(commands[0]=="D")
    {
        for(var i=0;i<componentBucket.length;i++)
        {
            if(commands[1]==componentBucket[i].componentName)
            {
                setComponentInfo(i,0,commands[2]);
                setComponentInfo(i,1,commands[3]);
            }
        }
    }
    else if(commands[0]=="E")//Host name|RxSpeed|TxSpeed E|OpenflowVSwitch01:eth1|15|70
    {
        var loading=Math.max(parseInt(commands[2]),parseInt(commands[3]));
        console.log("asdf"+loading);
        var component=[];
        var componentIndex=[];
        component=commands[1].split(":");
        componentIndex[0]=findComponentBucket(component[0]);
        if(componentIndex[0]!=null)
            componentIndex[1]=findComponentNICBucket(componentBucket[componentIndex[0]].componentName,component[1]);
        if(componentIndex[0]!=null&&componentIndex[1]!=null)
        {
            console.log(componentBucket[componentIndex[0]].NIC[componentIndex[1]]);
            if(componentBucket[componentIndex[0]].NIC[componentIndex[1]].utilization!=null)
                componentBucket[componentIndex[0]].NIC[componentIndex[1]].utilization.innerData=loading;
            if(componentBucket[componentIndex[0]].NIC[componentIndex[1]].otherComponentNIC!=null)
                componentBucket[componentIndex[0]].NIC[componentIndex[1]].otherComponentNIC.utilization.innerData=loading;
        }
        updateFrequently();
    }
    else if(commands[0]=="F")
    {

    }
    else if(commands[0]=="G")
    {
        for(var i=0;i<componentBucket.length;i++)
        {
            if(commands[1]==componentBucket[i].componentName)
            {
                setComponentInfo(i,0,commands[2]);
                setComponentInfo(i,1,commands[3]);
//                setComponentInfo(i,1,0);
            }
        }
    }
    else if(commands[0]=="H")
    {

        for(var i=0;i<componentBucket.length;i++)
        {
            if(commands[1]==componentBucket[i].componentName)
            {
                componentBucket[i].componentStatus=commands[3];
            }
        }
    }
    updateFrequently();
}
function updateFrequently()
{
    updateAreaChart();

    updateComponent_info_table();
    updateController_info_table();
    updateOpenstack_info_table();

    updateMainInspectorPanelInfo();
    updateMainInspectorPanelLink();

    updateFabricComponent();
    updateFabricLineComponent();
}
function rollToTop()
{
    $j=jQuery.noConflict();
    var body = $j("html, body");
    body.animate({scrollTop:0}, '500', 'swing');
}
function findComponentBucket(name)
{
    for(var i=0;i<componentBucket.length;i++)
    {
        if(name==componentBucket[i].componentName)
            return i;
    }
}
function findComponentNICBucket(componentName,NICName)
{
    for(var i=0;i<componentBucket.length;i++)
    {
        if(componentName==componentBucket[i].componentName)
        {
            for(var j=0;j<componentBucket[i].NIC.length;j++)
            {
                if(NICName==componentBucket[i].NIC[j].NICName)
                {
                    return j;
                }
            }
        }
    }
}
