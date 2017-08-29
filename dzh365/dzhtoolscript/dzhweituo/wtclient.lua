--require "dzhtoolscript/dzhbase/processapi"
require "dzhtoolscript/dzhbase/fileop"
require "dzhtoolscript/dzhbase/curl"
local ffi = require("ffi")
local user32 = ffi.load('user32')
--local param = "mncg\\dyj\\bin.exe **USERID** http://10.15.63.122/pub/l2/qswt/test.exe"
local knl32  = ffi.load('kernel32')
local rootpath=ds_GetRootPath()
local str_tab = {}

ffi.cdef[[
    typedef  unsigned int    UINT;
    typedef  int             INT;
    typedef const char*     LPCSTR;   
    typedef void* HWND;
    int MessageBoxA(
	HWND hWnd,
	LPCSTR lpText,
	LPCSTR lpCaption,
	UINT uType
	);
    HWND FindWindowA(
	 LPCSTR lpClassName,
	 LPCSTR lpWindowName
	);

    BOOL ShowWindow(
	HWND hWnd,
	int nCmdShow
	);
	
    BOOL SetForegroundWindow(HWND hWnd);
]]

ffi.cdef[[

    typedef unsigned short  WORD;
    typedef unsigned int    DWORD;
    typedef unsigned int    UINT;
    typedef unsigned char   BYTE;
    typedef unsigned char*  LPBYTE;
    typedef const char*     LPSTR;
    typedef const char*     LPCSTR;
    typedef unsigned long   ULONG_PTR;
    
    typedef char    CHAR;
    typedef int     BOOL;
    typedef long    LONG;
    typedef void    VOID;
    
    typedef void*   HMODULE;
    typedef void*   HANDLE;
    typedef void*   LPVOID;
    typedef DWORD*  LPDWORD;
    typedef ULONG_PTR   SIZE_T;
    
    typedef struct _SECURITY_ATTRIBUTES {
        DWORD nLength;
        LPVOID lpSecurityDescriptor;
        BOOL bInheritHandle;
    } SECURITY_ATTRIBUTES, *PSECURITY_ATTRIBUTES, *LPSECURITY_ATTRIBUTES;
    
    typedef struct _STARTUPINFOA {
        DWORD   cb;
        LPSTR   lpReserved;
        LPSTR   lpDesktop;
        LPSTR   lpTitle;
        DWORD   dwX;
        DWORD   dwY;
        DWORD   dwXSize;
        DWORD   dwYSize;
        DWORD   dwXCountChars;
        DWORD   dwYCountChars;
        DWORD   dwFillAttribute;
        DWORD   dwFlags;
        WORD    wShowWindow;
        WORD    cbReserved2;
        LPBYTE  lpReserved2;
        HANDLE  hStdInput;
        HANDLE  hStdOutput;
        HANDLE  hStdError;
    } STARTUPINFOA, STARTUPINFO, *LPSTARTUPINFOA;
    
    typedef struct _PROCESS_INFORMATION {
        HANDLE hProcess;
        HANDLE hThread;
        DWORD dwProcessId;
        DWORD dwThreadId;
    } PROCESS_INFORMATION, *PPROCESS_INFORMATION, *LPPROCESS_INFORMATION;
    
    typedef struct tagPROCESSENTRY32 {
        DWORD   dwSize;
        DWORD   cntUsage;
        DWORD   th32ProcessID;          // this process
        ULONG_PTR th32DefaultHeapID;
        DWORD   th32ModuleID;           // associated exe
        DWORD   cntThreads;
        DWORD   th32ParentProcessID;    // this process's parent process
        LONG    pcPriClassBase;         // Base priority of process's threads
        DWORD   dwFlags;
        CHAR    szExeFile[260];    // Path
    } PROCESSENTRY32;
    typedef PROCESSENTRY32 *  PPROCESSENTRY32;
    typedef PROCESSENTRY32 *  LPPROCESSENTRY32;
    
    typedef DWORD (*PTHREAD_START_ROUTINE)(LPVOID lpThreadParameter);
    typedef PTHREAD_START_ROUTINE LPTHREAD_START_ROUTINE;
]]
ffi.cdef[[
    
    BOOL
    CloseHandle(
        HANDLE hObject
    );
    
    BOOL
    CreateProcessA(
        LPCSTR  lpApplicationName,
        LPSTR   lpCommandLine,
        LPSECURITY_ATTRIBUTES   lpProcessAttributes,
        LPSECURITY_ATTRIBUTES   lpThreadAttributes,
        BOOL    bInheritHandles,
        DWORD   dwCreationFlags,
        LPVOID  lpEnvironment,
        LPCSTR  lpCurrentDirectory,
        LPSTARTUPINFOA          lpStartupInfo,
        LPPROCESS_INFORMATION   lpProcessInformation
    );
    
    BOOL
    TerminateProcess(
        HANDLE hProcess,
        UINT uExitCode
    );
    
    HANDLE
    OpenProcess(
        DWORD dwDesiredAccess,
        BOOL bInheritHandle,
        DWORD dwProcessId
    );
    
    HANDLE
    CreateToolhelp32Snapshot(
        DWORD dwFlags,
        DWORD th32ProcessID
    );

    BOOL
    Process32First(
        HANDLE hSnapshot,
        LPPROCESSENTRY32 lppe
    );

    BOOL
    Process32Next(
        HANDLE hSnapshot,
        LPPROCESSENTRY32 lppe
    );
    
    DWORD
    WaitForSingleObject(
        HANDLE hHandle,
        DWORD dwMilliseconds
    );
    
    DWORD
    WaitForMultipleObjects(
        DWORD nCount,
        const HANDLE *lpHandles,
        BOOL bWaitAll,
        DWORD dwMilliseconds
    );
    
    DWORD
    GetCurrentThreadId(
        VOID
    );
    DWORD
    GetCurrentProcessId(
        VOID
    );
    HANDLE
    GetCurrentProcess(
        VOID
    );
    
    DWORD
    GetProcessId(
        HANDLE Process
    );
    
    HANDLE
    CreateEventA(
        LPSECURITY_ATTRIBUTES lpEventAttributes,
        BOOL bManualReset,
        BOOL bInitialState,
        LPCSTR lpName
    );
    BOOL
    SetEvent(
        HANDLE hEvent
    );
    BOOL
    ResetEvent(
        HANDLE hEvent
    );
    
    HANDLE
    CreateThread(
        LPSECURITY_ATTRIBUTES lpThreadAttributes,
        SIZE_T dwStackSize,
        LPTHREAD_START_ROUTINE lpStartAddress,
        LPVOID lpParameter,
        DWORD dwCreationFlags,
        LPDWORD lpThreadId
    );
]]

