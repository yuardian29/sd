// ===================================
// ADMIN DASHBOARD FUNCTIONALITY
// ===================================

let currentPage = 'dashboard';

// Check authentication on page load
document.addEventListener('DOMContentLoaded', function() {
    const session = sessionManager.getSession();

    if (!session || session.role !== 'admin') {
        window.location.href = '../index.html';
        return;
    }

    // Initialize dashboard
    initDashboard(session.data);
    loadPage('dashboard');
});

function initDashboard(adminData) {
    // Update sidebar with admin info
    document.getElementById('adminName').textContent = adminData.name;
    document.getElementById('adminPosition').textContent = adminData.position;
    document.getElementById('topbarName').textContent = adminData.name;

    // Update document title
    document.title = `${adminData.name} - Dashboard Admin TU`;
}

// Toggle Sidebar Mobile
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('active');
}

// Load Page Function
function loadPage(page) {
    currentPage = page;
    const mainContent = document.getElementById('mainContent');
    const pageTitle = document.getElementById('pageTitle');

    // Close sidebar on mobile
    document.getElementById('sidebar').classList.remove('active');

    // Update active menu item
    document.querySelectorAll('.menu-item').forEach(item => {
        item.classList.remove('active');
    });
    event.target.closest('.menu-item').classList.add('active');

    // Load page content based on selection
    switch(page) {
        case 'dashboard':
            pageTitle.textContent = 'Dashboard';
            loadDashboard(mainContent);
            break;
        case 'profile':
            pageTitle.textContent = 'Profil Saya';
            loadProfile(mainContent);
            break;
        case 'students':
            pageTitle.textContent = 'Kelola Siswa';
            loadStudents(mainContent);
            break;
        case 'teachers':
            pageTitle.textContent = 'Kelola Guru';
            loadTeachers(mainContent);
            break;
        case 'classes':
            pageTitle.textContent = 'Kelola Kelas';
            loadClasses(mainContent);
            break;
        case 'subjects':
            pageTitle.textContent = 'Kelola Mata Pelajaran';
            loadSubjects(mainContent);
            break;
        case 'schedule':
            pageTitle.textContent = 'Jadwal Pelajaran';
            loadSchedule(mainContent);
            break;
        case 'attendance':
            pageTitle.textContent = 'Laporan Kehadiran';
            loadAttendanceReport(mainContent);
            break;
        case 'grades':
            pageTitle.textContent = 'Laporan Nilai';
            loadGradesReport(mainContent);
            break;
        case 'users':
            pageTitle.textContent = 'Kelola User';
            loadUsers(mainContent);
            break;
        case 'settings':
            pageTitle.textContent = 'Pengaturan Sistem';
            loadSettings(mainContent);
            break;
        case 'logs':
            pageTitle.textContent = 'Log Aktivitas';
            loadLogs(mainContent);
            break;
        default:
            pageTitle.textContent = 'Dashboard';
            loadDashboard(mainContent);
    }
}

// Load Dashboard
function loadDashboard(container) {
    const template = document.querySelector('#dashboard-template');
    container.innerHTML = template.innerHTML;
}

// Load Profile
function loadProfile(container) {
    const session = sessionManager.getSession();
    const admin = session.data;

    container.innerHTML = `
        <div class="grid grid-2">
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">Informasi Admin</h3>
                </div>
                <div class="card-body">
                    <div class="profile-item">
                        <label>Nama Lengkap</label>
                        <p>${admin.name}</p>
                    </div>
                    <div class="profile-item">
                        <label>Posisi</label>
                        <p>${admin.position}</p>
                    </div>
                    <div class="profile-item">
                        <label>Username</label>
                        <p>${admin.username}</p>
                    </div>
                    <div class="profile-item">
                        <label>Email</label>
                        <p>${admin.email}</p>
                    </div>
                    <div class="profile-item">
                        <label>Telepon</label>
                        <p>${admin.phone}</p>
                    </div>
                </div>
            </div>

            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">Statistik Akses</h3>
                </div>
                <div class="card-body">
                    <div class="profile-item">
                        <label>Login Terakhir</label>
                        <p>Hari ini, 08:30</p>
                    </div>
                    <div class="profile-item">
                        <label>Total Login</label>
                        <p>1,245 kali</p>
                    </div>
                    <div class="profile-item">
                        <label>Aktivitas Bulan Ini</label>
                        <p>342 aktivitas</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="card">
            <div class="card-header">
                <h3 class="card-title">Ubah Password</h3>
            </div>
            <div class="card-body">
                <form onsubmit="changePassword(event)" class="form-group" style="max-width: 400px;">
                    <div class="form-group">
                        <label>Password Lama</label>
                        <input type="password" required placeholder="Masukkan password lama">
                    </div>
                    <div class="form-group">
                        <label>Password Baru</label>
                        <input type="password" required placeholder="Masukkan password baru">
                    </div>
                    <div class="form-group">
                        <label>Konfirmasi Password</label>
                        <input type="password" required placeholder="Konfirmasi password baru">
                    </div>
                    <button type="submit" class="btn btn-danger" style="width: auto;">
                        <i class="fas fa-save"></i> Simpan Perubahan
                    </button>
                </form>
            </div>
        </div>
    `;
}

