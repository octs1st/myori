// /assets/js/main.js

document.addEventListener('DOMContentLoaded', () => {
    // DOM 요소들을 가져온다냥!
    const calendarGrid = document.getElementById('calendar-grid');
    const currentMonthYearDisplay = document.getElementById('current-month-year');
    const currentDisplayMonth = document.getElementById('current-display-month');
    const prevMonthBtn = document.getElementById('prev-month');
    const nextMonthBtn = document.getElementById('next-month');
    const fabButton = document.getElementById('fab-write');

    // 현재 날짜를 기준으로 캘린더를 시작한다냥! (예: 2025년 9월)
    let currentYear = 2025; 
    let currentMonth = 9; // JavaScript의 월은 0부터 시작하니 9월은 8이 아니라 9로 표시한다냥! (나중에 DB 연동 시 보정)

    // 더미 데이터: 일기가 작성된 날짜를 가정한다냥! (실제로는 DB에서 가져온다냥)
    const dummyDiaryDates = ['2025-09-01', '2025-09-03', '2025-09-10']; 

    // 캘린더를 그리는 핵심 함수다냥!
    function renderCalendar(year, month) {
        // 실제 날짜 객체를 생성 (JS Date 객체에서 월은 0부터 시작한다냥: 9월 = 8)
        const date = new Date(year, month - 1); 
        const today = new Date();
        
        // 현재 표시될 월과 연도 업데이트
        currentMonthYearDisplay.textContent = `${date.getFullYear()}년 ${date.getMonth() + 1}월`;
        currentDisplayMonth.textContent = `${date.getFullYear()}년 ${date.getMonth() + 1}월`;

        // 이번 달의 첫 번째 날 (예: 9월 1일)
        const firstDayOfMonth = new Date(year, month - 1, 1);
        // 이번 달의 마지막 날짜 (예: 9월 30일)
        const lastDayOfMonth = new Date(year, month, 0).getDate();
        // 1일이 무슨 요일인지 (0: 일요일, 6: 토요일)
        const startDayOfWeek = firstDayOfMonth.getDay(); 

        calendarGrid.innerHTML = ''; // 기존 날짜 셀 모두 초기화

        // 1. 이전 달의 빈 칸 채우기
        // (startDayOfWeek만큼 이전 달 날짜 칸을 비워둔다냥)
        for (let i = 0; i < startDayOfWeek; i++) {
            const emptyCell = document.createElement('div');
            emptyCell.classList.add('day-cell', 'empty');
            calendarGrid.appendChild(emptyCell);
        }

        // 2. 이번 달 날짜 채우기
        for (let day = 1; day <= lastDayOfMonth; day++) {
            const cell = document.createElement('div');
            cell.classList.add('day-cell');
            cell.textContent = day;

            // 현재 날짜인지 확인
            if (day === today.getDate() && month - 1 === today.getMonth() && year === today.getFullYear()) {
                cell.classList.add('is-today');
            }

            // 더미 데이터로 일기 유무 표시 (나중에 DB 데이터로 대체한다냥!)
            const formattedDate = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            if (dummyDiaryDates.includes(formattedDate)) {
                cell.classList.add('has-diary');
            }

            // 각 셀에 클릭 이벤트 추가 (나중에 일기 상세 보기로 연결한다냥)
            cell.addEventListener('click', () => {
                console.log(`${year}년 ${month}월 ${day}일 클릭했다냥!`);
                // 여기에서 해당 날짜의 일기 상세 페이지로 이동하는 로직을 추가할 수 있다냥!
                // window.location.href = `analysis.php?date=${formattedDate}`;
            });

            calendarGrid.appendChild(cell);
        }

        // 오늘의 요약 정보 업데이트 (임시 데이터)
        if (month - 1 === today.getMonth() && year === today.getFullYear()) {
            document.getElementById('today-iljin').textContent = '丙戌 (병술)'; // DB에서 가져올 데이터
            document.getElementById('today-ai-feedback').textContent = '오늘은 금(金) 기운이 강하니, 외부에 활력을 쏟으세요냥!'; // DB/AI 분석에서 가져올 데이터
        } else {
            document.getElementById('today-iljin').textContent = '데이터 없음';
            document.getElementById('today-ai-feedback').textContent = '해당 날짜의 요약은 없다냥!';
        }
    }

    // 캘린더 초기 렌더링
    renderCalendar(currentYear, currentMonth); 

    // '이전 달' 버튼 클릭 이벤트
    prevMonthBtn.addEventListener('click', () => {
        currentMonth--;
        if (currentMonth < 1) {
            currentMonth = 12;
            currentYear--;
        }
        renderCalendar(currentYear, currentMonth);
    });

    // '다음 달' 버튼 클릭 이벤트
    nextMonthBtn.addEventListener('click', () => {
        currentMonth++;
        if (currentMonth > 12) {
            currentMonth = 1;
            currentYear++;
        }
        renderCalendar(currentYear, currentMonth);
    });

    // 일기 작성 FAB 버튼 클릭 이벤트
    fabButton.addEventListener('click', () => {
        console.log("일기 작성 버튼이 눌렸다냥! write.php로 이동한다냥.");
        window.location.href = 'write.php'; 
    });
});