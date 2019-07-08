/*
 * Viewport
 * 		alias : vp
 */
Ext.define('Lotto.view.Viewport',{
	
	extend 	: 'Ext.Panel',
	id		: 'viewport',
	
	config 	: {
		
		fullscreen: true,	
		layout: 'card',
		
		items : [
			{
				xtype : 'mainview'
			}
		]
	}
	
});