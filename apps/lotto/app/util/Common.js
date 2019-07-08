Ext.define('Lotto.util.Common', {

	singleton: true,
	alternateClassName: ['Common'],

	dreamCache: null,
	valueCache: null,
	dreamFilter: null,

	searchLottoData: function (str) {

		var result = [];
		var words = str.split(' ');

		for( var i = 0; i < words.length; i++) {
			for( var j = 0; j < words[i].length; j++) {
				for(var k = j; k < words[i].length; k++) {
					result = result.concat( this.searchWord2Num( words[i].substr(j, k - j + 1) ) );
				}
			}
		}

		return `${result.join('//')}//`;
	},

	searchWord2Num: function (word) {

		var result = [];

		if (window.lottoData) {

			for (var idx in window.lottoData) {
				for (var i = 0; i < window.lottoData[idx].length; i++) {
					// if( window.lottoData[idx][i].indexOf(word) >= 0 ) {
					if (window.lottoData[idx][i] == word) {
						result.push(`${window.lottoData[idx][i]}/${idx}`);
						break;
					}
				}
			}

		}

		return result;

	},

	loadDream: function (dream, callback) {

		if (this.dreamCache === dream) {
			callback(this.valueCache);
			return;
		}

		var result = this.searchLottoData(dream);

		var group = result.split("//")
			, array = []
			, temp = null;

		for (i = 0; i < group.length - 1; i++) {

			temp = group[i].split("/");

			array[i] = {
				char: temp,
				len: temp.length - 1,
				num: parseInt(temp[temp.length - 1])
			}
		}

		this.dreamCache = dream;
		this.valueCache = array;

		callback(array);

	},

	viewNumber: function (result) {

		var items = []
			, image = null
			, label = null
			, chars = null;

		for (var i = 0; i < result.length; i++) {

			chars = "";

			for (var j = 0; j < result[i].len; j++)
				chars += ", " + result[i].char[j];

			chars = chars.replace(/^[\,]/, "");

			image = Ext.create('Ext.Img', {
				cls: 'tapDelete',
				ui: result[i].num,
				src: "./resource/images/ball/ballN" + result[i].num + ".png",
				height: 37,
				width: 37
			});

			label = {
				xtype: 'label',
				margin: '0 0 0 10px',
				html: chars
			}

			items.push({
				layout: { type: 'hbox', align: 'center' },
				margin: 5,
				items: [image, label]
			});
		}

		return items;

	},



	createNumber: function (result) {

		var items = []
			, len = null
			, count = null
			, image = null
			, label = null
			, chars = null
			, num = null
			, visit = []
			, array = [];



		result = this.filter(result);
		len = result.length;

		if (result.length >= 6)
			count = Math.floor(Math.random() * 6);
		else
			count = Math.floor(Math.random() * len) + (6 - len);

		// 방문체크 초기화	
		for (var i = 0; i <= 45; i++)
			visit[i] = 0;

		for (i = 1; i <= 6; i++) {

			if (6 - count >= i) {
				num = result[Math.floor(Math.random() * len)].num;
			} else
				num = Math.floor(Math.random() * 45) + 1;

			if (visit[num] == 1) {
				i--;
				continue;
			}
			array.push(num);
			visit[num] = 1;
		}

		array.sort(function (a, b) { return a - b });

		for (i = 0; i < array.length; i++) {

			image = Ext.create('Ext.Img', {
				src: "resource/images/ball/ballN" + array[i] + ".png",
				height: 37,
				width: 37,
				margin: '0 2px 0 0',
				cls: array[i].toString()
			});

			items.push(image);
		}

		items.push({
			xtype: 'button',
			text: '삭제',
			ui: 'delete',
			action: 'numberDelete'
		});

		return items;
	},

	createNumberPackage: function (result, length) {

		var items = []
			, panel = null;

		for (var i = 1; i <= length; i++) {

			panel = {
				layout: { type: 'hbox', align: 'center' },
				margin: 5,
				items: Common.createNumber(result)
			};

			items.push(panel);
		}

		return items;
	},

	loadNumber: function () {

		if (!localStorage.save) {
			return;
		}

		var data = Ext.JSON.decode(localStorage.save);
		var items = [], date;
		for (var name in data) {
			date = new Date(parseInt(name));
			date = date.getFullYear() + "년 " + (date.getMonth() + 1) + "월 " + date.getDate() + "일 " + date.getHours() + "시 " + date.getMinutes() + "분";
			items.push(Common.drawNumber(date, data[name]));
		}

		items.reverse();

		Ext.getCmp('recordView').setItems(items);
	},

	drawNumber: function (title, array) {

		var image, panel
			, items = []
			, result = [];

		result.push({
			xtype: 'label',
			padding: '8px 0 2px 12px',
			html: title
		});

		for (var i = 0; i < array.length; i++) {

			items = [];
			for (var j = 0; j < 6; j++) {

				image = Ext.create('Ext.Img', {
					src: "resource/images/ball/ballN" + array[i][j] + ".png",
					height: 37,
					width: 37,
					margin: '0 6px 0 0'
				});

				items.push(image);
			}

			result.push({
				layout: { type: 'hbox', align: 'center' },
				margin: 5,
				items: items
			});
		}

		panel = {
			items: result
		}

		return panel;
	},

	filter: function (result) {

		if (Common.dreamFilter == null || Common.dreamFilter.length == 0)
			return result;

		for (var i = 0; i < result.length; i++) {

			for (var j = 0; j < Common.dreamFilter.length; j++) {
				if (result[i].num == Common.dreamFilter[j])
					result[i].num = 99;
			}

		}

		result.sort(function (a, b) { return a.num - b.num });

		for (var i = result.length - 1; i >= 0; i--) {
			if (result[i].num == 99)
				result.pop();
			else
				break;
		}

		return result;

	}
});