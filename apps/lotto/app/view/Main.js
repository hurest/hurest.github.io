/*
 * Room View
 * 		alias : ro
*/
Ext.define('Lotto.view.Main',{
	extend 	: 'Ext.TabPanel',
	xtype 	: 'mainview',
	id 		: 'mainview',
	
	config : {
		tabBarPosition	: 'bottom',
		layout 			: 'card',
		activeItem		: 0,
		items : [
			{
				title	: '번호생성',
				iconCls	: 'Pencil',
				layout	: 'vbox',
				id		: 'tp01Panel',
				items 	: [
					{
						xtype	: 'titlebar',
						docked	: 'top',
						title	: '꿈 번호 생성',
						items	: [
							{
								align	: 'right',
								id		: 'tp01SaveBtn',
								html 	: '번호저장'
							}
						]
						
					},{
						xtype : 'panel',
						scrollable : true,
						flex : 1,
						id	: 'record',
						items : [
							{
								xtype : 'textareafield',
								padding : 5,
								id : 'tp01DreamTxTaFld',
								margin: 10,
								style : 'border:1px solid #bababa'
							},{
								xtype : 'panel',
								layout : 'hbox',
								margin:10,
								items : [
									{
										xtype : 'button',
										flex : 2,
										margin : '0 10px 0 0',
										id : 'tp01NumViewBtn',
										text : '번호보기'
									},{
										xtype : 'button',
										id : 'tp01ResetBtn',
										flex :1,
										text : '초기화'
									}
								]
							},{
								margin: 10,
								xtype : 'button',
								ui : 'create',
								id : 'tp01CreateBtn',
								text : '생성'
							},{
								xtype : 'panel',
								id	: 'tp01resultPanel',
								layout : 'vbox',
								margin : 10
							}
						]
					}
				]
			},{
				title	: '내 기록',
				iconCls	: 'Favorites2',
				id		: 'tp02Panel',
				layout	: 'vbox',
				items 	: [
					{
						xtype	: 'titlebar',
						docked	: 'top',
						title	: '내 기록',
						items	: [
							{
								align	: 'right',
								id		: 'tp02ResetBtn',
								html 	: '초기화'
							}
						]
					},{
						flex :1,
						xtype : 'panel',
						id : 'recordView',
						scrollable : true
					}
				]
			}
		]
	}
});