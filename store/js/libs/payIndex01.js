(function(){
    var payView={
        init:function(){
            var orderList=common.getData("orderList");
            this.render(orderList);
            this.bindEvent();
        },
        bindEvent:function(){
            $("#order_pay_btn").on("click",function(){
                location.href="facetoface.html"
            })
        },
        render:function(data){
            var sum=0;
            for(var i in data){
                sum+=data[i].price*data[i].prdNum;
            }
            //订单金额
            $("#order_price").text(sum);
            //还需支付金额
            $("#order_needpay").text(sum);
        },
        query:function(){

        }
    }
    payView.init();
})()
