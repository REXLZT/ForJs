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
        nextVideo.run;
        fastClick.run(100)
        i--;
    }
    
};

main();