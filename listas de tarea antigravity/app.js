// ==========================================
// APLICACIÓN DE LISTA DE TAREAS (TODO APP)
// ==========================================

// 1. Elementos del DOM (las partes de la página con las que interactuamos)
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const emptyState = document.getElementById('empty-state');
const filterBtns = document.querySelectorAll('.filter-btn');
const currentDateEl = document.getElementById('current-date');
const statsBadge = document.getElementById('stats-badge');
const taskCounter = document.getElementById('task-counter');
const clearCompletedBtn = document.getElementById('clear-completed-btn');

// 2. Estado de la aplicación: cargamos tareas guardadas en localStorage o empezamos vacíos
let todos = JSON.parse(localStorage.getItem('my_todos')) || [
  { id: 1, text: '¡Bienvenido a tu nueva aplicación!', completed: false },
  { id: 2, text: 'Toca el círculo para marcar como completada', completed: false },
  { id: 3, text: 'Prueba a agregar tus propias tareas arriba', completed: false }
];

let currentFilter = 'all'; // 'all' | 'pending' | 'completed'

// 3. Mostrar la fecha actual en español
function updateDate() {
  const options = { weekday: 'long', day: 'numeric', month: 'long' };
  const today = new Date();
  currentDateEl.textContent = today.toLocaleDateString('es-ES', options);
}

// 4. Guardar tareas en el almacenamiento local del navegador
function saveToLocalStorage() {
  localStorage.setItem('my_todos', JSON.stringify(todos));
}

// 5. Renderizar (dibujar) las tareas en la pantalla
function renderTodos() {
  // Filtrar según la pestaña activa
  let filtered = todos;
  if (currentFilter === 'pending') {
    filtered = todos.filter(t => !t.completed);
  } else if (currentFilter === 'completed') {
    filtered = todos.filter(t => t.completed);
  }

  // Limpiar lista actual
  todoList.innerHTML = '';

  // Mostrar u ocultar el estado vacío
  if (filtered.length === 0) {
    emptyState.style.display = 'block';
  } else {
    emptyState.style.display = 'none';
  }

  // Crear elementos para cada tarea
  filtered.forEach(todo => {
    const li = document.createElement('li');
    li.className = `todo-item ${todo.completed ? 'completed' : ''}`;

    li.innerHTML = `
      <div class="todo-content" onclick="toggleTodo(${todo.id})">
        <div class="custom-checkbox">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
        <span class="todo-text">${escapeHtml(todo.text)}</span>
      </div>
      <button class="delete-btn" onclick="deleteTodo(${todo.id})" title="Eliminar tarea">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="3 6 5 6 21 6"></polyline>
          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
        </svg>
      </button>
    `;

    todoList.appendChild(li);
  });

  // Actualizar contadores
  updateCounters();
}

// 6. Actualizar contadores de estadísticas
function updateCounters() {
  const pendingCount = todos.filter(t => !t.completed).length;
  statsBadge.textContent = `${pendingCount} pendiente${pendingCount === 1 ? '' : 's'}`;
  taskCounter.textContent = `${todos.length} tarea${todos.length === 1 ? '' : 's'} en total`;
}

// 7. Agregar una nueva tarea
todoForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = todoInput.value.trim();
  if (!text) return;

  const newTodo = {
    id: Date.now(),
    text: text,
    completed: false
  };

  todos.unshift(newTodo); // Añadir al principio
  saveToLocalStorage();
  renderTodos();

  todoInput.value = '';
  todoInput.focus();
});

// 8. Marcar como completada o pendiente
window.toggleTodo = function (id) {
  let justCompleted = false;

  todos = todos.map(todo => {
    if (todo.id === id) {
      const nextState = !todo.completed;
      if (nextState) justCompleted = true; // Detectamos si pasó a completada
      return { ...todo, completed: nextState };
    }
    return todo;
  });

  // 🎉 Si acabas de completar la tarea, ¡disparamos confeti!
  if (justCompleted && typeof confetti === 'function') {
    confetti({
      particleCount: 90,
      spread: 70,
      origin: { y: 0.65 },
      colors: ['#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ec4899']
    });
  }

  saveToLocalStorage();
  renderTodos();
};

// 9. Eliminar una tarea
window.deleteTodo = function (id) {
  todos = todos.filter(todo => todo.id !== id);
  saveToLocalStorage();
  renderTodos();
};

// 10. Cambiar filtros (Todas / Pendientes / Completadas)
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentFilter = btn.dataset.filter;
    renderTodos();
  });
});

// 11. Limpiar completadas
clearCompletedBtn.addEventListener('click', () => {
  todos = todos.filter(t => !t.completed);
  saveToLocalStorage();
  renderTodos();
});

// 12. Función de seguridad para evitar inyección de HTML
function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// Inicialización
updateDate();
renderTodos();
