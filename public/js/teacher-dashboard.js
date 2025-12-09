// ===================================
// TEACHER DASHBOARD FUNCTIONALITY
// ===================================

let currentPage = 'dashboard';

// Check authentication on page load
document.addEventListener('DOMContentLoaded', function() {
    const session = sessionManager.getSession();

    if (!session || session.role !== 'teacher') {
        window.location.href = '../index.html';
        return;
    }

    // Initialize dashboard
    initDashboard(session.data);
    loadPage('dashboard');
});

function initDashboard(teacherData) {
    // Update sidebar with teacher info
    document.getElementById('teacherName').textContent = teacherData.name;
    document.getElementById('teacherSubject').textContent = teacherData.subject;
    document.getElementById('topbarName').textContent = teacherData.name;

    // Update document title
    document.title = `${teacherData.name} - Dashboard Guru`;
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
        case 'classes':
            pageTitle.textContent = 'Kelas Mengajar';
            loadClasses(mainContent);
            break;
        case 'schedule':
            pageTitle.textContent = 'Jadwal Mengajar';
            loadSchedule(mainContent);
            break;
        case 'attendance':
            pageTitle.textContent = 'Absensi Siswa';
            loadAttendance(mainContent);
            break;
        case 'grades':
            pageTitle.textContent = 'Input Nilai';
            loadGrades(mainContent);
            break;
        case 'assignments':
            pageTitle.textContent = 'Tugas & PR';
            loadAssignments(mainContent);
            break;
        case 'student-progress':
            pageTitle.textContent = 'Progress Siswa';
            loadStudentProgress(mainContent);
            break;
        case 'announcements':
            pageTitle.textContent = 'Pengumuman';
            loadAnnouncements(mainContent);
            break;
        case 'messages':
            pageTitle.textContent = 'Pesan';
            loadMessages(mainContent);
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
    const teacher = session.data;

    container.innerHTML = `
        <div class="grid grid-2">
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">Informasi Pribadi</h3>
                </div>
                <div class="card-body">
                    <div class="profile-item">
                        <label>Nama Lengkap</label>
                        <p>${teacher.name}</p>
                    </div>
                    <div class="profile-item">
                        <label>NIP/NUPTK</label>
                        <p>${teacher.nip}</p>
                    </div>
                    <div class="profile-item">
                        <label>Mata Pelajaran</label>
                        <p>${teacher.subject}</p>
                    </div>
                    <div class="profile-item">
                        <label>Telepon</label>
                        <p>${teacher.phone}</p>
                    </div>
                    <div class="profile-item">
                        <label>Email</label>
                        <p>${teacher.email}</p>
                    </div>
                    <div class="profile-item">
                        <label>Status</label>
                        <p><span class="badge badge-success">${teacher.status}</span></p>
                    </div>
                </div>
            </div>

            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">Pengalaman Mengajar</h3>
                </div>
                <div class="card-body">
                    <div class="profile-item">
                        <label>Pengalaman</label>
                        <p>15 Tahun</p>
                    </div>
                    <div class="profile-item">
                        <label>Sertifikasi</label>
                        <p>Sertifikat Pendidik Profesional</p>
                    </div>
                    <div class="profile-item">
                        <label>Kualifikasi</label>
                        <p>S1 Pendidikan Matematika</p>
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
                    <button type="submit" class="btn btn-primary" style="width: auto;">
                        <i class="fas fa-save"></i> Simpan Perubahan
                    </button>
                </form>
            </div>
        </div>
    `;
}

