var colorNames = {
    '800000' : 'maroon',
    '8B0000' : 'darkred',
    'FF0000' : 'red',
    'FFB6C1' : 'lightpink',
    'DC143C' : 'crimson',
    'DB7093' : 'palevioletred',
    'FF69B4' : 'hotpink',
    'FF1493' : 'deeppink',
    'C71585' : 'mediumvioletred', 
    '800080' : 'purple',
    '8B008B' : 'darkmagenta',
    'DA70D6' : 'orchid',
    'D8BFD8' : 'thistle',
    'DDA0DD' : 'plum',
    'EE82EE' :'violet',
    'FF00FF' : 'fuchsia',
    'FF00FF' : 'magenta',
    'BA55D3' : 'mediumorchid',
    '9400D3' : 'darkviolet',
    '9932CC' : 'darkorchid',
    '8A2BE2' : 'blueviolet',
    '4B0082' : 'indigo',
    '9370DB' : 'mediumpurple',
    '6A5ACD' : 'slateblue',
    '7B68EE' : 'mediumslateblue',
    '00008B' : 'darkblue',
    '0000CD' : 'mediumblue',
    '0000FF' : 'blue',
    '000080' : 'navy',
    '191970' : 'midnightblue',
    '483D8B' : 'darkslateblue',
    '4169E1' : 'royalblue',
    '6495ED' : 'cornflowerblue',
    'B0C4DE' : 'lightsteelblue',
    'F0F8FF' : 'aliceblue',
    'F8F8FF' : 'ghostwhite',
    'E6E6FA' : 'lavender',
    '1E90FF' : 'dodgerblue',
    '4682B4' : 'steelblue',
    '00BFFF' : 'deepskyblue',
    '708090' : 'slategray',
    '778899' : 'lightslategray',
    '87CEFA' : 'lightskyblue',
    '87CEEB' : 'skyblue',
    'ADD8E6' : 'lightblue',
    '008080' : 'teal',
    '008B8B' : 'darkcyan',
    '00CED1' : 'darkturquoise',
    '00FFFF' : 'cyan',
    '48D1CC' : 'mediumturquoise',
    '5F9EA0' : 'cadetblue',
    'AFEEEE' : 'paleturquoise',
    'E0FFFF' : 'lightcyan',
    'F0FFFF' : 'azure',
    '20B2AA' : 'lightseagreen',
    '40E0D0' : 'turquoise',
    'B0E0E6' : 'powderblue',
    '2F4F4F' : 'darkslategray',
    '7FFFD4' : 'aquamarine',
    '00FA9A' : 'mediumspringgreen',
    '66CDAA' : 'mediumaquamarine',
    '00FF7F' : 'springgreen',
    '3CB371' : 'mediumseagreen',
    '2E8B57' : 'seagreen',
    '32CD32' : 'limegreen',
    '006400' : 'darkgreen',
    '008000' : 'green',
    '00FF00' : 'lime',
    '228B22' : 'forestgreen',
    '8FBC8F' : 'darkseagreen',
    '90EE90' : 'lightgreen',
    '98FB98' : 'palegreen',
    'F5FFFA' : 'mintcream',
    'F0FFF0' : 'honeydew',
    '7FFF00' : 'chartreuse',
    '7CFC00' : 'lawngreen',
    '6B8E23' : 'olivedrab',
    '556B2F' : 'darkolivegreen',
    '9ACD32' : 'yellowgreen',
    'ADFF2F' : 'greenyellow',
    'F5F5DC' : 'beige',
    'FAF0E6' : 'linen',
    'FAFAD2' : 'lightgoldenrodyellow',
    '808000' : 'olive',
    'FFFF00' : 'yellow',
    'FFFFE0' : 'lightyellow',
    'FFFFF0' : 'ivory',
    'BDB76B' : 'darkkhaki',
    'F0E68C' : 'khaki',
    'EEE8AA' : 'palegoldenrod',
    'F5DEB3' : 'wheat',
    'FFD700' : 'gold',
    'FFFACD' : 'lemonchiffon',
    'FFEFD5' : 'papayawhip',
    'B8860B' : 'darkgoldenrod',
    'DAA520' : 'goldenrod',
    'FAEBD7' : 'antiquewhite',
    'FFF8DC' : 'cornsilk',
    'FDF5E6' : 'oldlace',
    'FFE4B5' : 'moccasin',
    'FFDEAD' : 'navajowhite',
    'FFA500' : 'orange', 
    'FFE4C4' : 'bisque',
    'D2B48C' : 'tan',
    'FF8C00' : 'darkorange',
    'DEB887' : 'burlywood',
    '8B4513' : 'saddlebrown',
    'F4A460' : 'sandybrown',
    'FFEBCD' : 'blanchedalmond',
    'FFF0F5' : 'lavenderblush',
    'FFF5EE' : 'seashell',
    'FFFAF0' : 'floralwhite',
    'FFFAFA' : 'snow',
    'CD853F' : 'peru',
    'FFDAB9' : 'peachpuff',
    'D2691E' : 'chocolate',
    'A0522D' : 'sienna',
    'FFA07A' : 'lightsalmon',
    'FF7F50' : 'coral',
    'E9967A' : 'darksalmon',
    'FFE4E1' : 'mistyrose',
    'FF4500' : 'orangered',
    'FA8072' : 'salmon',
    'FF6347' : 'tomato',
    'BC8F8F' : 'rosybrown',
    'FFC0CB' : 'pink',
    'CD5C5C' : 'indianred',
    'F08080' : 'lightcoral',
    'A52A2A' : 'brown',
    'B22222' : 'firebrick',
    '000000' : 'black',
    '696969' : 'dimgray',
    '808080' : 'gray',
    'A9A9A9' : 'darkgray',
    'C0C0C0' : 'silver',
    'D3D3D3' : 'lightgrey',
    'DCDCDC' : 'gainsboro',
    'F5F5F5' : 'whitesmoke',
    'FFFFFF' : 'white' 
  };