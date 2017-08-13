(function(){
    var registerView={
        init:function(){
            this.bindEvent();
        },
        bindEvent:function(){
            var self=this;
           /* var phone=$("#phone").val();
            var password=$("#password").val();
            var verifyCode=$("#verifyCode").val();
            var data={
                phone:phone,
                password:password,
                verifyCode:verifyCode,
            };
            $("#submit").on("click",self.queryData(data));*/
            $("#submit").on("click",function(data){
                var phone=$("#phone").val();
                var password=$("#password").val();
                var verifyCode=$("#verifyCode").val();

                var data={
                    phone:phone,
                    password:password,
                    verifyCode:verifyCode
                }

                    var regphone=/^1[0-9]{10}$/;
                if(phone==""){
                    $("#comment1").html("手机号不能为空")
                    return false
                }
                if(regphone.test(phone)==false){
                    $("#comment1").html("请输入正确的手机号码");
                    return false
                }else{
                    $("#comment1").html("输入正确");
                }
                if(password==""){
                    $("#comment2").html("密码不能为空")
                    return false
                }
                if(password.length<6 || password.length>16){
                    $("#comment2").html("密码长度为6-16个字符")
                    return false
                }else{
                        $("#comment2").html("输入正确")
                }
                //self.queryData(data)
                common.ajaxCommon01("register",data,function(res){
                    alert(res.resMsg);
                    location.href="login.html"
                })
            })
        },

       /* queryData:function(data){
           var self=this;
            $.ajax({
                url:"http://192.168.2.141:3000/register",
                data:data,
                type:"post",
                dataType:"json",
                success:function(res){
                    if(res.resCode=="000"){
                        alert("注册成功");
                        location.href="login.html"
                    }else{
                        alert(res.resMsg)
                    }
                },error:function(){
                    alert("网络异常")
                }
            })
        }*/
    }
    registerView.init()
})();


//60秒倒计时
$(function(){
    $(".codebtn").on("click",function(){
        var a=setInterval(second,1000);
        var T=10;
        function  second(){
           $(".codebtn").attr("disabled",true);
           $(".codebtn").val(T+"秒后重新发送");
            if(T>0){
                T--
            }else{
                $(".codebtn").val("重新获取密码").removeAttr("disabled");
                clearInterval(a);
            }

        }
    })
})