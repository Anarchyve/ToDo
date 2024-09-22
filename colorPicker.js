    const bgColorPicker = document.getElementById('bg-color-picker');
    const textColorPicker = document.getElementById('text-color-picker');
    const BODY_BG_COLOR = 'bodyBgColor';
    const BODY_TEXT_COLOR = 'bodyTextColor';

    // 페이지 로드 시 저장된 색상 적용
    function loadColors() {
      const savedBgColor = localStorage.getItem(BODY_BG_COLOR);
      const savedTextColor = localStorage.getItem(BODY_TEXT_COLOR);

      if (savedBgColor) {
        document.body.style.backgroundColor = savedBgColor;
        bgColorPicker.value = savedBgColor;
      }

      if (savedTextColor) {
        document.body.style.color = savedTextColor;
        textColorPicker.value = savedTextColor;
      }
    }

    // 배경색 변경 핸들러
    function handleBgColorChange(event) {
      const color = event.target.value;
      document.body.style.backgroundColor = color;
      localStorage.setItem(BODY_BG_COLOR, color);
    }

    // 글씨 색상 변경 핸들러
    function handleTextColorChange(event) {
      const color = event.target.value;
      document.body.style.color = color;
      localStorage.setItem(BODY_TEXT_COLOR, color);
    }

    // 이벤트 리스너 등록
    bgColorPicker.addEventListener('input', handleBgColorChange);
    textColorPicker.addEventListener('input', handleTextColorChange);

    // 초기화
    function init() {
      loadColors();
    }

    init();
