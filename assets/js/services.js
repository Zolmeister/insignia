'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('showcase.services', ['ngResource'])
  .value('version', '0.1')

  // disable auto-scroll when loading new partial
  .value('$anchorScroll', angular.noop)
  .factory('Project', ['$resource', function($resource) {
    return $resource('/project/', {}, {
      get: {method: 'GET', isArray: true}
    })
  }])
  .factory('User', ['$resource', function($resource) {
    return $resource('/user/', {}, {
      get: {method: 'GET', isArray: true}
    })
  }])

angular.module('MD5.service', [])
  .factory('MD5', function() {
    
    /* compressed md5 function */
    return function(){function p(b,g){var a=(b&65535)+(g&65535);return(b>>16)+(g>>16)+(a>>16)<<16|a&65535}function k(b,g,a,n,k,h){return p(p(p(g,b),p(n,h))<<k|p(p(g,b),p(n,h))>>>32-k,a)}function h(b,g,a,n,h,l,m){return k(g&a|~g&n,b,g,h,l,m)}function l(b,g,a,n,h,l,m){return k(g&n|a&~n,b,g,h,l,m)}function m(b,g,a,n,h,l,m){return k(a^(g|~n),b,g,h,l,m)}function q(b,g){b[g>>5]|=128<<g%32;b[(g+64>>>9<<4)+14]=g;var a,n,t,u,q,c=1732584193,d=-271733879,e=-1732584194,f=271733878;for(a=0;a<b.length;a+=16)n=c,t=d,
u=e,q=f,c=h(c,d,e,f,b[a],7,-680876936),f=h(f,c,d,e,b[a+1],12,-389564586),e=h(e,f,c,d,b[a+2],17,606105819),d=h(d,e,f,c,b[a+3],22,-1044525330),c=h(c,d,e,f,b[a+4],7,-176418897),f=h(f,c,d,e,b[a+5],12,1200080426),e=h(e,f,c,d,b[a+6],17,-1473231341),d=h(d,e,f,c,b[a+7],22,-45705983),c=h(c,d,e,f,b[a+8],7,1770035416),f=h(f,c,d,e,b[a+9],12,-1958414417),e=h(e,f,c,d,b[a+10],17,-42063),d=h(d,e,f,c,b[a+11],22,-1990404162),c=h(c,d,e,f,b[a+12],7,1804603682),f=h(f,c,d,e,b[a+13],12,-40341101),e=h(e,f,c,d,b[a+14],17,
-1502002290),d=h(d,e,f,c,b[a+15],22,1236535329),c=l(c,d,e,f,b[a+1],5,-165796510),f=l(f,c,d,e,b[a+6],9,-1069501632),e=l(e,f,c,d,b[a+11],14,643717713),d=l(d,e,f,c,b[a],20,-373897302),c=l(c,d,e,f,b[a+5],5,-701558691),f=l(f,c,d,e,b[a+10],9,38016083),e=l(e,f,c,d,b[a+15],14,-660478335),d=l(d,e,f,c,b[a+4],20,-405537848),c=l(c,d,e,f,b[a+9],5,568446438),f=l(f,c,d,e,b[a+14],9,-1019803690),e=l(e,f,c,d,b[a+3],14,-187363961),d=l(d,e,f,c,b[a+8],20,1163531501),c=l(c,d,e,f,b[a+13],5,-1444681467),f=l(f,c,d,e,b[a+
2],9,-51403784),e=l(e,f,c,d,b[a+7],14,1735328473),d=l(d,e,f,c,b[a+12],20,-1926607734),c=k(d^e^f,c,d,b[a+5],4,-378558),f=k(c^d^e,f,c,b[a+8],11,-2022574463),e=k(f^c^d,e,f,b[a+11],16,1839030562),d=k(e^f^c,d,e,b[a+14],23,-35309556),c=k(d^e^f,c,d,b[a+1],4,-1530992060),f=k(c^d^e,f,c,b[a+4],11,1272893353),e=k(f^c^d,e,f,b[a+7],16,-155497632),d=k(e^f^c,d,e,b[a+10],23,-1094730640),c=k(d^e^f,c,d,b[a+13],4,681279174),f=k(c^d^e,f,c,b[a],11,-358537222),e=k(f^c^d,e,f,b[a+3],16,-722521979),d=k(e^f^c,d,e,b[a+6],23,
76029189),c=k(d^e^f,c,d,b[a+9],4,-640364487),f=k(c^d^e,f,c,b[a+12],11,-421815835),e=k(f^c^d,e,f,b[a+15],16,530742520),d=k(e^f^c,d,e,b[a+2],23,-995338651),c=m(c,d,e,f,b[a],6,-198630844),f=m(f,c,d,e,b[a+7],10,1126891415),e=m(e,f,c,d,b[a+14],15,-1416354905),d=m(d,e,f,c,b[a+5],21,-57434055),c=m(c,d,e,f,b[a+12],6,1700485571),f=m(f,c,d,e,b[a+3],10,-1894986606),e=m(e,f,c,d,b[a+10],15,-1051523),d=m(d,e,f,c,b[a+1],21,-2054922799),c=m(c,d,e,f,b[a+8],6,1873313359),f=m(f,c,d,e,b[a+15],10,-30611744),e=m(e,f,c,
d,b[a+6],15,-1560198380),d=m(d,e,f,c,b[a+13],21,1309151649),c=m(c,d,e,f,b[a+4],6,-145523070),f=m(f,c,d,e,b[a+11],10,-1120210379),e=m(e,f,c,d,b[a+2],15,718787259),d=m(d,e,f,c,b[a+9],21,-343485551),c=p(c,n),d=p(d,t),e=p(e,u),f=p(f,q);return[c,d,e,f]}function s(b){var g,a="";for(g=0;g<32*b.length;g+=8)a+=String.fromCharCode(b[g>>5]>>>g%32&255);return a}function r(b){var g,a=[];a[(b.length>>2)-1]=void 0;for(g=0;g<a.length;g+=1)a[g]=0;for(g=0;g<8*b.length;g+=8)a[g>>5]|=(b.charCodeAt(g/8)&255)<<g%32;return a}
function v(b,g){var a,h=r(b),k=[],l=[];k[15]=l[15]=void 0;16<h.length&&(h=q(h,8*b.length));for(a=0;16>a;a+=1)k[a]=h[a]^909522486,l[a]=h[a]^1549556828;a=q(k.concat(r(g)),512+8*g.length);return s(q(l.concat(a),640))}function w(b){var g="",a,h;for(h=0;h<b.length;h+=1)a=b.charCodeAt(h),g+="0123456789abcdef".charAt(a>>>4&15)+"0123456789abcdef".charAt(a&15);return g}return function(b,g,a){return g?a?v(unescape(encodeURIComponent(g)),unescape(encodeURIComponent(b))):w(v(unescape(encodeURIComponent(g)),unescape(encodeURIComponent(b)))):
a?s(q(r(unescape(encodeURIComponent(b))),8*unescape(encodeURIComponent(b)).length)):w(s(q(r(unescape(encodeURIComponent(b))),8*unescape(encodeURIComponent(b)).length)))}}();
    
  })
