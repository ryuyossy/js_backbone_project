/*! 
 * jquery.event.touch
 */

;(function( $ ){

// jQueryのインスタンスメソッドとして登録
$.fn.touch = function( str, arg, opts ){
    // event typeを取得
    var type = typeof str == "string" ? str : "",
    // event handlerを取得
    fn = $.isFunction( str ) ? str : $.isFunction( arg ) ? arg : null;
    // event typeを"touch〇〇"(デフォルトは"touch")にする
    if ( type.indexOf("touch") !== 0 ) 
        type = "touch"+ type;
    // opts引数省略時
    opts = ( str == fn ? arg : opts ) || isZepto ? fn : {};
    // onまたはtriggerを実行。
    return fn ? this.on( type, opts, fn ) : this.trigger( type );
};

// for Zepto (Zeptoはevent.specialとか$.dataとか持ってないので代用を準備)
var isZepto = false
if (false == 'special' in $.event) {
    $.event.special = {};
    $(document).ready(function () {
        $.data = function (el, name, data) { return $(el).data(name, data); };
    });
    isZepto = true;
}

// 本体
var $event = $.event, 
$special = $event.special,
// $.special.touchに直接定義
touch = $special.touch = {
    
    // デフォルトの設定（特にないので、空のObject）
    defaults: {
    },
    
    // $.data格納用キー
    datakey: "touchdata",
    
    // 紐付けられたイベントをカウント
    add: function( obj ){ 
        // $.dataから必要なデータを取得
        var data = $.data( this, touch.datakey ),
        // 引数をセット(渡されなかったときは空のObject) 
        opts = obj.data || {};
        // カウント。(自身をカウントに加える)
        data.related += 1;
        // dataとopsのマージ
        $.each( touch.defaults, function( key, def ){
            if ( opts[ key ] !== undefined )
                data[ key ] = opts[ key ];
        });
    },
    
    // カウントを減らす
    remove: function(){
        $.data( this, touch.datakey ).related -= 1;
    },
    
    // 初期設定(イベントをキャプチャできるようにする)
    setup: function(){
        // 設定済みなら何もしない
        if ( $.data( this, touch.datakey ) ) 
            return;
        // $.dataに初めに入れる値を準備
        var data = { related:0 };
        // $.dataにセット
        $.data( this, touch.datakey, data );
        // touchstartイベントにハンドラをセット
        $event.add( this, "touchstart", touch.init, data );
    },
    
    // 後片付け処理(jQuery用)
    teardown: function(){
        // リファレンスカウンタが0のときしか実行しちゃだめ。
        if ( $.data( this, touch.datakey ).related ) 
            return;
        // $.dataから削除
        $.removeData( this, touch.datakey );
        // touchstartイベントを取り除く
        $event.remove( this, "touchstart", touch.init );
    },
        
    // touchstartのハンドラ(touchmove,touchendのハンドラをセット)
    init: function( event ){
        // イベントの発生源を取得
        var target = event.target;
        // touchイベントに渡すデータを準備
        var dd = event.data;
        // touchmove,touchendのハンドラを登録
        $event.add( target, "touchmove", touch.clear, dd );
        $event.add( target, "touchend", touch.raize, dd );
    },
    // touchmove,touchendのハンドラを取り除く
    clear: function () {
        $event.remove( this, "touchmove", touch.clear );
        $event.remove( this, "touchend", touch.raize );
    },
    
    // touchイベントを発生させる
    raize: function( event ){
        // touchmove,touchendのハンドラを取り除いておく
        touch.clear.call(this);
        // touchイベントをtrigger
        var result;
        try {
            var ev = document.createEvent('TouchEvent');
            if (/* 標準非準拠でアレなひとたち */ navigator.userAgent.match(/Android\s[1-4]/)) {
                ev.initTouchEvent(
                    event.touches,
                    event.targetTouches,
                    event.changedTouches,
                    'touch',
                    event.view,
                    event.screenX,
                    event.screenY,
                    event.clientX,
                    event.clientY,
                    event.ctrlKey,
                    event.altKey,
                    event.shiftKey,
                    event.metaKey
                );
            } else {
                ev.initTouchEvent(
                    'touch',
                    true,
                    true,
                    event.view,
                    event.detail,
                    event.screenX,
                    event.screenY,
                    event.clientX,
                    event.clientY,
                    event.ctrlKey,
                    event.altKey,
                    event.shiftKey,
                    event.metaKey,
                    event.touches,
                    event.targetTouches,
                    event.changedTouches
                );
            }
            result = this.dispatchEvent(ev);
        } catch (e_when_chromeDevTool) {
            // originalEventとtypeを書き換え前に変数に退避
            var touchEvent = $.extend({ type: 'touch', originalEvent: null }, $.data(this, touch.datakey));
            for (var prop in event) {
                if (prop in touchEvent) continue;
                touchEvent[prop] = event[prop];
            }
            
            if ('handle' in $event) {
                result = $event.handle.call(this, touchEvent, event.data);
            } else {
                result = $(this).trigger('touch', $.extend(touchEvent, event.data));
            }
            touchEvent = null;
        }

        return result;
    }
};

// Zepto用(setupが自動で呼ばれないため手動で呼ぶ）
if (isZepto) {
    $(document).ready(function () {
        touch.setup.call(document.body);
    });
}

// 関係するイベント系統にtouchを共有
$special.touchinit = $special.touchstart = $special.touchend = touch;

})( this.Zepto );