(function(){
    var ajaxView={
        init:function(){

        },

        webUrl:function(insName){
            if(this.env=="dev"){
                //to do
            }else{
                return 'http://192.168.2.141:3000/'+insName;
            }
        },
        ajaxCommon:function(url,data,callback){
            url=common.webUrl(url);
            $.ajax({
                url:url,
                type:"post",
                data:data,
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
        }
    }
    window.common=ajaxView;
})()