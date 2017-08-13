(function(){
    var orderView={
        init:function(){
            var orderList=common.getData("orderList");
            this.render(orderList);
            this.bindEvent();
        },
        bindEvent:function() {
            $("#submit_order").on("click", function () {
                location.href = "payindex.html"
            });

            //点击选择配送方式
           $("#good_delivery").on("click",function(){
               $(this).addClass("select");
               $("#user_inf").show();
               $(this).prev().removeClass('select');
           });
            $("#store_invite").on("click",function(){
                $(this).addClass("select");
                $(this).next().removeClass('select');
                $("#user_inf").hide();
            })
        },

        render:function(data){
            var sum=0;
            var tpl=$("#tpl").html();
            var html= _.template(tpl)(data);
            $("#good_list").html(html);
            for(var i in data){
                sum+=data[i].price*data[i].prdNum;
            }
            //订单金额
            $("#pay_account").text(sum);
            //还需支付金额
            $("#need_pay").text(sum);
        },

    }
    orderView.init();
})()