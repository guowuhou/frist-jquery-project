/*(function(){
    var ajaxView={
        init:function(){

        },
        webUrl:function(insName){
            if(this.env=="dev"){
                //to do
            }else{
                return 'http:192.168.2.141:3000/'+insName
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
                        callback(res);
                    }else{
                        alert(res.resMsg)
                    }
                },error:function(){
                    alert("网络错误,稍后再试")
                }
            })
        },
        setData:function(name,obj){
            if(typeof obj=="object"){
                 obj=JSON.stringify(obj);//转为字符串
            }
            localStorage.setItem(name,obj)//设置数据类型
        },
        getDta:function(name){
            try{
                var data;
                var obj=localStorage.getItem(name)
                data=JSON.parse(obj)
            }catch(e){
                data=obj
            }
            return data
        },
        addLoading:function(){
          var html="<div class='laodingBox'b id='loading'><p>加载中</p><span id='font-str'></span></div>";
             $('body').append('.');
        },
        loadingBegin:function(){
            $("#loading").show();
            var $str=$("#font-str");
            a=setInterval(function(){
                $str.append('.');
                if($str.text().length>20){
                    $str.text('');
                }
            },1000)
        },
        loadingFinsh:function(){
            $("#loading").hide();
            clearInterval(a)
        },
        ajaxSetting:function(){
            $.ajaxSettings.beforeSend=function(){
                ajaxView.loadingBegin();
            };
            $.ajaxSettings.error=function(){
                ajaxView.loadingFinsh();
            };
            $.ajaxSettings.complete=function(){
                ajaxView.loadingFinsh()
            }
        }

    };

    window.common=ajaxView
})()*/
(function(){
    var ajaxView={
        init:function(){

        },
        webUrl:function(insName){
            if(this.env=="dev"){
                // to do
            }else{
                return 'http://192.168.2.14:300/'+insName
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
                    if(res.resCode="000"){
                        callback(res)
                    }else{
                        alert("res.resMsg")
                    }
                },error:function(){
                    alert("网络错误!")
                }
            })

        }
    }
})()
