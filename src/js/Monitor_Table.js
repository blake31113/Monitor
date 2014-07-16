/**
 * Created by Blake on 2014/5/19.
 */
function updateComponent_info_table()
{
    var table = document.getElementById('vm_info_table');
    var tbody = table.children[1];
    tbody.innerHTML = null;
    for (var i = 0; i < componentBucket.length; i++)
    {
        var type=Math.floor(componentBucket[i].componentType);
        if(type==11)
        {
            var CPURate;
            var RAMRate;
            if (componentBucket[i].dataInfo != null) {
                CPURate = componentBucket[i].dataInfo.getValue(0, 1).toString();
                RAMRate = componentBucket[i].dataInfo.getValue(1, 1).toString();
            }
            else
            {
                CPURate = 0;
                RAMRate = 0;
            }
            var tr = document.createElement("tr");

            if (CPURate > 80 || RAMRate > 80)//<!--danger active warning success-->
                tr.className = "danger";
            else if ((CPURate > 50 && CPURate <= 80) || (RAMRate > 50 && RAMRate <= 80))
                tr.className = "warning";
            else
                tr.className = "success";
            tbody.appendChild(tr);

            var th=[]
            for(var j=0;j<5;j++)
            {
                th[j]=document.createElement("td");
                tr.appendChild(th[j]);
            }
            th[0].innerHTML = i.toString();
            th[1].innerHTML = componentBucket[i].componentName;
            th[2].innerHTML = CPURate.toString();
            th[3].innerHTML = RAMRate.toString();
            if (componentBucket[i].slice != null)
            {
                th[4].innerHTML = componentBucket[i].slice.SliceName;
            }
            else
                th[4].innerHTML = "Non-Slice";

        }
    }
}
function updateController_info_table()
{
    var table = document.getElementById('controller_info_table');
    var tbody = table.children[1];
    tbody.innerHTML = null;
    for (var i = 0; i < componentBucket.length; i++)
    {
        var type=Math.floor(componentBucket[i].componentType/10);
        if(type==3)
        {
//          0:off 1:OK 2:Zombie 3:Starting
            var status=componentBucket[i].componentStatus;
            var tr = document.createElement("tr");
            var statusInfo;
            if (status==0)//<!--danger active warning success-->
            {
                tr.className = "danger";
                statusInfo="Off";
            }
            else if (status==1)
            {
                tr.className = "active";
                statusInfo="OK";
            }
            else if(status==2)
            {
                tr.className = "warning";
                statusInfo="Zombie";
            }
            else if(status==3)
            {
                tr.className = "success";
                statusInfo="Starting";
            }
            else if(status==null)
            {
                tr.className = "danger";
                statusInfo="No got value";
            }
            tbody.appendChild(tr);
            var th=[];
            for(var j=0;j<3;j++)
            {
                th[j]=document.createElement("td");
                tr.appendChild(th[j]);
            }
            th[0].innerHTML = i.toString();
            th[1].innerHTML = componentBucket[i].componentName;
            th[2].innerHTML = statusInfo;
        }
    }
}
function updateOpenstack_info_table()
{
    var table = document.getElementById('openstack_info_table');
    var tbody = table.children[1];
    tbody.innerHTML = null;
    for (var i = 0; i < componentBucket.length; i++)
    {
        var type=Math.floor(componentBucket[i].componentType);
        if(type==10)
        {
            var CPURate;
            var RAMRate;
            if (componentBucket[i].dataInfo != null)
            {
                CPURate = componentBucket[i].dataInfo.getValue(0, 1).toString();
                RAMRate = componentBucket[i].dataInfo.getValue(1, 1).toString();
            }
            else
            {
                CPURate = 0;
                RAMRate = 0;
            }
            var tr = document.createElement("tr");
            if (CPURate > 80 || RAMRate > 80)//<!--danger active warning success-->
                tr.className = "danger";
            else if ((CPURate > 50 && CPURate <= 80) || (RAMRate > 50 && RAMRate <= 80))
                tr.className = "warning";
            else
                tr.className = "success";
            tbody.appendChild(tr);

            var th=[]
            for(var j=0;j<5;j++)
            {
                th[j] = document.createElement("td");
                tr.appendChild(th[j]);
            }
            th[0].innerHTML = i.toString();
            th[1].innerHTML = componentBucket[i].componentName;
            th[2].innerHTML = CPURate.toString();
            th[3].innerHTML = RAMRate.toString();
            if (componentBucket[i].slice != null)
            {
                th[4].innerHTML = componentBucket[i].slice.SliceName;
            }
            else
                th[4].innerHTML = "Non-Slice";

        }
    }
}