// Load Students Management
function loadStudents(container) {
    const students = Database.getStudents();
    
    let studentRows = students.map((student, index) => `
        <tr>
            <td>${index + 1}</td>
            <td>${student.nisn}</td>
            <td>${student.name}</td>
            <td>${student.class}</td>
            <td>${student.email}</td>
            <td>${student.phone}</td>
            <td><span class="badge badge-${student.status === 'Aktif' ? 'success' : 'danger'}">${student.status}</span></td>
            <td>
                <button class="btn-action" onclick="editStudent('${student.id}')">Edit</button>
                <button class="btn-action btn-danger-action" onclick="deleteStudent('${student.id}')">Hapus</button>
            </td>
        </tr>
    `).join('');

    container.innerHTML = `
        <div class="card">
            <div class="card-header">
                <h3 class="card-title">Kelola Data Siswa (${students.length})</h3>
                <div>
                    <button class="btn btn-primary" style="width: auto; padding: 8px 16px;" onclick="showAddStudentModal()">
                        <i class="fas fa-plus"></i> Tambah Siswa
                    </button>
                    <button class="btn btn-primary" style="width: auto; padding: 8px 16px; margin-left: 10px;" onclick="DataExport.exportStudents()">
                        <i class="fas fa-download"></i> Export CSV
                    </button>
                </div>
            </div>
            <div class="card-body">
                <div class="search-bar" style="margin-bottom: 15px;">
                    <input type="text" id="studentSearch" placeholder="Cari siswa..." 
                           style="width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 5px;"
                           onkeyup="filterStudentTable()">
                </div>
                <div class="table-responsive">
                    <table id="studentTable">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>NISN</th>
                                <th>Nama Siswa</th>
                                <th>Kelas</th>
                                <th>Email</th>
                                <th>Telepon</th>
                                <th>Status</th>
                                <th>Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${studentRows || '<tr><td colspan="8" style="text-align: center;">Tidak ada data siswa</td></tr>'}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <!-- Add/Edit Student Modal -->
        <div id="studentModal" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); z-index: 1000; align-items: center; justify-content: center;">
            <div style="background: white; padding: 30px; border-radius: 10px; width: 90%; max-width: 500px; max-height: 90vh; overflow-y: auto;">
                <h2 id="modalTitle">Tambah Siswa Baru</h2>
                <form onsubmit="submitStudentForm(event)">
                    <div class="form-group">
                        <label>Nama Lengkap</label>
                        <input type="text" id="studentName" required placeholder="Masukkan nama siswa">
                    </div>
                    <div class="form-group">
                        <label>NISN</label>
                        <input type="text" id="studentNISN" required placeholder="Masukkan NISN (10 digit)" maxlength="10">
                    </div>
                    <div class="form-group">
                        <label>Kelas</label>
                        <select id="studentClass" required>
                            <option value="">Pilih Kelas</option>
                            ${Database.getClasses().map(c => `<option value="${c.name}">${c.name}</option>`).join('')}
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Email</label>
                        <input type="email" id="studentEmail" required placeholder="Masukkan email">
                    </div>
                    <div class="form-group">
                        <label>Telepon</label>
                        <input type="tel" id="studentPhone" required placeholder="Masukkan nomor telepon">
                    </div>
                    <div class="form-group">
                        <label>Status</label>
                        <select id="studentStatus" required>
                            <option value="Aktif">Aktif</option>
                            <option value="Tidak Aktif">Tidak Aktif</option>
                            <option value="Lulus">Lulus</option>
                        </select>
                    </div>
                    <div style="display: flex; gap: 10px; justify-content: flex-end; margin-top: 20px;">
                        <button type="button" class="btn btn-secondary" style="width: auto;" onclick="closeStudentModal()">Batal</button>
                        <button type="submit" class="btn btn-primary" style="width: auto;">Simpan</button>
                    </div>
                </form>
            </div>
        </div>
    `;

    addButtonStyles();
}

