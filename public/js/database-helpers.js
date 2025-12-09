// ===================================
// DATABASE HELPERS & UTILITIES
// ===================================

// Statistics Calculator
const Statistics = {
    // Calculate student statistics
    getStudentStats(studentId) {
        const student = Database.getStudentById(studentId);
        const grades = Database.getGradesByStudent(studentId);
        const attendance = Database.getAttendanceByStudent(studentId);
        const assignments = Database.getAssignments();
        
        const avgGrade = grades.length > 0 
            ? (grades.reduce((sum, g) => sum + g.finalGrade, 0) / grades.length).toFixed(2)
            : 0;

        const totalDays = attendance.length;
        const presentDays = attendance.filter(a => a.status === 'Hadir').length;
        const attendancePercent = totalDays > 0 
            ? Math.round((presentDays / totalDays) * 100)
            : 0;

        return {
            student,
            avgGrade,
            totalGrades: grades.length,
            attendancePercent,
            presentDays,
            totalDays,
            grades,
            attendance
        };
    },

    // Calculate class statistics
    getClassStats(className) {
        const students = Database.getStudentsByClass(className);
        const grades = Database.getGradesByClass(className);
        const attendance = Database.getAttendanceByClass(className);

        const avgGrade = grades.length > 0
            ? (grades.reduce((sum, g) => sum + g.finalGrade, 0) / grades.length).toFixed(2)
            : 0;

        const attendance_percent = attendance.length > 0
            ? Math.round((attendance.filter(a => a.status === 'Hadir').length / attendance.length) * 100)
            : 0;

        return {
            className,
            totalStudents: students.length,
            avgGrade,
            attendance_percent,
            students,
            gradesCount: grades.length,
            attendanceCount: attendance.length
        };
    },

    // Calculate teacher statistics
    getTeacherStats(teacherId) {
        const teacher = Database.getTeacherById(teacherId);
        const schedules = Database.getSchedulesByTeacher(teacherId);
        const assignments = Database.getAssignments()
            .filter(a => a.teacherId === teacherId);

        const classes = [...new Set(schedules.map(s => s.className))];
        const totalStudents = classes.reduce((sum, className) => 
            sum + Database.getStudentsByClass(className).length, 0);

        return {
            teacher,
            totalClasses: classes.length,
            totalStudents,
            totalAssignments: assignments.length,
            schedules,
            assignments,
            classes
        };
    },

    // Get overall school statistics
    getSchoolStats() {
        const students = Database.getStudents();
        const teachers = Database.getTeachers();
        const classes = Database.getClasses();
        const subjects = Database.getSubjects();
        const attendance = Database.getAttendance();

        const attendancePercent = attendance.length > 0
            ? Math.round((attendance.filter(a => a.status === 'Hadir').length / attendance.length) * 100)
            : 0;

        return {
            totalStudents: students.length,
            totalTeachers: teachers.length,
            totalClasses: classes.length,
            totalSubjects: subjects.length,
            attendancePercent,
            attendance: attendance.length,
            activeStudents: students.filter(s => s.status === 'Aktif').length,
            activeTeachers: teachers.filter(t => t.status === 'Aktif').length
        };
    }
};

// Data Export Functions
const DataExport = {
    // Export to JSON
    exportJSON(data, filename = 'data.json') {
        const dataStr = JSON.stringify(data, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        this.downloadFile(dataBlob, filename);
    },

    // Export to CSV
    exportCSV(data, filename = 'data.csv') {
        if (!Array.isArray(data) || data.length === 0) {
            alert('Data kosong!');
            return;
        }

        const headers = Object.keys(data[0]);
        const csv = [
            headers.join(','),
            ...data.map(row => 
                headers.map(header => {
                    const value = row[header];
                    // Escape quotes and wrap in quotes if contains comma
                    return typeof value === 'string' && value.includes(',')
                        ? `"${value.replace(/"/g, '""')}"` 
                        : value;
                }).join(',')
            )
        ].join('\n');

        const dataBlob = new Blob([csv], { type: 'text/csv' });
        this.downloadFile(dataBlob, filename);
    },

    // Export Students
    exportStudents() {
        const students = Database.getStudents();
        this.exportCSV(students, 'siswa_' + new Date().toISOString().split('T')[0] + '.csv');
    },

    // Export Teachers
    exportTeachers() {
        const teachers = Database.getTeachers();
        this.exportCSV(teachers, 'guru_' + new Date().toISOString().split('T')[0] + '.csv');
    },

    // Export Grades
    exportGrades() {
        const grades = Database.getGrades();
        this.exportCSV(grades, 'nilai_' + new Date().toISOString().split('T')[0] + '.csv');
    },

    // Export Attendance
    exportAttendance() {
        const attendance = Database.getAttendance();
        this.exportCSV(attendance, 'absensi_' + new Date().toISOString().split('T')[0] + '.csv');
    },

    // Helper function
    downloadFile(blob, filename) {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
    }
};

// Data Import Functions
const DataImport = {
    // Import from JSON
    importJSON(file, callback) {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result);
                callback(null, data);
            } catch (error) {
                callback(error);
            }
        };
        reader.readAsText(file);
    },

    // Import from CSV
    importCSV(file, callback) {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const csv = e.target.result;
                const lines = csv.split('\n');
                const headers = lines[0].split(',').map(h => h.trim());
                
                const data = lines.slice(1)
                    .filter(line => line.trim())
                    .map(line => {
                        const values = line.split(',').map(v => v.trim().replace(/^"|"$/g, ''));
                        const row = {};
                        headers.forEach((header, index) => {
                            row[header] = values[index];
                        });
                        return row;
                    });

                callback(null, data);
            } catch (error) {
                callback(error);
            }
        };
        reader.readAsText(file);
    }
};