// Load Classes
function loadClasses(container) {
    container.innerHTML = `
        <div class="grid grid-2">
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">XII IPA 1</h3>
                </div>
                <div class="card-body">
                    <div class="class-stat">
                        <span>Total Siswa: <strong>35</strong></span>
                    </div>
                    <div class="class-stat">
                        <span>Hadir Hari Ini: <strong>33</strong></span>
                    </div>
                    <div class="class-stat">
                        <span>Rata-rata Nilai: <strong>8.2</strong></span>
                    </div>
                    <button class="btn btn-primary" style="width: 100%; margin-top: 15px;" onclick="viewClassDetail()">
                        <i class="fas fa-eye"></i> Lihat Detail
                    </button>
                </div>
            </div>

            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">XII IPA 2</h3>
                </div>
                <div class="card-body">
                    <div class="class-stat">
                        <span>Total Siswa: <strong>36</strong></span>
                    </div>
                    <div class="class-stat">
                        <span>Hadir Hari Ini: <strong>34</strong></span>
                    </div>
                    <div class="class-stat">
                        <span>Rata-rata Nilai: <strong>8.1</strong></span>
                    </div>
                    <button class="btn btn-primary" style="width: 100%; margin-top: 15px;" onclick="viewClassDetail()">
                        <i class="fas fa-eye"></i> Lihat Detail
                    </button>
                </div>
            </div>

            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">XII IPS 1</h3>
                </div>
                <div class="card-body">
                    <div class="class-stat">
                        <span>Total Siswa: <strong>34</strong></span>
                    </div>
                    <div class="class-stat">
                        <span>Hadir Hari Ini: <strong>32</strong></span>
                    </div>
                    <div class="class-stat">
                        <span>Rata-rata Nilai: <strong>7.9</strong></span>
                    </div>
                    <button class="btn btn-primary" style="width: 100%; margin-top: 15px;" onclick="viewClassDetail()">
                        <i class="fas fa-eye"></i> Lihat Detail
                    </button>
                </div>
            </div>
        </div>
    `;

    const style = document.createElement('style');
    style.textContent = `
        .class-stat {
            padding: 10px 0;
            border-bottom: 1px solid #ecf0f1;
            font-size: 14px;
            color: #2c3e50;
        }
        .class-stat:last-child {
            border-bottom: none;
        }
    `;
    document.head.appendChild(style);
}

// Load Schedule
function loadSchedule(container) {
    container.innerHTML = `
        <div class="card">
            <div class="card-header">
                <h3 class="card-title">Jadwal Mengajar Mingguan</h3>
            </div>
            <div class="card-body">
                <div class="table-responsive">
                    <table>
                        <thead>
                            <tr>
                                <th>Hari</th>
                                <th>Waktu</th>
                                <th>Kelas</th>
                                <th>Ruang</th>
                                <th>Siswa</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Senin</td>
                                <td>08:00 - 09:00</td>
                                <td>XII IPA 1</td>
                                <td>12 IPA 1</td>
                                <td>35</td>
                            </tr>
                            <tr>
                                <td>Senin</td>
                                <td>09:00 - 10:00</td>
                                <td>XII IPA 2</td>
                                <td>12 IPA 2</td>
                                <td>36</td>
                            </tr>
                            <tr>
                                <td>Selasa</td>
                                <td>08:00 - 09:00</td>
                                <td>XII IPS 1</td>
                                <td>12 IPS 1</td>
                                <td>34</td>
                            </tr>
                            <tr>
                                <td>Rabu</td>
                                <td>10:15 - 11:15</td>
                                <td>XII IPA 1</td>
                                <td>12 IPA 1</td>
                                <td>35</td>
                            </tr>
                            <tr>
                                <td>Kamis</td>
                                <td>09:00 - 10:00</td>
                                <td>XII IPA 2</td>
                                <td>12 IPA 2</td>
                                <td>36</td>
                            </tr>
                            <tr>
                                <td>Jumat</td>
                                <td>08:00 - 09:00</td>
                                <td>XII IPS 1</td>
                                <td>12 IPS 1</td>
                                <td>34</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
}

// Load Attendance
function loadAttendance(container) {
    container.innerHTML = `
        <div class="card">
            <div class="card-header">
                <h3 class="card-title">Absensi Siswa</h3>
                <div>
                    <select style="padding: 8px 12px; border: 1px solid #ccc; border-radius: 5px;">
                        <option>XII IPA 1</option>
                        <option>XII IPA 2</option>
                        <option>XII IPS 1</option>
                    </select>
                </div>
            </div>
            <div class="card-body">
                <div class="table-responsive">
                    <table>
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>NISN</th>
                                <th>Nama Siswa</th>
                                <th>Hadir</th>
                                <th>Izin</th>
                                <th>Sakit</th>
                                <th>Tanpa Keterangan</th>
                                <th>Persentase</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>0098765432</td>
                                <td>Budi Santoso</td>
                                <td>33</td>
                                <td>1</td>
                                <td>1</td>
                                <td>0</td>
                                <td>94%</td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>0087654321</td>
                                <td>Siti Nurhaliza</td>
                                <td>35</td>
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
                                <td>100%</td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td>0076543210</td>
                                <td>Ahmad Wijaya</td>
                                <td>32</td>
                                <td>2</td>
                                <td>1</td>
                                <td>0</td>
                                <td>91%</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
}