// Load Teachers Management
function loadTeachers(container) {
    const teachers = Database.getTeachers();
    
    let teacherRows = teachers.map((teacher, index) => `
        <tr>
            <td>${index + 1}</td>
            <td>${teacher.nip}</td>
            <td>${teacher.name}</td>
            <td>${teacher.subject}</td>
            <td>${teacher.email}</td>
            <td><span class="badge badge-${teacher.status === 'Aktif' ? 'success' : 'danger'}">${teacher.status}</span></td>
            <td>
                <button class="btn-action" onclick="editTeacher('${teacher.id}')">Edit</button>
                <button class="btn-action btn-danger-action" onclick="deleteTeacher('${teacher.id}')">Hapus</button>
            </td>
        </tr>
    `).join('');

    container.innerHTML = `
        <div class="card">
            <div class="card-header">
                <h3 class="card-title">Kelola Data Guru (${teachers.length})</h3>
                <button class="btn btn-primary" style="width: auto; padding: 8px 16px;" onclick="showAddTeacherModal()">
                    <i class="fas fa-plus"></i> Tambah Guru
                </button>
            </div>
            <div class="card-body">
                <div class="table-responsive">
                    <table id="teacherTable">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>NIP</th>
                                <th>Nama Guru</th>
                                <th>Mata Pelajaran</th>
                                <th>Email</th>
                                <th>Status</th>
                                <th>Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${teacherRows || '<tr><td colspan="7" style="text-align: center;">Tidak ada data guru</td></tr>'}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <!-- Add/Edit Teacher Modal -->
        <div id="teacherModal" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); z-index: 1000; align-items: center; justify-content: center;">
            <div style="background: white; padding: 30px; border-radius: 10px; width: 90%; max-width: 500px; max-height: 90vh; overflow-y: auto;">
                <h2 id="teacherModalTitle">Tambah Guru Baru</h2>
                <form onsubmit="submitTeacherForm(event)">
                    <div class="form-group">
                        <label>Nama Lengkap</label>
                        <input type="text" id="teacherName" required placeholder="Masukkan nama guru">
                    </div>
                    <div class="form-group">
                        <label>NIP</label>
                        <input type="text" id="teacherNIP" required placeholder="Masukkan NIP" maxlength="9">
                    </div>
                    <div class="form-group">
                        <label>Mata Pelajaran</label>
                        <select id="teacherSubject" required>
                            <option value="">Pilih Mata Pelajaran</option>
                            ${Database.getSubjects().map(s => `<option value="${s.name}">${s.name}</option>`).join('')}
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Email</label>
                        <input type="email" id="teacherEmail" required placeholder="Masukkan email">
                    </div>
                    <div class="form-group">
                        <label>Telepon</label>
                        <input type="tel" id="teacherPhone" required placeholder="Masukkan nomor telepon">
                    </div>
                    <div class="form-group">
                        <label>Status</label>
                        <select id="teacherStatus" required>
                            <option value="Aktif">Aktif</option>
                            <option value="Tidak Aktif">Tidak Aktif</option>
                            <option value="Cuti">Cuti</option>
                        </select>
                    </div>
                    <div style="display: flex; gap: 10px; justify-content: flex-end; margin-top: 20px;">
                        <button type="button" class="btn btn-secondary" style="width: auto;" onclick="closeTeacherModal()">Batal</button>
                        <button type="submit" class="btn btn-primary" style="width: auto;">Simpan</button>
                    </div>
                </form>
            </div>
        </div>
    `;

    addButtonStyles();
}

