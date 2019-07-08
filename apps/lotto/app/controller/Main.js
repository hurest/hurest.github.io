Ext.define('Lotto.controller.Main',{
	
	extend : 'Ext.app.Controller',
	
	init : function(){

	},
	
	launch : function(){
		
	},
	
	config : {
		
		views : ['Viewport','Main'],		
		
		before : {
		
		},
		
		routes: {
   
        },
		
		refs	: {
			tapDeleteImg : 'image[cls=tapDelete]',
			mainview	: '#mainview',
			tp01DreamTxTaFld : '#tp01DreamTxTaFld',
			tp01CreateBtn	: '#tp01CreateBtn',
			tp01SaveBtn : '#tp01SaveBtn',
			tp01NumViewBtn	: '#tp01NumViewBtn',
			tp01ResetBtn : '#tp01ResetBtn',
			numberDelete : 'button[action=numberDelete]',
			tp02ResetBtn	: '#tp02ResetBtn'
		},
		
		control : {
			tapDeleteImg : {
				tap : 'tapDeleteImg'
			},
			mainview 	: {
				activeitemchange : 'activeItemChange'
			},
			tp01CreateBtn : {
				tap : 'tapTp01CreateBtn'
			},
			tp01SaveBtn : {
				tap : 'tapTp01SaveBtn'
			},
			tp01ResetBtn : {
				tap : 'tapTp01ResetBtn'
			},
			tp01NumViewBtn : {
				tap : 'tapTp01NumViewBtn'
			},
			numberDelete : {
				tap : 'tapNumberDelete'
			},
			tp02ResetBtn : {
				tap : 'tapTp02ResetBtn'
			}
		}
	},
	
	tapDeleteImg : function(){
		
		Common.dreamFilter.push( arguments[0].getUi() );
		arguments[0].parent.destroy();
	},
	
	tapTp01CreateBtn : function(){
		
		var that = this
			,dream = this.getTp01DreamTxTaFld().getValue();
		
		if( dream === "" ){
			// Ext.Msg.alert('로또1등', '꿈을 입력해주세요.', Ext.emptyFn);
			alert('꿈을 입력해주세요.');
			return;
		}

		Common.loadDream(dream,function(result){			
			
			if( result.length === 0 ){
				// Ext.Msg.alert('로또1등', '등록된 정보가 없습니다.', Ext.emptyFn);
				alert('등록된 정보가 없습니다.');
			}else{
				
				Ext.getCmp('tp01resultPanel').setItems( Common.createNumberPackage( result, 5 ) );
			}
		});
		
	},
	
	tapTp01NumViewBtn : function(){
		
		Common.dreamFilter = [];
		
		var that = this
			,dream = this.getTp01DreamTxTaFld().getValue();
		
		if( dream === "" ){
			// Ext.Msg.alert('로또1등', '꿈을 입력해주세요.', Ext.emptyFn);
			alert('꿈을 입력해주세요.');
			return;
		}
		
		
		
		Common.loadDream(dream,function(result){
			
			if( result.length === 0 ){
				alert('등록된 정보가 없습니다.');
				// Ext.Msg.alert('로또1등', '등록된 정보가 없습니다.', Ext.emptyFn);
			}else{
				
				Ext.getCmp('tp01resultPanel').setItems( Common.viewNumber(result) );
			}
			
		});
	},
	
	
	tapTp01SaveBtn : function(){
		
		if( Ext.getCmp('tp01resultPanel').getItems().items.length === 0 ){
			// Ext.Msg.alert('로또1등', '생성된 번호가 없습니다.', Ext.emptyFn);
			alert('생성된 번호가 없습니다.');
			return;
		}
		
		// Ext.Msg.confirm('로또1등', '저장하시겠습니까?', function(result){

		if( confirm('저장하시겠습니까?') ){ 
			
			var array01 = []
				,array02 = []
				,innerItems
				,val = Ext.getCmp('tp01resultPanel').getItems()
				,save = (!localStorage.save ) ? {} : Ext.JSON.decode(localStorage.save)
				,name = new Date().getTime();
				
			// if( result === "yes" ){
				
				for( var i = 0; i < val.items.length; i++ ){
					innerItems = val.items[i].innerItems;
					
					array01 = [];
					for( var j = 0; j < 6; j++ ){
						array01.push( innerItems[j].getCls()[0] );
					}
					array02.push( array01 );
				}	
				
				var cnt = 0;
				for( var k in save )
					cnt++;
					
				if( cnt > 10 ){
					// Ext.Msg.alert('로또1등', '최대 저장횟수(10회)를<br>초과하였습니다.', Ext.emptyFn);
					alert('최대 저장횟수(10회)를 초과하였습니다.');
					return;
				}
				
				save[name] = array02;
				
				
				localStorage.save = Ext.JSON.encode(save);
				
			// }

		}
			
		// });
	},
	
	tapTp01ResetBtn : function(){
		
		Common.dreamFilter = null;
		Common.dreamCache = null;
		Common.valueCache = null;
		
		this.getTp01DreamTxTaFld().reset();
		Ext.getCmp('tp01resultPanel').removeAll();
	},
	
	tapNumberDelete : function(){
		var btn = arguments[0].parent.destroy();
	},
	
	activeItemChange : function(){
		var id = this.getMainview().getActiveItem().getId();
		
		if( id === "tp02Panel" ){
			Common.loadNumber();
		}
	},
	
	tapTp02ResetBtn : function(){
		Ext.Msg.confirm('로또1등', '모두 삭제하시겠습니까?', function(result){
			if( result === "yes" ){
				localStorage.clear();
				Ext.getCmp('recordView').removeAll();
			}
		});
	}
	
});