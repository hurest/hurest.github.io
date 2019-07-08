Ext.Loader.setPath({
    'Lotto': 'app'
});

Ext.require([
	'Lotto.util.Common'
]);

Ext.application({
	name 		: 'Lotto',
	stores		: [],
	controllers : ['Main'],
	launch 		: function(){
		Ext.create('Lotto.view.Viewport');
	}
});