// Load Classes Management
function loadClasses(container) {
    container.innerHTML = `
        <div class="card">
            <div class="card-header">
                <h3 class="card-title">Kelola Kelas</h3>
                <button class="btn btn-primary" style="width: auto; padding: 8px 16px;" onclick="addClass()">
                    <i class="fas fa-plus"></i> Tambah Kelas
                </button>
            </div>
            <div class="card-body">
                <div class="table-responsive">
                    <table>
                        <thead>
                            <tr>
                                <th>Kelas</th>
                                <th>Siswa</th>
                                <th>Guru Wali</th>
                                <th>Ruang</th>
                                <th>Status</th>
                                <th>Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>XII IPA 1</td>
                                <td>35</td>
                                <td>Drs. Budi Santoso</td>
                                <td>12 IPA 1</td>
                                <td><span class="badge badge-success">Aktif</span></td>
                                <td>
                                    <button class="btn-action" onclick="editClass()">Edit</button>
                                </td>
                            </tr>
                            <tr>
                                <td>XII IPA 2</td>
                                <td>36</td>
                                <td>Ibu Sri Rahayu</td>
                                <td>12 IPA 2</td>
                                <td><span class="badge badge-success">Aktif</span></td>
                                <td>
                                    <button class="btn-action" onclick="editClass()">Edit</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;

    addButtonStyles();
}

// Load Subjects Management
function loadSubjects(container) {
    container.innerHTML = `
        <div class="card">
            <div class="card-header">
                <h3 class="card-title">Kelola Mata Pelajaran</h3>
                <button class="btn btn-primary" style="width: auto; padding: 8px 16px;" onclick="addSubject()">
                    <i class="fas fa-plus"></i> Tambah Mata Pelajaran
                </button>
            </div>
            <div class="card-body">
                <div class="table-responsive">
                    <table>
                        <thead>
                            <tr>
                                <th>Kode</th>
                                <th>Nama Mata Pelajaran</th>
                                <th>Guru Pengampu</th>
                                <th>SKS</th>
                                <th>Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>MAT</td>
                                <td>Matematika</td>
                                <td>Drs. Ahmad Priyono</td>
                                <td>4</td>
                                <td>
                                    <button class="btn-action" onclick="editSubject()">Edit</button>
                                    <button class="btn-action btn-danger-action" onclick="deleteSubject()">Hapus</button>
                                </td>
                            </tr>
                            <tr>
                                <td>BI</td>
                                <td>Bahasa Indonesia</td>
                                <td>Ibu Srika Dewi, S.Pd</td>
                                <td>3</td>
                                <td>
                                    <button class="btn-action" onclick="editSubject()">Edit</button>
                                    <button class="btn-action btn-danger-action" onclick="deleteSubject()">Hapus</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;

    addButtonStyles();
}

// Load Schedule
function loadSchedule(container) {
    container.innerHTML = `
        <div class="card">
            <div class="card-header">
                <h3 class="card-title">Jadwal Pelajaran</h3>
                <button class="btn btn-primary" style="width: auto; padding: 8px 16px;" onclick="editSchedule()">
                    <i class="fas fa-edit"></i> Ubah Jadwal
                </button>
            </div>
            <div class="card-body">
                <div class="table-responsive">
                    <table>
                        <thead>
                            <tr>
                                <th>Hari</th>
                                <th>Waktu</th>
                                <th>Kelas</th>
                                <th>Mata Pelajaran</th>
                                <th>Guru</th>
                                <th>Ruang</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Senin</td>
                                <td>08:00 - 09:00</td>
                                <td>XII IPA 1</td>
                                <td>Matematika</td>
                                <td>Drs. Ahmad Priyono</td>
                                <td>12 IPA 1</td>
                            </tr>
                            <tr>
                                <td>Senin</td>
                                <td>09:00 - 10:00</td>
                                <td>XII IPA 1</td>
                                <td>Bahasa Indonesia</td>
                                <td>Ibu Srika Dewi</td>
                                <td>12 IPA 1</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;

    addButtonStyles();
}

// Load Attendance Report
function loadAttendanceReport(container) {
    container.innerHTML = `
        <div class="grid grid-3">
            <div class="card stat-card">
                <div class="stat-icon success">
                    <i class="fas fa-check-circle"></i>
                </div>
                <div class="stat-content">
                    <div class="stat-value">420</div>
                    <div class="stat-label">Total Hadir</div>
                </div>
            </div>

            <div class="card stat-card">
                <div class="stat-icon info">
                    <i class="fas fa-exclamation-circle"></i>
                </div>
                <div class="stat-content">
                    <div class="stat-value">15</div>
                    <div class="stat-label">Izin</div>
                </div>
            </div>

            <div class="card stat-card">
                <div class="stat-icon warning">
                    <i class="fas fa-hospital"></i>
                </div>
                <div class="stat-content">
                    <div class="stat-value">10</div>
                    <div class="stat-label">Sakit</div>
                </div>
            </div>
        </div>

        <div class="card">
            <div class="card-header">
                <h3 class="card-title">Detail Laporan Kehadiran</h3>
                <input type="date" style="padding: 8px; border: 1px solid #ccc; border-radius: 5px;">
            </div>
            <div class="card-body">
                <div class="table-responsive">
                    <table>
                        <thead>
                            <tr>
                                <th>Kelas</th>
                                <th>Hadir</th>
                                <th>Izin</th>
                                <th>Sakit</th>
                                <th>Tanpa Keterangan</th>
                                <th>Persentase</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>XII IPA 1</td>
                                <td>33</td>
                                <td>1</td>
                                <td>1</td>
                                <td>0</td>
                                <td>94%</td>
                            </tr>
                            <tr>
                                <td>XII IPA 2</td>
                                <td>34</td>
                                <td>1</td>
                                <td>1</td>
                                <td>0</td>
                                <td>94%</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;

    addCardStyles();
}

