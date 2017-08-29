--ϵͳ�������ܽű��������ģ�鹦���޹�


function alert(msg,title)
	msgbox = RMUtils.CRMMessageBox(mainWnd)
	if title == nil then
		title = "Alert"
	end
	msgbox:ShowMsgBox(msg,title,RMUtils.ALERT_MSG_BOX)
end

function confirm(msg,title)
	msgbox = RMUtils.CRMMessageBox(mainWnd)
	if title == nil then
		title = "Confirm"
	end	
	return msgbox:ShowMsgBox(msg,title,RMUtils.CONFIRM_MSG_BOX)
end

function openFileDialog(defext,fileName)
	local dlg = RMUtils.CRMFileDialog(1,defExt,fileName,6,nil,mainWnd)
	if dlg ~= nil then
	   local ret = dlg:DoModal()
	   if ret == 1 then
			local path = dlg:getFilePath()
			local filename = dlg:getFileName()
			local folderPath = dlg:getFolderPath()
			return ret,path,filename,folderPath
	   end
	end
end

function onBegin(attr,ctx)
   local fetchButton = ctx:getStringData("_I_AM_FETCH_BUTTON_")
	if fetchButton:empty() == false then
		local bt = ctx:getComponent(fetchButton:c_str())
		if bt ~= nil then
			bt:Enable(false)
		end
	end
	flowName = ctx:getStringData("_curFlow_")
	RMUtils.CRMLog_log("��ʼִ������->[%s]",flowName)
end

function onEnd(attr,ctx)
    local fetchButton = ctx:getStringData("_I_AM_FETCH_BUTTON_")
	if fetchButton:empty() == false then
		local bt = ctx:getComponent(fetchButton:c_str())
		if bt ~= nil then
			bt:Enable(true)
		end
	end
	flowName = ctx:getStringData("_curFlow_")
	ctx:notify(nil,"_EXEC_FLOW_END_",attr)
	RMUtils.CRMLog_log("����->[%s] ִ�н���",flowName)
end

function onError(attr,ctx)
    local fetchButton = ctx:getStringData("_I_AM_FETCH_BUTTON_")
	if fetchButton:empty() == false then
		local bt = ctx:getComponent(fetchButton:c_str())
		if bt ~= nil then
			bt:Enable(true)
		end
	end
	flowName = ctx:getStringData("_curFlow_")
	local fn = flowName:c_str()
	local msg = ctx:getStringData("_flowErrorMsg_"):c_str()
	gMsg = "����->"..fn.."ִ��ʱ��������\n\t\t"..msg
	alert(gMsg,"����")
	RMUtils.CRMLog_log("����->[%s] ִ��ʱ��������\n\t\t%s",flowName,ctx:getStringData("_flowErrorMsg_"))
end

function itemExist(attr,ctx)
	if ctx:getData(attr:get("ref")) ~= nil then
		return 0
	else
		return 1
	end
end

function log(attr,ctx)
	local msgField = attr:get("logMsg")
	if msgField == nil then
		return 1
	end
	local fileName = attr:get("file")
	if fileName ~= nil then
		f = io.open(fileName,"a")
		if f ~= nil then
			local field = ctx:getData(msgField)
			if field ~= nil then
				f:write(field:getString())
			else
				f:close()
				return 2
			end
		end
		f:close()
	end
	return 0
end

function notifyMsg(attr,ctx)
	local target = attr:get("target")
	local msg    = attr:get("msg")
	if target ~= nil and msg ~= nil then
		ctx:notify(target,msg,attr)
	end
end




function _createFilter_(typeName)
	if typeName == 'list' then
		return COMP.FilterList()
	end
	if typeName == 'edit' then
		return COMP.CFilterEdit()
	end
	if typeName == 'checklist' then
		return COMP.FilterCheckListBox()
	end
	if typeName == 'date' then
		return COMP.FilterDate()
	end
	if typeName == 'calender' then
		return COMP.FilterCalender()
	end
	if typeName == 'checkBox' then
		return COMP.FilterCheckBox()
	end	
	if typeName == 'radio' then
		return COMP.FilterRadio()
	end
	if typeName == 'button' then
		return COMP.FilterButton()
	end
	if typeName == 'fetchbutton' then
		return COMP.FilterButton()
	end	
	if typeName == 'static' then
		return COMP.FilterStatic()
	end		
	if typeName == 'space' then
		return COMP.FilterSpace()
	end		
	
