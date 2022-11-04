'ui';

ui.statusBarColor(colors.parseColor('#426e6d'));
ui.layout(
    <relative w='*' h='*' bg='#426e6d'>
        <text id='title' w='auto' h='auto' text='R' textColor1='#7A000000' textSize='{{device.width-100}}px'
            layout_centerInParent='true' shadowColor='#000000' shadowRadius='20' />
        <text w='auto' h='auto' padding='10' marginTop='-50' text='Qī' textSize='50dp' textStyle='bold'
            layout_centerHorizontal='true' layout_below='title' shadowColor='#000000' shadowRadius='5' />
        <vertical w='*'>
            <toolbar title=' Auto.Js 悬浮按钮模块' >
                <button id='btn' w='auto' text='启 动' textColor='#FFFFFF' textStyle='bold' backgroundTint='#41A4F5'
                    marginRight='20' padding='15 0' layout_gravity='right' />
            </toolbar>
            <vertical padding='20 5'>
                <Switch id='isShow' text='悬浮按钮 : 关闭' textColor='#FFFFFF' textStyle='bold' padding='0 5' />
                <Switch id='menu' text='菜单状态 : 关闭' textColor='#FFFFFF' textStyle='bold' padding='0 5' />
                <text id='direction' text='停靠方向 : 左侧' textColor='#FFFFFF' textStyle='bold' padding='0 5' />
                <text id='orientation' text='屏幕方向 : 竖屏' textColor='#FFFFFF' textStyle='bold' padding='0 5' />
                <text id='time' text='定时关闭 : 3秒' textColor='#FFFFFF' textStyle='bold' padding='0 5' />
                <seekbar id='seekbar' max='10' progress='3' padding='0 5' />
            </vertical>
        </vertical>
    </relative>
);

ui.menu.setEnabled(false);

ui.isShow.on('check', checked => {
    ui.isShow.setText('悬浮按钮 : ' + (checked ? '开启' : '关闭'));
    checked ? fb.show() : fb.hide();
    ui.menu.setEnabled(checked);
});

ui.menu.on('check', checked => {
    ui.seekbar.setEnabled(!checked);
    fb.setMenuOpen(checked);//改变菜单状态
});

ui.seekbar.setOnSeekBarChangeListener({
    onProgressChanged: function (seekBar, progress) {
        ui.time.setText('定时关闭 : ' + progress + '秒');
        fb.setAutoCloseMenuTime(progress * 1000);
    }
});

//按钮联动
ui.btn.on('click', view => {
    //获取指定按钮的值
    let mUtil = fb.getViewUtil('按钮2');
    let value = !mUtil.getChecked();
    mUtil.setChecked(value);
    view.setText(value ? '停 止' : '启 动');
    view.attr('backgroundTint', value ? '#ED524E' : '#41A4F5');
});

/**
 * Auto Js 悬浮球
 */

//导入FloatButton模块
var { FloatButton, FloatButtonConfig } = require('./FloatButton/init');

let fb = new FloatButton();

//修改停靠动画时间
FloatButtonConfig.time.direction = 510;

/**
 * 悬浮球创建事件
 */
fb.on('create', function () {
    //设置logo图标
    fb.setIcon('http://www.autojs.org/assets/uploads/profile/3-profileavatar.png');
    //设置logo图标着色
    //fb.setTint('#FFFFFF');
    //设置logo背景颜色
    fb.setColor('#FFFFFF');
    //设置所有按钮大小 默认40
    fb.setAllButtonSize(42);
    //设置所有按钮内边距 默认8
    //fb.setAllButtonPadding(8);

    //添加菜单按钮
    fb.addItem('按钮1')
        //设置图标
        .setIcon('@drawable/ic_looks_one_black_48dp')
        //图标着色
        .setTint('#FFFFFF')
        //背景颜色
        .setColor('#019581')
        //点击事件
        .onClick((view, name) => {
            toastLog('onClick:' + name)
            //返回 true:保持菜单开启 false:关闭菜单
            return false;
        });

    fb.addItem('按钮2')
        //启用复选框属性
        .toCheckbox(mUtil => {
            //未选中样式
            mUtil.icon1('@drawable/ic_play_arrow_black_48dp').tint1('#FFFFFF').color1('#41A4F5');
            //选中样式
            mUtil.icon2('@drawable/ic_stop_black_48dp').tint2('#FFFFFF').color2('#ED524E');
        })
        .onClick((view, name, state) => {
            toastLog('名称 : ' + name + '\n状态 : ' + state);
            ui.btn.setText(state ? '停 止' : '启 动');
            ui.btn.attr('backgroundTint', state ? '#ED524E' : '#41A4F5');
            //返回 true:保持菜单开启 false:关闭菜单
            return true;
        });
    //设置按钮属性为选中
    // fb.getViewUtil('按钮2').setChecked(true);
    //获取按钮选中状态
    // log('按钮2选中状态:', fb.getViewUtil('按钮2').getChecked());

    fb.addItem('按钮3')
        .setIcon('@drawable/ic_looks_3_black_48dp')
        .setTint('#FFFFFF')
        .setColor('#ED524E');

    fb.addItem('按钮4')
        .setIcon('@drawable/ic_looks_4_black_48dp')
        .setTint('#FFFFFF')
        .setColor('#FCD633');

    fb.addItem('按钮5')
        .setIcon('@drawable/ic_looks_5_black_48dp')
        .setTint('#FFFFFF')
        .setColor('#BFBFBF');

    //在无操作一段时间后自动关闭菜单
    fb.setAutoCloseMenuTime(3000);
});

//菜单按钮点击事件
fb.on('item_click', (view, name, state) => {
    //如果在addItem中添加了onClick事件 则不会在这里触发
    toastLog('item_click:' + name);
    //返回 true:保持菜单开启 false:关闭菜单
    return false;
});

//UI联动
//菜单状态改变事件
fb.on('menu_state_changed', value => {
    ui.menu.setText('菜单状态 : ' + (value ? '开启' : '关闭'));
    ui.menu.setChecked(value);
});

//停靠方向改变事件
fb.on('direction_changed', value => {
    ui.direction.setText('停靠方向 : ' + (value ? '右侧' : '左侧'));
});

//屏幕方向改变事件
fb.on('orientation_changed', value => {
    log('屏幕方向:', value);
    ui.orientation.setText('屏幕方向 : ' + (value ? '横屏' : '竖屏'));
});

//按钮显示事件
fb.on('show', () => {
    //log('悬浮窗显示');
});

//按钮隐藏事件
fb.on('hide', () => {
    // log('悬浮窗隐藏');
});

