LJ=  
+  7   > T�' T�'  H �CloseHandle� P   T�%     T�'    T�'  4  >   T�+  7% > )  :)  :)  :' :'  :'  :	)  :

  T�	  T�(   T�) +  7% >+ 7)	  
  * )      >	 T	� T	�4	 7
 >	+	 7		7
>	+	 7		7
>	7	H	 T	�'	  H	 G   ��dwProcessIdhThreadCloseHandlehProcessWaitForSingleObjectCreateProcessAPROCESS_INFORMATIONlpReserved2cbReserved2wShowWindowdwFlagslpTitlelpDesktoplpReservedSTARTUPINFOnewtonumber ��������?    T�+  + 7    @ 	��WaitForSingleObjectV 	   T�)   T�+  + 7      @ 	��WaitForMultipleObjects� 	 2  Q�4  7   >  T�  9 T�4  7  '  >  94  7     >  T�H sub	findstring� 
H+  7 + '  >+  T�'  H + 7% >+ 7% >:+  7  >	  T�'  H 2  ' Q�+  7  > 	  T�T�+ 77>  T�4	  %
 7	$	>79T�+  7 >4 7 >'   T�H T�'  H G  ��� �	getn
tableCloseHandleth32ProcessID 
printszExeFilestringProcess32NextProcess32FirstsizeofdwSizePROCESSENTRY32newCreateToolhelp32Snapshot �    '  4  7 % >
  T�Q� 4  7 %  >   T�4  7   > T�T�H sub\	findstring�  ) '  '  T
� T�Q�4     >  T�'  T� T�4 % >) H H &downfile fail:file name:dzhwt.exeLOGDownFile�   4   >  T�4  >4 %   $>4    * ' >H downloadControlersrcurl
printds_DelFileds_PathExist�    '  4  7 % >
  T�Q� 4  7 %  >   T�4  7   > T�T�H sub/	findstring`   4  7  % >5 5 5 5 4 H _dirnamefilename(.-)([^\/]*)$	findstring�     %  4  )  % >
  T�'  ' I�	 6
$	
	4
 % 	 $>
4
 	 >

 T�	 T�K�H lua_GetExeName����·��:LOG*.*ds_ScanDir� *�%  4   % >,  3 +  84 7 + >  T�+ % +  8$4 7%	 >4
 %  $>'  ' I
�4
 6	+  8>

   T
�T�K�4 7%	 > 4
 %  $> 7% >  T;�4   % 	 $	>4
 %  $>4  >4 % >  T�+ 7)	  %
 >
  T	S�+	 7		
 '	 >	+	 7		
 >	TI�4 	 )
 )   >'	  	 T	�4	
 %
  % $

>	T	9�4	
 %
  % $

>	T2�+ 7)  % %	  '
  >	 T)�4  >4! 	 >
 T�4" 	 >4# +	  8		
 > T	�4	 
 >	'
  
	 T
�4

 %$  %% $>
T

�4

 %$  %& $>
T	�4	
 %
' >	4 %( + $>4 7)>G  ���	exitrootpath: �����ļ�ʧ������ʧ��������װ��װ�ļ�:DoDownloadds_CreateDirds_PathExist	����N�����Զ����ؽ��׳��򣬿�����Ҫ1-3���ӣ�������ɽ���ʾ����װ�������ĵȴ���MessageBoxA	ʧ��	�ɹ�ִ�п�ִ���ļ�:CreateProcessSetForegroundWindowShowWindow(��̩(���)���������ϵͳ(�ͻ���)2.6FindWindowASysFrame.exeFindProcesslua_FileDir�ҵ��ļ����ļ�·����: path:
print^%s+(.-)%s+$
match��������ʱ��:lua_GetExePath��ʼ����ʱ��:LOG%c	dateos\	findstring	   C:\Program Files\TJPMEc2.6\ D:\Program Files\TJPMEc2.6\ E:\Program Files\TJPMEc2.6\ F:\Program Files\TJPMEc2.6\&C:\Program Files (x86)\TJPMEc2.6\&D:\Program Files (x86)\TJPMEc2.6\&E:\Program Files (x86)\TJPMEc2.6\&F:\Program Files (x86)\TJPMEc2.6\ lua_string_split �)  &=4   % > 4   % > 4   % > 7 % >7 % >4 >2  7 %	 >7 %
 >7 % >' ' ' (  (	  '
  1 5 1 5 1 5 1 5 1 5 1 5 1 5 1 5 1 5 1 5 1  5! 1" 5# 1$ 5% 0  �G  	main lua_GetExePath lua_FileDir lua_GetSaveName DownFile DoDownload lua_GetExeName FindProcess lua_string_split WaitForMultipleObjects WaitForSingleObject CreateProcess CloseHandle �    
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
�
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
�    typedef  unsigned int    UINT;
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
	cdefds_GetRootPathkernel32user32	loadffidzhtoolscript/dzhbase/curl!dzhtoolscript/dzhbase/fileoprequire�������� 