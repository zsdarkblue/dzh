local ffi = require("ffi")
local bit = require("bit")
local kernel32=ffi.load('kernel32') 
local shlwapi=ffi.load('Shlwapi')
local user32 = ffi.load('user32')

ffi.cdef[[
     typedef  unsigned int    UINT;
    typedef  int             INT;
	typedef unsigned short  WORD;
    typedef unsigned int    DWORD;   
    typedef const char*     LPTSTR;
    typedef const char*     LPCTSTR;
    typedef const char*     LPCSTR;
    typedef const char*     LPSTR;
    typedef void*           LPVOID;
    typedef unsigned char   BYTE;
    typedef unsigned char*  LPBYTE;
    typedef unsigned long   ULONG_PTR;
    typedef wchar_t WCHAR;
	typedef char    CHAR;
    typedef int     BOOL;
    typedef long    LONG;
    typedef void    VOID;
    
    typedef void*   HMODULE;
    typedef void*   HANDLE;
    typedef DWORD*  LPDWORD;
    typedef ULONG_PTR   SIZE_T;
	
    typedef struct _FILETIME
    {
        DWORD dwLowDateTime;
        DWORD dwHighDateTime;
    } 	FILETIME;
    
    typedef struct _WIN32_FIND_DATAA {
        DWORD dwFileAttributes;
        FILETIME ftCreationTime;
        FILETIME ftLastAccessTime;
        FILETIME ftLastWriteTime;
        DWORD nFileSizeHigh;
        DWORD nFileSizeLow;
        DWORD dwReserved0;
        DWORD dwReserved1;
        char   cFileName[ 256 ];
        char   cAlternateFileName[ 14 ];
    } WIN32_FIND_DATA, *PWIN32_FIND_DATA, *LPWIN32_FIND_DATA;
    
    typedef struct _SECURITY_ATTRIBUTES_NEW {
        DWORD nLength;
        LPVOID lpSecurityDescriptor;
        BOOL bInheritHandle;
    } SECURITY_ATTRIBUTES, *PSECURITY_ATTRIBUTES, *LPSECURITY_ATTRIBUTES;
    DWORD GetCurrentDirectoryA(
        DWORD nBufferLength, // size of directory buffer
        LPTSTR lpBuffer // directory buffer
        );

    BOOL PathFileExistsA(LPCTSTR pszPath );
    BOOL PathIsRelativeA(LPCSTR pszPath); 
    BOOL CopyFileA(LPCTSTR lpExistingFileName,LPCTSTR lpNewFileName,BOOL bFailIfExists );
    BOOL MoveFileA(LPCTSTR lpExistingFileName, LPCTSTR lpNewFileName );
    BOOL CreateDirectoryA(LPCTSTR lpPathName, LPSECURITY_ATTRIBUTES lpSecurityAttributes);
    UINT GetPrivateProfileIntA(LPCTSTR lpAppName,LPCTSTR lpKeyName,INT nDefault,LPCTSTR lpFileName);
    DWORD GetPrivateProfileStringA(LPCTSTR lpAppName,LPCTSTR lpKeyName,LPCTSTR lpDefaut,LPSTR lpReturnedString,DWORD nSize,LPCTSTR lpFileName);
    BOOL WritePrivateProfileStringA(LPCTSTR lpAppName,LPCTSTR lpKeyName,LPCTSTR lpString,LPCTSTR lpFileName);
    HANDLE FindFirstFileA(LPCTSTR lpFileName,LPWIN32_FIND_DATA lpFindFileData  );
    BOOL FindNextFileA(HANDLE hFindFile, LPWIN32_FIND_DATA lpFindFileData );
    BOOL RemoveDirectoryA(LPCTSTR lpPathName );
    BOOL SetFileAttributesA(LPCTSTR lpFileName,DWORD dwFileAttributes);
    BOOL FindClose(HANDLE hFindFile );

    
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
    
    typedef void* HWND;
   
    HWND FindWindowA(
		 LPCSTR lpClassName,
		 LPCSTR lpWindowName
		);
   
    BOOL ShowWindow(
	HWND hWnd,
	int nCmdShow);

	BOOL SetForegroundWindow(HWND hWnd);

	int MessageBoxA(
		HWND hWnd,
		LPCSTR lpText,
		LPCSTR lpCaption,
		UINT uType
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

ffi.cdef([[

typedef enum {
  CURLOPT_FILE = 10000 + 1,
  CURLOPT_URL = 10000 + 2,
  CURLOPT_PORT = 0 + 3,
  CURLOPT_PROXY = 10000 + 4,
  CURLOPT_USERPWD = 10000 + 5,
  CURLOPT_PROXYUSERPWD = 10000 + 6,
  CURLOPT_RANGE = 10000 + 7,
  CURLOPT_INFILE = 10000 + 9,
  CURLOPT_ERRORBUFFER = 10000 + 10,
  CURLOPT_WRITEFUNCTION = 20000 + 11,
  CURLOPT_READFUNCTION = 20000 + 12,
  CURLOPT_TIMEOUT = 0 + 13,
  CURLOPT_INFILESIZE = 0 + 14,
  CURLOPT_POSTFIELDS = 10000 + 15,
  CURLOPT_REFERER = 10000 + 16,
  CURLOPT_FTPPORT = 10000 + 17,
  CURLOPT_USERAGENT = 10000 + 18,
  CURLOPT_LOW_SPEED_LIMIT = 0 + 19,
  CURLOPT_LOW_SPEED_TIME = 0 + 20,
  CURLOPT_RESUME_FROM = 0 + 21,
  CURLOPT_COOKIE = 10000 + 22,
  CURLOPT_HTTPHEADER = 10000 + 23,
  CURLOPT_HTTPPOST = 10000 + 24,
  CURLOPT_SSLCERT = 10000 + 25,
  CURLOPT_KEYPASSWD = 10000 + 26,
  CURLOPT_CRLF = 0 + 27,
  CURLOPT_QUOTE = 10000 + 28,
  CURLOPT_WRITEHEADER = 10000 + 29,
  CURLOPT_COOKIEFILE = 10000 + 31,
  CURLOPT_SSLVERSION = 0 + 32,
  CURLOPT_TIMECONDITION = 0 + 33,
  CURLOPT_TIMEVALUE = 0 + 34,
  CURLOPT_CUSTOMREQUEST = 10000 + 36,
  CURLOPT_STDERR = 10000 + 37,
  CURLOPT_POSTQUOTE = 10000 + 39,
  CURLOPT_WRITEINFO = 10000 + 40, 
  CURLOPT_VERBOSE = 0 + 41,      
  CURLOPT_HEADER = 0 + 42,       
  CURLOPT_NOPROGRESS = 0 + 43,   
  CURLOPT_NOBODY = 0 + 44,       
  CURLOPT_FAILONERROR = 0 + 45,  
  CURLOPT_UPLOAD = 0 + 46,       
  CURLOPT_POST = 0 + 47,         
  CURLOPT_DIRLISTONLY = 0 + 48,  
  CURLOPT_APPEND = 0 + 50,       
  CURLOPT_NETRC = 0 + 51,
  CURLOPT_FOLLOWLOCATION = 0 + 52,  
  CURLOPT_TRANSFERTEXT = 0 + 53, 
  CURLOPT_PUT = 0 + 54,          
  CURLOPT_PROGRESSFUNCTION = 20000 + 56,
  CURLOPT_PROGRESSDATA = 10000 + 57,
  CURLOPT_AUTOREFERER = 0 + 58,
  CURLOPT_PROXYPORT = 0 + 59,
  CURLOPT_POSTFIELDSIZE = 0 + 60,
  CURLOPT_HTTPPROXYTUNNEL = 0 + 61,
  CURLOPT_INTERFACE = 10000 + 62,
  CURLOPT_KRBLEVEL = 10000 + 63,
  CURLOPT_SSL_VERIFYPEER = 0 + 64,
  CURLOPT_CAINFO = 10000 + 65,
  CURLOPT_MAXREDIRS = 0 + 68,
  CURLOPT_FILETIME = 0 + 69,
  CURLOPT_TELNETOPTIONS = 10000 + 70,
  CURLOPT_MAXCONNECTS = 0 + 71,
  CURLOPT_CLOSEPOLICY = 0 + 72, 
  CURLOPT_FRESH_CONNECT = 0 + 74,
  CURLOPT_FORBID_REUSE = 0 + 75,
  CURLOPT_RANDOM_FILE = 10000 + 76,
  CURLOPT_EGDSOCKET = 10000 + 77,
  CURLOPT_CONNECTTIMEOUT = 0 + 78,
  CURLOPT_HEADERFUNCTION = 20000 + 79,
  CURLOPT_HTTPGET = 0 + 80,
  CURLOPT_SSL_VERIFYHOST = 0 + 81,
  CURLOPT_COOKIEJAR = 10000 + 82,
  CURLOPT_SSL_CIPHER_LIST = 10000 + 83,
  CURLOPT_HTTP_VERSION = 0 + 84,
  CURLOPT_FTP_USE_EPSV = 0 + 85,
  CURLOPT_SSLCERTTYPE = 10000 + 86,
  CURLOPT_SSLKEY = 10000 + 87,
  CURLOPT_SSLKEYTYPE = 10000 + 88,
  CURLOPT_SSLENGINE = 10000 + 89,
  CURLOPT_SSLENGINE_DEFAULT = 0 + 90,
  CURLOPT_DNS_USE_GLOBAL_CACHE = 0 + 91, 
  CURLOPT_DNS_CACHE_TIMEOUT = 0 + 92,
  CURLOPT_PREQUOTE = 10000 + 93,
  CURLOPT_DEBUGFUNCTION = 20000 + 94,
  CURLOPT_DEBUGDATA = 10000 + 95,
  CURLOPT_COOKIESESSION = 0 + 96,
  CURLOPT_CAPATH = 10000 + 97,
  CURLOPT_BUFFERSIZE = 0 + 98,
  CURLOPT_NOSIGNAL = 0 + 99,
  CURLOPT_SHARE = 10000 + 100,
  CURLOPT_PROXYTYPE = 0 + 101,
  CURLOPT_ACCEPT_ENCODING = 10000 + 102,
  CURLOPT_PRIVATE = 10000 + 103,
  CURLOPT_HTTP200ALIASES = 10000 + 104,
  CURLOPT_UNRESTRICTED_AUTH = 0 + 105,
  CURLOPT_FTP_USE_EPRT = 0 + 106,
  CURLOPT_HTTPAUTH = 0 + 107,
  CURLOPT_SSL_CTX_FUNCTION = 20000 + 108,
  CURLOPT_SSL_CTX_DATA = 10000 + 109,
  CURLOPT_FTP_CREATE_MISSING_DIRS = 0 + 110,
  CURLOPT_PROXYAUTH = 0 + 111,
  CURLOPT_FTP_RESPONSE_TIMEOUT = 0 + 112,
  CURLOPT_IPRESOLVE = 0 + 113,
  CURLOPT_MAXFILESIZE = 0 + 114,
  CURLOPT_INFILESIZE_LARGE = 30000 + 115,
  CURLOPT_RESUME_FROM_LARGE = 30000 + 116,
  CURLOPT_MAXFILESIZE_LARGE = 30000 + 117,
  CURLOPT_NETRC_FILE = 10000 + 118,
  CURLOPT_USE_SSL = 0 + 119,
  CURLOPT_POSTFIELDSIZE_LARGE = 30000 + 120,
  CURLOPT_TCP_NODELAY = 0 + 121,
  CURLOPT_FTPSSLAUTH = 0 + 129,
  CURLOPT_IOCTLFUNCTION = 20000 + 130,
  CURLOPT_IOCTLDATA = 10000 + 131,
  CURLOPT_FTP_ACCOUNT = 10000 + 134,
  CURLOPT_COOKIELIST = 10000 + 135,
  CURLOPT_IGNORE_CONTENT_LENGTH = 0 + 136,
  CURLOPT_FTP_SKIP_PASV_IP = 0 + 137,
  CURLOPT_FTP_FILEMETHOD = 0 + 138,
  CURLOPT_LOCALPORT = 0 + 139,
  CURLOPT_LOCALPORTRANGE = 0 + 140,
  CURLOPT_CONNECT_ONLY = 0 + 141,
  CURLOPT_CONV_FROM_NETWORK_FUNCTION = 20000 + 142,
  CURLOPT_CONV_TO_NETWORK_FUNCTION = 20000 + 143,
  CURLOPT_CONV_FROM_UTF8_FUNCTION = 20000 + 144,
  CURLOPT_MAX_SEND_SPEED_LARGE = 30000 + 145,
  CURLOPT_MAX_RECV_SPEED_LARGE = 30000 + 146,
  CURLOPT_FTP_ALTERNATIVE_TO_USER = 10000 + 147,
  CURLOPT_SOCKOPTFUNCTION = 20000 + 148,
  CURLOPT_SOCKOPTDATA = 10000 + 149,
  CURLOPT_SSL_SESSIONID_CACHE = 0 + 150,
  CURLOPT_SSH_AUTH_TYPES = 0 + 151,
  CURLOPT_SSH_PUBLIC_KEYFILE = 10000 + 152,
  CURLOPT_SSH_PRIVATE_KEYFILE = 10000 + 153,
  CURLOPT_FTP_SSL_CCC = 0 + 154,
  CURLOPT_TIMEOUT_MS = 0 + 155,
  CURLOPT_CONNECTTIMEOUT_MS = 0 + 156,
  CURLOPT_HTTP_TRANSFER_DECODING = 0 + 157,
  CURLOPT_HTTP_CONTENT_DECODING = 0 + 158,
  CURLOPT_NEW_FILE_PERMS = 0 + 159,
  CURLOPT_NEW_DIRECTORY_PERMS = 0 + 160,
  CURLOPT_POSTREDIR = 0 + 161,
  CURLOPT_SSH_HOST_PUBLIC_KEY_MD5 = 10000 + 162,
  CURLOPT_OPENSOCKETFUNCTION = 20000 + 163,
  CURLOPT_OPENSOCKETDATA = 10000 + 164,
  CURLOPT_COPYPOSTFIELDS = 10000 + 165,
  CURLOPT_PROXY_TRANSFER_MODE = 0 + 166,
  CURLOPT_SEEKFUNCTION = 20000 + 167,
  CURLOPT_SEEKDATA = 10000 + 168,
  CURLOPT_CRLFILE = 10000 + 169,
  CURLOPT_ISSUERCERT = 10000 + 170,
  CURLOPT_ADDRESS_SCOPE = 0 + 171,
  CURLOPT_CERTINFO = 0 + 172,
  CURLOPT_USERNAME = 10000 + 173,
  CURLOPT_PASSWORD = 10000 + 174,
  CURLOPT_PROXYUSERNAME = 10000 + 175,
  CURLOPT_PROXYPASSWORD = 10000 + 176,
  CURLOPT_NOPROXY = 10000 + 177,
  CURLOPT_TFTP_BLKSIZE = 0 + 178,
  CURLOPT_SOCKS5_GSSAPI_SERVICE = 10000 + 179,
  CURLOPT_SOCKS5_GSSAPI_NEC = 0 + 180,
  CURLOPT_PROTOCOLS = 0 + 181,
  CURLOPT_REDIR_PROTOCOLS = 0 + 182,
  CURLOPT_SSH_KNOWNHOSTS = 10000 + 183,
  CURLOPT_SSH_KEYFUNCTION = 20000 + 184,
  CURLOPT_SSH_KEYDATA = 10000 + 185,
  CURLOPT_MAIL_FROM = 10000 + 186,
  CURLOPT_MAIL_RCPT = 10000 + 187,
  CURLOPT_FTP_USE_PRET = 0 + 188,
  CURLOPT_RTSP_REQUEST = 0 + 189,
  CURLOPT_RTSP_SESSION_ID = 10000 + 190,
  CURLOPT_RTSP_STREAM_URI = 10000 + 191,
  CURLOPT_RTSP_TRANSPORT = 10000 + 192,
  CURLOPT_RTSP_CLIENT_CSEQ = 0 + 193,
  CURLOPT_RTSP_SERVER_CSEQ = 0 + 194,
  CURLOPT_INTERLEAVEDATA = 10000 + 195,
  CURLOPT_INTERLEAVEFUNCTION = 20000 + 196,
  CURLOPT_WILDCARDMATCH = 0 + 197,
  CURLOPT_CHUNK_BGN_FUNCTION = 20000 + 198,
  CURLOPT_CHUNK_END_FUNCTION = 20000 + 199,
  CURLOPT_FNMATCH_FUNCTION = 20000 + 200,
  CURLOPT_CHUNK_DATA = 10000 + 201,
  CURLOPT_FNMATCH_DATA = 10000 + 202,
  CURLOPT_RESOLVE = 10000 + 203,
  CURLOPT_TLSAUTH_USERNAME = 10000 + 204,
  CURLOPT_TLSAUTH_PASSWORD = 10000 + 205,
  CURLOPT_TLSAUTH_TYPE = 10000 + 206,
  CURLOPT_TRANSFER_ENCODING = 0 + 207,
  CURLOPT_CLOSESOCKETFUNCTION = 20000 + 208,
  CURLOPT_CLOSESOCKETDATA = 10000 + 209,
  CURLOPT_GSSAPI_DELEGATION = 0 + 210,
  CURLOPT_DNS_SERVERS = 10000 + 211,
  CURLOPT_ACCEPTTIMEOUT_MS = 0 + 212,
  CURLOPT_TCP_KEEPALIVE = 0 + 213,
  CURLOPT_TCP_KEEPIDLE = 0 + 214,
  CURLOPT_TCP_KEEPINTVL = 0 + 215,
  CURLOPT_SSL_OPTIONS = 0 + 216,
  CURLOPT_MAIL_AUTH = 10000 + 217,
  CURLOPT_SASL_IR = 0 + 218,
  CURLOPT_LASTENTRY 
}CURLoption;

typedef enum {
  CURLE_OK = 0,
  CURLE_UNSUPPORTED_PROTOCOL,
  CURLE_FAILED_INIT,
  CURLE_URL_MALFORMAT,
  CURLE_URL_MALFORMAT_USER,
  CURLE_COULDNT_RESOLVE_PROXY,
  CURLE_COULDNT_RESOLVE_HOST,
  CURLE_COULDNT_CONNECT,
  CURLE_FTP_WEIRD_SERVER_REPLY,
  CURLE_FTP_ACCESS_DENIED,
  CURLE_FTP_USER_PASSWORD_INCORRECT,
  CURLE_FTP_WEIRD_PASS_REPLY,
  CURLE_FTP_WEIRD_USER_REPLY,
  CURLE_FTP_WEIRD_PASV_REPLY,
  CURLE_FTP_WEIRD_227_FORMAT,
  CURLE_FTP_CANT_GET_HOST,
  CURLE_FTP_CANT_RECONNECT,
  CURLE_FTP_COULDNT_SET_BINARY,
  CURLE_PARTIAL_FILE,
  CURLE_FTP_COULDNT_RETR_FILE,
  CURLE_FTP_WRITE_ERROR,
  CURLE_FTP_QUOTE_ERROR,
  CURLE_HTTP_RETURNED_ERROR,
  CURLE_WRITE_ERROR,
  CURLE_MALFORMAT_USER,
  CURLE_FTP_COULDNT_STOR_FILE,
  CURLE_READ_ERROR,
  CURLE_OUT_OF_MEMORY,
  CURLE_OPERATION_TIMEOUTED,
  CURLE_FTP_COULDNT_SET_ASCII,
  CURLE_FTP_PORT_FAILED,
  CURLE_FTP_COULDNT_USE_REST,
  CURLE_FTP_COULDNT_GET_SIZE,
  CURLE_HTTP_RANGE_ERROR,
  CURLE_HTTP_POST_ERROR,
  CURLE_SSL_CONNECT_ERROR,
  CURLE_BAD_DOWNLOAD_RESUME,
  CURLE_FILE_COULDNT_READ_FILE,
  CURLE_LDAP_CANNOT_BIND,
  CURLE_LDAP_SEARCH_FAILED,
  CURLE_LIBRARY_NOT_FOUND,
  CURLE_FUNCTION_NOT_FOUND,
  CURLE_ABORTED_BY_CALLBACK,
  CURLE_BAD_FUNCTION_ARGUMENT,
  CURLE_BAD_CALLING_ORDER,
  CURLE_INTERFACE_FAILED,
  CURLE_BAD_PASSWORD_ENTERED,
  CURLE_TOO_MANY_REDIRECTS ,
  CURLE_UNKNOWN_TELNET_OPTION,
  CURLE_TELNET_OPTION_SYNTAX ,
  CURLE_OBSOLETE,
  CURLE_SSL_PEER_CERTIFICATE,
  CURLE_GOT_NOTHING,
  CURLE_SSL_ENGINE_NOTFOUND,
  CURLE_SSL_ENGINE_SETFAILED,
  CURLE_SEND_ERROR,
  CURLE_RECV_ERROR,
  CURLE_SHARE_IN_USE,
  CURLE_SSL_CERTPROBLEM,
  CURLE_SSL_CIPHER,
  CURLE_SSL_CACERT,
  CURLE_BAD_CONTENT_ENCODING,
  CURLE_LDAP_INVALID_URL,
  CURLE_FILESIZE_EXCEEDED,
  CURLE_FTP_SSL_FAILED,
  CURLE_SEND_FAIL_REWIND,
  CURLE_SSL_ENGINE_INITFAILED,
  CURLE_LOGIN_DENIED,
  CURL_LAST
}CURLcode;

typedef enum {
  CURLINFO_NONE,
  CURLINFO_EFFECTIVE_URL    = 0x100000 + 1,
  CURLINFO_RESPONSE_CODE    = 0x200000   + 2,
  CURLINFO_TOTAL_TIME       = 0x300000 + 3,
  CURLINFO_NAMELOOKUP_TIME  = 0x300000 + 4,
  CURLINFO_CONNECT_TIME     = 0x300000 + 5,
  CURLINFO_PRETRANSFER_TIME = 0x300000 + 6,
  CURLINFO_SIZE_UPLOAD      = 0x300000 + 7,
  CURLINFO_SIZE_DOWNLOAD    = 0x300000 + 8,
  CURLINFO_SPEED_DOWNLOAD   = 0x300000 + 9,
  CURLINFO_SPEED_UPLOAD     = 0x300000 + 10,
  CURLINFO_HEADER_SIZE      = 0x200000   + 11,
  CURLINFO_REQUEST_SIZE     = 0x200000   + 12,
  CURLINFO_SSL_VERIFYRESULT = 0x200000   + 13,
  CURLINFO_FILETIME         = 0x200000   + 14,
  CURLINFO_CONTENT_LENGTH_DOWNLOAD   = 0x300000 + 15,
  CURLINFO_CONTENT_LENGTH_UPLOAD     = 0x300000 + 16,
  CURLINFO_STARTTRANSFER_TIME = 0x300000 + 17,
  CURLINFO_CONTENT_TYPE     = 0x100000 + 18,
  CURLINFO_REDIRECT_TIME    = 0x300000 + 19,
  CURLINFO_REDIRECT_COUNT   = 0x200000   + 20,
  CURLINFO_PRIVATE          = 0x100000 + 21,
  CURLINFO_HTTP_CONNECTCODE = 0x200000   + 22,
  CURLINFO_HTTPAUTH_AVAIL   = 0x200000   + 23,
  CURLINFO_PROXYAUTH_AVAIL  = 0x200000   + 24,
  CURLINFO_OS_ERRNO         = 0x200000   + 25,
  CURLINFO_NUM_CONNECTS     = 0x200000   + 26,
  CURLINFO_SSL_ENGINES      = 0x400000  + 27,

  CURLINFO_LASTONE          = 28
} CURLINFO;

typedef enum {
  CURLPROXY_HTTP = 0,
  CURLPROXY_HTTP_1_0 = 1,
  CURLPROXY_SOCKS4 = 4,
  CURLPROXY_SOCKS5 = 5,
  CURLPROXY_SOCKS4A = 6,
  CURLPROXY_SOCKS5_HOSTNAME = 7
} curl_proxytype;

typedef enum 
{
	PROXY_NULL = 0,
	PROXY_HTTP,
	PROXY_SOCKS4,
	PROXY_SOCKS4A,
	PROXY_SOCKS5,
	PROXY_GREEN
}PROXY_TYPE;

typedef void CURL;

typedef size_t (*writecb_func)( char *ptr, size_t size, size_t nmemb, void *userdata);

typedef int (*progress_callback)(void *clientp,   double dltotal, double dlnow,   double ultotal,   double ulnow);

CURLcode curl_global_init(long flags);
CURL *curl_easy_init(void);

CURLcode curl_easy_setopt(CURL *curl, CURLoption tag, ...);
CURLcode curl_easy_getinfo(CURL *curl, CURLINFO info, ...);
int curl_easy_perform(CURL *curl);
void curl_easy_cleanup(CURL *curl);
void curl_global_cleanup(void);


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
int GetLocalNetIp(char* pbuf, int len);

]])

local logfile=nil
local logfilesize=0
function LOG(log)
    if logfile ~= nil then
        local localtime=os.date('%Y-%m-%d %H:%M:%S',os.time())
        log =localtime..'       '..log
        logfile:write(log)
        logfile:write('\n')
        logfile:flush()
        logfilesize = logfilesize+string.len(log)
        if logfilesize >1024*1024*10 then
            logfile:close()
            local exttime=os.date('%Y%m%d%H%M%S',os.time())
            local filesrc=ds_GetRootPath()..'\\log\\LuaUpdate.log'
            local filedes=ds_GetRootPath()..'\\log\\LuaUpdate.log.'..exttime
            ds_ReName(filesrc,filedes)
            logfile=nil
            logfilesize =0
        end
    else
        local filepath=ds_GetRootPath()..'\\log\\LuaUpdate.log'
        local logdir =ds_FileDir(filepath)
        if ds_PathExist(logdir) == false then
            ds_CreateDir(logdir)
        end
  --      if ds_PathExist(filepath) == true then
  --          ds_DelFile(filepath)
  --      end
        logfile=io.open(filepath,'a+')
        local localtime=os.date('%Y-%m-%d %H:%M:%S',os.time())
        log =localtime..'       '..log
        logfile:write(log)
        logfile:write('\n')
        logfile:flush()
        logfilesize = logfilesize+string.len(log)
    end
end

---- file is or nor exist
function ds_PathExist(filepath)
	local nret=false
	if filepath ~= nil then
		local n=shlwapi.PathFileExistsA(filepath)
		if n ~=0 then
			nret=true	
		end
	end
	return nret
end

----鍒涘缓鐩綍
function ds_CreateDir(directory)
	local bret = false
	local tmpdir =directory
	tmpdir= string.gsub(tmpdir,'/','\\') 
	local strlast=string.sub(tmpdir,-1,-2)
	if strlast ~='\\' then
	    tmpdir=tmpdir..'\\'
	end
	local t={}
	if tmpdir ~= nil then
	    local nindex = 1
	    for i = 3,string.len(tmpdir) do
	        local newstr = string.sub(tmpdir,i,i)
	        if newstr=='\\' then
	            t[nindex]=string.sub(tmpdir,1,i)
	            nindex=nindex+1
	        end
	    end
	    for j = 1,#t do
	        local dir = t[j]
	        if ds_PathExist(dir)== false then
	            kernel32.CreateDirectoryA(dir,nil)
	        end
	    end
	end
	if ds_PathExist(directory) == true then
	    bret = true
	end
	return bret
end

function ds_FileDir(filepath)
	_,_,dirname,filename=string.find(filepath,'(.-)([^\\/]*)$')
	return dirname
end

-- 鑾峰彇DZH鐨勬牴鐩綍
function ds_GetRootPath()
	local dzhRoot = ""
	local rootpath = ffi.new('char[255]')
	kernel32.GetCurrentDirectoryA(255,rootpath)
	rootpath = ffi.string(rootpath)
	print("rootpath:"..rootpath)
	local pos = string.find(rootpath, 'ui')
	if pos ~= nil then
		dzhRoot = string.sub(rootpath, 1, pos - 1);
	end
	return dzhRoot
end

local CREATE_NEW_CONSOLE    = 0x00000010  ;
local PROCESS_TERMINATE     = 0x0001      ;
local TH32CS_SNAPPROCESS    = 0x00000002  ;
local INVALID_HANDLE_VALUE  = 0xFFFFFFFF  ;
local INFINITE              = 0xFFFFFFFF  ;
local WAIT_OBJECT_0         = 0x00000000  ;

--[[
    鍏抽棴鍙ユ焺,
    闇�瑕佸叧闂殑鍙ユ焺
--]]   
function CloseHandle(inHandle)
    local b = kernel32.CloseHandle(inHandle);
    return (b == true and 1) or 0;
end

--[[
    鏍规嵁杩涚▼璺緞鍙婂弬鏁版墦寮�杩涚▼,
    lpApplicationName,杩涚▼璺緞,
    lpCommandLine,鍙傛暟
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
    local b =  kernel32.CreateProcessA(nil,lpCommandLine,nil,nil,
                            true,dwCreationFlags,lpEnvironment,lpCurrentDirectory,lpStartupInfo,pi);
    if b == 1 then 
        if bSync == true then 
            WaitForSingleObject(pi.hProcess,waitTerminate); 
        end;
        kernel32.CloseHandle(pi.hThread);
        kernel32.CloseHandle(pi.hProcess);
        return pi.dwProcessId;
    else
        return 0;
    end
end

--local dzhPath = ds_GetRootPath()
local libcurl = ffi.load('libcurl')
local dzh_util = ffi.load('dzh_util')

local CURL_GLOBAL_SSL = 1
local CURL_GLOBAL_WIN32 = 2
local CURL_GLOBAL_ALL = 3
local CURL_GLOBAL_NOTHING = 0
local CURL_GLOBAL_DEFAULT = CURL_GLOBAL_ALL

--鍏ㄥ眬鍙橀噺
resumeDownload = false;        	--鏄惁闇�瑕佷笅杞界殑鏍囪浣?
downloadFileLenth = 0;    		--闇�瑕佷笅杞界殑鎬诲ぇ灏? 杩滅▼鏂囦欢鐨勫ぇ灏?

--寰楀埌鏈湴鏂囦欢澶у皬鐨勫嚱鏁? 鑻ヤ笉鏄画浼犲垯杩斿洖0, 鍚﹀垯杩斿洖鎸囧畾璺緞鍦板潃鐨勬枃浠跺ぇ灏?
function getLocalFileLenth(localPath)
    if resumeDownload ~= true then  
        return 0
    end
	local size = 0
	local fp = ffi.C._open(localPath, 0, 0)
	if fp ~= -1 then
		size = ffi.C._filelength(fp);
		ffi.C._close(fp);	
	end
    return size
end

--寰楀埌杩滅▼鏂囦欢鐨勫ぇ灏? 瑕佷笅杞界殑鏂囦欢澶у皬
function getDownloadFileLenth(handle,url)  
    local downloadFileLenth = ffi.new("int");
    libcurl.curl_easy_setopt(handle, ffi.C.CURLOPT_URL, url)
    libcurl.curl_easy_setopt(handle, ffi.C.CURLOPT_HEADER, 1)    --鍙渶瑕乭eader澶? 
    libcurl.curl_easy_setopt(handle, ffi.C.CURLOPT_NOBODY, 1)    --涓嶉渶瑕乥ody
	local ret = libcurl.curl_easy_perform(handle)
    if ret == ffi.C.CURLE_OK then
        libcurl.curl_easy_getinfo(handle, ffi.C.CURLINFO_CONTENT_LENGTH_DOWNLOAD, downloadFileLenth)
		print("downloadFileLenth = "..downloadFileLenth)
    else 
		print("ret = "..ret)
		downloadFileLenth = -1
    end
    return downloadFileLenth
end

--杩斿洖绫诲瀷杞崲涓篶url浠ｇ悊绫诲瀷
function SwitchCurlProxyType(proxy_type)
	local type1 = tonumber(proxy_type)
	if tonumber(proxy_type) == tonumber(ffi.C.PROXY_HTTP) then return tonumber(ffi.C.CURLPROXY_HTTP) end
	if tonumber(proxy_type) == tonumber(ffi.C.PROXY_SOCKS4) then return tonumber(ffi.C.CURLPROXY_SOCKS4) end
	if tonumber(proxy_type) == tonumber(ffi.C.PROXY_SOCKS4A) then return tonumber(ffi.C.CURLPROXY_SOCKS4A) end
	if tonumber(proxy_type) == tonumber(ffi.C.PROXY_SOCKS5) then return tonumber(ffi.C.CURLPROXY_SOCKS5) end
end

--涓嬭浇鐨勫嚱鏁?
function scomoDownload(handle, url, localPath, progress_func, user_data, timeout, flag)
	local fp = nil
    local localFileLenth = 0
	if flag >0 then
		fp = ffi.C.fopen(localPath, "ab+")
		localFileLenth = getLocalFileLenth(localPath)
	else
		fp = ffi.C.fopen(localPath, "wb+")
		--鑾峰彇浠ｇ悊淇℃伅
		--1:proxy_type, 2:proxy_auth, 3:proxy_ip, 4:proxy_port, 5:user_name, 6:pass_word
		proxy_setting = {ffi.C.PROXY_NULL, 0, nil, 0, nil, nil}
		local proxy_info = ffi.new("char[512]")
		local local_ip = ffi.new("char[32]")
		local buff_len = 512
		local ret_len = dzh_util.GetLocalProxySettingStr(proxy_info,buff_len)
		local ipLen = dzh_util.GetLocalNetIp(local_ip,32)
		localIP_str = ffi.string(local_ip)
		local proxy_str = ffi.string(proxy_info)
		local info = nil
		local offset = 1
		for info in string.gmatch(proxy_str, "([^\n]+)\n+") do proxy_setting[offset] = info; offset = offset+1 end
	end
	if fp == nil then print("fp = NULL,return");return false end
--	libcurl.curl_easy_setopt(handle, ffi.C.CURLOPT_VERBOSE, ffi.cast("int", 1))
    libcurl.curl_easy_setopt(handle, ffi.C.CURLOPT_URL, url)
    libcurl.curl_easy_setopt(handle, ffi.C.CURLOPT_HEADER, ffi.cast("int", 0))
    libcurl.curl_easy_setopt(handle, ffi.C.CURLOPT_TIMEOUT,ffi.cast("int", timeout))
    libcurl.curl_easy_setopt(handle, ffi.C.CURLOPT_WRITEFUNCTION, ffi.C.fwrite)
    libcurl.curl_easy_setopt(handle, ffi.C.CURLOPT_FILE, fp)
	libcurl.curl_easy_setopt(handle, ffi.C.CURLOPT_RANGE,localFileLenth..'-'); 
	if progress_func ~= nil then
		libcurl.curl_easy_setopt(handle, ffi.C.CURLOPT_NOPROGRESS, ffi.cast("int", 0))
		libcurl.curl_easy_setopt(handle, ffi.C.CURLOPT_PROGRESSFUNCTION, ffi.cast("PFCallback",progress_func))
		libcurl.curl_easy_setopt(handle, ffi.C.CURLOPT_PROGRESSDATA, user_data)
	end
	if tonumber(proxy_setting[1]) ~= tonumber(ffi.C.PROXY_NULL) then
		if tostring(proxy_setting[3]) == "127.0.0.1" then 
			libcurl.curl_easy_setopt(handle, ffi.C.CURLOPT_PROXY, localIP_str)
		else
			libcurl.curl_easy_setopt(handle, ffi.C.CURLOPT_PROXY, tostring(proxy_setting[3]))
		end
		libcurl.curl_easy_setopt(handle, ffi.C.CURLOPT_PROXYPORT, ffi.cast("int", tonumber(proxy_setting[4])))
		if proxy_setting[5] ~= nil and proxy_setting[6] ~= nil then
			libcurl.curl_easy_setopt(handle, ffi.C.CURLOPT_PROXYUSERPWD, tostring(proxy_setting[5])..":"..tostring(proxy_setting[6]))
		end
		libcurl.curl_easy_setopt(handle, ffi.C.CURLOPT_PROXYTYPE, ffi.cast("int", SwitchCurlProxyType(proxy_setting[1])))
	end
	local ret = libcurl.curl_easy_perform(handle)
	print("ret = "..ret)
	ffi.C.fclose(fp)
    if ret == ffi.C.CURLE_OK  then
        resumeDownload = false
        return true
    else 
        resumeDownload = true
		download_len = getLocalFileLenth(localPath)
		if download_len == 0 then resumeDownload = false end
        return false
    end
end

--涓嬭浇娴佺▼鎺у埗
function downloadControler(url,localPath,progress_callback,user_data,timeout)
	local ret = libcurl.curl_global_init(CURL_GLOBAL_ALL)
	if ret ~= ffi.C.CURLE_OK then return false end
	local handle=libcurl.curl_easy_init()
	if handle == nil then return false end
--   downloadFileLenth = getDownloadFileLenth(handle,url) 	--涓嬭浇鍓嶅緱鍒拌涓嬭浇鐨勬枃浠跺ぇ灏忚祴鍊肩粰鍏ㄥ眬鍙橀噺  
--	print(downloadFileLenth)
    local times = timeout/10
	if times<=0 then times = 1 end
    local count = 0  
    local status = false
    while status ~= true do
		if count == times or times == 200 then break end
        status = scomoDownload(handle,url,localPath,progress_callback,user_data,3,count)
		if resumeDownload == true then times = times + 1 end
		count = count + 1
        kernel32.Sleep(500)  	            						--姣忔涓嬭浇涓棿闂撮殧500姣  
    end
    resumeDownload = false	             						--涓嶇涓嬭浇鎴愬姛鎴栧け璐? 瀹屾垚while寰幆鍚庡皢鏍囧織鍥炰綅  
	libcurl.curl_easy_cleanup(handle);
	libcurl.curl_global_cleanup();
    if status == true then 
		print("finished")
        return true 
    end
	print("failed")
	return false
end

local str_tab = {}

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
		--return true
    end
    --local head=string.sub(srcurl,1,4)
    --head =string.upper(head)
    --if head == 'HTTP' then
       -- local tmp=string.gsub(srcurl,'/','\\')
       -- local tmpname=ds_FileName(tmp)
       -- tmpname = ds_Encode(tmpname)
       -- local tmpdir = ds_FileDir(tmp)
       -- local tmpfile=tmpdir..tmpname
       -- tmpfile =string.gsub(tmpfile,'\\','/')
       -- srcurl = tmpfile
    -- end
    local ret =  downloadControler(srcurl,desfile,nil,nil,20)
    return ret
end

-- Get pre path from exe file锛宖or example: \dzhwt\dayingji\dzhwt.exe
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

-- Get file path from exe file锛宖or example: \dzhwt\dayingji\dzhwt.exe
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

-- UnCompress瑙ｅ帇
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

--[[
    根据进程名查找进程
    需要查找的进程名
--]]
function FindProcess(inApplicationName)
	
    local hProcess = kernel32.CreateToolhelp32Snapshot(TH32CS_SNAPPROCESS, 0);
    if hProcess == INVALID_HANDLE_VALUE then return 0; end;

    local info = ffi.new('PROCESSENTRY32');
    info.dwSize = ffi.sizeof('PROCESSENTRY32');
    
    local b = kernel32.Process32First(hProcess, info);
    if b == 0 then return 0; end;
    
    local ps =  {};
    local nCount = 1;
    while true do
        
        b = kernel32.Process32Next(hProcess, info);
        if b == 0  then break; end;
        if ffi.string(info.szExeFile) == inApplicationName then 
            print(nCount..' '..info.th32ProcessID);
            ps[nCount] = info.th32ProcessID;
            nCount = nCount + 1;
        end;
    end
    kernel32.CloseHandle(hProcess);

    if table.getn(ps) > 0 then return ps; 
    else return 0; end
end

function IsProcessExist(processName)
	local retVal = false
	local hProcess = kernel32.CreateToolhelp32Snapshot(TH32CS_SNAPPROCESS, 0);
	local i = 0
	local ppe32 = ffi.new('PROCESSENTRY32');  
	ppe32.dwSize = ffi.sizeof('PROCESSENTRY32');   
	-- HANDLE hProcessSnap = ::CreateToolhelp32Snapshot(TH32CS_SNAPPROCESS, 0);  
	if hProcessSnap == INVALID_HANDLE_VALUE then i=0 end
	 LOG("IsProcessExist")
	local bMore = kernel32.Process32First(hProcessSnap, ppe32);  
	while bMore do   
	    if ffi.string(ppe32.szExeFile) == processName then  
		retVal = true
		break
	    end 
	    bMore = kernel32.Process32Next(hProcessSnap, ppe32);  
	end  
	return retVal
	--if i > 0 then  
	   -- return true;  
	--else
	    --return false;  
	--end
end

-- mncg\dyj\winwt.exe
-- param format like "mncg\\dyj\\winwt.exe **user** http://downfile.gw.com.cn/pub/l2/qswt/tfzq.exe"
function main(param)
	str_tab = lua_string_split(param, " ")
	--local exePath = rootpath.."\\"..str_tab[1]
	local exePath = str_tab[1]
	local rootpath = str_tab[4]
	--print("exePath: "..exePath)
	local filePath = lua_FileDir(exePath)
	local exeName = lua_GetExeName(exePath)
	local fileSaveName = lua_GetSaveName(str_tab[3])
	filePath = rootpath..filePath
	local downloadPath = filePath..fileSaveName
	--downloadPath = rootpath..downloadPath
	--local ipos = string.find(exePath, rootpath)
	if ipos == nil then
		exePath = rootpath.."\\"..str_tab[1]
	end
	
	LOG("exePath: "..exeName)
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
			LOG("11111")
			-- file path not exist
			if ds_PathExist(filePath) ~= true then
				ds_CreateDir(filePath)
				LOG("filePath:"..filePath)
			end
		
			-- download file
			local bret = DoDownload(str_tab[3], downloadPath)
			LOG("downloadPath:"..downloadPath)
			if bret== true then
				local ppid = CreateProcess(downloadPath.." /SILENT /SP- /NORESTART /NOCANCEL "..str_tab[2], false, nil, rootpath)
				if ppid >0 then
				LOG("执行可执行文件:"..fileSaveName.."成功")
				else 
				LOG("执行可执行文件:"..fileSaveName.."失败")
				end
			else
				LOG("下载失败")
			end	
		end
	end	
	print("rootpath: "..rootpath)
end