local CREATE_NEW_CONSOLE    = 0x00000010  ;
local PROCESS_TERMINATE     = 0x0001      ;
local TH32CS_SNAPPROCESS    = 0x00000002  ;
local INVALID_HANDLE_VALUE  = 0xFFFFFFFF  ;
local INFINITE              = 0xFFFFFFFF  ;
local WAIT_OBJECT_0         = 0x00000000  ;

--[[
    关闭句柄,
    需要关闭的句柄
--]]   
function CloseHandle(inHandle)
    local b = knl32.CloseHandle(inHandle);
    return (b == true and 1) or 0;
end

--[[
    根据进程路径及参数打开进程,
    lpApplicationName,进程路径,
    lpCommandLine,参数
--]]
function CreateProcess(lpCommandLine,dwCreationFlags,lpEnvironment,lpCurrentDirectory,lpStartupInfo,bSync,waitTerminate)
    
    lpCommandLine = lpCommandLine or "";
    waitTerminate = waitTerminate or 0
    dwCreationFlags = dwCreationFlags or 0
    dwCreationFlags = tonumber(dwCreationFlags)
    if lpStartupInfo == nil then
        lpStartupInfo = ffi.new('STARTUPINFO');
	lpStartupInfo.lpReserved = nil;
        lpStartupInfo.lpDesktop = nil;
        lpStartupInfo.lpTitle = nil;
        lpStartupInfo.dwFlags = 1;
        lpStartupInfo.wShowWindow = 0;
        lpStartupInfo.cbReserved2 = 0;
        lpStartupInfo.lpReserved2 = nil;
    end
    if waitTerminate == nil or waitTerminate == 0 then
        waitTerminate = 0xFFFFFFFF
    end
    bSync = bSync or false;
 --   local si = ffi.new('STARTUPINFO');
    local pi = ffi.new('PROCESS_INFORMATION');
    local b =  knl32.CreateProcessA(nil,lpCommandLine,nil,nil,
                            true,dwCreationFlags,lpEnvironment,lpCurrentDirectory,lpStartupInfo,pi);
    if b == 1 then 
        if bSync == true then 
            WaitForSingleObject(pi.hProcess,waitTerminate); 
        end;
        knl32.CloseHandle(pi.hThread);
        knl32.CloseHandle(pi.hProcess);
        return pi.dwProcessId;
    else
        return 0;
    end
