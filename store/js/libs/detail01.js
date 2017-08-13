(function(){
    var detailView={
        init:function(){
            var id=common.getParam('id');/*getParam样式在common01中*/
            var data={id:id};
            this.queryDetail(data);
            this.bindEvent()
        },
        bindEvent:function(){
            var self=this;
            $("#add").on("click",function(){
                var num=$(this).prev().text();
                num++;
                $("#prd-num").text(num)
            });
            $("#minus").on("click",function(){
                var num=$(this).next().text();
                num--;
                if(num<0){
                   alert("不能小于0")
                }else{
                    $("#prd-num").text(num)
                }
            });
             //点击购物车去购买
            $("#floatbar_bottom_cart").on("click",function(){
                location.href="showShop.html"
            })
            //点击加入到购物车
            $("#join_car").on("click",function(){
                self.addCar()
            });
            //立即购买
            $("#buy_now").on("click",function(){
                $('#join_car').trigger('click');//trigger为委托事件
            })
        },
        addCar:function(){
            var self=this;
            var id=common.getParam('id');
            var num=$("#prd-num").text();
            var data={id:id,prdNum:num}
            common.ajaxCommon01("addToShopCar",data,function(res){
                $(".car_trolley").removeClass("dsn");
                $(".car_trolley").text(num);
                location.href="showShop.html";
            })

        },
        render:function(res){
            var a=res.productDetail
            var html= _.template($("#tpl").html())(a);//template格式在HTML中已写
            $("#content").html(html)
        },
        queryDetail:function(data){
            var self=this;
            common.ajaxCommon01("productDetail",data,function(res){
                self.render(res)
            })
        }


    };
    detailView.init()
})()