// Load Grades Report
function loadGradesReport(container) {
    container.innerHTML = `
        <div class="card">
            <div class="card-header">
                <h3 class="card-title">Laporan Nilai Siswa</h3>
                <div style="display: flex; gap: 10px;">
                    <select style="padding: 8px; border: 1px solid #ccc; border-radius: 5px;">
                        <option>Semua Kelas</option>
                        <option>XII IPA 1</option>
                        <option>XII IPA 2</option>
                    </select>
                    <button class="btn btn-primary" style="width: auto; padding: 8px 16px;" onclick="exportGrades()">
                        <i class="fas fa-download"></i> Export
                    </button>
                </div>
            </div>
            <div class="card-body">
                <div class="table-responsive">
                    <table>
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Nama Siswa</th>
                                <th>Matematika</th>
                                <th>Bahasa Indonesia</th>
                                <th>Bahasa Inggris</th>
                                <th>Rata-rata</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>Budi Santoso</td>
                                <td>87</td>
                                <td>84</td>
                                <td>80</td>
                                <td>83.67</td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>Siti Nurhaliza</td>
                                <td>92</td>
                                <td>90</td>
                                <td>88</td>
                                <td>90.00</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;

    addButtonStyles();
}

// Load Users Management
function loadUsers(container) {
    container.innerHTML = `
        <div class="card">
            <div class="card-header">
                <h3 class="card-title">Kelola User Sistem</h3>
                <button class="btn btn-primary" style="width: auto; padding: 8px 16px;" onclick="addUser()">
                    <i class="fas fa-plus"></i> Tambah User
                </button>
            </div>
            <div class="card-body">
                <div class="table-responsive">
                    <table>
                        <thead>
                            <tr>
                                <th>Username</th>
                                <th>Nama</th>
                                <th>Role</th>
                                <th>Email</th>
                                <th>Status</th>
                                <th>Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>admin</td>
                                <td>Sistem Administrator</td>
                                <td><span class="badge badge-danger">Admin TU</span></td>
                                <td>admin@sch.id</td>
                                <td><span class="badge badge-success">Aktif</span></td>
                                <td>
                                    <button class="btn-action" onclick="editUser()">Edit</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;

    addButtonStyles();
}

// Load Settings
function loadSettings(container) {
    container.innerHTML = `
        <div class="card">
            <div class="card-header">
                <h3 class="card-title">Pengaturan Sistem</h3>
            </div>
            <div class="card-body">
                <form onsubmit="saveSettings(event)" style="max-width: 500px;">
                    <div class="form-group">
                        <label>Nama Sekolah</label>
                        <input type="text" value="SMA Negeri 1 Kota" required style="width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 5px; margin-bottom: 15px;">
                    </div>
                    <div class="form-group">
                        <label>NPSN</label>
                        <input type="text" value="12345678" required style="width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 5px; margin-bottom: 15px;">
                    </div>
                    <div class="form-group">
                        <label>Alamat Sekolah</label>
                        <textarea style="width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 5px; margin-bottom: 15px;" rows="3">Jl. Pendidikan No. 123, Kota</textarea>
                    </div>
                    <div class="form-group">
                        <label>Email Sekolah</label>
                        <input type="email" value="info@sch.id" required style="width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 5px; margin-bottom: 15px;">
                    </div>
                    <div class="form-group">
                        <label>Telepon Sekolah</label>
                        <input type="text" value="0274-123456" required style="width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 5px; margin-bottom: 15px;">
                    </div>
                    <button type="submit" class="btn btn-primary" style="width: auto;">
                        <i class="fas fa-save"></i> Simpan Pengaturan
                    </button>
                </form>
            </div>
        </div>
    `;
}

