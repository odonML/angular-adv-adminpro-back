const getMenuFrontend = (role = 'USER_ROLE') => {
	const menu = [
		{
			tltle: 'Dashboard111',
			icon: 'mdi mdi-gauge',
			url: '/',
			subMenu: [
				{
					title: 'Principal',
					url: '/',
				},
				{
					title: 'Progress Bar',
					url: 'progress',
				},
				{
					title: 'Graphs',
					url: 'grafica1',
				},
				{
					title: 'Promises',
					url: 'promesas',
				},
				{
					title: 'Rxjs',
					url: 'rxjs',
				},
			],
		},
		{
			tltle: 'Mantenimiento',
			icon: 'mdi mdi-folder-lock-open',
			url: '/',
			subMenu: [
				{
					title: 'Hospitales',
					url: 'hospitales',
				},
				{
					title: 'Medicos',
					url: 'medicos',
				},
			],
		},
	];

	if (role === 'ADMIN_ROLE') {
		menu[1].subMenu.unshift({
			title: 'Usuarios',
			url: 'usuarios',
		});
	}

	return menu;
};

module.exports = { getMenuFrontend };
