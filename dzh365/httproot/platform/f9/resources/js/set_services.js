define(['jquery','./services'], function ($,services) {
    return {
        obj:(location.search.match(/obj=([^&]*)/) || [, 'SH600000.stk'])[1],
        type:(location.search.match(/type=([^&]*)/) || [, 'jihe'])[1],
        DownUrl:'http://pdf.gw.com.cn/pdf/pdfPath/MRGG/',
        nodata:'<p class="no_data_color">提示：该品种无此项记录，或在当前条件下无数据</p>',
        getAjax:function (r_type,r_data) {
            //默认的一些参数
            var data = {obj:this.obj,type:this.type,m:"F9finance",c:"Glance",f:r_type}
            //这里如果需要传其它参数时则使用r_data对象传递
            if(r_data != undefined && r_data instanceof Object){
                for(var x in r_data)
                    data[x] = r_data[x]
            }
            //执行AJAX
            return $.ajax({
                //url:services.baseUrl+'/f9/',
                url:'http://dsjalpha.gw.com.cn/f9/',
                data:data,
                dataType:'jsonp'
            })
        },
        getJavaSend:function(param){
            var url = param['url'] == undefined ? '/rpc' : param['url']
            var param_s = ''
            if(param['parameter'].constructor === Object)
                param_s = btoa(JSON.stringify(param['parameter']));
            else if(param['parameter'].constructor === String){
                var arr = [],temp_arr = param['parameter'].split(';')
                for(var x in temp_arr)
                    arr.push(btoa(temp_arr[x]))
                param_s = arr.join(',')
            }
            return $.send(url,{
                so:param['so'],
                function:param['function'],
                paraencode:'base64',
                parameter:param_s
            },function(){
                console.log('调JSO出错,参数为[[********************************')
                console.log(param)
                console.log(']]********************************')
            }); 
        },
        replaceField:function(str){
            return str.replace(/(一季度|二季度|三季度|四季度)/g,function(e){
                if(e == '一季度')
                    return 'Q1'
                else if(e == '二季度')
                    return 'Q2'
                else if(e == '三季度')
                    return 'Q3'
                else if(e == '四季度')
                    return 'Q4'
                else
                    return ''
            })
        },
        createTable:function(columns,data){
            var tableHtml = '';
            if(columns != undefined && columns instanceof Array && columns.length > 0 && data instanceof Array && data.length > 0){
                var temp_cl = ' class="under_line"',cssClass = [];
                if(columns[0]['line'] === false)//标题栏与内容是否要显示分隔线
                    temp_cl = '';
                tableHtml = '<table class="c-c-table common-table"><tr'+temp_cl+'>';
                for (var i = 0,n = columns.length; i < n; i++) {
                    var str = '';
                    if(columns[i]['cssHead'] != undefined)//标题特有的样式
                        str = ' class="'+columns[i]['cssHead']+'"';
                    if(columns[i]['cssClass'] != undefined){//标题和内容共有的样式
                        if(str != '')
                            str = str.replace('class="','class="'+columns[i]['cssClass']+' ')
                        else
                            str = ' class="'+columns[i]['cssClass']+'"';
                        cssClass[i] = ' class="'+columns[i]['cssClass']+'"';
                    }
                    if(columns[i]['cssContent'] != undefined){//只有内容才有的样式
                        if(cssClass[i] != undefined)
                            cssClass[i] = cssClass[i].replace('class="','class="'+columns[i]['cssContent']+' ');
                        else
                            cssClass[i] = ' class="'+columns[i]['cssContent']+'"';
                    }
                    tableHtml += '<th'+str+'>'+columns[i]['name']+'</th>';
                }
                tableHtml += '</tr><tbody>';
                for(var x in data){
                    tableHtml += '<tr>';
                    for (var i = 0,n = columns.length; i < n; i++) {
                        var str = '';
                        columns[i]['showTitle'] != undefined && columns[i]['showTitle'] === true && (str = ' title="'+data[x][columns[i]['field']]+'" ')
                        cssClass[i] != undefined && (str += cssClass[i])
                        tableHtml += '<td'+str+'>'+data[x][columns[i]['field']]+'</td>';
                    }
                    tableHtml += '</tr>';
                }
                tableHtml += '</tbody></table>';
            }
            return tableHtml;
        },
        createNotice:function(data){
            var html = '<ul>';
            for(var x in data){
                var date = data[x].time.substr(0,4)+'-'+data[x].time.substr(4,2)+'-'+data[x].time.substr(6,2);
                html += '<li title="'+data[x].content+'" data-time="'+date+'" data-id="'+data[x].id+'"><span>'+date+'</span> <i class="'+(this.getIcon(data[x].icon))+'" data-icon="'+data[x].id+'@@'+data[x].icon+'@@'+data[x].content+'"></i><a href="dzh://navigate?\'root://news/details/notice.html?skin=white#' + data[x].id+'-'+data[x].type+'#DZHPOPUP(650,400)#\'">'+data[x].content+'</a><span class="text-al">'+data[x].explan+'</span></li>';
            }
            html += '</ul>';
            return html;
        },
        downFile:function(str){
            var arr = str.split('@@');
            this.getAjax('',{m:'F9stock',c:'Notice',type:14,tp:2,n_type:2,noticeid:arr[0]}).then(function(result){
                var downAddr = result.DownAddr.split(',')
                var down_url = this.DownUrl+downAddr[0].replace(/\\/g, '/'),url = 'dzh://FILEMGR?';
                url += $.param({
                    LINK:down_url,
                    OPEN:1,
                    SHOWUI:1,
                    file:arr[2],
                    saveas:arr[2]+'.'+arr[1].split(',')[0]
                })
                if (window.external && window.external.download) {
                    window.external.download(decodeURIComponent(url));
                } else {
                    alert(decodeURIComponent(url));
                }
            }.bind(this))
        },
        getIcon:function(v){
            var ext = v.toLowerCase().split(',')
            if(ext.length > 1){
                switch (ext[0]) {
                    case 'doc':
                    case 'docx':
                    case 'pdf':
                    case 'rar':
                    case 'txt':
                    case 'xls':
                    case 'xlsx':
                        ext[0] = ext[0] + '-m';
                        break;
                    default:
                        ext[0] = 'multiple';
                        break;
                }
            }
            return 'icon-'+ext[0]        
        },
        getDate:function(){
            var date = new Date(),year = date.getFullYear()-1,month = date.getMonth()+1,today = date.getDate();
            date.setDate(today-1),yes_year = date.getFullYear(),yes_month = date.getMonth()+1,yesterday = date.getDate();
            if(month < 10)
                month = '0'+month;
            if(yes_month < 10)
                yes_month = '0'+yes_month;
            if(today < 10)
                today = '0'+today;
            if(yesterday < 10)
                yesterday = '0'+yesterday;
            return year+''+month+''+today+'-'+yes_year+''+yes_month+''+yesterday
        },
        redirect:function(num) {
            var zTree = top.$.fn.zTree.getZTreeObj("nav");
            var node = zTree.getNodeByParam("id",num);
            zTree.selectNode(node);
            var url = node.url;
            url += /\?/.test(url) ? '&' : '?';
            url += 'obj='+this.obj;
            location.href = services.baseUrl+url;
        },
        showLoading:function(obj,status,isparent){
            var status = status == undefined ? 'visible':status
            var isparent = isparent == undefined ? true : isparent
            if(status == 'visible'){
                if(isparent === true){
                    obj.parent().removeClass('loading');
                    obj.css({'visibility':'visible'});
                }
                else
                    obj.removeClass('loading');
            }else{
                if(isparent === true){
                    obj.parent().addClass('loading');
                    obj.css({'visibility':'hidden'});
                }
                else
                    obj.addClass('loading');
            }
        },
        arrRest:function(arr,key1,key2){
            var key1 = arguments[1] == undefined ? '日期' : key1
            ,key2 = arguments[2] == undefined ? '数值' : key2
            ,temp_arr = [];
            for(var x in arr)
                temp_arr.push([new Date(arr[x][key1]).getTime(),parseFloat(arr[x][key2])]);
            return temp_arr;
        },
        custr:function(str,len,sp){
            if(str.length <= len)
                return str;
            //这里需要先按换行的分割
            var temp_arr = str.split("\r\n"),arr = [];
            var re = new RegExp('.{'+len+'}','g');
            sp = (sp == undefined ? "\r\n" : sp);
            for(var x in temp_arr){
                if(temp_arr[x].length <= len)
                    arr.push(temp_arr[x]);
                else{
                    var temp_str = temp_arr[x].match(re);
                    temp_str.push(temp_arr[x].substring(temp_str.join('').length));
                    arr.push(temp_str.join(sp));
                }
            }
            return arr.join(sp);
        },
        isEmpty:function(val){
            return ((val != undefined && val != null && val != '' && val != 'null' && val != 'NULL' && val != false) ? false : true)
        },
        getVal:function(val,isNum){
            if(isNum === false){
                return this.isEmpty(val) ? '--' : val
            }else{
                if(this.isEmpty(val))
                    return '--'
                else
                    return parseFloat(val).toFixed(2)
            }
        },
        assetsCfgCommon:function(data){
            var html = '';
            if(this.isEmpty(data) || data.length<1)
                html = this.nodata
            else{
                var columns = [];
                for(var i = 0,n = data.length;i < n;i++){
                    for(var x in data[i]){
                        if(i == 0){
                            var tmp = {name:x,field:x,line:false}
                            if(x.indexOf('简称') != -1 || x.indexOf('代码') != -1)
                                tmp['cssClass'] = 't_name'
                            columns.push(tmp)
                        }
                        if(x.indexOf('持仓变动') != -1){
                            var cs = '',Symbol = '';
                            if(parseFloat(data[i][x]) < 0)
                                cs = 'green'
                            else if(parseFloat(data[i][x]) > 0)
                                cs = 'red',Symbol = '+'
                            data[i][x] = '<span class="'+cs+'">'+Symbol+data[i][x]+'</span>'
                        }
                    }
                }
                html = this.createTable(columns,data);
            }
            return html;
        },
        getObjMax:function(sobj){
            var key = '',value = 0
            for(var x in sobj){
                var v = parseFloat(sobj[x])
                if(key == '')
                    key = x,value = v
                else if(arguments[1] == 'min' && value > v)
                    key = x,value = v
                else if((arguments[1] == 'max' || arguments[1] == undefined) && value < v)
                    key = x,value = v
            }
            return [key,value]
        },
        getObjMin:function(sobj){
            return this.getObjMax(sobj,'min')
        },
        arrMax:function(arr){
            return Math.max.apply(Math,arr)
        },
        arrMin:function(arr){
            return Math.min.apply(Math,arr)
        },
        getIHtml:function(num){
            var str = ' style="width:'+(parseFloat(num)*2.5)+'%"'
            if(parseFloat(num) < 0)
                str += ' class="t_green"'
            return '<i'+str+'></i>'
        }
    };
});