// ===================================
// STUDENT DASHBOARD FUNCTIONALITY
// ===================================

let currentPage = 'dashboard';

// Check authentication on page load
document.addEventListener('DOMContentLoaded', function() {
    const session = sessionManager.getSession();

    if (!session || session.role !== 'student') {
        window.location.href = '../index.html';
        return;
    }

    // Initialize dashboard
    initDashboard(session.data);
    loadPage('dashboard');
});

function initDashboard(studentData) {
    // Update sidebar with student info
    document.getElementById('studentName').textContent = studentData.name;
    document.getElementById('studentClass').textContent = 'Kelas: ' + studentData.class;
    document.getElementById('topbarName').textContent = studentData.name;

    // Update document title
    document.title = `${studentData.name} - Dashboard Siswa`;
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
        case 'schedule':
            pageTitle.textContent = 'Jadwal Pelajaran';
            loadSchedule(mainContent);
            break;
        case 'grades':
            pageTitle.textContent = 'Nilai';
            loadGrades(mainContent);
            break;
        case 'assignments':
            pageTitle.textContent = 'Tugas';
            loadAssignments(mainContent);
            break;
        case 'attendance':
            pageTitle.textContent = 'Kehadiran';
            loadAttendance(mainContent);
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

// Load Dashboard Content
function loadDashboard(container) {
    const template = document.querySelector('#dashboard-template');
    container.innerHTML = template.innerHTML;
}

// Load Profile Page
function loadProfile(container) {
    const session = sessionManager.getSession();
    const student = session.data;

    container.innerHTML = `
        <div class="grid grid-2">
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">Informasi Pribadi</h3>
                </div>
                <div class="card-body">
                    <div class="profile-item">
                        <label>Nama Lengkap</label>
                        <p>${student.name}</p>
                    </div>
                    <div class="profile-item">
                        <label>NISN</label>
                        <p>${student.nisn}</p>
                    </div>
                    <div class="profile-item">
                        <label>Kelas</label>
                        <p>${student.class}</p>
                    </div>
                    <div class="profile-item">
                        <label>Jenis Kelamin</label>
                        <p>${student.gender}</p>
                    </div>
                    <div class="profile-item">
                        <label>Telepon</label>
                        <p>${student.phone}</p>
                    </div>
                    <div class="profile-item">
                        <label>Email</label>
                        <p>${student.email}</p>
                    </div>
                </div>
            </div>

            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">Informasi Orang Tua</h3>
                </div>
                <div class="card-body">
                    <div class="profile-item">
                        <label>Nama Orang Tua</label>
                        <p>${student.parentName}</p>
                    </div>
                    <div class="profile-item">
                        <label>Telepon Orang Tua</label>
                        <p>${student.parentPhone}</p>
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
                        <input type="password" id="oldPassword" required placeholder="Masukkan password lama">
                    </div>
                    <div class="form-group">
                        <label>Password Baru</label>
                        <input type="password" id="newPassword" required placeholder="Masukkan password baru">
                    </div>
                    <div class="form-group">
                        <label>Konfirmasi Password</label>
                        <input type="password" id="confirmPassword" required placeholder="Konfirmasi password baru">
                    </div>
                    <button type="submit" class="btn btn-primary" style="width: auto;">
                        <i class="fas fa-save"></i> Simpan Perubahan
                    </button>
                </form>
            </div>
        </div>
    `;
}

// Load Schedule Page
function loadSchedule(container) {
    container.innerHTML = `
        <div class="card">
            <div class="card-header">
                <h3 class="card-title">Jadwal Pelajaran Mingguan</h3>
                <select onchange="changeWeek(this.value)" style="padding: 8px 12px; border: 1px solid #ccc; border-radius: 5px;">
                    <option>Minggu Ini</option>
                    <option>Minggu Depan</option>
                    <option>Minggu Sebelumnya</option>
                </select>
            </div>
            <div class="card-body">
                <div class="table-responsive">
                    <table>
                        <thead>
                            <tr>
                                <th>Hari</th>
                                <th>Waktu</th>
                                <th>Mata Pelajaran</th>
                                <th>Guru</th>
                                <th>Ruangan</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Senin</td>
                                <td>08:00 - 09:00</td>
                                <td>Matematika</td>
                                <td>Drs. Ahmad Priyono</td>
                                <td>XII IPA 1</td>
                            </tr>
                            <tr>
                                <td>Senin</td>
                                <td>09:00 - 10:00</td>
                                <td>Bahasa Indonesia</td>
                                <td>Ibu Srika Dewi, S.Pd</td>
                                <td>XII IPA 1</td>
                            </tr>
                            <tr>
                                <td>Selasa</td>
                                <td>08:00 - 09:00</td>
                                <td>Fisika</td>
                                <td>Drs. Bambang Sutrisno</td>
                                <td>XII IPA 1</td>
                            </tr>
                            <tr>
                                <td>Selasa</td>
                                <td>09:00 - 10:00</td>
                                <td>Kimia</td>
                                <td>Ibu Dr. Sulistyaningrum</td>
                                <td>XII IPA 1</td>
                            </tr>
                            <tr>
                                <td>Rabu</td>
                                <td>08:00 - 09:00</td>
                                <td>Bahasa Inggris</td>
                                <td>Mr. John Smith</td>
                                <td>XII IPA 1</td>
                            </tr>
                            <tr>
                                <td>Rabu</td>
                                <td>10:15 - 11:15</td>
                                <td>Biologi</td>
                                <td>Ibu Eka Prasetya, S.Pd</td>
                                <td>XII IPA 1</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
}

// Load Grades Page
function loadGrades(container) {
    container.innerHTML = `
        <div class="grid grid-2">
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">Ringkasan Nilai</h3>
                </div>
                <div class="card-body">
                    <div class="grade-summary">
                        <div class="grade-item">
                            <span class="grade-label">Rata-rata Nilai</span>
                            <span class="grade-value" style="font-size: 32px; color: #51cf66;">8.5</span>
                        </div>
                        <div class="grade-item">
                            <span class="grade-label">Nilai Tertinggi</span>
                            <span class="grade-value" style="font-size: 32px; color: #3498db;">9.2</span>
                        </div>
                        <div class="grade-item">
                            <span class="grade-label">Nilai Terendah</span>
                            <span class="grade-value" style="font-size: 32px; color: #f39c12;">7.8</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">Distribusi Nilai</h3>
                </div>
                <div class="card-body">
                    <div style="height: 250px; background: url('data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 300 200%22><rect x=%2250%22 y=%22150%22 width=%2230%22 height=%2250%22 fill=%22%234a90e2%22/><rect x=%22100%22 y=%22100%22 width=%2230%22 height=%22100%22 fill=%224a90e2%22/><rect x=%22150%22 y=%2280%22 width=%2230%22 height=%22120%22 fill=%224a90e2%22/></svg>'); background-size: contain; background-repeat: no-repeat;"></div>
                </div>
            </div>
        </div>

        <div class="card">
            <div class="card-header">
                <h3 class="card-title">Detail Nilai Per Mata Pelajaran</h3>
            </div>
            <div class="card-body">
                <div class="table-responsive">
                    <table>
                        <thead>
                            <tr>
                                <th>Mata Pelajaran</th>
                                <th>Guru</th>
                                <th>UH</th>
                                <th>UTS</th>
                                <th>UAS</th>
                                <th>Nilai Akhir</th>
                                <th>Grade</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Matematika</td>
                                <td>Drs. Ahmad Priyono</td>
                                <td>85</td>
                                <td>88</td>
                                <td>90</td>
                                <td>87.67</td>
                                <td><span class="badge badge-success">A</span></td>
                            </tr>
                            <tr>
                                <td>Bahasa Indonesia</td>
                                <td>Ibu Srika Dewi, S.Pd</td>
                                <td>82</td>
                                <td>85</td>
                                <td>84</td>
                                <td>83.67</td>
                                <td><span class="badge badge-success">A</span></td>
                            </tr>
                            <tr>
                                <td>Bahasa Inggris</td>
                                <td>Mr. John Smith</td>
                                <td>78</td>
                                <td>80</td>
                                <td>82</td>
                                <td>80.00</td>
                                <td><span class="badge badge-info">B+</span></td>
                            </tr>
                            <tr>
                                <td>Fisika</td>
                                <td>Drs. Bambang Sutrisno</td>
                                <td>88</td>
                                <td>90</td>
                                <td>92</td>
                                <td>90.00</td>
                                <td><span class="badge badge-success">A</span></td>
                            </tr>
                            <tr>
                                <td>Kimia</td>
                                <td>Ibu Dr. Sulistyaningrum</td>
                                <td>80</td>
                                <td>82</td>
                                <td>81</td>
                                <td>81.00</td>
                                <td><span class="badge badge-info">B+</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
}

// Load Assignments Page
function loadAssignments(container) {
    container.innerHTML = `
        <div class="card">
            <div class="card-header">
                <h3 class="card-title">Tugas Siswa</h3>
                <div>
                    <select onchange="filterAssignments(this.value)" style="padding: 8px 12px; border: 1px solid #ccc; border-radius: 5px;">
                        <option value="">Semua Tugas</option>
                        <option value="pending">Pending</option>
                        <option value="submitted">Dikumpulkan</option>
                        <option value="graded">Dinilai</option>
                    </select>
                </div>
            </div>
            <div class="card-body">
                <div class="table-responsive">
                    <table>
                        <thead>
                            <tr>
                                <th>Mata Pelajaran</th>
                                <th>Judul Tugas</th>
                                <th>Deadline</th>
                                <th>Status</th>
                                <th>Nilai</th>
                                <th>Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Matematika</td>
                                <td>Soal Integral hal 45-50</td>
                                <td>15 Desember 2024</td>
                                <td><span class="badge badge-warning">Pending</span></td>
                                <td>-</td>
                                <td><button class="btn-action" onclick="viewAssignment()">Lihat</button></td>
                            </tr>
                            <tr>
                                <td>Bahasa Indonesia</td>
                                <td>Analisis Cerpen Maupassant</td>
                                <td>13 Desember 2024</td>
                                <td><span class="badge badge-success">Dikumpulkan</span></td>
                                <td>85</td>
                                <td><button class="btn-action" onclick="viewAssignment()">Lihat</button></td>
                            </tr>
                            <tr>
                                <td>Bahasa Inggris</td>
                                <td>Essay "My Dream Career"</td>
                                <td>16 Desember 2024</td>
                                <td><span class="badge badge-warning">Pending</span></td>
                                <td>-</td>
                                <td><button class="btn-action" onclick="viewAssignment()">Lihat</button></td>
                            </tr>
                            <tr>
                                <td>Fisika</td>
                                <td>Praktikum Gelombang</td>
                                <td>12 Desember 2024</td>
                                <td><span class="badge badge-success">Dikumpulkan</span></td>
                                <td>90</td>
                                <td><button class="btn-action" onclick="viewAssignment()">Lihat</button></td>
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

// Load Attendance Page
function loadAttendance(container) {
    container.innerHTML = `
        <div class="grid grid-3">
            <div class="card stat-card">
                <div class="stat-icon success">
                    <i class="fas fa-check-circle"></i>
                </div>
                <div class="stat-content">
                    <div class="stat-value">95%</div>
                    <div class="stat-label">Kehadiran</div>
                </div>
            </div>

            <div class="card stat-card">
                <div class="stat-icon warning">
                    <i class="fas fa-exclamation-circle"></i>
                </div>
                <div class="stat-content">
                    <div class="stat-value">2</div>
                    <div class="stat-label">Izin</div>
                </div>
            </div>

            <div class="card stat-card">
                <div class="stat-icon danger">
                    <i class="fas fa-times-circle"></i>
                </div>
                <div class="stat-content">
                    <div class="stat-value">1</div>
                    <div class="stat-label">Sakit</div>
                </div>
            </div>
        </div>

        <div class="card">
            <div class="card-header">
                <h3 class="card-title">Riwayat Kehadiran</h3>
            </div>
            <div class="card-body">
                <div class="table-responsive">
                    <table>
                        <thead>
                            <tr>
                                <th>Tanggal</th>
                                <th>Hari</th>
                                <th>Status</th>
                                <th>Keterangan</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>10 Desember 2024</td>
                                <td>Senin</td>
                                <td><span class="badge badge-success">Hadir</span></td>
                                <td>-</td>
                            </tr>
                            <tr>
                                <td>9 Desember 2024</td>
                                <td>Minggu</td>
                                <td><span class="badge badge-info">Libur</span></td>
                                <td>-</td>
                            </tr>
                            <tr>
                                <td>6 Desember 2024</td>
                                <td>Jumat</td>
                                <td><span class="badge badge-primary">Izin</span></td>
                                <td>Mengikuti lomba</td>
                            </tr>
                            <tr>
                                <td>5 Desember 2024</td>
                                <td>Kamis</td>
                                <td><span class="badge badge-success">Hadir</span></td>
                                <td>-</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;

    const style = document.createElement('style');
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
    `;
    document.head.appendChild(style);
}

// Load Announcements Page
function loadAnnouncements(container) {
    container.innerHTML = `
        <div class="card">
            <div class="card-header">
                <h3 class="card-title">Pengumuman Sekolah</h3>
            </div>
            <div class="card-body">
                <div class="announcements-list">
                    <div class="announcement-card">
                        <div class="announcement-header">
                            <h4 class="announcement-title">Libur Nasional</h4>
                            <span class="announcement-date">2 jam lalu</span>
                        </div>
                        <p class="announcement-body">Libur nasional akan diterapkan mulai tanggal 15 Desember sampai 22 Desember 2024. Siswa dimohon untuk tetap menjaga kesehatan dan mengikuti pelajaran online untuk beberapa mapel.</p>
                        <div class="announcement-footer">
                            <span class="announcement-by">Oleh: Kepala Sekolah</span>
                        </div>
                    </div>

                    <div class="announcement-card">
                        <div class="announcement-header">
                            <h4 class="announcement-title">Pengumpulan Tugas Ditunda</h4>
                            <span class="announcement-date">5 jam lalu</span>
                        </div>
                        <p class="announcement-body">Pengumpulan tugas Matematika untuk kelas XII ditunda hingga Jumat pukul 17:00. Harap siswa segera menyelesaikan tugas agar tidak terlambat.</p>
                        <div class="announcement-footer">
                            <span class="announcement-by">Oleh: Drs. Ahmad Priyono</span>
                        </div>
                    </div>

                    <div class="announcement-card">
                        <div class="announcement-header">
                            <h4 class="announcement-title">Pembagian Rapor Semester Ganjil</h4>
                            <span class="announcement-date">1 hari lalu</span>
                        </div>
                        <p class="announcement-body">Pembagian rapor semester ganjil akan dilaksanakan minggu depan. Hadir tepat waktu dan jangan lupa membawa buku laporan prestasi serta buku penghubung.</p>
                        <div class="announcement-footer">
                            <span class="announcement-by">Oleh: Wakil Kepala Sekolah</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    const style = document.createElement('style');
    style.textContent = `
        .announcements-list {
            display: flex;
            flex-direction: column;
            gap: 16px;
        }
        .announcement-card {
            border: 1px solid #e0e0e0;
            border-radius: 8px;
            padding: 16px;
            transition: all 0.3s ease;
        }
        .announcement-card:hover {
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            border-color: #4a90e2;
        }
        .announcement-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 12px;
        }
        .announcement-title {
            font-size: 16px;
            font-weight: 700;
            color: #2c3e50;
            margin: 0;
        }
        .announcement-date {
            font-size: 12px;
            color: #7f8c8d;
            white-space: nowrap;
        }
        .announcement-body {
            color: #555;
            line-height: 1.6;
            margin: 0 0 12px 0;
            font-size: 14px;
        }
        .announcement-footer {
            border-top: 1px solid #ecf0f1;
            padding-top: 12px;
        }
        .announcement-by {
            font-size: 12px;
            color: #7f8c8d;
            font-style: italic;
        }
    `;
    document.head.appendChild(style);
}

// Load Messages Page
function loadMessages(container) {
    container.innerHTML = `
        <div class="grid grid-3">
            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">Pesan Masuk</h3>
                </div>
                <div class="card-body">
                    <div class="message-list">
                        <div class="message-item unread">
                            <div class="message-avatar">DP</div>
                            <div class="message-info">
                                <div class="message-sender">Drs. Ahmad Priyono</div>
                                <div class="message-preview">Tolong segera kerjakan tugas...</div>
                                <div class="message-time">2 jam lalu</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">Pesan ke Guru</h3>
                </div>
                <div class="card-body">
                    <form onsubmit="sendMessage(event)">
                        <div class="form-group">
                            <label>Pilih Guru</label>
                            <select required style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 5px;">
                                <option>-- Pilih Guru --</option>
                                <option>Drs. Ahmad Priyono (Matematika)</option>
                                <option>Ibu Srika Dewi, S.Pd (Bahasa Indonesia)</option>
                                <option>Mr. John Smith (Bahasa Inggris)</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Pesan</label>
                            <textarea required style="width: 100%; padding: 8px; border: 1px solid #ccc; border-radius: 5px; min-height: 100px;" placeholder="Tulis pesan Anda"></textarea>
                        </div>
                        <button type="submit" class="btn btn-primary">
                            <i class="fas fa-paper-plane"></i> Kirim
                        </button>
                    </form>
                </div>
            </div>

            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">Pesan Penting</h3>
                </div>
                <div class="card-body">
                    <div class="message-list">
                        <div class="message-item">
                            <div class="message-avatar">KS</div>
                            <div class="message-info">
                                <div class="message-sender">Kepala Sekolah</div>
                                <div class="message-preview">Hasil seleksi tim...</div>
                                <div class="message-time">3 hari lalu</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    const style = document.createElement('style');
    style.textContent = `
        .message-list {
            display: flex;
            flex-direction: column;
            gap: 8px;
        }
        .message-item {
            display: flex;
            gap: 12px;
            padding: 12px;
            border-radius: 8px;
            background: #f9f9f9;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        .message-item:hover {
            background: #f0f4ff;
        }
        .message-item.unread {
            background: #e8eaf6;
            border-left: 3px solid #4a90e2;
        }
        .message-avatar {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 700;
            font-size: 12px;
            flex-shrink: 0;
        }
        .message-info {
            flex: 1;
            min-width: 0;
        }
        .message-sender {
            font-weight: 600;
            color: #2c3e50;
            font-size: 13px;
        }
        .message-preview {
            color: #7f8c8d;
            font-size: 12px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            margin-top: 4px;
        }
        .message-time {
            font-size: 11px;
            color: #95a5a6;
            margin-top: 4px;
        }
        .form-group {
            margin-bottom: 16px;
        }
        .form-group label {
            display: block;
            font-weight: 600;
            margin-bottom: 6px;
            color: #2c3e50;
            font-size: 13px;
        }
    `;
    document.head.appendChild(style);
}

// Helper Functions
function changePassword(event) {
    event.preventDefault();
    alert('Fitur perubahan password akan diimplementasikan');
}

function changeWeek(value) {
    console.log('Mengubah minggu ke:', value);
}

function filterAssignments(value) {
    console.log('Filter tugas:', value);
}

function viewAssignment() {
    alert('Membuka detail tugas');
}

function sendMessage(event) {
    event.preventDefault();
    alert('Pesan berhasil dikirim!');
}

function toggleNotifications() {
    alert('Notifikasi akan ditampilkan di sini');
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
