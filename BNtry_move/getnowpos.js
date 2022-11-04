TrafficStats = android.net.TrafficStats;
importClass(android.graphics.Paint);
Canvas=android.graphics.Canvas;
importClass(android.graphics.Bitmap);

var canvas_x = 300
var canvas_y = 120

function textpaint(str){
    str=str.split("\n");
    var bitmap =Bitmap.createBitmap(canvas_x,canvas_y,Bitmap.Config.ARGB_8888);

    var canvas = new Canvas(bitmap);
    canvas.drawARGB(255,0,255,0);
    var paint = new Paint();
    //圆盘背景
    paint.setTextSize(24);
    for(i=0;i<str.length;i++){
        canvas.drawText(str[i],0,(i+1)*25,paint);
    }
   
    canvas.save(Canvas.ALL_SAVE_FLAG);
    canvas.restore();

    return bitmap;
}

var window = floaty.window(
    <frame>
        <vertical>
            
            <img id="img" w="auto" h="auto"/>
            
        </vertical>
    </frame>
);

//window.setPosition(0,0)
var x = 0,
    y = 0;
//记录按键被按下时的悬浮窗位置
var windowX, windowY;
//记录按键被按下的时间以便判断长按等动作
var downTime;
var switch_x
var switch_y
var Width = device.width
var Height= device.height
var falgUpdata = true

window.img.setOnTouchListener(function(view, event) {
    switch (event.getAction()) {
        case event.ACTION_DOWN:
            x = event.getRawX();
            y = event.getRawY();
            print("x:"+String(x)+" y:"+String(y))
            windowX = window.getX();
            windowY = window.getY();
            downTime = new Date().getTime();
            return true;
        case event.ACTION_MOVE:
            //移动手指时调整悬浮窗位置

           // window.setPosition(
            switch_x = windowX + (event.getRawX() - x);
            switch_y = windowY + (event.getRawY() - y);
            if (switch_x < 0) { switch_x = 0; }
            if (switch_y < 0) { switch_y = 0; }
            if (switch_x > Width - canvas_x / 2) { switch_x = Width - canvas_x / 2; }
            if (switch_y > Height - canvas_y - 100) { switch_y = Height - canvas_y - 100; }
            window.setPosition(switch_x,switch_y);
            falgUpdata = true;

            return true;
        case event.ACTION_UP:
            //加个手指点击的触碰判断，轻微点击也再计算一次位置
            if (Math.abs(event.getRawY() - y) < 5 && Math.abs(event.getRawX() - x) < 5) {
                threads.start(function() {
                    onClick();
                });
            }
            return true;
    }
    return true;
});
str = "";

//log(Object.keys(TrafficStats));

//实时更新ARGB值
threads.start(function() {
    var str_image
    var str_ARGB
    while (true) {
        if(!$images.getScreenCaptureOptions()) {
            $images.requestScreenCapture({orientation: 0});
        }
        while ($images.getScreenCaptureOptions()) { if (falgUpdata) {
            str_x = window.getX();
            str_y = window.getY() + 80;
            // str_image = images.captureScreen();
            // str_ARGB = images.pixel(str_image, str_x, str_y+100);
            // str =   " -------实时坐标-------" +
            //         "\n坐标X：" + String(str_x) +
            //         "\n坐标Y：" + String(str_y)
            //       //  "\nARGB：" + String(str_ARGB);
            // tu=textpaint(str);
            // ui.run(function() {
            //     window.img.setImageBitmap(tu);
            // });
            // sleep(100);
            // log($images.getScreenCaptureOptions())
            // 屏蔽掉那个贼丑的位置浮窗
        }}
    }
});

var storage = storages.create("屏幕指定位置");
//复制
function onClick() {
   // setClip(str)
    //toastLog("已复制到粘贴板")
    storage.put("x", window.getX());
    storage.put("y", window.getY());
    storage.put("falgPoint", true);
}

log(TrafficStats.getTotalRxBytes());

while (true) {
    sleep(1000);
}