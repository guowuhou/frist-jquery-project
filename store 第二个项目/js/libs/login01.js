(function(){
   var loginView={
       init:function(){
           //var userInfo=common.getData("userInfo");
            var userInfo=common.getData("userInfo");
           if(userInfo){
                  $("#user-name").val(userInfo.userName);
                  $("#password").val(userInfo.passWord);
           };

           this.bindEvent();
       },
       bindEvent:function() {
           var self = this;
           //按下键盘登录事件
           $(document).keydown(function (event) {
               if (event.keyCode == 13) {
                   var userName = $("#user-name").val();
                   var passWord = $("#password").val();
                   var data = {
                       userName: userName,
                       passWord: passWord
                   };

                   var check = $('#checkbox').is(":checked");
                   if (check == true) {
                       common.setData("userInfo", data);
                   }
                   var reg = /^1[0-9]{10}$/;
                   if (userName == "") {
                       alert("用户名不能为空");
                       return false
                   }
                   if (reg.test(userName) == false) {
                       alert("请输入正确的手机号码");
                       return false
                   }
                   // self.query(data);
                   common.ajaxCommon01("login", data, function (res) {
                       alert(res.resMsg);
                       common.setData("sessionId", res.sessionId);
                       location.href = "home.html";
                   })

               }
           });

           //点击登入事件
           $("#submit").on("click",function(){
               var userName=$("#user-name").val();
               var passWord=$("#password").val();
               var data={
                   userName:userName,
                   passWord: passWord
               }

               var check=$('#checkbox').is(":checked");
               if(check==true){
                   common.setData("userInfo",data);
               }
           /*    var userName=$("#user-name").val();
               var passWord=$("#password").val();
               var data={
                   userName:userName,
                   passWord:passWord,
               }
               var check=$("#checkbox").is(":checked");
               if(check){
                   common.setData("userInfo",data);
               }*/
               var reg=/^1[0-9]{10}$/;
               if(userName==""){
                   alert("用户名不能为空");
                   return false
               }
               if(reg.test(userName)==false){
                   alert("请输入正确的手机号码");
                   return false
               }
              // self.query(data);
               common.ajaxCommon01("login",data,function(res){
                   alert(res.resMsg);
                   common.setData("sessionId",res.sessionId);
                   location.href="home.html";
              /* common.ajaxCommon01("home",data,function(res){
                   alert(res.resMsg);
                   location.href="home.html";
               })*/
               })
           })

       }
      /* query:function(data){
           var self=this;
           $.ajax({
               url:"http://192.168.2.141:3000/login",
               type:"post",
               dataType:"json",
               data:data,
               success:function(res){
                       if(res.resCode=="000"){
                           alert("登入成功");
                           location.href="home.html"
                       }else{
                           alert("登录失败");
                       }
               },error:function(){
                   alert("网络异常");
               }
           })
       }*/
   };
    loginView.init();
})();
