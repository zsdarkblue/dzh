LJ<    4   % > G  !dzhtoolscript/dzhbase/fileoprequire=  
+  7   > T�' T�'  H �CloseHandle� P   T�%     T�'    T�'  4  >   T�+  7% > )  :)  :)  :' :'  :'  :	)  :

  T�	  T�(   T�) +  7% >+ 7)	  
  * )      >	 T	� T	�4	 7
 >	+	 7		7
>	+	 7		7
>	7	H	 T	�'	  H	 G   ��dwProcessIdhThreadCloseHandlehProcessWaitForSingleObjectCreateProcessAPROCESS_INFORMATIONlpReserved2cbReserved2wShowWindowdwFlagslpTitlelpDesktoplpReservedSTARTUPINFOnewtonumber ���������  +  7 + )   >  T�'  H +  7 '  >+  7 >' H ��CloseHandleTerminateProcessOpenProcess� 
H+  7 + '  >+  T�'  H + 7% >+ 7% >:+  7  >	  T�'  H 2  ' Q�+  7  > 	  T�T�+ 77>  T�4	  %
 7	$	>79T�+  7 >  T�4 7 >'   T�H '  H ��� �	getn
tableCloseHandleth32ProcessID 
printszExeFilestringProcess32NextProcess32FirstsizeofdwSizePROCESSENTRY32newCreateToolhelp32Snapshot � 9+  7 + '  >+  T�'  H + 7% >+ 7% >:+  7  >	  T�'  H Q�+  7  > 	  T�T�7  T�T�T�+  7 >	  T�%	 H T�+ 7
7@ G  ��� �szExeFilestringCloseHandleth32ProcessIDProcess32NextProcess32FirstsizeofdwSizePROCESSENTRY32newCreateToolhelp32Snapshot ?    T�+  + 7    @ 	��WaitForSingleObjectV 	   T�)   T�+  + 7      @ 	��WaitForMultipleObjects(   +   7   @  �GetCurrentThreadId)   +   7   @  �GetCurrentProcessId'   +   7   @  �GetCurrentProcessL  	   T�4  >  +  7  @ �GetProcessIdGetCurrentProcessV     T�)    T�)   T�)  +  7 )      @ �CreateEventA"  +  7   @ �SetEvent$  +  7   @ �ResetEvent�    ,4   7  % 4  7> = 4 >% $ % $ % $   % $   %	 $4
   >4
   >4 >%  %	 
 $
4  >G  CreateProcess *\dzhtoolscript\dzhupdate\ftptest.bat ds_CopyFile_luaupdate.log_dzhtool.logluaupdate.logdzhtool.log
\log\ds_GetRootPath	time%Y%m%d%H%M%S	dateos� h+  7 + '  >+  T�'  H + 7% >+ 7% >:+  7  >	  T�'  H 2  ' Q9�+  7 	 > 	  T�T0�+ 77>  T�+  7 + 7		>
  T�+ 7%	
 >+	 7		%

 >	:	+	  7		
  >		 +	  7		>		  T
�'
  H
 4
 7>
+
 7

7>

 T
�7
	9
T�+  7 >  T�4 7 >'   T�H '  H ��� ��	getn
tableCloseHandleszExePath
printGetLastErrorModule32FirstMODULEENTRY32th32ProcessIDszExeFilestringProcess32NextProcess32FirstsizeofdwSizePROCESSENTRY32newCreateToolhelp32Snapshot |  +  7 + )   >  T�) H +  7 '  > T�) H ) H ��TerminateProcessOpenProcess�.  -C4   1 > 4  % > 4 % >7 % >7 % >7 %	 >7 %
 >' ' ' ' (  (	  '
  ( ( ( 1 5 1 5 1 5 1 5 1 5 1 5 1 5 1 5 1 5 1 5 1 5  1! 5" 1# 5$ 1% 5& 1' 5( 1) 5* 1+ 5, 0  �G  KillProcess FindSpeciProcess 
ftpup ResetEvent SetEvent CreateEvent GetProcessId GetCurrentProcess GetCurrentProcessId GetCurrentThreadId WaitForMultipleObjects WaitForSingleObject FindProcessByID FindProcess TerminateProcess CreateProcess CloseHandle �    
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
    
    BOOL 
    Module32First(
        HANDLE hSnapshot,
        LPMODULEENTRY32 lpme
    );
    
    DWORD
GetLastError(
    );
	
	void __stdcall Sleep(int millisecondsTimeout);
�
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
    
    typedef struct tagMODULEENTRY32
    {
        DWORD   dwSize;
        DWORD   th32ModuleID;       // This module
        DWORD   th32ProcessID;      // owning process
        DWORD   GlblcntUsage;       // Global usage count on the module
        DWORD   ProccntUsage;       // Module usage count in th32ProcessID's context
        BYTE  * modBaseAddr;        // Base address of module in th32ProcessID's context
        DWORD   modBaseSize;        // Size in bytes of module starting at modBaseAddr
        HMODULE hModule;            // The hModule of this module in th32ProcessID's context
        char    szModule[255 + 1];
        char    szExePath[260];
    } MODULEENTRY32;
    typedef MODULEENTRY32 *  PMODULEENTRY32;
    typedef MODULEENTRY32 *  LPMODULEENTRY32;
	cdefkernel32user32	loadbitffirequire 
pcall�������������x��� 