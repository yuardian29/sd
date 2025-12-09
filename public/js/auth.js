// ===================================
// AUTHENTICATION SYSTEM
// ===================================

// Using Database from database.js
// Make sure database.js is loaded before this file

// Session Management
const sessionManager = {
    setSession(role, userData) {
        sessionStorage.setItem('user_role', role);
        sessionStorage.setItem('user_data', JSON.stringify(userData));
        localStorage.setItem('last_login', new Date().toISOString());
    },

    getSession() {
        const role = sessionStorage.getItem('user_role');
        const userData = sessionStorage.getItem('user_data');
        
        if (role && userData) {
            return {
                role: role,
                data: JSON.parse(userData)
            };
        }
        return null;
    },

    clearSession() {
        sessionStorage.removeItem('user_role');
        sessionStorage.removeItem('user_data');
    },

    isAuthenticated() {
        return this.getSession() !== null;
    }
};

// Validation Functions
function validateNISN(nisn) {
    return /^[0-9]{10}$/.test(nisn);
}

function validatePassword(password) {
    return password.length >= 6;
}

// Tab Switching
function switchTab(tab) {
    // Hide all tabs
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(t => t.classList.remove('active'));

    // Remove active class from buttons
    const buttons = document.querySelectorAll('.tab-btn');
    buttons.forEach(b => b.classList.remove('active'));

    // Show selected tab
    document.getElementById(tab + '-tab').classList.add('active');
    event.target.closest('.tab-btn').classList.add('active');
}

// Toggle Password Visibility
function togglePassword(fieldId) {
    const field = document.getElementById(fieldId);
    const button = event.target.closest('.toggle-password');
    const icon = button.querySelector('i');

    if (field.type === 'password') {
        field.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        field.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}

// Show Alert
function showAlert(message, type = 'info') {
    const alertEl = document.getElementById('alertMessage');
    alertEl.className = `alert ${type}`;
    alertEl.textContent = message;
    alertEl.style.display = 'block';

    // Auto hide after 5 seconds
    setTimeout(() => {
        alertEl.style.display = 'none';
    }, 5000);
}

// ===================================
// LOGIN FUNCTIONS
// ===================================

function loginStudent(event) {
    event.preventDefault();

    const nisn = document.getElementById('student-nisn').value.trim();
    const password = document.getElementById('student-password').value;

    // Validation
    if (!validateNISN(nisn)) {
        showAlert('❌ NISN tidak valid. Harus 10 digit angka.', 'error');
        return;
    }

    if (!validatePassword(password)) {
        showAlert('❌ Password minimal 6 karakter.', 'error');
        return;
    }

    // Check credentials from database
    const students = Database.getStudents();
    const student = students.find(
        s => s.nisn === nisn && s.password === password
    );

    if (student) {
        // Add role if not present
        student.role = 'student';
        sessionManager.setSession('student', student);
        
        // Log activity
        Database.addLog({
            action: 'Login',
            role: 'student',
            userId: student.id,
            userName: student.name,
            status: 'Sukses'
        });
        
        showAlert('✓ Login berhasil! Mengarahkan...', 'success');
        
        setTimeout(() => {
            window.location.href = 'pages/student-dashboard.html';
        }, 1500);
    } else {
        showAlert('❌ NISN atau password salah.', 'error');
        document.getElementById('student-password').value = '';
    }
}

function loginTeacher(event) {
    event.preventDefault();

    const nip = document.getElementById('teacher-nip').value.trim();
    const password = document.getElementById('teacher-password').value;

    // Validation
    if (!nip || nip.length < 6) {
        showAlert('❌ NIP/NUPTK tidak valid.', 'error');
        return;
    }

    if (!validatePassword(password)) {
        showAlert('❌ Password minimal 6 karakter.', 'error');
        return;
    }

    // Check credentials from database
    const teachers = Database.getTeachers();
    const teacher = teachers.find(
        t => t.nip === nip && t.password === password
    );

    if (teacher) {
        teacher.role = 'teacher';
        sessionManager.setSession('teacher', teacher);
        
        // Log activity
        Database.addLog({
            action: 'Login',
            role: 'teacher',
            userId: teacher.id,
            userName: teacher.name,
            status: 'Sukses'
        });
        
        showAlert('✓ Login berhasil! Mengarahkan...', 'success');
        
        setTimeout(() => {
            window.location.href = 'pages/teacher-dashboard.html';
        }, 1500);
    } else {
        showAlert('❌ NIP/NUPTK atau password salah.', 'error');
        document.getElementById('teacher-password').value = '';
    }
}

function loginAdmin(event) {
    event.preventDefault();

    const username = document.getElementById('admin-username').value.trim();
    const password = document.getElementById('admin-password').value;

    // Validation
    if (!username || username.length < 4) {
        showAlert('❌ Username tidak valid.', 'error');
        return;
    }

    if (!validatePassword(password)) {
        showAlert('❌ Password minimal 6 karakter.', 'error');
        return;
    }

    // Check credentials from database
    const admins = Database.getAdmins ? 
        Database.getAdmins() : 
        JSON.parse(localStorage.getItem('admins') || '[]');
    
    const admin = admins.find(
        a => a.username === username && a.password === password
    );

    if (admin) {
        admin.role = 'admin';
        sessionManager.setSession('admin', admin);
        
        // Log activity
        Database.addLog({
            action: 'Login',
            role: 'admin',
            userId: admin.id,
            userName: admin.name,
            status: 'Sukses'
        });
        
        showAlert('✓ Login berhasil! Mengarahkan...', 'success');
        
        setTimeout(() => {
            window.location.href = 'pages/admin-dashboard.html';
        }, 1500);
    } else {
        showAlert('❌ Username atau password salah.', 'error');
        document.getElementById('admin-password').value = '';
    }
}

// Check if already logged in on page load
document.addEventListener('DOMContentLoaded', function() {
    if (sessionManager.isAuthenticated()) {
        const session = sessionManager.getSession();
        
        let redirectUrl = '';
        switch(session.role) {
            case 'student':
                redirectUrl = 'pages/student-dashboard.html';
                break;
            case 'teacher':
                redirectUrl = 'pages/teacher-dashboard.html';
                break;
            case 'admin':
                redirectUrl = 'pages/admin-dashboard.html';
                break;
        }
        
        if (redirectUrl) {
            window.location.href = redirectUrl;
        }
    }
});
