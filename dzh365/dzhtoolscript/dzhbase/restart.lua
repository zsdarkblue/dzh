LJ�  _   T�%     T�%   T�% T�% 4 7  % % >  4 7  %	 >  T�4 7
  ' '��>  T �4 7  % >  T�4 7
  ' '��>  T �4 7 % >  T�% T�%  $% 4 7    	 > 2  4 7 > 7>T
�  T� 
 T�  % 
 $
  9
A
N
� 7>H 
close
lines
popenioformat!pushd %q &dir %s /b %s &popd
/a-d /ad^[\/]$	.+\$sub^%b""$	find\	[\/]	gsubstring/s*.*.� Q+  7 % >     % $+ 7  >+  T?�Q>�  % +	  7		8
 7

>	$	+  78 7> T(�+  78 7> T!�+ 7	4
 8	 7		>+	 >  T�4  	 
 >T�4 7+  78	 7		> = 4 7	 > T� 9+ 7 	 > T�G   ����	�FindNextFileA
lowerIterFilesdwFileAttributestonumber	band...cFileNamestring\FindFirstFileA	\*.*WIN32_FIND_DATA[1]new f 
  2  4      >4  >T�4 7	 >AN�G  removeosipairsIterFiles�  K+  7 % >+ 7+ 7>+  > T�+ 7>) H +  7 % >+  7% 8 78 7	>+ 7
)     > T�+ 78 >) H 8 ' :8 78 + :+ 78 )  '	 *
 > T�+ 78 >) H + 78 >) H  �����AdjustTokenPrivilegesAttributesPrivilegeCountCloseHandleLookupPrivilegeValueA	LuidPrivileges
PLUID	castTOKEN_PRIVILEGES[1]GetLastErrorGetCurrentProcessOpenProcessTokenHANDLE[1]new{    +  7 )  % + 7%  >* + 7%	 '
 > =G  � �intconst char*	cast	openShellExecuteA�  4  7  >'��'   T�Q�4  7    > T�4  7  '  @  T�)  H \sublenstring� v'  '  '  '  4  7  % >4  7   >4  7 %	 >4  7	  '
  > 4  7	 '
  > 4  7	 
 >
  T	�Q	� +	  7		+
 ) + 7% 4  > = =		 
  T		�'	
 	 T	�T	�+	  7		'
�>	T	�
  T	�4		 %

 >	+	  7		
 '  >	+	  7		'
�>	+	 7		%
 >	+
  7

)  	 '>
4
 + 7 	 > =
 
 % $5 
 %  $5 4  >	  T�4 4 + >4 4 >G  �� �
�restart_processdel_fileexe_path\data_path
\datagetBasePathGetModuleFileNameAchar[260]newTerminateProcessSeShutdownPrivilegepromoteProcessPrivileges
Sleeptonumberint	castOpenProcesssub 	findstring�'  -4   % > 4  % >7 % >' ' '  ' ' ' (  '	 %
 7 % >7 % >7 %	 >7 %
 >1 1 5 1 5 1 5 1 5 1 5 1 5 0  �G  	main getBasePath restart_process promoteProcessPrivileges del_file IterFiles  Shell32Advapi32dzh_utilKernel32	loadSTKINFO70.DAT�$
typedef void* HANDLE;

typedef HANDLE *PHANDLE;

typedef void* HINSTANCE;

struct HWND__ {
    int unused;
};
typedef struct HWND__ *HWND;

struct HMODULE__ {
    int unused;
};
typedef struct HMODULE__ *HMODULE;

typedef enum _SID_NAME_USE {
    SidTypeUser = 1,
    SidTypeGroup,
    SidTypeDomain,
    SidTypeAlias,
    SidTypeWellKnownGroup,
    SidTypeDeletedAccount,
    SidTypeInvalid,
    SidTypeUnknown,
    SidTypeComputer,
    SidTypeLabel
} SID_NAME_USE, *PSID_NAME_USE;

typedef struct _LUID {
    unsigned long LowPart;
    long HighPart;
} LUID,*PLUID;

typedef struct _LUID_AND_ATTRIBUTES {
    LUID Luid;
    unsigned long Attributes;
 } LUID_AND_ATTRIBUTES;

typedef struct _TOKEN_PRIVILEGES {
    unsigned long PrivilegeCount;
    LUID_AND_ATTRIBUTES Privileges[1];
} TOKEN_PRIVILEGES, *PTOKEN_PRIVILEGES;

typedef struct _SECURITY_ATTRIBUTES {
    unsigned long nLength;
    void* lpSecurityDescriptor;
    bool bInheritHandle;
} SECURITY_ATTRIBUTES, *PSECURITY_ATTRIBUTES, *LPSECURITY_ATTRIBUTES;

