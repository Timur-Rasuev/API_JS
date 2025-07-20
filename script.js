const inp = document.querySelector('input');
const btn = document.querySelector('.btn');
const body = document.querySelector('.root');
const bdyy = document.querySelector('body');

let qwe = (str) => {
	body.innerHTML = '';

	fetch(`https://api.github.com/search/repositories?q=${str}`)
		.then((data) => data.json())
		.then((data) => {
			// if (!data || !Array.isArray(data.items)) {
			// 	console.error('Ошибка в ответе API:', data);
			// 	return;
			// }

			data.items.map((element, i) => {
				if (i > 4) {
					return;
				}

				if (data.items.length === 0) {
					const notFound = document.createElement('p');
					notFound.textContent = '🔍 Ничего не найдено по запросу.';
					notFound.style.color = 'red';
					body.appendChild(notFound);
					return;
				}

				const rodDiv = document.createElement('div');
				const div = document.createElement('div');

				div.classList.add('qwe');
				div.textContent = element.name;

				div.onclick = () => {
					inp.value = '';

					const divChildren = document.createElement('div');

					const name = document.createElement('p');
					const owner = document.createElement('p');
					const stars = document.createElement('p');
					const closeBtn = document.createElement('div');
					name.textContent = `Name: ${element.name}`;
					owner.textContent = `Owner: ${element.owner.login}`;
					stars.textContent = `Stars: ${element.stargazers_count}`;
					closeBtn.textContent = 'X';
					divChildren.append(name, owner, stars, closeBtn);
					rodDiv.appendChild(divChildren);

					divChildren.classList.add('children');
					closeBtn.classList.add('closeBtn');

					closeBtn.onclick = (e) => {
						divChildren.remove();
					};
					body.appendChild(rodDiv);
				};

				body.appendChild(div);
			});
		});
};

const debounce = (fn, ms) => {
	let timeout;
	return function () {
		let fnCall = () => {
			fn.apply(this, arguments);
		};
		clearTimeout(timeout);
		timeout = setTimeout(fnCall, ms);
	};
};

qwe = debounce(qwe, 500);

inp.addEventListener('keyup', (e) => {
	qwe(inp.value);
});
