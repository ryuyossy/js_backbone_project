(function(a){a.Model.extend=a.Collection.extend=a.Router.extend=a.View.extend=function(a,b){var d=c(this,a,b);d.extend=this.extend;return d};var b=function(){},c=function(a,c,d){var e,f=a.prototype,g=/xyz/.test(function(){xyz})?/\b_super\b/:/.*/;if(c&&c.hasOwnProperty("constructor")){e=c.constructor}else{e=function(){a.apply(this,arguments)}}_.extend(e,a);b.prototype=a.prototype;e.prototype=new b;if(c){_.extend(e.prototype,c);for(var h in c){if(typeof c[h]=="function"&&typeof f[h]=="function"&&g.test(c[h])){e.prototype[h]=function(a,b){return function(){var c=this._super;this._super=f[a];var d=b.apply(this,arguments);this._super=c;return d}}(h,c[h])}}}if(d)_.extend(e,d);e.prototype.constructor=e;e.__super__=a.prototype;return e}})(Backbone)