// Load Grades
function loadGrades(container) {
    container.innerHTML = `
        <div class="card">
            <div class="card-header">
                <h3 class="card-title">Input Nilai Siswa</h3>
                <div>
                    <select style="padding: 8px 12px; border: 1px solid #ccc; border-radius: 5px;">
                        <option>XII IPA 1</option>
                        <option>XII IPA 2</option>
                        <option>XII IPS 1</option>
                    </select>
                </div>
            </div>
            <div class="card-body">
                <div class="table-responsive">
                    <table>
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Nama Siswa</th>
                                <th>UH</th>
                                <th>UTS</th>
                                <th>UAS</th>
                                <th>Tugas</th>
                                <th>Nilai Akhir</th>
                                <th>Grade</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>Budi Santoso</td>
                                <td><input type="number" min="0" max="100" value="85" style="width: 50px; padding: 5px;"></td>
                                <td><input type="number" min="0" max="100" value="88" style="width: 50px; padding: 5px;"></td>
                                <td><input type="number" min="0" max="100" value="90" style="width: 50px; padding: 5px;"></td>
                                <td><input type="number" min="0" max="100" value="87" style="width: 50px; padding: 5px;"></td>
                                <td>87.5</td>
                                <td>A</td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>Siti Nurhaliza</td>
                                <td><input type="number" min="0" max="100" value="90" style="width: 50px; padding: 5px;"></td>
                                <td><input type="number" min="0" max="100" value="92" style="width: 50px; padding: 5px;"></td>
                                <td><input type="number" min="0" max="100" value="94" style="width: 50px; padding: 5px;"></td>
                                <td><input type="number" min="0" max="100" value="91" style="width: 50px; padding: 5px;"></td>
                                <td>91.75</td>
                                <td>A+</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <button class="btn btn-primary" style="margin-top: 15px;" onclick="saveGrades()">
                    <i class="fas fa-save"></i> Simpan Nilai
                </button>
            </div>
        </div>
    `;
}

// Load Assignments
function loadAssignments(container) {
    container.innerHTML = `
        <div class="card">
            <div class="card-header">
                <h3 class="card-title">Tugas & PR</h3>
                <button class="btn btn-primary" style="width: auto; padding: 8px 16px;" onclick="createAssignment()">
                    <i class="fas fa-plus"></i> Buat Tugas
                </button>
            </div>
            <div class="card-body">
                <div class="table-responsive">
                    <table>
                        <thead>
                            <tr>
                                <th>Kelas</th>
                                <th>Judul Tugas</th>
                                <th>Deadline</th>
                                <th>Dikumpulkan</th>
                                <th>Belum</th>
                                <th>Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>XII IPA 1</td>
                                <td>Soal Integral hal 45-50</td>
                                <td>15 Desember 2024</td>
                                <td>28</td>
                                <td>7</td>
                                <td><button class="btn-action" onclick="viewAssignmentDetail()">Lihat</button></td>
                            </tr>
                            <tr>
                                <td>XII IPA 2</td>
                                <td>Analisis Grafik Fungsi</td>
                                <td>16 Desember 2024</td>
                                <td>25</td>
                                <td>11</td>
                                <td><button class="btn-action" onclick="viewAssignmentDetail()">Lihat</button></td>
                            </tr>
                            <tr>
                                <td>XII IPS 1</td>
                                <td>Persamaan Linier</td>
                                <td>14 Desember 2024</td>
                                <td>32</td>
                                <td>2</td>
                                <td><button class="btn-action" onclick="viewAssignmentDetail()">Lihat</button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;

    const style = document.createElement('style');
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
        }
        .btn-action:hover {
            background: #2c5aa0;
        }
    `;
    document.head.appendChild(style);
}

