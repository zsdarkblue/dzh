LJ<    4   % > G  !dzhtoolscript/dzhbase/fileoprequire>    4   % > G  #dzhtoolscript/dzhupdate/base64require� ( �)   T�H +  7 % >+ 7 % > % 
  T�+  7 > % 
  T� T�
  T� T� T� %	 
 $
T�4 %	 
 $	
	>) H + 7		  
 )  >
  T	�4	
 
     >		 T	��+	  7	 	%
 >	+
 7

 % >
	
 %
 
	  T�+  7	 >
 
  T�4 %  $>) T��
 T�
 T��+  7 % >+ 7 % > +  7 >+  7 % >+ 7 >   T�% +  7 >
  T� T�+ 7+    >  Tr�4 %  %  $>Tj�
  T"� T �4  >
  T�+ 7+    >  TW�4 %  %  $>TO�4 %  %  $>) TF�
  T*� T(�4  >
  T� T	�4 %  %  $>) T2�4 7  >+ 7!+     ) >  T"�4 %  %  $>T�4 %"  %  $>) T�
# T�+ 7$+   >T�4 %%  %& 
 $>)  T	�)	 H	 +	 7	'	
   )  >	
	  T
�4

   	  + >

 H  ���xmlConfig_NextSiblingNode,��ȡ���Ľڵ��������:*�ڵ������õĲ������Ͳ�֧��,��Ӧkeyֵ:Simple_SDeleteEntrydel,�ڵ��������õ��ַ����Ͳ�֧��,��Ӧkeyֵ:Simple_SWriteProfileBinarylen,��ȡ���Ľڵ�����::�����ַ�����Ϊ�����ƵĽڵ㣬�ڵ�ֵ����Ϊ��,��Ӧkeyֵ:base64decodeBINARY,��ȡ�����ַ�����ʽ��ֵ��9�������ڵ����ֵΪ�ջ���int���͵���ֵ,��Ӧ��keyֵ:Simple_SWriteProfileInttonumberINT,�ڵ����ͣ��ڵ�ϲ�ʧ��,��Ӧkeyֵ:Simple_SWriteProfileStringSTRINGCfgNode_GetValue	typechar[64]	editadd(�ڵ�������opֵ��ȡʧ��,��Ӧ��keyֵ:opchar[32]GetNodexmlConfig_FirstChild0�ڵ�������nameֵ��ȡʧ��,��Ӧ�ĸ��ڵ�keyֵ:LOG\string	nameCfgNode_GetStringchar[512]new�   ]4   >    T�G    % $4  > T�4 % >G  T�4 % >+  7 >  T�G  +  7 >  T�4 % >G  +  7	  %
 >
  T*�+  7	  % >
  T"�+  7	  %	 >
  T�+  7 >
  T�+ 7	 >4	 %
  $

>	 T		�+	  7		
 % >	+	  7		
 >	+  7 >G  � �ReleaseXmlConfigxmlConfig_SavezSFIF0001,SMCNY0,HKHSI,IXN225,IXKS11,FXUSDCNH,FXUSDCNY,IXUDI,FXXAUUSD,NXXBZY0,IXDJIA,IXSPX,IXNDX,IXFTSE,IXGDAXI,IXFCHICfgNode_SetValueSH000018INDEX_WATCH NAME:stringCfgNode_GetValueINDEX_WATCHglobalindexregion3xmlConfig_FirstChild-���������ļ���δ��⵽root�ڵ㣬�ϲ�ʧ��xmlConfig_RootNodeGetConfigFromFile)��⵽statusbar.xml����ʼ�滻180����δ��⵽statusbar.xmlLOGds_PathExist&\cfg\user\statusbar\statusbar.xmlds_GetRootPath�   �4   > )  4 >  T�G   % $4  > T�4 % >G  T�4 % >+  7 >+  7 >  T�4 %	 >G  
  TT�QS�) + 7