end

function getTargetValue(target,ctx)
	local err = string.find(target,"_ERROR_")
	if err ~= nil then
		return nil
	end
	local hasExp = string.find(target,"%b{}")
	if hasExp == nil then
		local str = ctx:getStringData(target) 
		if str ~= nil then
			return str:c_str()
		end
		return nil
	else
		local strData = string.gsub(target,"({[^{}]+})",function(s)
			local strRep = string.gsub(s,"{([^{}]+)}",function(a)
				return getTargetValue(a,ctx)
				end )
			local hasExp = string.find( strRep,"%b{}")
			if hasExp ~= nil then
				return "_ERROR_"
			end
			return strRep
		end )
		local err = string.find(strData,"_ERROR_")
		if err ~= nil then
			return nil
		end
		return getTargetValue(strData,ctx)
	end
end


function getTarget(target,ctx)
	local err = string.find(target,"_ERROR_")
	if err ~= nil then
		return nil
	end
	local hasExp = string.find(target,"%b{}")
	if hasExp == nil then
		return target
	else
		local strData = string.gsub(target,"({[^{}]+})",function(s)
			local strRep = string.gsub(s,"{([^{}]+)}",function(a)
					local str = ctx:getStringData(a) 
					if str ~= nil then
						return str:c_str()
					end
					return nil
				end )
			local hasExp = string.find( strRep,"%b{}")
			if hasExp ~= nil then
				return "_ERROR_"
			end
			return strRep
		end )
		local err = string.find(strData,"_ERROR_")
		if err ~= nil then
			return nil
		end
		return getTarget(strData,ctx)
	end
end

---------------------------------------------���õĺ���-----------------------------------------------

--[[
	�ж�fieldָ���������Ƿ�Ϊ�棬��Ϊ���򷵻�0
	���򷵻�1
	�������򲻴��ڣ��򷵻�2
--]]
function isTrue(attr,ctx)
	local field = attr:get("field")
	if field ~= nil then
		local bVal = ctx:getData(field)
		if bVal ~= nil then
			if bVal:getString() == "true" then
				return 0
			else
				return 1
			end
		else
			return 2
		end
	else
		return 2
	end
end

--[[
	����ָ����������ַ���ֵ,��������0
	�������򲻴��ڣ��򷵻�2
	������ֵ����δ���ã�����1
--]]
function setStringField(attr,ctx)
	local field = attr:get("field")
	if field ~= nil then
		local bVal = ctx:getData(field)
		if bVal ~= nil then
			local val = attr:get("value")
			if val == nil then
				return 1
			end
			bVal:setString( getTarget(val,ctx) )
			return 0
		else
			return 2
		end
	else
		return 2
	end
end	

--[[
	��ȡɸѡ������ֵ,���洢��ָ������������
--]]
function getFilterValue(attr,ctx)
	local target = attr:get("target")
	if target == nil then
		return 1
	end
	local strData = getTargetValue(target,ctx)
	if strData == nil then
		return 1
	end
	local save2 = attr:get("to")
	if save2 == nil then
		return 2
	end
	if ctx:setStringData(save2,strData) == false then
		return 3
	end
	return 0
end

--[[
	�Ƚ��ַ����Ƿ�һ��
	һ�·���0
	src>cmp����1
	src<cmp����2
--]]
function stringEqual(attr,ctx)
	local src = attr:get("src")
	local compare2 = attr:get("cmp")
	if src == nil or compare2 == nil then
		return 3
	end
	local str1 = ctx:getStringData(src)
	local str2 = ctx:getStringData(compare2)
	local s1 = str1:c_str()
	local s2
	if str2:empty() then
		s2 = compare2
	else
		s2 = str2:c_str()
	end
	if s1 == s2 then
		return 0
	elseif str1:c_str() >str2:c_str() then
		return 1
	else
		return 2
	end
