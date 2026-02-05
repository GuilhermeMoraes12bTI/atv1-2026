const app = {
    // Gerenciamento de Telas
    showScreen: (screenId) => {
        document.querySelectorAll('.screen').forEach(el => el.classList.remove('active', 'hidden'));
        document.querySelectorAll('.screen').forEach(el => {
            if(el.id !== screenId) el.classList.add('hidden');
        });
        document.getElementById(screenId).classList.add('active');
    },

    // Ações de Usuário
    register: async (e) => {
        e.preventDefault();
        const data = {
            name: document.getElementById('reg-name').value,
            age: document.getElementById('reg-age').value,
            team: document.getElementById('reg-team').value,
            password: document.getElementById('reg-pass').value
        };

        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            const result = await response.json();
            
            if (response.ok) {
                alert(result.message);
                document.getElementById('register-form').reset();
                app.showScreen('login-screen');
            } else {
                alert(result.message);
            }
        } catch (error) {
            console.error('Erro:', error);
        }
    },

    login: async (e) => {
        e.preventDefault();
        const data = {
            name: document.getElementById('login-name').value,
            password: document.getElementById('login-pass').value
        };

        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (response.ok) {
                app.populateDashboard(result);
                document.getElementById('login-form').reset();
                app.showScreen('dashboard-screen');
            } else {
                alert(result.message);
            }
        } catch (error) {
            console.error('Erro de login:', error);
        }
    },

    populateDashboard: (user) => {
        document.getElementById('dash-name').innerText = user.name;
        document.getElementById('dash-age').innerText = user.age;
        document.getElementById('dash-team').innerText = user.team;
    },

    logout: () => {
        app.showScreen('login-screen');
    },

    newUser: () => {
        app.showScreen('register-screen');
    },

    // Lógica do Tema
    toggleTheme: () => {
        document.body.classList.toggle('dark-mode');
        const btn = document.getElementById('theme-toggle');
        if (document.body.classList.contains('dark-mode')) {
            btn.innerText = '☀️ Tema Claro';
        } else {
            btn.innerText = '🌙 Tema Escuro';
        }
    }
};

// Event Listeners
document.getElementById('register-form').addEventListener('submit', app.register);
document.getElementById('login-form').addEventListener('submit', app.login);
document.getElementById('theme-toggle').addEventListener('click', app.toggleTheme);