end

--[[
    检测 单 事件的信号状态, 多 事件的信号状态
--]]
function WaitForSingleObject(hHandle, dwMilliseconds)
    dwMilliseconds = dwMilliseconds or INFINITE;
    return knl32.WaitForSingleObject(hHandle, dwMilliseconds);
end
function WaitForMultipleObjects(nCount, lpHandles, bWaitAll, dwMilliseconds)
    bWaitAll = bWaitAll or false;
    dwMilliseconds = dwMilliseconds or INFINITE;
    return knl32.WaitForMultipleObjects(nCount, lpHandles, bWaitAll, dwMilliseconds);
end

--[[
    根据进程名查找进程
    需要查找的进程名
--]]
function FindProcess(inApplicationName)
	
    local hProcess = knl32.CreateToolhelp32Snapshot(TH32CS_SNAPPROCESS, 0);
    if hProcess == INVALID_HANDLE_VALUE then return 0; end;

    local info = ffi.new('PROCESSENTRY32');
    info.dwSize = ffi.sizeof('PROCESSENTRY32');
    
    local b = knl32.Process32First(hProcess, info);
    if b == 0 then return 0; end;
    
    local ps =  {};
    local nCount = 1;
    while true do
        
        b = knl32.Process32Next(hProcess, info);
        if b == 0  then break; end;
        if ffi.string(info.szExeFile) == inApplicationName then 
            print(nCount..' '..info.th32ProcessID);
            ps[nCount] = info.th32ProcessID;
            nCount = nCount + 1;
        end;
    end
    knl32.CloseHandle(hProcess);

    if table.getn(ps) > 0 then return ps; 
    else return 0; end
end