end

--[[
	��ȡdataid���������
	���ɹ�����0��
	��dataidδ���巶Χ1
	��ȡ����ʧ�ܷ���2
--]]
function fetchData(attr,ctx)
	local dataSrc = attr:get("dataid")
	if dataSrc ~= nil then
		return ctx:fetchData(dataSrc,attr)
	else
		return -1
	end
end

--[[
	�����л�ͳ����Ĺ���
	�ù��ܽ�����Module���ü�����Ч
	��Ҫ����groupID,���ñ���ͳ����ID��������,����������ӦΪItem����Ϊtype=Int����
--]]
function loadStat(attr,ctx)
	ctx:notify("_not_exist_target_","LoadStat",attr)
	return 0
end

--[[
	ˢ�µ�����
--]]
function refreshNavgationTree(attr,ctx)
	ctx:notify("_not_exist_target_","refresh_navtree",attr)
	--�������˳�ʼ��ѡ�е����Ĭ�Ϲ���Ƶ���Ӧ����
	local selected = attr:get("selected")
	if selected ~= nil then
		ctx:notify("_not_exist_target_","selected_navtree",attr)
	end
	return 0
end

--[[
	ˢ�·�Χ��
--]]
function refreshObjTree(attr,ctx)
	ctx:notify("_OBJ_TREE_","refresh_condition",attr)
	return 0
end

--[[
	ˢ��ɸѡ����
--]]
function refreshFilter(attr,ctx)
	local target = attr:get("target")
	if target == nil then
		return 1
	end
	ctx:notify(target,"_RELOADFILTERDATA_",attr)
	return 0
end

function customFilter(attr,ctx)
	local t = os.time()
	local nowyear = os.date("*t",t).year
	local endyear = nowyear
	local startyear = endyear
	local dataSrc = attr:get("dataSrc")
	if dataSrc == nil then
		return 1
	end
	
	local sdate = attr:get("sdate")
	if sdate == nil then
		return 1
	end
	local strsdta= string.sub(sdate,1,1)
	if strsdta == nil then
		return 1
	end
	startyear = os.date("*t",t+31536000*tonumber(sdate)).year
	--����sdate��edata֮�������ַ���
	local edate = attr:get("edate")
	if edate ~= nil then
		if edate ~= "now" then
			endyear = os.date("*t",t+31536000*tonumber(edate)).year
		end
	end
	local stryear = ""
	local isyear = tonumber(startyear)
	local ieyear = tonumber(endyear)
	local n = ieyear-isyear
	for i = 0, n do
		stryear = stryear..tostring(ieyear)
		if i < n then 
			stryear = stryear..";"
		end
		ieyear = ieyear-1
	end
	if ctx:setStringData(dataSrc,stryear) == false then
		return 3
	end
	return 0
end

--[[
	ˢ�����ݴ���
--]]
function refreshUIData(attr,ctx)
	local target = attr:get("target")
	if target == nil then
		return 1
	end
	ctx:notify(target,"_UIDATALOADED_",attr)
	return 0
end

--[[
	����ĳ��UI
--]]
function activeUI(attr,ctx)
	local target = attr:get("target")
	if target == nil then
		return 1
	end
	ctx:notify(target,"_SETACTIVE_",attr)
	return 0	
end

--[[
	����ɸѡ��������
--]]
function changeFilterAttribute(attr,ctx)
	local target = attr:get("target")
	if target == nil then
		return 1
	end
	local targetComp = getTarget(target,ctx)
	if targetComp == nil then
		return 2
	end
	local filter = ctx:getComponent(targetComp)
	if filter == nil then
		return 2
	end
	local attrName = attr:get("attrName")
	if attrName == nil then
		return 3
	end
	local value = attr:get("value")
	if value == nil then
		return 4
	end
	local strValue = getTarget(value,ctx)
	if strValue == nil then
		strValue = value
	end
	if filter:setAttribute( attr:get("attrName"),strValue ) == true then
		return 0
	else
		return 5
	end