% >+  7 %	 > % 
  T�+ 7	 > 
  T/� T-�+  7	 '
 >, +  7	 
 )  >5 + 
  T�4 
  T�4 	 4
 % + >  T�+  7+	 >T�4 %	 
 % $		>) +  7+	 >T�4 %	 >)  T�)  +  7	 
 )  > T�  T�4 % >T�4 % >4  >G  � ��ds_DelFile���������ļ��ϲ��ϲ��ɹ�)���������ļ��ϲ������г������ϲ�ʧ��xmlConfig_NextSiblingNode1���������ļ���root�ڵ��ModuleNameֵ��ȡʧ��Simple_ReleaseConfig�Ҳ�����Ӧ�������ļ�����ModuleName:Simple_SaveGetNodehNewChildNodexmlConfig_FirstChildSimple_GetConfigstringModuleNameCfgNode_GetStringchar[128]new-���������ļ���δ��⵽root�ڵ㣬�ϲ�ʧ��xmlConfig_RootNodeGetConfigFromFile-��⵽���������ļ�����ʼ���������ļ��ϲ�0δ��⵽���������ļ�,����Ҫ���������ļ��ϲ�LOGds_PathExist\update\xmldiff.xmlds_GetRootPathupdatexmlfile2�'   4   1 > 4   1 > 4  % > 4 % >7 % >7 %	 >7 %
 >)  1 5 1 5 1 5 0  �G  updatexmlfile updatexmlfile2 GetNode �$	HandleSimple GetSystemConfig();
	bool Simple_SWriteProfileString(HandleSimple hSimple, const char*lpszSection, const char*lpszEntry, const char*lpszValue);
	
	HandleConfig GetConfig(const char*pConfigKeyName);
	void ReleaseConfig(HandleConfig hConfig);
	
	HandleSimple Simple_GetConfig(const char*pConfigKeyName, int ModeFlag);
	void Simple_ReleaseConfig(HandleSimple hSimple);
	void Simple_Reload(HandleSimple hSimple);
	bool Simple_Save(HandleSimple hSimple);
	int Simple_SGetProfileType(HandleSimple hSimple, const char*lpszSection, const char*lpszEntry);
	int Simple_SGetProfileInt(HandleSimple hSimple, const char*lpszSection, const char*lpszEntry, int nDefault);
	bool Simple_SWriteProfileInt(HandleSimple hSimple, const char*lpszSection, const char*lpszEntry, int nValue);
	bool Simple_SGetProfileString(HandleSimple hSimple, const char*lpszSection, const char*lpszEntry, char*pBuf, int &nBufLen, const char*lpszDefault);
	bool Simple_SWriteProfileString(HandleSimple hSimple, const char*lpszSection, const char*lpszEntry, const char*lpszValue);
	bool Simple_SGetProfileBinary(HandleSimple hSimple, const char*lpszSection, const char*lpszEntry,  char*pBuf, int &nBufLen);
	bool Simple_SWriteProfileBinary(HandleSimple hSimple, const char*lpszSection, const char*lpszEntry, const char*pData, int nBytes,int bEncode);
	bool Simple_SDeleteSection(HandleSimple hSimple, const char*lpszSection);
	bool Simple_SDeleteEntry(HandleSimple hSimple, const char*lpszSection, const char*lpszEntry);
	//bool Simple_EnumSection(HandleSimple hSimple, vector<string>& vecSection, const char*lpszSection);
	//bool Simple_EnumEntry(HandleSimple hSimple, vector<Entry>& vecEntry, const char*lpszSection);
	
	void CfgNode_SetValue(HandleCfgNode hNode, const char* szValue);
	void CfgNode_SetString(HandleCfgNode hNode, const char* szName, const char* szValue);
	void CfgNode_SetInt(HandleCfgNode hNode, const char* szName, int nValue);
	void CfgNode_SetFloat(HandleCfgNode hNode, const char* szName, float fValue);
	void CfgNode_SetDouble(HandleCfgNode hNode, const char* szName, double fValue);
	void CfgNode_SetBool(HandleCfgNode hNode, const char* szName, bool bValue);
	const char* CfgNode_GetString(HandleCfgNode hNode, const char* szName);
	const char* CfgNode_GetValue(HandleCfgNode hNode);
	bool CfgNode_GetContentText(HandleCfgNode hNode, char*pBuf, int &nBufLen);
	bool CfgNode_GetInt(HandleCfgNode hNode, const char* szName, int& nValue, int nDefault);
	bool CfgNode_GetFloat(HandleCfgNode hNode, const char* szName, float& fValue, float fDefault);
	bool CfgNode_GetDouble(HandleCfgNode hNode, const char* szName, double& dValue, double dDefault);
	bool CfgNode_GetBool(HandleCfgNode hNode, const char* szName, bool& bValue, bool bDefault);
	void CfgNode_RemoveAttribute(HandleCfgNode hNode, const char*name );
	const char* CfgNode_GetNodeName(HandleCfgNode hNode);
	void  CfgNode_SetNodeName(HandleCfgNode hNode, const char* szNodeName);
	//int CfgNode_GetAllAttribute(HandleCfgNode hNode, std::vector<string>& vs);
	HandleConfig CfgNode_GetConfig(HandleCfgNode hNode);
	
	
	bool Config_Save(HandleConfig hConfig);
	bool Config_GetCurrentPath(HandleConfig hConfig, char*pBuf, int &nBufLen);
	bool Config_GetPath(HandleConfig hConfig, char*pBuf, int &nBufLen, bool bUserPath);
	void Config_Reload(HandleConfig hConfig);
	HandleCfgNode Config_RootNode(HandleConfig hConfig);
	HandleCfgNode Config_NodeFromPath(HandleConfig hConfig, const char* szpath);
	HandleCfgNode Config_Parent(HandleConfig hConfig, HandleCfgNode hCfgNode);
	HandleCfgNode Config_FirstChild(HandleConfig hConfig, HandleCfgNode hCfgNode, const char*_value );
	HandleCfgNode Config_NextSiblingNode(HandleConfig hConfig, HandleCfgNode hCfgNode, const char*_value);
	HandleCfgNode Config_InsertEndChild(HandleConfig hConfig, HandleCfgNode hCfgNode, const char* _value );
	HandleCfgNode Config_InsertBeforeChild(HandleConfig hConfig, HandleCfgNode hBeforeThis, const char* _value );
	HandleCfgNode Config_InsertAfterChild(HandleConfig hConfig, HandleCfgNode hAfterThis, const char* _value);
	void Config_Remove(HandleConfig hConfig, HandleCfgNode hCfgNode);
	
	HandleXmlConfig GetConfigFromFile(const char*pFilePath);
	HandleCfgNode xmlConfig_RootNode(HandleXmlConfig hxmlConfig);
	HandleCfgNode xmlConfig_FirstChild(HandleXmlConfig hxmlConfig, HandleCfgNode pThis, const char *_value );
	HandleCfgNode xmlConfig_NextSiblingNode(HandleXmlConfig hxmlConfig, HandleCfgNode pThis, const char *_value);
	const char* CfgNode_GetValue(HandleCfgNode hNode);
	bool xmlConfig_Save( HandleXmlConfig hxmlConfig );
	void ReleaseXmlConfig( HandleXmlConfig hConfig );
�	typedef struct {} *HandleSimple;
	typedef struct {} *HandleConfig;
	typedef struct {} *HandleCfgNode;
	typedef struct {} *HandleXmlConfig;
	enum eModeFlag
	{
		eModeFlag_DefaultWrite,
		eModeFlag_CustomWrite,
	};

	
	cdefdzh_base	loadbitffirequire  
pcall 