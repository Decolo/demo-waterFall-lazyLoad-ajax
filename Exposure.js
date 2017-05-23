 function Exposure($target, callback) {
     this.$target = $target
     this.callback = callback
     this.init()
     this.bindEvent()
 }
 Exposure.prototype.init = function() {
     this.$window = $(window)
     this.check(this.$target)
 }
 Exposure.prototype.bindEvent = function() {
     var _this = this
     var clock
     $(window).on('scroll', function() {
         if (clock) {
             clearTimeout(clock)
         }
         clock = setTimeout(function() {
                 _this.check(_this.$target)
             }, 100)
             /*用户鼠标滚轮滚动一次，有多次事件响应。
                下面的 setTimeout 主要是为性能考虑，
                只在最后一次事件响应的时候执行 checkshow*/
     })
 }
 Exposure.prototype.check = function($node) {
     var _this = this
     $node.each(function() {
         console.log('callback')
         if (_this.isShow($(this))) {
             _this.callback()
         }
     })
 }
 Exposure.prototype.isShow = function($node) {
     var scrollTop = this.$window.scrollTop()
     var windowHeight = this.$window.height()
     var nodeHeight = $node.height()
     var offsetTop = $node.offset().top
     if (offsetTop < scrollTop + windowHeight && offsetTop + nodeHeight > scrollTop) {
         return true
     } else {
         return false
     }
 }