end

--[[
	ɾ���Ѿ���ȡ�����ݼ�¼
--]]

function deleteRecord(attr,ctx)
	ctx:notify(nil,"_DELETEDATA_",attr)
	return 0
end

--[[
	����������֪ͨ��ĳ��Ŀ�괰�ڵķ�ʽִ��ĳ��ָ��������
--]]
function execUIFlow(attr,ctx)
	local target = attr:get("target")
	if target == nil then
		return 1
	end
	local flowName = attr:get("flowName")
	if flowName == nil then
		return 2
	end
	ctx:notify(target,"_EXECUIFLOW_",attr)
	return 0
end

--[[
	��ʾһ������ʽģ̬�Ի���
--]]
function popupDlg(attr,ctx)
	ctx:notify(target,"_POPUPDLG_",attr)
end

--[[
	ִ��ϵͳ����
--]]
function executeSysCmd(attr,ctx)
	local command = attr:get("command")
	if command == nil then
		return 1
	end
	ctx:notify( nil,"__SYS_CMD__",attr )
	return 0
end

--[[
	StockBrowser���������
--]]
function goBack(attr,ctx)
	local target = attr:get("target")
	if target == nil then
		return 1
	end
	ctx:notify(target,"__StockBrowser_Back__",attr)
end

--[[
	StockBrowser�����ǰ��
--]]
function goForward(attr,ctx)
	local target = attr:get("target")
	if target == nil then
		return 1
	end
	ctx:notify(target,"__StockBrowser_Forward__",attr)
end

--[[
	StockBrowser�������ת��ָ����ַ��ҳ��
--]]
function goUrl(attr,ctx)
	local target = attr:get("target")
	if target == nil then
		return 1
	end
	local url = attr:get("url")
	if url == nil then 
		return 2
	end
	ctx:notify(target,"__StockBrowser_LoadURL__",attr)
end

--[[
	�������ļ��Ի���
	��ѡ���˴򿪵��ļ����򽫽�����浽ָ����item��
--]]
function openFile(attr,ctx)
	local ext = attr:get("ext")
	local fileName = attr:get("defFileName")
    local ret,path,fileName,folderPath = openFileDialog(ext,fileName)
	if ret == 1 then
		local save2 = attr:get("save2")
		if save2 == nil then
			return 2
		end
		local data = ctx:getData(save2)
		if data == nil then
			return 3
		end
		ctx:setStringData(save2,path)
	else
		return 1
	end
	return 0
end

--[[
	�Զ�����󻯺�������С֮���л�
	ֻ��UIWindow��Ч
--]]
function switchMaxAndMin(attr,ctx)
	local target=attr:get("target")
	if target == nil then
		return 1
	end
	local targetVal = getTarget(target,ctx)
	ctx:notify(targetVal,"_UI_SIWTH_MAX_NORMAL_",attr)
	return 0
end


--[[
	��ʾ�Ի���
--]]
function tips(attr,ctx)
	local msg = attr:get("msg")
	local msgStr = string.gsub(msg,"{(.-)}",function(s) 
		str = ctx:getStringData(s) 
		if str ~= nil then
			return str:c_str()
		end
		return s
	end )
	local title = attr:get("title")
	if title == nil then
	   title = "��ʾ"
	end
	msg = msgStr
	if msg == nil then
		msg = ""
	end
	alert(msg,title)
	return 0
end

--[[
	ȷ�϶Ի���
--]]
function confirmBox(attr,ctx)
	local msg = attr:get("msg")
	local msgStr = string.gsub(msg,"{(.-)}",function(s) 
		str = ctx:getStringData(s) 
		if str ~= nil then
			return str:c_str()
		end
		return s
	end )
	local title = attr:get("title")
	if title == nil then
	   title = "��ʾ"
	end
	if msgStr == nil then 
		msg = ""
	else
		msg = msgStr
	end
	return confirm(msg,title)
end

