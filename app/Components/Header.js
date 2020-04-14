define(
    'app/Components/Header.js', [
        'app/Components/Component.js',
        'app/Components/Photo.js',
        'css!app/Component/Header.css'
    ],function(Component) {

		return class Header extends Component  {

			/**
             * Инициализация компонента
             */
			constructor(data) {
				super();
				this.data = data;
				this.addEventToggleNav();
			}

			

			addEventToggleNav() {
				document.addEventListener('click',function(e){
					if(e.target && e.target.classList.contains('header__profile')){
				          const headerProfile = document.querySelector('.header__profile');
							const nav = document.querySelector('.profile__nav');
							const navClasses = nav.classList;

							if(navClasses.contains('visible')) {
								navClasses.remove('visible');
							}
							else {
								navClasses.add('visible');
								document.addEventListener('click', function handler(event) {
									if (nav && !headerProfile.contains(event.target)) {
										closeNav();
										navClasses.remove('visible');
										this.removeEventListener('click',handler);
									}
								});
							} 
				    }
				});
		}

			render() {
				return `
				<div class="header header_blue">
					<div class="header__wraper wraper">
						<div class="header__status">
							<p>${this.data.activity}</p>
						</div>
						<div class="header__profile">
							<img src="${new Photo(this.data.photoUrl)}" class="profile__img profile__img_small" alt="Фото пользователя">
							<span class="profile__settings">
								<span class="settings-dot"></span>
								<span class="settings-dot"></span>
								<span class="settings-dot"></span>
							</span>
							<div class="profile__nav">
								<a class="nav-link" href="#">Редактировать</a>
								<a class="nav-link" href="#">Настройки</a>
								<hr class="nav-link__line">
								<a class="nav-link" href="#">Выйти</a>
							</div>
						</div>
					</div>
				</div>`;
			}
		}
});



