LJ   ,   G  +��  B+      T �4  > 4  > +   + % + $  + 7% >+ 7   >+ 7 7 + 7	 7
 + 7+ % + +	 7+	
 +
 >	 
 + + * >5 4   T	�+ 774 % % '  >G  4 '  >G  5�0�(���'���+��	�
�,�-�loadProgress	������ʼ��ʧ��	NULLMessageBoxAChMainWndbor#32770CreateWindowExAcybottomcx
rightGetImageSize	SIZEnew0calcProgressFilesgetDefaultResourcePath   ,   G  4�� 74  >+  	  T�% + ! +  $+ 77 >, + +  T�G  + +  T�+ , + , T�+ 7>+ +   T�G  , + , + +  T�.  4 + >G  )�4�1�2��3��*�loadProgressGetTickCount	atoiCprocessWndMessage @   4   
   T �+   7  4  > G  �DestroyWindowhMainWndP  +  +   + $+ 7 4  >G  5�0�(��hMainWndUpdateImage�   +   7   % > + 7'�   >+  7  >    % $ ,  G  ��5�-\dzhtoolscript\dzhupdate\updateResource\stringGetCurrentDirectoryAchar[255]new)  +  7 7  >G  �
SleepCt   2   +  + $4   % + $'    >4 7  >, G  5�0�(�1�	getn
table*ds_ScanDirFiles�  +   7   % > + 7  )  '  '  ' >  T
�Q	�+ 7  >+ 7  >T�G  ��DispatchMessageATranslateMessagePeekMessageAMSGnew �0 7 2�2   4    3 4 :>4   T�5  T�4 4 9 4 '   >4 % >4 %	 >4 %
 >7% >7% >7% >7% >7% >7% >(  ( (	 (
 ( (  ( ( ''''	' ' ' ' ' ''6' ' ''( ' ' 0 '!  '"  '#@ '$ '%  (& 7'%( >'7(')0 '*  +' ',  >(%( ')�'*  %+ 7,'7-',-,7-'7.'-.-7.'.	..
.7/'/	///%0 '1  '2  '3  '4d %5 16 56 16  56! 16" 56# 16$ 56% 16& 56' 16( 56) 16* 56+ 16, 56- 16. 56/ 160 561 0  �G  processWndMessage calcProgressFiles 
Sleep getDefaultResourcePath loadProgress destroyDialog setProgress setProgressMax showDialog setDialog progress\topbottom	left
right	����	.pngSystemParametersInfoA	RECTnew�    DWORD GetCurrentDirectoryA(DWORD nBufferLength,LPTSTR lpBuffer);
	int MessageBoxA(HWND, const char*, const char*, UINT);
	
	void Sleep(DWORD);
	
	int atoi(const char *str);

	
	BOOL InvalidateRect(HWND, const RECT*, BOOL);
	
	HWND CreateWindowExA(UINT, const char*, const char*, int, int, int, int, int, HWND, HMENU, HINSTANCE, void*);
	HWND CreateWindowA(const char*, const char*, int, int, int, int, int, HWND, HMENU, HINSTANCE, void*);
    BOOL DestroyWindow(HWND hWnd);
	HWND GetDesktopWindow();
	DWORD DefWindowProcA(HWND hWnd,UINT Msg,WPARAM wParam,LPARAM lParam);
    void* RegisterClassExA(PWNDCLASSEXA wcex);
    BOOL UpdateWindow(HWND hWnd);
    HMODULE GetModuleHandleA(LPCTSTR lpModuleName);

	
    BOOL GetMessageA(MSG*, HWND, UINT, UINT);
    LRESULT SendMessageA(HWND hWnd,UINT Msg,WPARAM wParam,LPARAM lParam);
    LRESULT PostMessageA(HWND hWnd,UINT Msg,WPARAM wParam,LPARAM lParam);
    BOOL TranslateMessage(const MSG*);
    LRESULT DispatchMessageA(const MSG*);
	BOOL PeekMessageA(MSG* msg,HWND hWnd,UINT wMSGfilterMin,UINT wMsgFilterMax,UINT wRemoveMsg);
    
    BOOL GetWindowRect(HWND hWnd,LPRECT lpRect);
    BOOL GetClientRect(HWND hWnd,LPRECT lpRect);
	
    
    HDC GetDC(HWND hWnd);
    BOOL DeleteDC(HDC hdc);
	HDC BeginPaint(HWND hWnd,PPAINTSTRUCT);
    BOOL EndPaint(HWND hWnd,PPAINTSTRUCT);
    HDC CreateCompatibleDC(HDC hdc);

	BOOL SetWindowTextA(HWND hwnd,LPCTSTR lpString);
	BOOL SetDlgItemText(HWND hDlg,int nIDDlgItem,LPCTSTR lpString);

	
	DWORD GetSysColor(int nIndex);
	HBRUSH CreateSolidBrush(COLORREF crColor);
    COLORREF SetBkColor(HDC hdc,COLORREF colorref);
    COLORREF SetTextColor(HDC hdc,COLORREF colorref);
	COLORREF SetBkMode(HDC hdc,int mode);
    BOOL SetSysColors(int cElements,const int *lpaElements,const COLORREF *lpaRgbValues);
    BOOL Ellipse(HDC hdc,int nLeftRect,int nTopRect,int nRightRect,int nBottomRect);
    BOOL Polygon(HDC hdc,const POINT *lpPoints,int nCount);
    BOOL LineTo(HDC hdc,int nXEnd,int nYEnd);
	
    BOOL TextOutA(HDC hdc,int nXStart,int nYStart,LPCTSTR lpString,int cchString);
    int DrawTextA(HDC hDC,LPCTSTR lpchText,int nCount,LPRECT lpRect,UINT uFormat);
    int FillRect(HDC hDC,const RECT *lprc,HBRUSH hbr);
    BOOL MoveToEx(HDC hdc,int X,int Y,LPPOINT lpPoint);
    
    int GetObjectA(HGDIOBJ hgdiobj,int cbBuffer,LPVOID lpvObject);
    HGDIOBJ SelectObject(HDC hdc,HGDIOBJ hgdiobj);
	BOOL DeleteObject(HGDIOBJ hObject);

    
    BOOL BitBlt(HDC hdcDest,int nXDest,int nYDest,int nWidth,int nHeight,HDC hdcSrc,int nXSrc,int nYSrc,DWORD dwRop);
    BOOL StretchBlt(HDC hdcDest,int nXOriginDest,int nYOriginDest,int nWidthDest,int nHeightDest,HDC hdcSrc,int nXOriginSrc,int nYOriginSrc,int nWidthSrc,int nHeightSrc,DWORD dwRop);
	HANDLE LoadImageA(HINSTANCE hinst,LPCTSTR lpszName,UINT uType,int cxDesired,int cyDesired,UINT fuLoad);
    HBITMAP LoadBitmapA(HINSTANCE hInstance,LPCTSTR lpBitmapName);
    BOOL ScreenToClient(HWND hWnd,LPPOINT lpPoint);
    int MessageBoxA(HWND, const char*, const char*, UINT);
	
	DWORD GetTickCount(void);

	void UpdateImage(HWND, const char*);
	void GetImageSize(const char*, SIZE*);
	BOOL SystemParametersInfoA(UINT uiAction, UINT uiParam, LPVOID pvParam, UINT fWinIni);

�    typedef char BYTE;
    typedef unsigned short WORD;
    typedef unsigned int DWORD;
    typedef int BOOL;
    typedef unsigned int UINT;
    typedef unsigned int* UINT_PTR;
    typedef long LONG;
    typedef unsigned long LONG_PTR;
    typedef UINT WPARAM;
    typedef LONG_PTR LPARAM;
    typedef LONG_PTR LRESULT;
    typedef void* HMENU;
    typedef void* HINSTANCE;
    typedef void* HWND;
    typedef const char* LPCTSTR;
    typedef char* LPTSTR;
    typedef void* HDC;
    typedef void* HBRUSH;
    typedef void* WNDPROC;
    typedef void* LPVOID;
    typedef DWORD COLORREF;
    typedef void* HICON;
    typedef void* HCURSOR;
    typedef void* HGDIOBJ;
    typedef void* HANDLE;
    typedef void* HBITMAP;
    typedef void* HMODULE;
    
    typedef struct{
        UINT      cbSize;
        UINT      style;
        WNDPROC   lpfnWndProc;
        int       cbClsExtra;
        int       cbWndExtra;
        HINSTANCE hInstance;
        HICON     hIcon;
        HCURSOR   hCursor;
        HBRUSH    hbrBackground;
        LPCTSTR   lpszMenuName;
        LPCTSTR   lpszClassName;
        HICON     hIconSm;
    } WNDCLASSEXA, *PWNDCLASSEXA;
	
    typedef struct {
        LONG  x;
        LONG  y;
    } POINT;
	typedef struct {
		LONG cx;
		LONG cy;
	} SIZE, *PSIZE;

    typedef struct {
        HWND hwnd;
        UINT message;
        WPARAM wParam;
        LPARAM lParam;
        DWORD time;
        POINT pt;
    } MSG;
    
    typedef struct {
         LONG left;
         LONG top;
         LONG right;
         LONG bottom;
    } RECT, *PRECT,*LPRECT;
    
    typedef struct{
         HDC  hdc;
         BOOL fErase;
         RECT rcPaint;
         BOOL fRestore;
         BOOL fIncUpdate;
         BYTE rgbReserved[32];
    } PAINTSTRUCT, *PPAINTSTRUCT; 
    typedef struct {
         LONG x;
         LONG y;
    } POINT, *PPOINT,*LPPOINT;
    
    typedef struct{
        LONG   bmType;
        LONG   bmWidth;
        LONG   bmHeight;
        LONG   bmWidthBytes;
        WORD   bmPlanes;
        WORD   bmBitsPixel;
        LPVOID bmBits;
    }BITMAP, *PBITMAP;
	cdefluacalc
gdi32user32kernel32	loadbitffi!dzhtoolscript/dzhbase/fileoprequiresetfenv	uui2_REQUIREDNAME__index_G  setmetatable�� �����������������@��������� 