--[[
	HtmlBrowser�������ת��ָ����ַ��ҳ��
--]]
function loadUrl(attr,ctx)
	local target = attr:get("target")
	if target == nil then
		return 1
	end
	local url = attr:get("url")
	if url == nil then 
		return 2
	end
	ctx:notify(target,"__WebBrowser_LoadURL__",attr)
end

--[[
	�����ļ�
--]]
function downloadDZHFile(attr,ctx)
	ctx:notify(nil,"downloadfile",attr)
end

--[[
	ѡ��grid�е�ָ����
	������rowNo
--]]
function selectGridRow(attr,ctx)
	local target = attr:get("target")
	if target == nil then
		return 1
	end
	local rowNo = attr:get("rowNo")
	if rowNo == nil then
		return 2
	end
	ctx:notify(target,"_SETCURSEL_",attr)
end


--[[
	ˢ��Grid�ı�ͷ
--]]
function refreshGridHeader(attr,ctx)
	local target = attr:get("target")
	if target == nil then
		return 1
	end
	ctx:notify(target,"_GRID_REFRESHHEADER_",attr)
	return 0
end

--[[
	���ڱȽ�(��ȡ���ݵ�ʱ�������������ж��Ƿ�ʼ���ڴ��ڽ������ڣ����ǣ�ֱ����ʾ�û�����ѡ��
�����ǣ���ȥ����so)
--]]
function dateComparation(attr,ctx)
	local date1 = attr:get("t1")
	 local date2 = attr:get("t2")
	local strData1 = getTargetValue(date1,ctx)
	local strData2 = getTargetValue(date2,ctx)
	if strData1>=strData2 then 
		return 1 
	else  
		return 0
	end
	    
	return 0
end
 
--[[
	ʹ��panelˢ�¹��ܸ����û�����
--]]

function refreshPanel(attr,ctx)
	local target = attr:get("target")
	if target == nil then
		return 1
	end
	ctx:notify(target,"_PANEL_REFRESH_",attr)
	return 0
end


--[[
	���ڱȽ�(��ȡ����֮ǰ���ȽϿ�ʼ�����Ƿ񳬹���ֹ����ǰ90�죬����ǣ�����1����ʾ�û���ѡ��������������������ѡ�񣬷���ȥ����so)
--]]
function dateIntervalCalc(attr,ctx)
	local sdate = attr:get("sdate")
	local edate = attr:get("edate")
	local strData1 = getTargetValue(sdate,ctx)
	local strData2 = getTargetValue(edate,ctx)
	-- �����ڸ�ʽXXXXXXXXת��Ϊ�����
	local resData = (strData2 / 10000 - strData1 / 10000) * 365 + (strData2 % 10000 / 100 - strData1 % 10000 / 100) * 30 + (strData2 % 100 -  strData1% 100)
	if resData > 90 then 
		return 1 
	else  
		return 0
	end
	    
	return 0
end

--[[
	Ȩ�޿���
--]]
function checkAuthority(attr,ctx)
	local target = attr:get("target")
	if target == nil then
		return 1
	end
	local id = attr:get("authID")
	--Ҫ��֤��Ȩ�ޣ�������1����2����3
	local str = getTargetValue(target,ctx)
	--�ַ����ָ�
	--alert(id)
	local sub_str_tab = {};
    while (true) do
        local pos = string.find(str,",");
        if (not pos) then
            sub_str_tab[#sub_str_tab + 1] = str;
            break;
        end
        local sub_str = string.sub(str, 1, pos - 1);
        sub_str_tab[#sub_str_tab + 1] = sub_str;
        str = string.sub(str, pos + 1, #str);
    end

	--alert(sub_str_tab[3])

	--�����ж� ������֤��id�Ƿ�������sub_str_tab�У��ڵĻ�����0�����򷵻�1
	for i,v in ipairs(sub_str_tab) do
		if sub_str_tab[i] == id	then
			return 0
		end
	end
	return 1
end

--[[
	UI���ڵ�tab��ǩ��̬��ʾ
--]]
function refreshTabHeader(attr,ctx)
	local target = attr:get("target")
	if target == nil then
		return 1
	end
	ctx:notify(target,"_TAB_CONTENT_",attr)
	return 0
end