(function(){
    var payView={
        init:function(){
            var orderList=common.getData("orderList");
            this.bindEvent(orderList);
        },
        bindEvent:function(data){
            $("#icon_del").on("click",function(){
              $("#pay_value").val("")
            });
            $("#face_pay").on("click",function(){
                var sum=0;
                for(var i in data){
                    sum+=data[i].price*data[i].prdNum;
                }
                if($("#pay_value").val()==sum){
                    location.href="payResult.html"
                }else{
                    alert("请输入正确的金额")
                }

            })
        },
        query:function(){

        }
    }
    payView.init()
})()
