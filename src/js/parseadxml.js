/**
 * Created by Blake on 2014/5/23.
 */
/**
 * Created by Blake on 2014/4/7.
 */
function parseADXml(XmlInput)
{
//    console.log(XmlInput);
    var $j = jQuery.noConflict();

    var xml = "XmlInput",
        xmlDoc = $j.parseXML(XmlInput);
    $xml = $j( xmlDoc );
    var loadComponentBucket=new Array();
    var loadLinkBucket=new Array();
    var rspec_type=$xml.find('rspec').attr('type');
    var rspec_geneDate=$xml.find('rspec').attr('generated');
    var rspec_xsi_schemaLocation=$xml.find('rspec').attr('xsi:schemaLocation');
    var rspec_xmlns_xsi=$xml.find('rspec').attr('xmlns:xsi');
    var rspec_xmlns=$xml.find('rspec').attr('xmlns');
    var rspec_valid_until=$xml.find('rspec').attr('valid_until');
    $xml.find('node').each
    (
        function()
        {
            var manager_uuid        = $j(this).attr('component_manager_uuid');
            var name                = $j(this).attr('component_name');
            var uuid                = $j(this).attr('component_uuid');
            var available           = $j(this).find('available').text();
            var exclusive           = $j(this).find('exclusive').text();
            var type_name=new Array();
            var type_slots=new Array();
            var inface=new Array();
            var sliver_type         = $j(this).attr('sliver_type');
            if(sliver_type=="null")
                sliver_type=null;
            var type;
            $j(this).find('node_type').each
            (
                function()
                {
                    type_name.push($j(this).attr('type_name'));
                    type_slots.push($j(this).attr('type_slots'));
                    if(type_name[type_name.length-1]=="host")
                        type=10;
                    else if(type_name[type_name.length-1]=="host_v")
                        type=11;
                    else if(type_name[type_name.length-1]=="switch")
                        type=20;
                    else if(type_name[type_name.length-1]=="switch_of")
                        type=21;
                    else if(type_name[type_name.length-1]=="switch_v")
                        type=22;
                    else if(type_name[type_name.length-1]=="switch_v_of")
                        type=23;
                    else if(type_name[type_name.length-1]=="host_of")
                        type=30;
                    else if(type_name[type_name.length-1]=="host_v_of")
                        type=31;
                }
            );
            $j(this).find('interface').each
            (
                function()
                {
                    inface.push($j(this).attr('component_id'));
                }
            );
            createComponent_RanPos(name,type);
            for(var i=0;i<inface.length;i++)
            {
                componentBucket[componentBucket.length-1].NIC.push(new createNIC(inface[i].substring(inface[i].lastIndexOf(":")+1),i));
            }
            if(sliver_type!=null)
            {
                var hasThisSlice=false;
                for(var i=0;i<SliceBucket.length;i++)
                {
                    if(SliceBucket[i].SliceName==sliver_type)
                    {
                        hasThisSlice=true;
                        SliceBucket[i].addComponent(componentBucket[componentBucket.length-1]);
                    }
                }
                if(!hasThisSlice)
                {
                    SliceBucket.push(new createSlice(sliver_type));
                    SliceBucket[SliceBucket.length-1].addComponent(componentBucket[componentBucket.length-1]);
                }
            }
        }
    );
    $xml.find('link').each
    (
        function()
        {
            var count=0;
            var component=[2];
            var componentNIC=[2];

            $j(this).find('interface_ref').each
            (
                function()
                {
                    var temp=$j(this).attr('component_interface_id');
                    component[count]=temp.substring(0,temp.lastIndexOf(":"));
                    componentNIC[count]=temp.substring(temp.lastIndexOf(":")+1);
                    count++;
                }
            );
            for(var i=0;i<2;i++)
            {
                component[i]=componentBucket[findComponentBucket(component[i])];
                componentNIC[i]=component[i].NIC[findComponentNICBucket(component[i].componentName,componentNIC[i])];
            }
            linkNICToNIC(component[0],component[1],componentNIC[0],componentNIC[1]);
        }
    );
    initialComponentInfo();
    updateSelectAreaChart();
    updateSelectSlice();
    updateMainInspectorPanelSelect();
    updateMainInspectorPanelLink();
    updateMainInspectorPanelSlice();
    updateFabricLineComponent();
    setAreaChartSelect();
//    parse_execute("C|RYU_Controller01:eth0|OpenflowVSwitch01:eth1|RYU_Controller02:eth1|")
//    parse_execute("F|OpenflowVSwitch01:eth1|RYU_Controller01:eth0|RYU_Controller02:eth1");
//    parse_execute("E|OpenflowVSwitch01:eth1|15|100");
//    var simulator=setInterval("MonitorAPIsimulation()",500);//run setRandom every 500ms
    var requestInterval=setInterval("requestInfo()",1000);
}