// Search Functions
const Search = {
    // Search students
    searchStudents(query) {
        const students = Database.getStudents();
        const q = query.toLowerCase();
        return students.filter(s => 
            s.name.toLowerCase().includes(q) ||
            s.nisn.includes(q) ||
            s.class.toLowerCase().includes(q) ||
            s.email.toLowerCase().includes(q)
        );
    },

    // Search teachers
    searchTeachers(query) {
        const teachers = Database.getTeachers();
        const q = query.toLowerCase();
        return teachers.filter(t => 
            t.name.toLowerCase().includes(q) ||
            t.nip.includes(q) ||
            t.subject.toLowerCase().includes(q) ||
            t.email.toLowerCase().includes(q)
        );
    },

    // Search classes
    searchClasses(query) {
        const classes = Database.getClasses();
        const q = query.toLowerCase();
        return classes.filter(c => 
            c.name.toLowerCase().includes(q) ||
            c.room.toLowerCase().includes(q) ||
            c.headmasterName.toLowerCase().includes(q)
        );
    },

    // Search announcements
    searchAnnouncements(query) {
        const announcements = Database.getAnnouncements();
        const q = query.toLowerCase();
        return announcements.filter(a => 
            a.title.toLowerCase().includes(q) ||
            a.content.toLowerCase().includes(q) ||
            a.author.toLowerCase().includes(q)
        );
    }
};

// Filter Functions
const Filter = {
    // Filter students by class
    filterStudentsByClass(className) {
        return Database.getStudentsByClass(className);
    },

    // Filter students by status
    filterStudentsByStatus(status) {
        const students = Database.getStudents();
        return students.filter(s => s.status === status);
    },

    // Filter grades by range
    filterGradesByRange(min, max) {
        const grades = Database.getGrades();
        return grades.filter(g => g.finalGrade >= min && g.finalGrade <= max);
    },

    // Filter attendance by status
    filterAttendanceByStatus(status) {
        const attendance = Database.getAttendance();
        return attendance.filter(a => a.status === status);
    },

    // Filter attendance by date range
    filterAttendanceByDateRange(startDate, endDate) {
        const attendance = Database.getAttendance();
        return attendance.filter(a => {
            const date = new Date(a.date);
            return date >= new Date(startDate) && date <= new Date(endDate);
        });
    },

    // Filter assignments by status
    filterAssignmentsByStatus(status) {
        const assignments = Database.getAssignments();
        return assignments.filter(a => a.status === status);
    },

    // Filter announcements by priority
    filterAnnouncementsByPriority(priority) {
        const announcements = Database.getAnnouncements();
        return announcements.filter(a => a.priority === priority);
    }
};

// Sort Functions
const Sort = {
    // Sort students by name
    sortStudentsByName(ascending = true) {
        const students = Database.getStudents();
        return students.sort((a, b) => {
            if (ascending) {
                return a.name.localeCompare(b.name);
            } else {
                return b.name.localeCompare(a.name);
            }
        });
    },

    // Sort students by grade
    sortStudentsByGrade(ascending = false) {
        const students = Database.getStudents();
        const stats = students.map(s => ({
            ...s,
            avgGrade: Statistics.getStudentStats(s.id).avgGrade
        }));
        return stats.sort((a, b) => 
            ascending ? a.avgGrade - b.avgGrade : b.avgGrade - a.avgGrade
        );
    },

    // Sort grades
    sortGrades(ascending = false) {
        const grades = Database.getGrades();
        return grades.sort((a, b) => 
            ascending ? a.finalGrade - b.finalGrade : b.finalGrade - a.finalGrade
        );
    },

    // Sort teachers by name
    sortTeachersByName(ascending = true) {
        const teachers = Database.getTeachers();
        return teachers.sort((a, b) => 
            ascending ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
        );
    }
};

