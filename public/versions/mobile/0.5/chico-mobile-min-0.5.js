/*! Chico Mobile v0.5 chico-ui.com.ar/mobile | chico-ui.com.ar/license */
;(function(exports, $){"use strict";var win=exports,$win=$(win),browser=win.navigator,doc=win.document,body=doc.body,html=doc.getElementsByTagName("html")[0],$html=$(html),clone=function(a){var b={},c;for(c in a)hasOwn(a,c)&&(b[c]=a[c]);return b},extend=function(a,b){var c,d=b||this;for(c in a)d[c]=a[c];return d},isArray=function(){if(Array.hasOwnProperty("isArray"))return Array.isArray;return function(a){return Object.prototype.toString.apply(a)==="[object Array]"}}(),hasOwn=function(){var a=Object.prototype.hasOwnProperty;return function(b,c){return a.call(b,c)}}(),isTag=function(a){return/<([\w:]+)/.test(a)},isSelector=function(a){if(typeof a!="string")return!1;var b;for(b in $.expr.match)if($.expr.match[b].test(a)&&!isTag(a))return!0;return!1},inDom=function(a,b){if(typeof a!="string")return!1;var a=a.replace(/(\!|\"|\$|\%|\&|\'|\(|\)|\*|\+|\,|\/|\;|\<|\=|\>|\?|\@|\[|\\|\]|\^|\`|\{|\||\}|\~)/gi,function(a,b){return"\\\\"+b});return $(a,b).length>0},isUrl=function(a){return/^((http(s)?|ftp|file):\/{2}(www)?|www.|((\/|\.{1,2})([\w]|\.{1,2})*\/)+|(\.\/|\/|\:\d))([\w\-]*)?(((\.|\/)[\w\-]+)+)?([\/?]\S*)?/.test(a)},avoidTextSelection=function(){$.each(arguments,function(a){$.browser.msie?$(a).attr("unselectable","on"):$.browser.opera?$(a).bind("mousedown",function(){return!1}):$(a).addClass("ch-user-no-select")});return},getStyles=function(a,b){return getComputedStyle(a,"").getPropertyValue(b)},fixLabels=function(){function e(){c=document.getElementById(this.getAttribute("for")),["radio","checkbox"].indexOf(c.getAttribute("type"))!=-1?c.setAttribute("selected",!c.getAttribute("selected")):c.focus()}var a=document.getElementsByTagName("label"),b,c,d=0;for(;a[d];d+=1)a[d].getAttribute("for")&&$(a[d]).bind(EVENT.TAP,e)},zIndex=1e3,uid=0,$mainView=function(){var a=$("div[data-page=index]");if(a.length===0){alert('Chico Mobile Error\n$mainView: The document doesn\'t contain an index "page" view.');throw new Error('Chico Mobile Error\n$mainView: The document doesn\'t contain an index "page" view.')}return a}(),EVENT={TAP:"ontouchend"in win?"touchend":"click",PATH_CHANGE:"onpopstate"in win?"popstate":"hashchange"},ch={VERSION:"0.5",instances:{},inherit:function(a,b){if(a!==undefined){a.call(b,b.conf);return clone(b)}throw"Chico Mobile - ch.inherit: Parent is not defined."},init:function(){ch.scaleFix(),ch.hideUrlBarOnLoad(),ch.preventZoom(),fixLabels(),$html.removeClass("no-js")},SUPPORT:function(){}()};(function(){var a=exports.MBP||{};a.viewportmeta=$('meta[name="viewport"]'),a.ua=browser.userAgent||navigator.userAgent,a.gestureStart=function(){a.viewportmeta.content="width=device-width, minimum-scale=0.25, maximum-scale=1.6"},a.scaleFix=function(){a.viewportmeta&&/iPhone|iPad|iPod/.test(a.ua)&&!/Opera Mini/.test(a.ua)&&(a.viewportmeta.content="width=device-width, minimum-scale=1.0, maximum-scale=1.0",doc.addEventListener("gesturestart",a.gestureStart,!1))},a.BODY_SCROLL_TOP=!1,a.getScrollTop=function(){return win.pageYOffset||doc.compatMode==="CSS1Compat"&&doc.documentElement.scrollTop||doc.body.scrollTop||0},a.hideUrlBar=function(){!win.location.hash&&a.BODY_SCROLL_TOP!==!1&&win.scrollTo(0,a.BODY_SCROLL_TOP===1?0:1)},a.hideUrlBarOnLoad=function(){if(!win.location.hash&&win.addEventListener){win.scrollTo(0,1),a.BODY_SCROLL_TOP=1;var b=setInterval(function(){body&&(clearInterval(b),a.BODY_SCROLL_TOP=a.getScrollTop(),a.hideUrlBar())},15);win.addEventListener("load",function(){setTimeout(function(){a.getScrollTop()<20&&a.hideUrlBar()},0)})}},a.preventZoom=function(){var b=$("input, select, textarea"),c="width=device-width,initial-scale=1,maximum-scale=",d=0;for(;d<b.length;d+=1)b[d].onfocus=function(){a.viewportmeta.content=c+"1"},b[d].onblur=function(){a.viewportmeta.content=c+"10"}},extend(a,ch)})(),ch.EventEmitter=function(){var a={},b=10;this.addListener=this.on=function(c,d){typeof a[c]=="undefined"&&(a[c]=[]);if(a[c].length+1>b)throw"Warning: So many listeners for an event.";a[c].push(d),c!=="newListener"&&this.emit("newListener");return this},this.once=function(a,b){var c=function(a,d){b.call(this,a,d),this.off(a.type,c)};this.on(a,c);return this},this.removeListener=this.off=function(b,c){if(a[b]instanceof Array&&c){var d=a[b],e=0,f=d.length;for(e;e<f;e+=1)if(d[e]===c){d.splice(e,1);break}}return this},this.removeAllListeners=function(b){delete a[b];return this},this.setMaxListeners=function(a){b=a;return this},this.listeners=function(b){return a[b]},this.emit=function(b,c){typeof b=="string"&&(b={type:b}),b.target||(b.target=this);if(!b.type)throw new Error("Event object missing 'type' property.");if(a[b.type]instanceof Array){var d=a[b.type],e=0,f=d.length;for(e;e<f;e+=1)d[e].call(this,b,c)}return this};return this},ch.routes=function(){var a={},b,c=win.location,d=win.history,e,f,g=function(){e=c.hash.split("#!/")[1];typeof e=="undefined"||e===""?a[""].forEach(function(a,b){a()}):a[e]&&a[e]()};a[""]=[],$win.bind(EVENT.PATH_CHANGE,g);return{add:function(b){for(f in b){if(f===""){a[""].push(b[""]);continue}a[f]=b[f]}},remove:function(b,c){delete a[b][c]},update:function(a){typeof a=="undefined"?d.back():c.hash===""&&d.pushState(null,"","#!/"+a)}}}(),ch.content=function(){},ch.factory=function(a){var b=a.toLowerCase(),c=function(c,d){var e={type:b,el:c,$el:$(c),uid:uid+=1};switch(typeof d){case"number":var f=d;d={},d.value=f,arguments[1]&&(d.msg=arguments[1]);break;case"string":var g=d;d={},d.msg=g;break;case"function":var h=d;d={},d.lambda=h,arguments[1]&&(d.msg=arguments[1])}var i=ch[a].call(e,d);i=hasOwn(i,"public")?i["public"]:i;if(i.type){var j=i.type;ch.instances[j]||(ch.instances[j]=[]),ch.instances[j].push(i)}i.exists&&(i=i.object);return i};$.fn[b]=function(a){var d=[],e=[];$.each(this,function(f,g){hasOwn(ch.instances,b)&&$.each(ch.instances[b],function(a,b){g===b.el&&e.push(b)}),d.push((e.length>1?e:e[0])||c(g,a))});return d.length>1?d:d[0]};return this},ch.Widget=function(){var a=this;ch.EventEmitter.call(a),a.active=!1,a["public"]={},a["public"].uid=a.uid,a["public"].el=a.el,a["public"].type=a.type,a["public"].emit=a.emit,a["public"].on=a.on,a["public"].once=a.once,a["public"].off=a.off,a["public"].offAll=a.offAll,a["public"].setMaxListeners=a.setMaxListeners;return a},ch.Modal=function(a){var b=this,c,a=clone(a)||{};b.conf=a,c=ch.inherit(ch.Widget,b);var d=b.el,e=b.$el,f=function(){if(!!b.active){b.active=!1,b.$container.addClass("ch-hide"),$mainView.removeClass("ch-hide"),$mainView[0].setAttribute("aria-hidden",!1);return b}},g=a.hash||d.href.split("#")[1]||b.type+"-"+b.uid,h={};b.source=$(a.content).removeClass("ch-hide"),b.$content=$('<div class="ch-modal-content">').append(b.source),b.$container=function(){var a=$('<div data-page="ch-'+b.type+"-"+b.uid+'" role="dialog" aria-hidden="true" class="ch-modal ch-hide" id="ch-'+b.type+"-"+b.uid+'">');a.append(b.$content);return a}(),b.innerShow=function(a){if(!b.active){b.active=!0,ch.routes.update(g),$mainView.addClass("ch-hide"),$mainView[0].setAttribute("aria-hidden",!0),b.$container.removeClass("ch-hide");return b}},b.innerHide=function(a){f(),ch.routes.update(a);return b},b.configBehavior=function(){d.setAttribute("aria-label","ch-"+b.type+"-"+b.uid),d.href="#!/"+g,b.$content.addClass("ch-"+b.type+"-content").removeClass("ch-hide"),$mainView.after(b.$container),a.open&&b.innerShow(),h[""]=f,h[g]=b.innerShow,ch.routes.add(h)},b["public"].show=function(){b.innerShow();return b["public"]},b["public"].hide=function(a){b.innerHide(a);return b["public"]},b.configBehavior(),setTimeout(function(){b.emit("ready")},50);return b},ch.factory("Modal"),ch.Expando=function(a){var b=this,c,a=clone(a)||{};a.open=a.open||!1,a.classes=a.classes||"",b.conf=a,c=ch.inherit(ch.Widget,b);var d=b.el,e=b.$el,f=function(){b.$trigger.toggleClass("ch-"+b.type+"-trigger-on"),b.$content.toggleClass("ch-hide");return b};b.trigger=d.firstElementChild,b.$trigger=$(b.trigger),b.content=d.lastElementChild,b.$content=$(b.content),b.innerShow=function(a){if(b.active)return b.innerHide(a);b.active=!0,f(),b.trigger.setAttribute("aria-expanded","true"),b.content.setAttribute("aria-hidden","false"),b.emit("show");return b},b.innerHide=function(a){if(!!b.active){b.active=!1,f(),b.trigger.setAttribute("aria-expanded","false"),b.content.setAttribute("aria-hidden","true"),b.emit("hide");return b}},b.configBehavior=function(){e.addClass("ch-"+b.type),d.setAttribute("role","presentation"),b.trigger.setAttribute("aria-expanded",!1),b.trigger.setAttribute("aria-controls","ch-"+b.type+"-"+b.uid),b.content.setAttribute("id","ch-"+b.type+"-"+b.uid),b.content.setAttribute("aria-hidden",!0),b.$trigger.addClass("ch-"+b.type+"-trigger"),b.$trigger.bind(EVENT.TAP,function(a){a.preventDefault(),b.innerShow(a)}),b.$content.addClass("ch-"+b.type+"-content ch-hide "+a.classes),a.open&&b.innerShow()},b["public"].show=function(){b.innerShow();return b["public"]},b["public"].hide=function(){b.innerHide();return b["public"]},b.configBehavior(),setTimeout(function(){b.emit("ready")},50);return b},ch.factory("Expando"),ch.Menu=function(a){var b=this,c,a=clone(a)||{};a.icon=hasOwn(a,"icon")?a.icon:!0,b.conf=a,c=ch.inherit(ch.Widget,b);var d=b.el,e=b.$el,f=a.selected?a.selected-1:undefined,g=function(a){var a=a-1,c=b.children[a];if(!(a>b.children.length)){if(c.nodeType){c.firstElementChild.tagName==="A"&&(win.location.href=c.firstElementChild.href);return}b.children[a].show()}};b.triggers=d.children,b.children=[],b.cretateBellows=function(a){var c=$(a);c.addClass("ch-bellows").children(":first-child").addClass("ch-bellows-trigger"),b.children.push(c)},b.createLayout=function(){var c;$.each(b.triggers,function(c,d){var e=d.children;e.length===1?b.cretateBellows(d):b.children.push($(d).expando({icon:a.icon}))})},b.configBehavior=function(){e.addClass("ch-"+b.type),d.setAttribute("role","navigation")},b["public"].select=function(a){if(!a){if(isNaN(f))return"";return f+1}g(a);return b["public"]},b.createLayout(),b.configBehavior(),setTimeout(function(){b.emit("ready")},50);return b},ch.factory("Menu"),ch.Layer=function(a){var b=this,c,a=clone(a)||{};a.icon=!1,a.aria={},a.aria.role="tooltip",a.aria.identifier="aria-describedby",a.classes=a.classes||"ch-box ch-cone ch-points-ltlb",b.conf=a,b.type="layer",c=ch.inherit(ch.Expando,b),setTimeout(function(){b.emit("ready")},50);return b},ch.factory("Layer");exports.chico = exports.ch = ch;ch.init();})(window, $);