(function(global){
	
	var Hangul = global.Hangul;
	
	function transText (message) {
		
		var result = [];
	
		for( var i = 0, char, arr; i < message.length; i++ ) {
			char = message[i];
			
			arr = Hangul.disassemble( char );
			
			if( arr[0] && arr[0] == 'ㅅ' || arr[0] == 'ㅆ' ) {
				arr[0] = 'ㄸ';
			}
			
			if ( arr[0] && arr[0] == 'ㅈ' ) {
				
				arr[0] = 'ㄷ';
				
				if( arr[1] ) {
					
					switch( arr[1] ) {
						case 'ㅏ' :
							arr[1] = 'ㅑ';
							break;
						case 'ㅓ' :
							arr[1] = 'ㅕ';
							break;
						case 'ㅗ' :
							arr[1] = 'ㅛ';
							break;
						case 'ㅜ' :
							arr[1] = 'ㅠ';
							break;
							
					}
					
				}
				
			}
			
			if ( arr[2] && arr[2] == 'ㅈ' ) {
				arr[2] = 'ㄷ';
			}
	
			result.push(Hangul.assemble(arr));
		}
		
		return result.join('');
	}
	

	$(document)
		.on('click', '#transBtn', function(){
			var msg = $('#beforeMessage').val();
			$('#afterMessage').val( transText(msg) );	
			
/*
			var text = document.getElementById('afterMessage');
			text.select();
			document.execCommand('copy');
			
*/
			Clipboard.copy( $('#afterMessage').val() );
			
			$('#alert').show();
			
			setTimeout(function(){
				$('#alert').hide();				
			}, 3400);
			
		});
	
	
})(window);

window.Clipboard = (function(window, document, navigator) {
    var textArea,
        copy;

    function isOS() {
        return navigator.userAgent.match(/ipad|iphone/i);
    }

    function createTextArea(text) {
        textArea = document.createElement('textArea');
        textArea.value = text;
        document.body.appendChild(textArea);
    }

    function selectText() {
        var range,
            selection;

        if (isOS()) {
            range = document.createRange();
            range.selectNodeContents(textArea);
            selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);
            textArea.setSelectionRange(0, 999999);
        } else {
            textArea.select();
        }
    }

    function copyToClipboard() {        
        document.execCommand('copy');
        document.body.removeChild(textArea);
    }

    copy = function(text) {
        createTextArea(text);
        selectText();
        copyToClipboard();
    };

    return {
        copy: copy
    };
})(window, document, navigator);