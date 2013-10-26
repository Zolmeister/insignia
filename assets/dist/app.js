"use strict";angular.module("insignia",["ngRoute","ngAnimate","ngTouch","ngCookies","angularFileUpload","MD5.service","gravatar.directive","insignia.filters","insignia.services","insignia.directives","insignia.controllers"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"partials/projects.html",controller:"ProjectsCtrl"}).when("/project/:title",{templateUrl:"partials/project-view.html",controller:"ProjectViewCtrl"}).when("/admin",{templateUrl:"partials/projects-edit.html",controller:"ProjectsCtrl",access:{admin:!0}}).when("/admin/edit/:title",{templateUrl:"partials/project-view-edit.html",controller:"ProjectViewCtrl",access:{admin:!0}}).when("/admin/new/:type",{templateUrl:"partials/project-view-edit.html",controller:"ProjectViewCtrl",access:{admin:!0}}).when("/login",{templateUrl:"partials/login.html",controller:"LoginCtrl"}).otherwise({redirectTo:"/"})}]),angular.module("insignia.controllers",[]).controller("ProjectsCtrl",["$scope","$routeParams","Project","$location","$route","$rootScope","LoginService",function(a,b,c,d,e,f,g){e.current.access&&e.current.access.admin&&!g.isAdmin&&g.update(function(a){a||d.path("/login")}),a.newProject=function(b){a.go("/admin/new/"+b,null)},a.edit=function(b){a.go("/admin/edit/"+b.title,null)},a.remove=function(b){window.confirm("Are you sure you want to remove "+b.title+"?")&&c.delete(b,function(c){c&&a.projects.splice(a.projects.indexOf(b),1)})},a.haveAny=function(b){return!!_.filter(a.projects,{displayType:b}).length},a.go=function(a,b){f.lastProject=b,f.pageTurn="right",d.path(a)},a.fromProject=f.lastProject,f.lastProject=null,c.query(function(b){a.projects=b,_.each(a.projects,function(a){a.$index=a.index,a.$type=a.displayType})}),a.save=function(){_.each(a.projects,function(a){(a.$index!==a.index||a.$type!==a.displayType)&&c.update(a,function(){a.$index=a.index,a.$type=a.displayType})})},a.$on("sortupdate",a.save)}]).controller("ProjectViewCtrl",["$scope","$routeParams","Project","$location","$rootScope","$http","$cookies",function(a,b,c,d,e,f,g){a.updateSuccess=!1;var h=!b.title;if(h){a.updateSuccess=!0;var i=b.type||"other",j={title:"",desc:"",about:"",displayType:i,hideImage:!1,technologies:[],pubLink:"",blogLink:"",gitHubLink:"",imgId:Date.now(),index:-1,features:[]};a.project=j}else c.query({title:b.title},function(b){a.project=b[0]});a.refreshImg=0,a.onFileSelect=function(b,c){var d=b[0];f.uploadFile({headers:{"X-XSRF-TOKEN":g["XSRF-TOKEN"]},url:"project/"+a.project.imgId+"/upload/"+c,file:d}).then(function(){a.$apply(function(){a.refreshImg=Date.now()})})},a.save=function(){a.updateSuccess=!1,h?c.save(a.project,function(b){b&&(a.updateSuccess=!0,a.go("/admin"))}):c.update(a.project,function(b){b&&(a.updateSuccess=!0,a.go("/admin"))})},a.addFeature=function(){a.project.features.push({value:""})},a.removeFeature=function(b){a.project.features.splice(a.project.features.indexOf(b),1)},a.addTech=function(){a.project.technologies.push({link:"",name:""})},a.removeTech=function(b){a.project.technologies.splice(a.project.technologies.indexOf(b),1)},a.go=function(a){e.pageTurn="left",d.path(a)}}]).controller("MenuCtrl",["$scope","User","$location",function(a,b,c){function d(c){c?(a.info=c,a.info.email=decodeURIComponent(a.info.encodedEmail)):(a.error="Error fetching user info",a.info=b.save({}))}b.get(function(a){return _.compose(d,_.first)(a)}),a.save=function(){a.updateSuccess=!1,a.info.$update(function(b){b&&(d(b),a.updateSuccess=!0)})},a.$location=c}]).controller("LoginCtrl",["$scope","$http","$location",function(a,b,c){a.login=function(){b.post("/user/login",{username:a.username,password:a.password}).then(function(b){b.data.success?c.path("/admin"):a.password=""})}}]),angular.module("insignia.directives",["MD5.service"]).directive("autoScrollTo",function(){return function(a,b,c){"true"===c.autoScrollTo&&window.setTimeout(function(){$("html, body").animate({scrollTop:b.offset().top},500),$("body").css("min-height",$(".projects").offset().top+$(".projects").height()+"px")},100)}}).directive("emailLink",function(){return{scope:{emailLink:"@emailLink"},link:function(a,b){a.$watch("emailLink",function(){var c=a.emailLink;c&&"undefined"!==c&&(b.attr("href","mailto:"+c),b.text(c))})}}}).directive("linkify",function(){return{scope:{linkify:"@linkify"},link:function(a,b){a.$watch("linkify",function(){var c=a.linkify;c&&"undefined"!==c&&(b.attr("href",c),b.text(c))})}}}).directive("sortable",function(){return function(a,b){function c(){var c=_.map(b.find(".project"),$);b.sortable({items:".project"}).unbind("sortupdate").bind("sortupdate",function(){_.each(c,function(b){var c=_.find(a.projects,function(a){return b.attr("_id")===a.id});c.index=b.index(),c.displayType=b.parent().attr("type")}),a.$broadcast("sortupdate")})}a.$on("rebindsort",c),window.setTimeout(c,1e3)}}),angular.module("gravatar.directive",["MD5.service"]).directive("gravatarImage",["MD5",function(a){return{scope:{gravatarImage:"@gravatarImage"},link:function(b,c){b.$watch("gravatarImage",function(){var d=b.gravatarImage;d&&"undefined"!==d&&c.attr("src","https://gravatar.com/avatar/"+a(d)+"?s=150")})}}}]),angular.module("insignia.filters",[]).filter("interpolate",["version",function(a){return function(b){return String(b).replace(/\%VERSION\%/gm,a)}}]),angular.module("insignia.services",["ngResource"]).value("version","0.1").value("$anchorScroll",angular.noop).factory("Project",["$resource",function(a){return a("/project",{},{update:{method:"PUT"}})}]).factory("User",["$resource",function(a){return a("/user/:id",{id:"@id"},{get:{method:"GET",isArray:!0},update:{method:"PUT"}})}]).factory("LoginService",["$http",function(a){var b={isAdmin:!1};return b.update=function(c){a.get("/user/isAdmin").then(function(a){b.isAdmin=!!a.data.isAdmin,c&&c(b.isAdmin)})},b.update(),b}]),angular.module("MD5.service",[]).factory("MD5",function(){return function(){function a(a,b){var c=(65535&a)+(65535&b);return(a>>16)+(b>>16)+(c>>16)<<16|65535&c}function b(b,c,d,e,f,g){return a(a(a(c,b),a(e,g))<<f|a(a(c,b),a(e,g))>>>32-f,d)}function c(a,c,d,e,f,g,h){return b(c&d|~c&e,a,c,f,g,h)}function d(a,c,d,e,f,g,h){return b(c&e|d&~e,a,c,f,g,h)}function e(a,c,d,e,f,g,h){return b(d^(c|~e),a,c,f,g,h)}function f(f,g){f[g>>5]|=128<<g%32,f[(g+64>>>9<<4)+14]=g;var h,i,j,k,l,m=1732584193,n=-271733879,o=-1732584194,p=271733878;for(h=0;h<f.length;h+=16)i=m,j=n,k=o,l=p,m=c(m,n,o,p,f[h],7,-680876936),p=c(p,m,n,o,f[h+1],12,-389564586),o=c(o,p,m,n,f[h+2],17,606105819),n=c(n,o,p,m,f[h+3],22,-1044525330),m=c(m,n,o,p,f[h+4],7,-176418897),p=c(p,m,n,o,f[h+5],12,1200080426),o=c(o,p,m,n,f[h+6],17,-1473231341),n=c(n,o,p,m,f[h+7],22,-45705983),m=c(m,n,o,p,f[h+8],7,1770035416),p=c(p,m,n,o,f[h+9],12,-1958414417),o=c(o,p,m,n,f[h+10],17,-42063),n=c(n,o,p,m,f[h+11],22,-1990404162),m=c(m,n,o,p,f[h+12],7,1804603682),p=c(p,m,n,o,f[h+13],12,-40341101),o=c(o,p,m,n,f[h+14],17,-1502002290),n=c(n,o,p,m,f[h+15],22,1236535329),m=d(m,n,o,p,f[h+1],5,-165796510),p=d(p,m,n,o,f[h+6],9,-1069501632),o=d(o,p,m,n,f[h+11],14,643717713),n=d(n,o,p,m,f[h],20,-373897302),m=d(m,n,o,p,f[h+5],5,-701558691),p=d(p,m,n,o,f[h+10],9,38016083),o=d(o,p,m,n,f[h+15],14,-660478335),n=d(n,o,p,m,f[h+4],20,-405537848),m=d(m,n,o,p,f[h+9],5,568446438),p=d(p,m,n,o,f[h+14],9,-1019803690),o=d(o,p,m,n,f[h+3],14,-187363961),n=d(n,o,p,m,f[h+8],20,1163531501),m=d(m,n,o,p,f[h+13],5,-1444681467),p=d(p,m,n,o,f[h+2],9,-51403784),o=d(o,p,m,n,f[h+7],14,1735328473),n=d(n,o,p,m,f[h+12],20,-1926607734),m=b(n^o^p,m,n,f[h+5],4,-378558),p=b(m^n^o,p,m,f[h+8],11,-2022574463),o=b(p^m^n,o,p,f[h+11],16,1839030562),n=b(o^p^m,n,o,f[h+14],23,-35309556),m=b(n^o^p,m,n,f[h+1],4,-1530992060),p=b(m^n^o,p,m,f[h+4],11,1272893353),o=b(p^m^n,o,p,f[h+7],16,-155497632),n=b(o^p^m,n,o,f[h+10],23,-1094730640),m=b(n^o^p,m,n,f[h+13],4,681279174),p=b(m^n^o,p,m,f[h],11,-358537222),o=b(p^m^n,o,p,f[h+3],16,-722521979),n=b(o^p^m,n,o,f[h+6],23,76029189),m=b(n^o^p,m,n,f[h+9],4,-640364487),p=b(m^n^o,p,m,f[h+12],11,-421815835),o=b(p^m^n,o,p,f[h+15],16,530742520),n=b(o^p^m,n,o,f[h+2],23,-995338651),m=e(m,n,o,p,f[h],6,-198630844),p=e(p,m,n,o,f[h+7],10,1126891415),o=e(o,p,m,n,f[h+14],15,-1416354905),n=e(n,o,p,m,f[h+5],21,-57434055),m=e(m,n,o,p,f[h+12],6,1700485571),p=e(p,m,n,o,f[h+3],10,-1894986606),o=e(o,p,m,n,f[h+10],15,-1051523),n=e(n,o,p,m,f[h+1],21,-2054922799),m=e(m,n,o,p,f[h+8],6,1873313359),p=e(p,m,n,o,f[h+15],10,-30611744),o=e(o,p,m,n,f[h+6],15,-1560198380),n=e(n,o,p,m,f[h+13],21,1309151649),m=e(m,n,o,p,f[h+4],6,-145523070),p=e(p,m,n,o,f[h+11],10,-1120210379),o=e(o,p,m,n,f[h+2],15,718787259),n=e(n,o,p,m,f[h+9],21,-343485551),m=a(m,i),n=a(n,j),o=a(o,k),p=a(p,l);return[m,n,o,p]}function g(a){var b,c="";for(b=0;b<32*a.length;b+=8)c+=String.fromCharCode(255&a[b>>5]>>>b%32);return c}function h(a){var b,c=[];for(c[(a.length>>2)-1]=void 0,b=0;b<c.length;b+=1)c[b]=0;for(b=0;b<8*a.length;b+=8)c[b>>5]|=(255&a.charCodeAt(b/8))<<b%32;return c}function i(a,b){var c,d=h(a),e=[],i=[];for(e[15]=i[15]=void 0,16<d.length&&(d=f(d,8*a.length)),c=0;16>c;c+=1)e[c]=909522486^d[c],i[c]=1549556828^d[c];return c=f(e.concat(h(b)),512+8*b.length),g(f(i.concat(c),640))}function j(a){var b,c,d="";for(c=0;c<a.length;c+=1)b=a.charCodeAt(c),d+="0123456789abcdef".charAt(15&b>>>4)+"0123456789abcdef".charAt(15&b);return d}return function(a,b,c){return b?c?i(unescape(encodeURIComponent(b)),unescape(encodeURIComponent(a))):j(i(unescape(encodeURIComponent(b)),unescape(encodeURIComponent(a)))):c?g(f(h(unescape(encodeURIComponent(a))),8*unescape(encodeURIComponent(a)).length)):j(g(f(h(unescape(encodeURIComponent(a))),8*unescape(encodeURIComponent(a)).length)))}}()});
/*
//@ sourceMappingURL=assets/dist/app.js.map
*/