// Load Student Progress
function loadStudentProgress(container) {
    container.innerHTML = `
        <div class="card">
            <div class="card-header">
                <h3 class="card-title">Progress Siswa</h3>
                <select style="padding: 8px 12px; border: 1px solid #ccc; border-radius: 5px;">
                    <option>XII IPA 1</option>
                    <option>XII IPA 2</option>
                    <option>XII IPS 1</option>
                </select>
            </div>
            <div class="card-body">
                <div class="table-responsive">
                    <table>
                        <thead>
                            <tr>
                                <th>Nama Siswa</th>
                                <th>Kehadiran</th>
                                <th>Tugas</th>
                                <th>Nilai Rata-rata</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Budi Santoso</td>
                                <td>
                                    <div class="progress-bar" style="background: #e0e0e0; border-radius: 10px; height: 20px; width: 100px; display: inline-block; overflow: hidden;">
                                        <div style="background: #51cf66; height: 100%; width: 94%;"></div>
                                    </div> 94%
                                </td>
                                <td>
                                    <div class="progress-bar" style="background: #e0e0e0; border-radius: 10px; height: 20px; width: 100px; display: inline-block; overflow: hidden;">
                                        <div style="background: #4a90e2; height: 100%; width: 85%;"></div>
                                    </div> 85%
                                </td>
                                <td>8.5</td>
                                <td><span class="badge badge-success">Baik</span></td>
                            </tr>
                            <tr>
                                <td>Siti Nurhaliza</td>
                                <td>
                                    <div class="progress-bar" style="background: #e0e0e0; border-radius: 10px; height: 20px; width: 100px; display: inline-block; overflow: hidden;">
                                        <div style="background: #51cf66; height: 100%; width: 100%;"></div>
                                    </div> 100%
                                </td>
                                <td>
                                    <div class="progress-bar" style="background: #e0e0e0; border-radius: 10px; height: 20px; width: 100px; display: inline-block; overflow: hidden;">
                                        <div style="background: #4a90e2; height: 100%; width: 95%;"></div>
                                    </div> 95%
                                </td>
                                <td>9.0</td>
                                <td><span class="badge badge-success">Excellent</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
}

// Load Announcements
function loadAnnouncements(container) {
    container.innerHTML = `
        <div class="card">
            <div class="card-header">
                <h3 class="card-title">Pengumuman</h3>
                <button class="btn btn-primary" style="width: auto; padding: 8px 16px;" onclick="createAnnouncement()">
                    <i class="fas fa-plus"></i> Buat Pengumuman
                </button>
            </div>
            <div class="card-body">
                <div class="announcements-list">
                    <div class="announcement-card">
                        <div class="announcement-header">
                            <h4>Pengumpulan Nilai UAS</h4>
                            <span>3 jam lalu</span>
                        </div>
                        <p>Mohon semua guru mengumpulkan nilai UAS ke bagian akademik sebelum hari Kamis</p>
                        <div class="announcement-footer">
                            <span>Oleh: Wakil Kepala Sekolah</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Load Messages
function loadMessages(container) {
    container.innerHTML = `
        <div class="card">
            <div class="card-header">
                <h3 class="card-title">Pesan</h3>
            </div>
            <div class="card-body">
                <div class="message-list">
                    <div class="message-item">
                        <strong>Admin TU</strong> - Segera isi form absensi siswa
                        <small>2 jam lalu</small>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Helper Functions
function changePassword(event) {
    event.preventDefault();
    alert('Fitur perubahan password akan diimplementasikan');
}

function viewClassDetail() {
    alert('Membuka detail kelas');
}

function saveGrades() {
    alert('Nilai berhasil disimpan!');
}

function createAssignment() {
    alert('Form pembuatan tugas akan ditampilkan');
}

function viewAssignmentDetail() {
    alert('Membuka detail tugas');
}

function createAnnouncement() {
    alert('Form pembuatan pengumuman akan ditampilkan');
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
