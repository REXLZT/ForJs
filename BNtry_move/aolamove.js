let aola = {
    run: function (runTimes) {
        toast('这是一个奥拉移动,1s之后打开APP');
        sleep(1000);
        var launchResult = app.launch("com.baitian.alx.alxsy2.bt");
        if (!launchResult) {
            toast('未安装BN！');
            sleep(1000)
            return;
        }
        toast('等待软件打开，3s之后进入下个动作！');
        sleep(3000);
        var sleepTime = 10;
        // 统计运行次数
        var flagTime = 0;
        while (true) {
            flagTime++;
            // 超过次数终止程序
            if (flagTime > runTimes) {
                break;
            }
        }
        home();
        sleep(1000);

        function nextVideo() {
            //获得手机分辨率
            var width = device.width;
            var height = device.height;
            swipe(width / 2, height / 2, width / 2, height / 3, 10);
        };
        //获取范围内的随机数
        function randNum(minnum, maxnum) {
            return Math.floor(minnum + Math.random() * (maxnum - minnum));
        };
    }
};
function fastClick() {
    var i = 1200
    toast(device.width + ' ' + device.height);
    while (i > 0) {
        press(540, 960, 1);
        sleep(2)
        i--;
    }
}

function main() {
    home();
    sleep(3000);
    var i=1000;
    while (i > 0) {
        aola.run(100)//参数为每次循环刷动的次数
        i--;
    }
};

main();