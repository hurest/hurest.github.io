var colorNames = {
    '800000' : '고동색',
    '8B0000' : '암적색',
    'FF0000' : '빨강색',
    'FFB6C1' : '밝은핑크색',
    'DC143C' : '진홍색',
    'DB7093' : '페일 바이올렛 레드',
    'FF69B4' : '핫핑크',
    'FF1493' : '딥핑크',
    'C71585' : '미디엄 바아올렛 레드', 
    '800080' : '자주색',
    '8B008B' : '다크 마젠타',
    'DA70D6' : '오키드',
    'D8BFD8' : '시슬',
    'DDA0DD' : '진자주색',
    'EE82EE' : '보라색',
    'FF00FF' : '푸크시아',
    'FF00FF' : '마젠타',
    'BA55D3' : '미디엄 오어키드',
    '9400D3' : '다크 바이올렛',
    '9932CC' : '다크 오키드',
    '8A2BE2' : '블루 바이올렛',
    '4B0082' : '인디고',
    '9370DB' : '미디엄 퍼플',
    '6A5ACD' : '슬레이트 블루',
    '7B68EE' : '미디엄 슬레이트 블루',
    '00008B' : '다크 블루',
    '0000CD' : '미디엄 블루',
    '0000FF' : '파랑색',
    '000080' : '남색',
    '191970' : '미드나잇 블루',
    '483D8B' : '다크 슬레이트 블루',
    '4169E1' : '로얄 블루',
    '6495ED' : '콘플라워 블루',
    'B0C4DE' : '라이트 스틸 블루',
    'F0F8FF' : '앨리스 블루',
    'F8F8FF' : '고스트 화이트',
    'E6E6FA' : '라벤더',
    '1E90FF' : '다져스 블루',
    '4682B4' : '스틸 블루',
    '00BFFF' : '딥 스카이 블루',
    '708090' : '슬레이트 그레이',
    '778899' : '라이트 슬레이트 그레이',
    '87CEFA' : '라이트 스카이 블루',
    '87CEEB' : '스카이 블루',
    'ADD8E6' : '라이트 블루',
    '008080' : '청록색',
    '008B8B' : '다크 사이앤',
    '00CED1' : '다크 터코이즈',
    '00FFFF' : '사이앤',
    '48D1CC' : '미디엄 터코이즈',
    '5F9EA0' : '카테트 블루',
    'AFEEEE' : '페일 터코이즈',
    'E0FFFF' : '라이트 사이앤',
    'F0FFFF' : '하늘색',
    '20B2AA' : '라이트 씨 그린',
    '40E0D0' : '터키옥색',
    'B0E0E6' : '파우더 블루',
    '2F4F4F' : '다크 슬레이트 그레이',
    '7FFFD4' : '옥색',
    '00FA9A' : '미디엄 스프링 그린',
    '66CDAA' : '미디엄 아쿠아마린',
    '00FF7F' : '스프링 그린',
    '3CB371' : '미디엄 씨 그린',
    '2E8B57' : '씨 그린',
    '32CD32' : '라임 그린',
    '006400' : '다크 그린',
    '008000' : '초록색',
    '00FF00' : '라임',
    '228B22' : '포레스트 그린',
    '8FBC8F' : '다크 씨 그린',
    '90EE90' : '라이트 그린',
    '98FB98' : '담록색',
    'F5FFFA' : '민트 크림',
    'F0FFF0' : '허니듀',
    '7FFF00' : '연노랑색',
    '7CFC00' : '잔디색',
    '6B8E23' : '올리브 드래브',
    '556B2F' : '다크 올리브 그린',
    '9ACD32' : '황록색',
    'ADFF2F' : '녹황색',
    'F5F5DC' : '베이지',
    'FAF0E6' : '리넨',
    'FAFAD2' : '라이트 골덴로드 옐로우',
    '808000' : '올리브',
    'FFFF00' : '노랑색',
    'FFFFE0' : '라이트 옐로우',
    'FFFFF0' : '아이보리',
    'BDB76B' : '다크 카키',
    'F0E68C' : '카키',
    'EEE8AA' : '페일 골덴로드',
    'F5DEB3' : '위트',
    'FFD700' : '골드',
    'FFFACD' : '레몬시폰',
    'FFEFD5' : '파파야 윕',
    'B8860B' : '다크 골덴로드',
    'DAA520' : '골덴로드',
    'FAEBD7' : '앤틱 화이트',
    'FFF8DC' : '콘실크',
    'FDF5E6' : '올드 레이스',
    'FFE4B5' : '모카신',
    'FFDEAD' : '나바호 화이트',
    'FFA500' : '오렌지', 
    'FFE4C4' : '비스크',
    'D2B48C' : '황갈색',
    'FF8C00' : '다크 오렌지',
    'DEB887' : '벌리우드',
    '8B4513' : '새들 브라운',
    'F4A460' : '샌디 브라운',
    'FFEBCD' : '블렌치드 아몬드',
    'FFF0F5' : '라벤다 블러쉬',
    'FFF5EE' : '씨섈',
    'FFFAF0' : '플로랄 화이트',
    'FFFAFA' : '스노우',
    'CD853F' : '페루',
    'FFDAB9' : '피치 퍼프',
    'D2691E' : '초콜릿',
    'A0522D' : '시에나',
    'FFA07A' : '라이트 새먼',
    'FF7F50' : '산호색',
    'E9967A' : '다크 세먼',
    'FFE4E1' : '미스티 로즈',
    'FF4500' : '오렌지 레드',
    'FA8072' : '세먼',
    'FF6347' : '토마토',
    'BC8F8F' : '로지 브라운',
    'FFC0CB' : '핑크',
    'CD5C5C' : '인디언 레드',
    'F08080' : '라이트 코랄',
    'A52A2A' : '브라운',
    'B22222' : '파이어브릭',
    '000000' : '검정색',
    '696969' : '딤 그레이',
    '808080' : '회색',
    'A9A9A9' : '다크 그레이',
    'C0C0C0' : '실버',
    'D3D3D3' : '라이트 그레이',
    'DCDCDC' : '게인스보로',
    'F5F5F5' : '화이트 스모크',
    'FFFFFF' : '흰색' 
  };