// Backup & Restore
const Backup = {
    // Create full backup
    createFullBackup() {
        const backup = {
            timestamp: new Date().toISOString(),
            students: Database.getStudents(),
            teachers: Database.getTeachers(),
            classes: Database.getClasses(),
            subjects: Database.getSubjects(),
            schedules: Database.getSchedules(),
            grades: Database.getGrades(),
            attendance: Database.getAttendance(),
            assignments: Database.getAssignments(),
            announcements: Database.getAnnouncements(),
            messages: Database.getMessages(),
            logs: JSON.parse(localStorage.getItem('logs') || '[]')
        };
        
        DataExport.exportJSON(backup, 'backup_' + new Date().toISOString().split('T')[0] + '.json');
        return backup;
    },

    // Restore from backup
    restoreFromBackup(backupData) {
        try {
            if (backupData.students) localStorage.setItem('students', JSON.stringify(backupData.students));
            if (backupData.teachers) localStorage.setItem('teachers', JSON.stringify(backupData.teachers));
            if (backupData.classes) localStorage.setItem('classes', JSON.stringify(backupData.classes));
            if (backupData.subjects) localStorage.setItem('subjects', JSON.stringify(backupData.subjects));
            if (backupData.schedules) localStorage.setItem('schedules', JSON.stringify(backupData.schedules));
            if (backupData.grades) localStorage.setItem('grades', JSON.stringify(backupData.grades));
            if (backupData.attendance) localStorage.setItem('attendance', JSON.stringify(backupData.attendance));
            if (backupData.assignments) localStorage.setItem('assignments', JSON.stringify(backupData.assignments));
            if (backupData.announcements) localStorage.setItem('announcements', JSON.stringify(backupData.announcements));
            if (backupData.messages) localStorage.setItem('messages', JSON.stringify(backupData.messages));
            if (backupData.logs) localStorage.setItem('logs', JSON.stringify(backupData.logs));
            
            return { success: true, message: 'Data berhasil dipulihkan' };
        } catch (error) {
            return { success: false, message: 'Gagal memulihkan data: ' + error.message };
        }
    }
};

// Validation Functions
const Validation = {
    // Validate NISN format
    validateNISN(nisn) {
        return /^[0-9]{10}$/.test(nisn);
    },

    // Validate NIP format
    validateNIP(nip) {
        return /^[0-9]{6,9}$/.test(nip);
    },

    // Validate email format
    validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    },

    // Validate phone format
    validatePhone(phone) {
        return /^([0-9\s\-\+\(\)]*)$/.test(phone) && phone.replace(/\D/g, '').length >= 10;
    },

    // Validate date format
    validateDate(date) {
        return /^\d{4}-\d{2}-\d{2}$/.test(date);
    },

    // Validate student data
    validateStudentData(data) {
        const errors = [];
        
        if (!data.name || data.name.trim() === '') errors.push('Nama siswa tidak boleh kosong');
        if (!Validation.validateNISN(data.nisn)) errors.push('NISN harus 10 digit');
        if (!data.class) errors.push('Kelas tidak boleh kosong');
        if (!Validation.validateEmail(data.email)) errors.push('Email tidak valid');
        if (!Validation.validatePhone(data.phone)) errors.push('Nomor telepon tidak valid');
        
        return {
            valid: errors.length === 0,
            errors: errors
        };
    },

    // Validate teacher data
    validateTeacherData(data) {
        const errors = [];
        
        if (!data.name || data.name.trim() === '') errors.push('Nama guru tidak boleh kosong');
        if (!Validation.validateNIP(data.nip)) errors.push('NIP tidak valid');
        if (!data.subject) errors.push('Mata pelajaran tidak boleh kosong');
        if (!Validation.validateEmail(data.email)) errors.push('Email tidak valid');
        if (!Validation.validatePhone(data.phone)) errors.push('Nomor telepon tidak valid');
        
        return {
            valid: errors.length === 0,
            errors: errors
        };
    }
};
