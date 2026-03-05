/* ============================================
   Retention Academy - Main Application
   ============================================ */

const App = {
    levels: [],
    allModules: [],
    currentModuleId: null,
    progress: {},
    quizResults: {},

    init() {
        // Load level data - adjust based on number of levels
        this.levels = [LEVEL1_DATA, LEVEL2_DATA, LEVEL3_DATA, LEVEL4_DATA, LEVEL5_DATA, LEVEL6_DATA];

        this.allModules = [];
        this.levels.forEach(level => {
            level.modules.forEach(mod => {
                this.allModules.push({
                    ...mod,
                    levelId: level.id,
                    levelTitle: level.title
                });
            });
        });

        this.loadProgress();
        this.buildSidebar();
        this.showDashboard();

        if (localStorage.getItem('retention-darkmode') === 'true') {
            document.documentElement.setAttribute('data-theme', 'dark');
        }

        this.updateGlobalProgress();

        document.addEventListener('click', (e) => {
            const header = e.target.closest('.collapsible-header');
            if (header) {
                header.parentElement.classList.toggle('open');
            }
        });
    },

    loadProgress() {
        try {
            const saved = localStorage.getItem('retention-progress');
            if (saved) this.progress = JSON.parse(saved);
            const savedQuiz = localStorage.getItem('retention-quiz-results');
            if (savedQuiz) this.quizResults = JSON.parse(savedQuiz);
        } catch (e) {
            this.progress = {};
            this.quizResults = {};
        }
    },

    saveProgress() {
        localStorage.setItem('retention-progress', JSON.stringify(this.progress));
        localStorage.setItem('retention-quiz-results', JSON.stringify(this.quizResults));
    },

    completeModule(moduleId) {
        this.progress[moduleId] = { completed: true, completedAt: new Date().toISOString() };
        this.saveProgress();
        this.buildSidebar();
        this.updateGlobalProgress();
    },

    saveQuizResult(moduleId, result) {
        this.quizResults[moduleId] = {
            ...result,
            attemptedAt: new Date().toISOString()
        };
        this.saveProgress();
    },

    isModuleCompleted(moduleId) {
        return this.progress[moduleId] && this.progress[moduleId].completed;
    },

    updateGlobalProgress() {
        const total = this.allModules.length;
        const completed = this.allModules.filter(m => this.isModuleCompleted(m.id)).length;
        const pct = total > 0 ? Math.round((completed / total) * 100) : 0;

        const fill = document.getElementById('globalProgressFill');
        const text = document.getElementById('globalProgressText');
        if (fill) fill.style.width = pct + '%';
        if (text) text.textContent = pct + '% 完了 (' + completed + '/' + total + ')';
    },

    buildSidebar() {
        const nav = document.getElementById('sidebarNav');
        let html = '';

        this.levels.forEach(level => {
            const levelModules = level.modules;
            const completedCount = levelModules.filter(m => this.isModuleCompleted(m.id)).length;
            const isCurrentLevel = this.currentModuleId && levelModules.some(m => m.id === this.currentModuleId);

            html += '<div class="sidebar-level">' +
                '<div class="sidebar-level-header ' + (isCurrentLevel ? 'expanded' : '') + '" onclick="App.toggleLevel(this)">' +
                '<span>' + level.icon + ' Level ' + level.id + ': ' + level.title + '</span>' +
                '<span style="display:flex;align-items:center;gap:8px;">' +
                '<span style="font-size:0.7rem;opacity:0.7;">' + completedCount + '/' + levelModules.length + '</span>' +
                '<span class="chevron">\u25B6</span></span></div>' +
                '<div class="sidebar-modules ' + (isCurrentLevel ? 'expanded' : '') + '">';

            levelModules.forEach(mod => {
                const isCompleted = this.isModuleCompleted(mod.id);
                const isActive = this.currentModuleId === mod.id;
                html += '<div class="sidebar-item ' + (isCompleted ? 'completed' : '') + ' ' + (isActive ? 'active' : '') + '" onclick="App.showModule(' + mod.id + ')">' +
                    '<span class="status-dot"></span><span>' + mod.title + '</span></div>';
            });

            html += '</div></div>';
        });

        nav.innerHTML = html;
    },

    toggleLevel(header) {
        header.classList.toggle('expanded');
        const modules = header.nextElementSibling;
        modules.classList.toggle('expanded');
    },

    toggleSidebar() {
        document.getElementById('sidebar').classList.toggle('open');
    },

    showDashboard() {
        this.currentModuleId = null;
        this.showView('dashboardView');
        this.buildSidebar();

        const container = document.getElementById('dashboardView');
        const totalModules = this.allModules.length;
        const completedModules = this.allModules.filter(m => this.isModuleCompleted(m.id)).length;
        const totalQuizzes = Object.keys(this.quizResults).length;
        const avgScore = totalQuizzes > 0
            ? Math.round(Object.values(this.quizResults).reduce((sum, r) => sum + r.percentage, 0) / totalQuizzes)
            : 0;

        let html = '<div class="fade-in">' +
            '<div class="dashboard-hero"><h2>\u96E2\u8077\u9632\u6B62\u30A2\u30AB\u30C7\u30DF\u30FC \u3078\u3088\u3046\u3053\u305D</h2>' +
            '<p>\u5F93\u696D\u54E1\u30EA\u30C6\u30F3\u30B7\u30E7\u30F3\u306E\u79D1\u5B66\u3068\u5B9F\u8DF5\u3092\u4F53\u7CFB\u7684\u306B\u5B66\u3076\u6559\u80B2\u30D7\u30ED\u30B0\u30E9\u30E0\u3067\u3059\u3002</p></div>' +
            '<div class="dashboard-grid">' +
            '<div class="stat-card"><div class="stat-value">' + completedModules + '/' + totalModules + '</div><div class="stat-label">\u30E2\u30B8\u30E5\u30FC\u30EB\u5B8C\u4E86</div></div>' +
            '<div class="stat-card"><div class="stat-value">' + totalQuizzes + '</div><div class="stat-label">\u30AF\u30A4\u30BA\u53D7\u9A13\u6570</div></div>' +
            '<div class="stat-card"><div class="stat-value">' + avgScore + '%</div><div class="stat-label">\u5E73\u5747\u30AF\u30A4\u30BA\u30B9\u30B3\u30A2</div></div>' +
            '<div class="stat-card"><div class="stat-value">' + this.getEstimatedTime() + '</div><div class="stat-label">\u6B8B\u308A\u5B66\u7FD2\u6642\u9593(\u76EE\u5B89)</div></div>' +
            '</div><h2 style="margin-bottom:20px;font-size:1.3rem;">\u5B66\u7FD2\u30B3\u30FC\u30B9</h2><div class="dashboard-grid">';

        this.levels.forEach(level => {
            const levelMods = level.modules;
            const completed = levelMods.filter(m => this.isModuleCompleted(m.id)).length;
            const pct = Math.round((completed / levelMods.length) * 100);

            html += '<div class="level-card level-' + level.id + '" onclick="App.showModule(' + levelMods[0].id + ')">' +
                '<div class="level-card-header"><div class="level-icon">' + level.icon + '</div><div>' +
                '<h3>Level ' + level.id + ': ' + level.title + '</h3>' +
                '<div class="level-desc">' + level.description + ' (' + levelMods.length + '\u30E2\u30B8\u30E5\u30FC\u30EB)</div>' +
                '</div></div><div class="level-progress"><div class="level-progress-bar">' +
                '<div class="level-progress-fill" style="width:' + pct + '%"></div></div>' +
                '<div class="level-progress-text">' + completed + '/' + levelMods.length + ' \u5B8C\u4E86 (' + pct + '%)</div></div></div>';
        });

        html += '</div></div>';
        container.innerHTML = html;
    },

    getEstimatedTime() {
        let totalMinutes = 0;
        this.allModules.forEach(m => {
            if (!this.isModuleCompleted(m.id)) {
                const match = m.duration.match(/(\d+)/);
                if (match) totalMinutes += parseInt(match[1]);
            }
        });
        if (totalMinutes === 0) return '\u5B8C\u4E86\uFF01';
        const hours = Math.floor(totalMinutes / 60);
        const mins = totalMinutes % 60;
        return hours > 0 ? '\u7D04' + hours + '\u6642\u9593' + mins + '\u5206' : '\u7D04' + mins + '\u5206';
    },

    showModule(moduleId) {
        const mod = this.allModules.find(m => m.id === moduleId);
        if (!mod) return;

        this.currentModuleId = moduleId;
        this.showView('moduleView');
        this.buildSidebar();

        document.getElementById('sidebar').classList.remove('open');

        const container = document.getElementById('moduleView');
        const level = this.levels.find(l => l.id === mod.levelId);
        const modIndex = this.allModules.findIndex(m => m.id === moduleId);
        const prevMod = modIndex > 0 ? this.allModules[modIndex - 1] : null;
        const nextMod = modIndex < this.allModules.length - 1 ? this.allModules[modIndex + 1] : null;

        let html = '<div class="fade-in"><div class="module-header">' +
            '<div class="module-breadcrumb"><a onclick="App.showDashboard()">\u30C0\u30C3\u30B7\u30E5\u30DC\u30FC\u30C9</a> &nbsp;/&nbsp; ' +
            '<a onclick="App.showModule(' + level.modules[0].id + ')">Level ' + level.id + ': ' + level.title + '</a> &nbsp;/&nbsp; ' +
            mod.title + '</div>' +
            '<h1 class="module-title">' + mod.title + '</h1>' +
            '<div class="module-meta"><span>\u23F1 ' + mod.duration + '</span>' +
            '<span>' + (this.isModuleCompleted(moduleId) ? '\u2705 \u5B8C\u4E86\u6E08\u307F' : '\uD83D\uDCD6 \u672A\u5B8C\u4E86') + '</span></div></div>' +
            '<div class="module-body">' + mod.content + '</div>' +
            '<div class="module-nav"><div>' +
            (prevMod ? '<button class="btn btn-outline" onclick="App.showModule(' + prevMod.id + ')">\u2190 ' + prevMod.title + '</button>' : '') +
            '</div><div style="display:flex;gap:12px;">' +
            (mod.quiz && mod.quiz.length > 0 ?
                '<button class="btn btn-primary btn-lg" onclick="App.startQuiz(' + moduleId + ')">\u7406\u89E3\u5EA6\u30C1\u30A7\u30C3\u30AF (' + mod.quiz.length + '\u554F)</button>' :
                '<button class="btn btn-success btn-lg" onclick="App.completeModule(' + moduleId + '); App.goToNextModule(' + moduleId + ');">\u5B8C\u4E86\u3057\u3066\u6B21\u3078</button>') +
            '</div><div>' +
            (nextMod ? '<button class="btn btn-outline" onclick="App.showModule(' + nextMod.id + ')">' + nextMod.title + ' \u2192</button>' : '') +
            '</div></div></div>';

        container.innerHTML = html;
        document.querySelector('.content').scrollTop = 0;
    },

    startQuiz(moduleId) {
        const mod = this.allModules.find(m => m.id === moduleId);
        if (!mod || !mod.quiz) return;

        this.showView('quizView');
        Quiz.start(moduleId, mod.quiz);
    },

    goToNextModule(currentModuleId) {
        const idx = this.allModules.findIndex(m => m.id === currentModuleId);
        if (idx < this.allModules.length - 1) {
            this.showModule(this.allModules[idx + 1].id);
        } else {
            this.showDashboard();
            this.showCompletionMessage();
        }
    },

    showCompletionMessage() {
        const modal = document.getElementById('modalContent');
        const overlay = document.getElementById('modalOverlay');
        modal.innerHTML = '<h2>\uD83C\uDF93 \u304A\u3081\u3067\u3068\u3046\u3054\u3056\u3044\u307E\u3059\uFF01</h2>' +
            '<div class="score-circle pass" style="font-size:2.5rem;">\uD83C\uDFC6</div>' +
            '<p>\u5168\u30E2\u30B8\u30E5\u30FC\u30EB\u3092\u5B8C\u4E86\u3057\u307E\u3057\u305F\uFF01</p>' +
            '<div class="modal-actions"><button class="btn btn-primary" onclick="App.closeModal()">\u30C0\u30C3\u30B7\u30E5\u30DC\u30FC\u30C9\u3078</button></div>';
        overlay.style.display = 'flex';
    },

    closeModal() {
        document.getElementById('modalOverlay').style.display = 'none';
    },

    showView(viewId) {
        ['dashboardView', 'moduleView', 'quizView', 'referenceView'].forEach(id => {
            document.getElementById(id).style.display = id === viewId ? 'block' : 'none';
        });
    },

    toggleDarkMode() {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        if (isDark) {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('retention-darkmode', 'false');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('retention-darkmode', 'true');
        }
    },

    resetProgress() {
        if (confirm('\u5168\u3066\u306E\u5B66\u7FD2\u9032\u6357\u3092\u30EA\u30BB\u30C3\u30C8\u3057\u307E\u3059\u304B\uFF1F\u3053\u306E\u64CD\u4F5C\u306F\u5143\u306B\u623B\u305B\u307E\u305B\u3093\u3002')) {
            this.progress = {};
            this.quizResults = {};
            localStorage.removeItem('retention-progress');
            localStorage.removeItem('retention-quiz-results');
            this.buildSidebar();
            this.updateGlobalProgress();
            this.showDashboard();
        }
    },

    showReference() {
        // No reference for this academy
    }
};

document.addEventListener('DOMContentLoaded', () => {
    App.init();
});
