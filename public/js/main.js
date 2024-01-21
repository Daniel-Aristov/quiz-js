const questions = [
  {
    question: 'Какой язык работает в браузере?',
    answers: ['Java', 'C', 'Python', 'JavaScript'],
    correct: 4,
  },
  {
    question: 'Что означает CSS?',
    answers: [
      'Central Style Sheets',
      'Cascading Style Sheets',
      'Cascading Simple Sheets',
      'Cars SUVs Sailboats',
    ],
    correct: 2,
  },
  {
    question: 'Что означает HTML?',
    answers: [
      'Hypertext Markup Language',
      'Hypertext Markdown Language',
      'Hyperloop Machine Language',
      'Helicopters Terminals Motorboats Lamborginis',
    ],
    correct: 1,
  },
  {
    question: 'В каком году был создан JavaScript?',
    answers: ['1996', '1995', '1994', 'все ответы неверные'],
    correct: 2,
  },
]

const headerContainer = document.querySelector('#header')
const listContainer = document.querySelector('#list')
const submitBtn = document.querySelector('#submit')

let score = 0
let questionIndex = 0

clearPage()
showQuestion()
submitBtn.onclick = checkAnswer

function clearPage() {
  headerContainer.innerHTML = ''
  listContainer.innerHTML = ''
}

function showQuestion() {
  let = answersArray = questions[questionIndex]['answers']

  headerContainer.innerHTML = `<h2 class="title">${questions[questionIndex]['question']}</h2>`

  answersArray.forEach((answer, index) => {
		const answerTemplate = `
			<li>
				<label>
					<input value="${index + 1}" type="radio" class="answer" name="answer" />
					<span>%answer%</span>
				</label>
			</li>
		`
    const answerHTML = answerTemplate.replace('%answer%', answer)
		listContainer.innerHTML += answerHTML
  })
}

function checkAnswer() {
	const checkedRadio = listContainer.querySelector('input[type="radio"]:checked')

	if (!checkedRadio) {
		submitBtn.blur()
		return
	}

	const userAnswer = +checkedRadio.value

	if (questions[questionIndex]['correct'] == userAnswer) {
		score++
	}

	if (questionIndex !== questions.length - 1) {
		questionIndex++
		clearPage()
		showQuestion()
	} else {
		clearPage()
		showResults()
	}
}


function showResults() {
	let title, message

	if (score == questions.length) {
		title = 'Поздравляем!'
		message = 'Вы ответили верно на все вопросы!'
	} else if ((score * 100) / questions.length >= 50) {
		title = 'Неплохой результат!'
		message = 'Вы дали более половины правильных ответов'
	} else {
		title = 'Стоит постараться!'
		message = 'Пока что вы дали меньше половины правильных ответов'
	}

	console.log(title);
	console.log(score);
	console.log(message);

	const resultTemplate = `
		<h2 class="title">${title}</h2>
		<h3 class="summary">${message}</h3>
		<p class="result">Количество правильных ответов: ${score} / ${questions.length}</p>
	`

	headerContainer.innerHTML = resultTemplate
	
	submitBtn.blur()
	submitBtn.innerText = 'Начать заново'
	submitBtn.onclick = () => history.go()
}