// Load Activity Logs
function loadLogs(container) {
    container.innerHTML = `
        <div class="card">
            <div class="card-header">
                <h3 class="card-title">Log Aktivitas Sistem</h3>
                <div>
                    <input type="date" style="padding: 8px; border: 1px solid #ccc; border-radius: 5px;">
                    <input type="date" style="padding: 8px; border: 1px solid #ccc; border-radius: 5px; margin-left: 10px;">
                </div>
            </div>
            <div class="card-body">
                <div class="table-responsive">
                    <table>
                        <thead>
                            <tr>
                                <th>Waktu</th>
                                <th>User</th>
                                <th>Aktivitas</th>
                                <th>Keterangan</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>10 Des 2024 08:30</td>
                                <td>admin</td>
                                <td>Login</td>
                                <td>User login ke sistem</td>
                                <td><span class="badge badge-success">Sukses</span></td>
                            </tr>
                            <tr>
                                <td>10 Des 2024 08:45</td>
                                <td>admin</td>
                                <td>Input Nilai</td>
                                <td>Input nilai untuk kelas XII IPA 1</td>
                                <td><span class="badge badge-success">Sukses</span></td>
                            </tr>
                            <tr>
                                <td>10 Des 2024 09:15</td>
                                <td>admin</td>
                                <td>Edit Siswa</td>
                                <td>Mengubah data siswa Budi Santoso</td>
                                <td><span class="badge badge-success">Sukses</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
}

// Helper Styles
function addButtonStyles() {
    if (!document.querySelector('style[data-admin-buttons]')) {
        const style = document.createElement('style');
        style.setAttribute('data-admin-buttons', 'true');
        style.textContent = `
            .btn-action {
                padding: 6px 12px;
                background: #4a90e2;
                color: white;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                font-size: 12px;
                transition: all 0.3s ease;
                margin-right: 5px;
            }
            .btn-action:hover {
                background: #2c5aa0;
            }
            .btn-danger-action {
                background: #e74c3c;
            }
            .btn-danger-action:hover {
                background: #c0392b;
            }
        `;
        document.head.appendChild(style);
    }
}

function addCardStyles() {
    if (!document.querySelector('style[data-admin-cards]')) {
        const style = document.createElement('style');
        style.setAttribute('data-admin-cards', 'true');
        style.textContent = `
            .stat-card {
                display: flex;
                align-items: center;
                gap: 16px;
                padding: 20px;
            }
            .stat-icon {
                width: 60px;
                height: 60px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 28px;
                color: white;
            }
            .stat-icon.success {
                background: linear-gradient(135deg, #51cf66, #40c057);
            }
            .stat-icon.warning {
                background: linear-gradient(135deg, #ffd43b, #f39c12);
            }
            .stat-icon.danger {
                background: linear-gradient(135deg, #ff6b9d, #e74c3c);
            }
            .stat-icon.info {
                background: linear-gradient(135deg, #74c0fc, #3498db);
            }
            .stat-content {
                flex: 1;
            }
            .stat-value {
                font-size: 28px;
                font-weight: 700;
                color: #2c3e50;
            }
            .stat-label {
                font-size: 13px;
                color: #7f8c8d;
                margin-top: 4px;
            }
            .activity-item {
                padding: 12px 0;
                border-bottom: 1px solid #ecf0f1;
            }
            .activity-time {
                font-size: 12px;
                color: #7f8c8d;
                margin-bottom: 4px;
            }
            .activity-text {
                font-size: 14px;
                color: #2c3e50;
            }
        `;
        document.head.appendChild(style);
    }
}

// ===================================
// STUDENT MANAGEMENT FUNCTIONS
// ===================================

function showAddStudentModal() {
    document.getElementById('studentModal').style.display = 'flex';
    document.getElementById('modalTitle').textContent = 'Tambah Siswa Baru';
    document.getElementById('studentName').value = '';
    document.getElementById('studentNISN').value = '';
    document.getElementById('studentClass').value = '';
    document.getElementById('studentEmail').value = '';
    document.getElementById('studentPhone').value = '';
    document.getElementById('studentStatus').value = 'Aktif';
    document.getElementById('studentModal').dataset.mode = 'add';
    document.getElementById('studentModal').dataset.studentId = '';
}

function editStudent(studentId) {
    const student = Database.getStudentById(studentId);
    if (!student) return alert('Siswa tidak ditemukan');
    
    document.getElementById('studentModal').style.display = 'flex';
    document.getElementById('modalTitle').textContent = 'Edit Data Siswa';
    document.getElementById('studentName').value = student.name;
    document.getElementById('studentNISN').value = student.nisn;
    document.getElementById('studentClass').value = student.class;
    document.getElementById('studentEmail').value = student.email;
    document.getElementById('studentPhone').value = student.phone;
    document.getElementById('studentStatus').value = student.status;
    document.getElementById('studentModal').dataset.mode = 'edit';
    document.getElementById('studentModal').dataset.studentId = studentId;
}

function deleteStudent(studentId) {
    if (!confirm('Apakah Anda yakin ingin menghapus siswa ini?')) return;
    
    if (Database.deleteStudent(studentId)) {
        Database.addLog({
            action: 'Delete',
            role: 'admin',
            userId: sessionManager.getSession().data.id,
            userName: sessionManager.getSession().data.name,
            description: 'Menghapus data siswa',
            status: 'Sukses'
        });
        alert('Siswa berhasil dihapus');
        loadPage('students');
    } else {
        alert('Gagal menghapus siswa');
    }
}

function closeStudentModal() {
    document.getElementById('studentModal').style.display = 'none';
}

async function submitStudentForm(event) {
    event.preventDefault();
    
    const data = {
        nisn: document.getElementById('studentNISN').value,
        name: document.getElementById('studentName').value,
        class: document.getElementById('studentClass').value,
        email: document.getElementById('studentEmail').value,
        phone: document.getElementById('studentPhone').value,
        status: document.getElementById('studentStatus').value,
    };
    
    const modal = document.getElementById('studentModal');
    const mode = modal.dataset.mode;
    const studentId = modal.dataset.studentId;
    
    try {
        if (mode === 'add') {
            // Check if NISN already exists
            const existingStudent = Database.getStudentByNISN(data.nisn);
            if (existingStudent) {
                return alert('NISN sudah terdaftar');
            }
            
            const newStudent = {
                ...data,
                id: 'STU_' + Date.now(),
                password: 'password123',
                createdAt: new Date().toISOString()
            };
            
            Database.addStudent(newStudent);
            Database.addLog({
                action: 'Create',
                role: 'admin',
                userId: sessionManager.getSession().data.id,
                userName: sessionManager.getSession().data.name,
                description: 'Menambah data siswa: ' + newStudent.name,
                status: 'Sukses'
            });
            alert('Siswa berhasil ditambahkan');
        } else if (mode === 'edit') {
            Database.updateStudent(studentId, {
                ...data,
                updatedAt: new Date().toISOString()
            });
            Database.addLog({
                action: 'Update',
                role: 'admin',
                userId: sessionManager.getSession().data.id,
                userName: sessionManager.getSession().data.name,
                description: 'Mengubah data siswa: ' + data.name,
                status: 'Sukses'
            });
            alert('Siswa berhasil diperbarui');
        }
        closeStudentModal();
        loadPage('students');
    } catch (error) {
        alert('Gagal menyimpan data siswa: ' + error.message);
    }
}

function filterStudentTable() {
    const searchTerm = document.getElementById('studentSearch').value.toLowerCase();
    const table = document.getElementById('studentTable');
    const rows = table.querySelectorAll('tbody tr');
    
    rows.forEach(row => {
        const text = row.innerText.toLowerCase();
        row.style.display = text.includes(searchTerm) ? '' : 'none';
    });
}

// ===================================
// TEACHER MANAGEMENT FUNCTIONS
// ===================================

function showAddTeacherModal() {
    document.getElementById('teacherModal').style.display = 'flex';
    document.getElementById('teacherModalTitle').textContent = 'Tambah Guru Baru';
    document.getElementById('teacherName').value = '';
    document.getElementById('teacherNIP').value = '';
    document.getElementById('teacherSubject').value = '';
    document.getElementById('teacherEmail').value = '';
    document.getElementById('teacherPhone').value = '';
    document.getElementById('teacherStatus').value = 'Aktif';
    document.getElementById('teacherModal').dataset.mode = 'add';
    document.getElementById('teacherModal').dataset.teacherId = '';
}

function editTeacher(teacherId) {
    const teacher = Database.getTeacherById(teacherId);
    if (!teacher) return alert('Guru tidak ditemukan');
    
    document.getElementById('teacherModal').style.display = 'flex';
    document.getElementById('teacherModalTitle').textContent = 'Edit Data Guru';
    document.getElementById('teacherName').value = teacher.name;
    document.getElementById('teacherNIP').value = teacher.nip;
    document.getElementById('teacherSubject').value = teacher.subject;
    document.getElementById('teacherEmail').value = teacher.email;
    document.getElementById('teacherPhone').value = teacher.phone;
    document.getElementById('teacherStatus').value = teacher.status;
    document.getElementById('teacherModal').dataset.mode = 'edit';
    document.getElementById('teacherModal').dataset.teacherId = teacherId;
}

function deleteTeacher(teacherId) {
    if (!confirm('Apakah Anda yakin ingin menghapus guru ini?')) return;
    
    if (Database.deleteTeacher(teacherId)) {
        Database.addLog({
            action: 'Delete',
            role: 'admin',
            userId: sessionManager.getSession().data.id,
            userName: sessionManager.getSession().data.name,
            description: 'Menghapus data guru',
            status: 'Sukses'
        });
        alert('Guru berhasil dihapus');
        loadPage('teachers');
    } else {
        alert('Gagal menghapus guru');
    }
}

function closeTeacherModal() {
    document.getElementById('teacherModal').style.display = 'none';
}

function submitTeacherForm(event) {
    event.preventDefault();
    
    const name = document.getElementById('teacherName').value.trim();
    const nip = document.getElementById('teacherNIP').value.trim();
    const subject = document.getElementById('teacherSubject').value;
    const email = document.getElementById('teacherEmail').value.trim();
    const phone = document.getElementById('teacherPhone').value.trim();
    const status = document.getElementById('teacherStatus').value;
    
    // Validation
    if (!Validation.validateNIP(nip)) {
        return alert('NIP tidak valid');
    }
    if (!Validation.validateEmail(email)) {
        return alert('Format email tidak valid');
    }
    if (!Validation.validatePhone(phone)) {
        return alert('Format nomor telepon tidak valid');
    }
    
    const modal = document.getElementById('teacherModal');
    const mode = modal.dataset.mode;
    const teacherId = modal.dataset.teacherId;
    
    if (mode === 'add') {
        const newTeacher = {
            id: 'TCH_' + Date.now(),
            nip,
            name,
            subject,
            email,
            phone,
            status,
            password: 'guru123',
            createdAt: new Date().toISOString()
        };
        
        if (Database.addTeacher(newTeacher)) {
            Database.addLog({
                action: 'Create',
                role: 'admin',
                userId: sessionManager.getSession().data.id,
                userName: sessionManager.getSession().data.name,
                description: 'Menambah data guru: ' + name,
                status: 'Sukses'
            });
            alert('Guru berhasil ditambahkan');
            closeTeacherModal();
            loadPage('teachers');
        } else {
            alert('Gagal menambahkan guru');
        }
    } else if (mode === 'edit') {
        if (Database.updateTeacher(teacherId, {
            nip, name, subject, email, phone, status,
            updatedAt: new Date().toISOString()
        })) {
            Database.addLog({
                action: 'Update',
                role: 'admin',
                userId: sessionManager.getSession().data.id,
                userName: sessionManager.getSession().data.name,
                description: 'Mengubah data guru: ' + name,
                status: 'Sukses'
            });
            alert('Guru berhasil diperbarui');
            closeTeacherModal();
            loadPage('teachers');
        } else {
            alert('Gagal memperbarui guru');
        }
    }
}

// ===================================
// ACTION FUNCTIONS
// ===================================

function changePassword(event) {
    event.preventDefault();
    alert('Password berhasil diubah!');
}

function addTeacher() { alert('Form tambah guru akan ditampilkan'); }
function editTeacher() { alert('Form edit guru akan ditampilkan'); }
function deleteTeacher() { if(confirm('Hapus guru?')) alert('Guru berhasil dihapus'); }

function addClass() { alert('Form tambah kelas akan ditampilkan'); }
function editClass() { alert('Form edit kelas akan ditampilkan'); }

function addSubject() { alert('Form tambah mata pelajaran akan ditampilkan'); }
function editSubject() { alert('Form edit mata pelajaran akan ditampilkan'); }
function deleteSubject() { if(confirm('Hapus mata pelajaran?')) alert('Mata pelajaran berhasil dihapus'); }

function editSchedule() { alert('Form edit jadwal akan ditampilkan'); }
function exportGrades() { alert('Data nilai akan diexport'); }

function addUser() { alert('Form tambah user akan ditampilkan'); }
function editUser() { alert('Form edit user akan ditampilkan'); }

function saveSettings(event) {
    event.preventDefault();
    alert('Pengaturan berhasil disimpan!');
}

function toggleNotifications() {
    alert('Notifikasi akan ditampilkan');
}

function toggleUserDropdown() {
    alert('Menu user akan ditampilkan');
}

// Logout Function
function logout() {
    if (confirm('Apakah Anda yakin ingin logout?')) {
        sessionManager.clearSession();
        window.location.href = '../index.html';
    }
}

// Ganti Database.getStudents() dengan:
function loadStudentsFromCloud() {
    try {
        const students = Database.getStudents();
        displayStudentsTable(students);
    } catch (error) {
        console.error('Error:', error);
        alert('Gagal mengambil data');
    }
}
