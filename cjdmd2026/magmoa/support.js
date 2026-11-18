(() => {
  const search = document.querySelector('#faq-search');
  if (search) {
    const filters = [...document.querySelectorAll('[data-faq-category]')];
    const questions = [...document.querySelectorAll('.support-faq-item')];
    let category = '전체';

    function filterQuestions() {
      const query = search.value.trim().toLocaleLowerCase();
      let visible = 0;
      questions.forEach(question => {
        const matches = (category === '전체' || question.dataset.category === category)
          && question.textContent.toLocaleLowerCase().includes(query);
        question.hidden = !matches;
        if (matches) visible++;
        else question.open = false;
      });
      document.querySelector('#faq-empty').hidden = visible > 0;
    }
    filters.forEach(button => button.addEventListener('click', () => {
      category = button.dataset.faqCategory;
      filters.forEach(filter => filter.setAttribute('aria-pressed', String(filter === button)));
      filterQuestions();
    }));
    search.addEventListener('input', filterQuestions);
  }

  const form = document.querySelector('#contact-form');
  if (!form) return;
  const status = document.querySelector('#inquiry-status');

  function inquiry() {
    const data = new FormData(form);
    return {
      subject: '[MAGMOA 문의] ' + data.get('category'),
      body: '이름: ' + data.get('name') + '\n답변받을 이메일: ' + data.get('email')
        + '\n문의 유형: ' + data.get('category') + '\n주문번호: ' + (data.get('order') || '해당 없음')
        + '\n\n' + data.get('message'),
    };
  }

  document.querySelector('#send-inquiry').addEventListener('click', () => {
    if (!form.reportValidity()) return;
    const draft = inquiry();
    location.href = 'mailto:cs@magmoa.kr?subject=' + encodeURIComponent(draft.subject)
      + '&body=' + encodeURIComponent(draft.body);
    status.textContent = '이메일 앱에서 내용을 확인한 뒤 전송해 주세요. 앱이 열리지 않으면 문의 내용을 복사해 cs@magmoa.kr로 보내주세요.';
  });

  document.querySelector('#copy-support-inquiry').addEventListener('click', async () => {
    if (!form.reportValidity()) return;
    const draft = inquiry();
    try {
      await navigator.clipboard.writeText(draft.subject + '\n\n' + draft.body);
      status.textContent = '문의 내용을 복사했습니다. cs@magmoa.kr로 메일을 보내주세요.';
    } catch {
      status.textContent = '자동 복사를 사용할 수 없습니다. 작성한 내용을 직접 복사해 cs@magmoa.kr로 보내주세요.';
    }
  });
})();
