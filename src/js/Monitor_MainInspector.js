/**
 * Created by Blake on 2014/5/19.
 */

function updateMainInspectorPanelSelect()
{
    var select=document.getElementById('MainPanelComponentSelect');
    select.innerHTML=null;
    for(var i=0;i<componentBucket.length;i++)
    {

        var option=document.createElement("option");
        option.innerHTML=componentBucket[i].componentName;
        option.setAttribute("value",i);
        select.appendChild(option);
    }
}
function updateChangeComponentMainInspectorPanel()
{
    updateMainInspectorPanelInfo();
    updateMainInspectorPanelLink();
    updateMainInspectorPanelSlice();
}
function updateMainInspectorPanelInfo()
{
    var select=document.getElementById('MainPanelComponentSelect').value;
    if(componentBucket[select]!=null)
    {
        if(componentBucket[select].dataInfo!=null)
        {
            var type=Math.floor(componentBucket[select].componentType/10);
            if(type==1)
            {
                var mainpanelinfo=document.getElementById('MainPanelInfo');
                mainpanelinfo.innerHTML=null;
                var p1=document.createElement("p");
                p1.innerHTML="CPU";
                mainpanelinfo.appendChild(p1);
                var cpuprogress=document.createElement("div");
                cpuprogress.class="progress";
                mainpanelinfo.appendChild(cpuprogress);
                var MainInspecProgBar_CPU=document.createElement("div");
                MainInspecProgBar_CPU.id="InspectorPanelCPU";
                MainInspecProgBar_CPU.class="progress-bar";
                MainInspecProgBar_CPU.role="progressbar";
                MainInspecProgBar_CPU.style="width: 0%;";
                cpuprogress.appendChild(MainInspecProgBar_CPU);

                mainpanelinfo.appendChild(document.createElement("br"));
                var p2=document.createElement("p");
                p2.innerHTML="RAM";
                mainpanelinfo.appendChild(p2);

                var ramprogress=document.createElement("div");
                ramprogress.class="progress";
                mainpanelinfo.appendChild(ramprogress);

                var MainInspecProgBar_RAM=document.createElement("div");
                MainInspecProgBar_RAM.id="InspectorPanelCPU";
                MainInspecProgBar_RAM.class="progress-bar";
                MainInspecProgBar_RAM.role="progressbar";
                MainInspecProgBar_RAM.style="width: 0%;";
                ramprogress.appendChild(MainInspecProgBar_RAM);
                mainpanelinfo.appendChild(document.createElement("br"));

                var CPURate=componentBucket[select].dataInfo.getValue(0,1);
                var RAMRate=componentBucket[select].dataInfo.getValue(1,1);
                //<div id="InspectorPanelCPU" class="progress-bar " role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 60%;">
                MainInspecProgBar_CPU.setAttribute("valuenow",CPURate.toString());
                MainInspecProgBar_CPU.setAttribute("style","width: "+CPURate.toString()+"%;");
                MainInspecProgBar_CPU.innerHTML=CPURate.toString()+"/100";
                if(CPURate>80)//<!--progress-bar progress-bar-success progress-bar-info progress-bar-warning progress-bar-danger-->
                    MainInspecProgBar_CPU.className="progress-bar progress-bar-danger";
                else if(CPURate>50&&CPURate<=80)
                    MainInspecProgBar_CPU.className="progress-bar progress-bar-warning";
                else
                    MainInspecProgBar_CPU.className="progress-bar";
                //--------------------------------------------------------------------------
                MainInspecProgBar_RAM.setAttribute("valuenow",RAMRate.toString());
                MainInspecProgBar_RAM.setAttribute("style","width: "+RAMRate.toString()+"%;");
                MainInspecProgBar_RAM.innerHTML=RAMRate.toString()+"/100";
                if(RAMRate>80)//<!--progress-bar progress-bar-success progress-bar-info progress-bar-warning progress-bar-danger-->
                    MainInspecProgBar_RAM.className="progress-bar progress-bar-danger";
                else if(RAMRate>50&&RAMRate<=80)
                    MainInspecProgBar_RAM.className="progress-bar progress-bar-warning";
                else
                    MainInspecProgBar_RAM.className="progress-bar";
                //---------------------------------------------------------------------------
            }
            else if(type==2)
            {
                var mainpanelinfo=document.getElementById('MainPanelInfo');
                mainpanelinfo.innerHTML=null;
            }
            else if(type==3)
            {
                var mainpanelinfo=document.getElementById('MainPanelInfo');
                mainpanelinfo.innerHTML=null;
//                <p class="bg-primary">...</p>
//                <p class="bg-success">...</p>starting
//                <p class="bg-info">...</p>OK
//                <p class="bg-warning">...</p>Zombie
//                <p class="bg-danger">...</p>Off
                var p3=document.createElement('p');
                p3.innerHTML="Controller Status: ";
                mainpanelinfo.appendChild(p3);
                var statusInfo=document.createElement('p');
                var status=componentBucket[select].componentStatus;
                if (status==0)//<!--danger active warning success-->
                {
                    mainpanelinfo.className="bs-callout bs-callout-danger"
                    statusInfo.className = "bg-danger";
                    statusInfo.innerHTML="Off";
                }
                else if (status==1)
                {
                    mainpanelinfo.className="bs-callout bs-callout-danger"
                    statusInfo.className = "bg-info";
                    statusInfo.innerHTML="OK";
                }
                else if(status==2)
                {
                    mainpanelinfo.className="bs-callout bs-callout-danger"
                    statusInfo.className = "bg-warning";
                    statusInfo.innerHTML="Zombie";
                }
                else if(status==3)
                {
                    mainpanelinfo.className="bs-callout bs-callout-danger"
                    statusInfo.className = "bg-success";
                    statusInfo.innerHTML="Starting";
                }
                else
                {
                    mainpanelinfo.className="bs-callout bs-callout-danger"
                    statusInfo.className = "bg-danger";
                    statusInfo.innerHTML="Off";
                }
//                console.log(statusInfo);
                mainpanelinfo.appendChild(statusInfo);
            }
        }
    }
}
function updateMainInspectorPanelLink()
{
    var select=document.getElementById('MainPanelComponentSelect').value;
    var LinkTableDOM=document.getElementById('MainPanelLinkInfo');
    var tbody=LinkTableDOM.children[1];
    tbody.innerHTML=null;
    if(componentBucket[select]!=null)
    {
        for(var i=0;i<componentBucket[select].NIC.length;i++)
        {
            var tr=document.createElement("tr");
            tbody.appendChild(tr);

            var td=[];
            for(var j=0;j<5;j++)
            {
                td[j]=document.createElement("td");
                tr.appendChild(td[j]);
            }
            td[0].innerHTML= i.toString();
            td[1].innerHTML=componentBucket[select].NIC[i].NICName;
            if(componentBucket[select].NIC[i].otherComponent!=null)
                td[2].innerHTML=componentBucket[select].NIC[i].otherComponent.componentName;
            else
                td[2].innerHTML="No Link";
            if(componentBucket[select].NIC[i].otherComponent!=null)
                td[3].innerHTML=componentBucket[select].NIC[i].otherComponentNIC.NICName;
            else
                td[3].innerHTML="No Link";
            var linkUtilization=componentBucket[select].NIC[i].utilization.innerData;
            if(componentBucket[select].NIC[i].otherComponent!=null)
            {
                td[4].innerHTML=Math.floor(linkUtilization).toString();
                if(linkUtilization>80)//<!--danger active warning success-->
                    tr.className="danger";
                else if((linkUtilization>50&&linkUtilization<=80))
                    tr.className="warning";
                else
                    tr.className="success";
            }
            else
            {
                td[4].innerHTML="No Link";
            }
        }
    }
}
function updateMainInspectorPanelSlice()
{
    var select=document.getElementById('MainPanelComponentSelect').value;
    var p=document.getElementById('InspectorPanelSlice');
    if(componentBucket[select]!=null)
    {
        if(componentBucket[select].slice!=null)
            p.innerHTML="Slice: "+componentBucket[select].slice.SliceName;
        else
            p.innerHTML="Slice: Non-Slice";
    }
}