-- param: string to split, split string
-- return: substring(include nuil string)
function lua_string_split(str, split_char)
    local sub_str_tab = {};
    while (true) do
        local pos = string.find(str, split_char);
        if (not pos) then
            sub_str_tab[#sub_str_tab + 1] = str;
            break;
        end
        local sub_str = string.sub(str, 1, pos - 1);
        sub_str_tab[#sub_str_tab + 1] = sub_str;
        str = string.sub(str, pos + 1, #str);
    end
    return sub_str_tab
end

-- download file
function DownFile(srcurl,desfile)
    if ds_PathExist(desfile) then
        ds_DelFile(desfile)
    end
    local head=string.sub(srcurl,1,4)
    head =string.upper(head)
    if head == 'HTTP' then
        local tmp=string.gsub(srcurl,'/','\\')
        local tmpname=ds_FileName(tmp)
        tmpname = ds_Encode(tmpname)
        local tmpdir = ds_FileDir(tmp)
        local tmpfile=tmpdir..tmpname
        tmpfile =string.gsub(tmpfile,'\\','/')
        srcurl = tmpfile
    end
    local ret =  downloadControler(srcurl,desfile,nil,nil,20)
    return ret
end

-- Get pre path from exe file，for example: \dzhwt\dayingji\dzhwt.exe
-- we can get dzhwt.exe name
function lua_GetExeName(filePath)
	local str = filePath
	local jpos = 0;
    local ipos =string.find(str,"\\")
    while ipos ~= nil do
        --str=string.sub(str,ipos+1)
		jpos =ipos
        ipos =string.find(str,"\\",ipos+1)
        if ipos == nil then
            str=string.sub(filePath,jpos+1)
			break
        end	
    end
    return str
end

-- Get file path from exe file，for example: \dzhwt\dayingji\dzhwt.exe
-- we can get \dzhwt\dayingji\ path
function lua_FileDir(filepath)
	_,_,dirname,filename=string.find(filepath,'(.-)([^\\/]*)$')
	return dirname
end

-- Do download all files
function DoDownload(srcurl,desfile)
	local bret = false
	local nCount = 0
	while nCount<3 and bret == false do
		bret=DownFile(srcurl,desfile)
			nCount=nCount+1
	end
	if nCount>2 and bret ==false then     
		LOG("downfile fail:file name:dzhwt.exe")
		return false
	end
	return bret
end

-- UnCompress解压
function UnCompress(fileName, outPath)
	local rootpath = ds_GetRootPath()
    local cmd
    --cmd= rootpath..'\\dzhtoolscript\\7z.exe x -o'..rootpath..'\\dyj -y '..rootpath..'\\dyj\\'..fileName
	cmd= rootpath..'\\dzhtoolscript\\7z.exe x -o'..outPath..' -y '..outPath..'\\'..fileName
    CreateProcess(cmd,true)
    return true
end

-- Get "Save as" name from http path, for example: http://downfile.gw.com.cn/pub/l2/qswt/tfzq.exe
-- we can get tfzq.exe as save name
function lua_GetSaveName(urlPath)
	local str = urlPath
	local jpos = 0;
    local ipos =string.find(str,"/")
    while ipos ~= nil do
        --str=string.sub(str,ipos+1)
		jpos =ipos
        ipos =string.find(str,"/",ipos+1)
        if ipos == nil then
            str=string.sub(urlPath,jpos+1)
			break
        end	
    end
    return str
end

-- mncg\dyj\winwt.exe
-- param format like "mncg\\dyj\\winwt.exe **user** http://downfile.gw.com.cn/pub/l2/qswt/tfzq.exe"
function main(param)
	str_tab = lua_string_split(param, " ")
	--local exePath = rootpath.."\\"..str_tab[1]
	local exePath = str_tab[1]
	--print("exePath: "..exePath)
	local filePath = lua_FileDir(exePath)
	local exeName = lua_GetExeName(exePath)
	local fileSaveName = lua_GetSaveName(str_tab[3])
	local downloadPath = filePath..fileSaveName
	local ipos = string.find(exePath, rootpath)
	if ipos == nil then
		exePath = rootpath.."\\"..str_tab[1]
	end
	
	--local cmd = "FILEMGR?FILE=dzhwt.exe&LINK="..str_tab[3].."&Dir="..filePath.."&SAVEAS=dzhwt.exe&OPEN=1"
	if ds_PathExist(exePath) == true then
		local isExist = FindProcess('winwt.exe') 
		if isExist ~= 0 then
			-- local hwnd = user32.FindWindowA(nil, '大智慧委托 - 交易')
			-- local hwnd = user32.FindWindowA(nil, '金融交易终端')	
			local hwnd = user32.FindWindowA(nil, '大智慧委托 - 用户登录')
			if hwnd ~= nil then 
				user32.ShowWindow(hwnd, 9)
				user32.SetForegroundWindow(hwnd)
			else
				hwnd = user32.FindWindowA(nil, '解除锁定')	
				if hwnd ~= nil then 
					user32.ShowWindow(hwnd, 9)
					user32.SetForegroundWindow(hwnd)
				else
					hwnd = user32.FindWindowA(nil, '大智慧委托')	
					if hwnd ~= nil then 
						user32.ShowWindow(hwnd, 9)
						user32.SetForegroundWindow(hwnd)
					end
				end
			end
		else
			local pid = CreateProcess(exePath.." "..str_tab[2])
			--local pid = CreateProcess(exePath)
			if pid >0 then
				LOG("执行可执行文件:"..exeName.."成功")
			else 
				LOG("执行可执行文件:"..exeName.."失败")
			end
		end		
	else
		local retValue = user32.MessageBoxA(nil, "正在自动下载交易程序，可能需要1-3分钟，下载完成将提示您安装，请耐心等待！", "下载", 0)
		if retValue == 1 then
			-- file path not exist
			if ds_PathExist(filePath) ~= true then
				ds_CreateDir(filePath)
			end
			-- download file
			local bret = DoDownload(str_tab[3], downloadPath)
			if bret== true then
				-- UnCompress file
				local ppid = CreateProcess(downloadPath.." /SILENT /SP- /NORESTART /NOCANCEL "..str_tab[2])
				if ppid >0 then
					LOG("创建进程命令:"..fileSaveName.."执行成功")
				else 
					LOG("创建进程命令:"..fileSaveName.."执行失败")
				end
			else
				LOG("下载文件失败")
			end
		end
	end	
	print("rootpath: "..rootpath)
end

--main()
--main("\\dzhwt\\dayingji\\dzhwt.exe ***user** http://222.73.103.183/platform/download/datainfo.cfg")