typedef struct _STARTUPINFOA {
    unsigned long   cb;
    char*   lpReserved;
    char*   lpDesktop;
    char*   lpTitle;
    unsigned long   dwX;
    unsigned long   dwY;
    unsigned long   dwXSize;
    unsigned long   dwYSize;
    unsigned long   dwXCountChars;
    unsigned long   dwYCountChars;
    unsigned long   dwFillAttribute;
    unsigned long   dwFlags;
    short    wShowWindow;
    short    cbReserved2;
    unsigned char*  lpReserved2;
    HANDLE  hStdInput;
    HANDLE  hStdOutput;
    HANDLE  hStdError;
} STARTUPINFOA, *LPSTARTUPINFOA;

typedef STARTUPINFOA STARTUPINFO;
typedef LPSTARTUPINFOA LPSTARTUPINFO;

typedef struct _PROCESS_INFORMATION {
    HANDLE hProcess;
    HANDLE hThread;
    unsigned long dwProcessId;
    unsigned long dwThreadId;
} PROCESS_INFORMATION, *PPROCESS_INFORMATION, *LPPROCESS_INFORMATION;

typedef struct _FILETIME {
    unsigned long dwLowDateTime;
    unsigned long dwHighDateTime;
} FILETIME, *PFILETIME, *LPFILETIME;

typedef struct _WIN32_FIND_DATAA {
    unsigned long dwFileAttributes;
    FILETIME ftCreationTime;
    FILETIME ftLastAccessTime;
    FILETIME ftLastWriteTime;
    unsigned long nFileSizeHigh;
    unsigned long nFileSizeLow;
    unsigned long dwReserved0;
    unsigned long dwReserved1;
    char   cFileName[ 260 ];
    char   cAlternateFileName[ 14 ];
} WIN32_FIND_DATAA, *PWIN32_FIND_DATAA, *LPWIN32_FIND_DATAA;

typedef WIN32_FIND_DATAA WIN32_FIND_DATA;

typedef LPWIN32_FIND_DATAA LPWIN32_FIND_DATA;

typedef size_t (*writecb_func)( char *ptr, size_t size, size_t nmemb, void *userdata);

typedef int (*progress_callback)(void *clientp,   double dltotal, double dlnow,   double ultotal,   double ulnow);

void * fopen(const char * fname, const char * mode);
int _open(const char * path, int oflag, int pmode);
size_t fwrite ( const void * ptr, size_t size, size_t count, void * stream );
long _filelength (int filedes);
int _fseek_nolock (void *str,long offset,int whence);
int fclose(void * fp);
int _close (int fh);

void __stdcall Sleep(int millisecondsTimeout);

typedef int (*PFCallback)(const char* localSize, double dt, double dn, double ult, double uln);

int GetLocalProxySettingStr(char* pbuf, int Len);

unsigned long GetLastError();

HANDLE OpenProcess(unsigned long dwDesiredAccess,int bInheritHandle,unsigned long dwProcessId);
bool OpenProcessToken (HANDLE ProcessHandle,unsigned long DesiredAccess,PHANDLE TokenHandle);
int TerminateProcess(HANDLE hProcess,unsigned int uExitCode);
HANDLE GetCurrentProcess();
bool LookupPrivilegeValueA(const char* lpSystemName,const char* lpName,PLUID lpLuid);
bool CloseHandle( HANDLE hObject );
bool AdjustTokenPrivileges(HANDLE TokenHandle,bool DisableAllPrivileges,PTOKEN_PRIVILEGES NewState,unsigned long BufferLength,PTOKEN_PRIVILEGES PreviousState,unsigned long* ReturnLength);
bool CreateProcessA(
  const char* lpApplicationName,
  char* lpCommandLine,
  LPSECURITY_ATTRIBUTES lpProcessAttributes,
  LPSECURITY_ATTRIBUTES lpThreadAttributes,
  bool bInheritHandles,
  unsigned long dwCreationFlags,
  void* lpEnvironment,
  const char* lpCurrentDirectory,
  LPSTARTUPINFO lpStartupInfo,
  LPPROCESS_INFORMATION lpProcessInformation
);
HINSTANCE ShellExecuteA(HWND hwnd, const char* lpOperation, const char* lpFile, const char* lpParameters,
    const char* lpDirectory, int nShowCmd);
unsigned long GetCurrentDirectoryA( unsigned long nBufferLength, char* lpBuffer);
HANDLE FindFirstFileA(const char* lpFileName, LPWIN32_FIND_DATA lpFindFileData);
bool FindNextFileA(HANDLE hFindFile,LPWIN32_FIND_DATA lpFindFileData);
unsigned long GetModuleFileNameA(HMODULE hModule,char* lpFilename,unsigned long nSize);
	cdefbitffirequire�������� 