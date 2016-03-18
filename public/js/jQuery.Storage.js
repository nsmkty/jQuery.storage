(function($){
	var settings = {
		'target':'session',
		'key':'ws_' + window.location.pathname,
		'debug':false
	};
	var methods = {
		init:function(options){
			settings = $.extend(true, settings, options);
			if(settings.debug){ console.log('jQuery.Storage is init'); }
		},
		set:function(){
			var data = [];
			this.each(function(){
				if($(this).is(':text, select, textarea')){ data.push({name:$(this).attr('name'),value:$(this).val()}); }
				else if($(this).is(':checkbox, :radio')){
					if($(this).is(':checked')){ data.push({name:$(this).attr('name'),value:$(this).val()}); }
				}
			});
			var save = JSON.stringify(data);
			if(settings.target === 'session'){ sessionStorage.setItem(settings.key, save); }
			else{ localStorage.setItem(settings.key, save); }
			if(settings.debug){ console.log(settings.target + 'Storage -> set {key:"' + settings.key + '",value:"' + save + '"'); }
			return (this);
		},
		get:function(){
			var data;
			if(settings.target === 'session'){ data = sessionStorage.getItem(settings.key); }
			else{ data = localStorage.getItem(setting.key); }
			var restore = JSON.parse(data);
			$.each(restore, function(i, v){
				if($('[name=' + v.name + ']').is(':radio')){ $(':radio[name=' + v.name + ']').val([v.value]); }
				else if($('[name=' + v.name + ']').is(':checkbox')){ $(':checkbox[name=' + v.name + '][value=' + v.value + ']').prop('checked',true); }
				else{ $('[name=' + v.name + ']').val(v.value); }
			});
			if(settings.debug){ console.log(settings.target + 'Storage -> get {key:"' + settings.key + '",value:"' + data + '"'); }
			return (this);
		},
		remove:function(key, target){
			if(key !== undefined){ settings.key = key; }
			if(target !== undefined){ settings.target = target; }
			if(settings.target === 'session'){ sessionStorage.removeItem(settings.key); }
			else{ localStorage.removeItem(settings.key); }
			if(settings.debug){ console.log(settings.target + 'Storage -> remove key=' + settings.key); }
			return (this);
		},
		clear:function(target){
			if(target !== undefined){ settings.target = target; }
			if(settings.target === 'session'){ sessionStorage.clear(); }
			else{ localStorage.clear(); }
			if(settings.debug){ console.log(settings.target + 'Storage is clear'); }
			return (this);
		}
	};
	$.fn.Storage = function(method){
		if(methods[method]){
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if( typeof method == 'object' || ! method){
			return methods.init.apply(this, arguments);
		} else {
			$.error('Method ' + method + ' does not exist on jQuery.Storage');
		}
	};
})(jQuery);