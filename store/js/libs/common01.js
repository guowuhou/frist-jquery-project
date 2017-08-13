(function(){
    var ajaxView={
        init:function(){
               this.addLoading();
               this.ajaxSetting();
        },

    /*    //绑定点击事件的公共可调用写法
        bindEvent:function(events,obj,container){
            var $contain=$(container||"body");
            for(var ev in events){
                var index=ev.lastIndexOf(''),
                    ele=ev.substr(0,index),
                    evType=ev.substr(index+1,ev.length);

                try{
                    $contain.delegate(ele,evType, $.proxy(obj[events[ev]],obj));
                }catch(e){
                    continue;
                }
            }
        },*/

        webUrl:function(insName){
            if(this.env=="dev"){
                //to do
            }else{
                return 'http://192.168.2.102:3000/'+insName;
                //return 'http://192.168.2.141:3000/'+insName;
            };
     /*   webUrl:function(insName){
                if(insName=="shopListQuery"){
                   return 'http://127.0.0.1/store/storedata/prdList.json'
                }
                if(insName=="productDetail"){
                    return 'http://127.0.0.1/store/storedata/detail.json';
                }*/

        },
        ajaxCommon01:function(url,data,callback){
            data.sessionId=common.getData("sessionId");
            url=common.webUrl(url);
            $.ajax({
                url:url,
                data:data,
                type:"post",
                dataType:"json",
                success:function(res){
                    if(res.resCode=="000"){
                        callback(res)
                    }else{
                        alert(res.resMsg);
                    }
                },error:function(){
                    alert("网络异常")
                }

            })
        },
        /*让localStorage储存数据*/
      /*  setData:function(name,obj){
            if(typeof obj=="object"){
                obj=JSON.stringify(obj);//转变为字符串格式
            }
            localStorage.setItem(name,obj);

        },*/
        setData:function(name,obj){
            if(typeof obj=="object"){
                obj=JSON.stringify(obj);//转变为字符串格式
            }
             localStorage.setItem(name,obj)
        },

        getData:function(name){
              try{
                  var data;
                  var obj=localStorage.getItem(name);
                  data=JSON.parse(obj);//转为JSON类型
              }catch(e){
                  data=obj
              }
            return data
        },
       /* addLoading:function(){
            var html="<div id='loading' class='loadingBox'>"+"<p>加载中<span id='font-str'></span></p></div>"
            $('body').append(html);
        },
        loadingBegin:function(){
            $('#loading').show();
            var $str=$("#font-str");
            common.int=setInterval(function(){
                $str.append('.');
                if($str.text().length>20){
                    $str.text('');
                }
            },1000);
        },
        loadingFinsh:function(){
            $('#loading').hide();
            clearInterval(common.int);
        },
        ajaxSetting:function(){
            $.ajaxSettings.beforeSend=function(){
                ajaxView.loadingBegin();
            };
            $.ajaxSettings.error=function(){
                ajaxView.loadingFinsh()
            };
            $.ajaxSettings.complete=function(){
                ajaxView.loadingFinsh();
            }
        }
*/
        addLoading:function(){
            var html="<div id='loading' class='loadingBox'><p>加载中<span id='font-str'></span></p></div>";
            $("body").append(html);
        },
        loadingBegin:function(){
            $("#loading").show();
            var $str=$("#font-str");
            common.int=setInterval(function(){
                $str.append('.');
                if($str.text().length>20){
                    $str.text('');
                }
            },100);
        },
        loadingFinsh:function(){
            $("#loading").hide();
            clearInterval(common.int)
        },
        ajaxSetting:function(){
            $.ajaxSettings.beforeSend=function(){
                ajaxView.loadingBegin();
            };
            $.ajaxSettings.error=function(){
                ajaxView.loadingFinsh();
            };
            $.ajaxSettings.complete=function(){
                ajaxView.loadingFinsh();
            }
        },

           getParam:function(id){
               var url=location.search,
                   reg=new RegExp(id+'=[^&]*'),
                   arr=url.match(reg);
                   result=arr&&arr.toString().split('=');
               return result && result[1] ||'';
           }
        /*getData:function(name){
            try{
                var data;
                var obj=localStorage.getItem(name);
                data=JSON.parse(obj);
            }catch(e){
                data=obj;
            }
            return data;
        }*/
        /*获取相对应得数据
         * @param name
         *
         * */
    };
    ajaxView.init();
    window.common=ajaxView;
})()

/*
(function(){
    var ajaxView={
        init:function(){

        },
       webUrl:function(insName){
         if(this.env=="dev"){
             //to do
         }else{
             return 'http://192.168.2.141:3000/'+insName
         }
       },
        ajaxCommon01:function(url,data,callback){
            url=common.webUrl(url);
            $.ajax({
                url:url,
                data:data,
                type:"post",
                dataType:"json",
                success:function(res){
                    if(res.resCode=="000"){
                        callback(res)
                    }else{
                        alert(res.resMsg)
                    }
                },error:function(){
                    alert("网络出错")
                }
            })
        }

    }
    window.common=ajaxView
})()*/


/*
(function(){
    var ajaxView={
        init:function(){

        },
        webUrl:function(insName){
            if(this.env=="dev"){
                //to do
            }else{
                return "http://192.168.2.141:3000/"+insName;
            }
        },
        ajaxCommon1:function(url,data,callback){
            url=common.webUrl(url);
            $.ajax({
                url:url,
                data:data,
                type:"post",
                dataType:"json",
                success:function(res){
                    if(res.resCode=="000"){
                        callback(res)
                    }else{
                        alert(res.resMsg);
                    }
                },error:function(){
                    alert("网络错误!稍后再试");
                }
            })
        }
    };
    window.common=ajaxView;
})();*/
