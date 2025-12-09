// ===================================
// DATABASE MANAGEMENT SYSTEM
// ===================================

// Local Storage Database Manager
const Database = {
    // Initialize database with default data
    init() {
        if (!localStorage.getItem('school_db_initialized')) {
            this.resetDatabase();
            localStorage.setItem('school_db_initialized', 'true');
        }
    },

    // Reset database to default values
    resetDatabase() {
        localStorage.setItem('students', JSON.stringify(this.defaultStudents));
        localStorage.setItem('teachers', JSON.stringify(this.defaultTeachers));
        localStorage.setItem('admins', JSON.stringify(this.defaultAdmins));
        localStorage.setItem('classes', JSON.stringify(this.defaultClasses));
        localStorage.setItem('subjects', JSON.stringify(this.defaultSubjects));
        localStorage.setItem('schedules', JSON.stringify(this.defaultSchedules));
        localStorage.setItem('grades', JSON.stringify(this.defaultGrades));
        localStorage.setItem('attendance', JSON.stringify(this.defaultAttendance));
        localStorage.setItem('assignments', JSON.stringify(this.defaultAssignments));
        localStorage.setItem('announcements', JSON.stringify(this.defaultAnnouncements));
        localStorage.setItem('messages', JSON.stringify(this.defaultMessages));
    },

    // ===== STUDENTS =====
    getStudents() {
        return JSON.parse(localStorage.getItem('students') || '[]');
    },

    getStudentById(id) {
        const students = this.getStudents();
        return students.find(s => s.id === id);
    },

    getStudentByNISN(nisn) {
        const students = this.getStudents();
        return students.find(s => s.nisn === nisn);
    },

    addStudent(student) {
        const students = this.getStudents();
        student.id = Date.now().toString();
        student.createdAt = new Date().toISOString();
        students.push(student);
        localStorage.setItem('students', JSON.stringify(students));
        return student;
    },

    updateStudent(id, updates) {
        const students = this.getStudents();
        const index = students.findIndex(s => s.id === id);
        if (index !== -1) {
            students[index] = { ...students[index], ...updates, updatedAt: new Date().toISOString() };
            localStorage.setItem('students', JSON.stringify(students));
            return students[index];
        }
        return null;
    },

    deleteStudent(id) {
        const students = this.getStudents();
        const filtered = students.filter(s => s.id !== id);
        localStorage.setItem('students', JSON.stringify(filtered));
        return true;
    },

    getStudentsByClass(className) {
        const students = this.getStudents();
        return students.filter(s => s.class === className);
    },

    // ===== TEACHERS =====
    getTeachers() {
        return JSON.parse(localStorage.getItem('teachers') || '[]');
    },

    getTeacherById(id) {
        const teachers = this.getTeachers();
        return teachers.find(t => t.id === id);
    },

    getTeacherByNIP(nip) {
        const teachers = this.getTeachers();
        return teachers.find(t => t.nip === nip);
    },

    addTeacher(teacher) {
        const teachers = this.getTeachers();
        teacher.id = Date.now().toString();
        teacher.createdAt = new Date().toISOString();
        teachers.push(teacher);
        localStorage.setItem('teachers', JSON.stringify(teachers));
        return teacher;
    },

    updateTeacher(id, updates) {
        const teachers = this.getTeachers();
        const index = teachers.findIndex(t => t.id === id);
        if (index !== -1) {
            teachers[index] = { ...teachers[index], ...updates, updatedAt: new Date().toISOString() };
            localStorage.setItem('teachers', JSON.stringify(teachers));
            return teachers[index];
        }
        return null;
    },

    deleteTeacher(id) {
        const teachers = this.getTeachers();
        const filtered = teachers.filter(t => t.id !== id);
        localStorage.setItem('teachers', JSON.stringify(filtered));
        return true;
    },

    // ===== CLASSES =====
    getClasses() {
        return JSON.parse(localStorage.getItem('classes') || '[]');
    },

    getClassById(id) {
        const classes = this.getClasses();
        return classes.find(c => c.id === id);
    },

    getClassByName(name) {
        const classes = this.getClasses();
        return classes.find(c => c.name === name);
    },

    addClass(classData) {
        const classes = this.getClasses();
        classData.id = Date.now().toString();
        classData.createdAt = new Date().toISOString();
        classes.push(classData);
        localStorage.setItem('classes', JSON.stringify(classes));
        return classData;
    },

    updateClass(id, updates) {
        const classes = this.getClasses();
        const index = classes.findIndex(c => c.id === id);
        if (index !== -1) {
            classes[index] = { ...classes[index], ...updates };
            localStorage.setItem('classes', JSON.stringify(classes));
            return classes[index];
        }
        return null;
    },

    deleteClass(id) {
        const classes = this.getClasses();
        const filtered = classes.filter(c => c.id !== id);
        localStorage.setItem('classes', JSON.stringify(filtered));
        return true;
    },

    // ===== SUBJECTS =====
    getSubjects() {
        return JSON.parse(localStorage.getItem('subjects') || '[]');
    },

    getSubjectById(id) {
        const subjects = this.getSubjects();
        return subjects.find(s => s.id === id);
    },

    addSubject(subject) {
        const subjects = this.getSubjects();
        subject.id = Date.now().toString();
        subjects.push(subject);
        localStorage.setItem('subjects', JSON.stringify(subjects));
        return subject;
    },

    updateSubject(id, updates) {
        const subjects = this.getSubjects();
        const index = subjects.findIndex(s => s.id === id);
        if (index !== -1) {
            subjects[index] = { ...subjects[index], ...updates };
            localStorage.setItem('subjects', JSON.stringify(subjects));
            return subjects[index];
        }
        return null;
    },

    deleteSubject(id) {
        const subjects = this.getSubjects();
        const filtered = subjects.filter(s => s.id !== id);
        localStorage.setItem('subjects', JSON.stringify(filtered));
        return true;
    },

    // ===== SCHEDULES =====
    getSchedules() {
        return JSON.parse(localStorage.getItem('schedules') || '[]');
    },

    getScheduleById(id) {
        const schedules = this.getSchedules();
        return schedules.find(s => s.id === id);
    },

    getSchedulesByClass(className) {
        const schedules = this.getSchedules();
        return schedules.filter(s => s.className === className);
    },

    getSchedulesByTeacher(teacherId) {
        const schedules = this.getSchedules();
        return schedules.filter(s => s.teacherId === teacherId);
    },

    addSchedule(schedule) {
        const schedules = this.getSchedules();
        schedule.id = Date.now().toString();
        schedules.push(schedule);
        localStorage.setItem('schedules', JSON.stringify(schedules));
        return schedule;
    },

    updateSchedule(id, updates) {
        const schedules = this.getSchedules();
        const index = schedules.findIndex(s => s.id === id);
        if (index !== -1) {
            schedules[index] = { ...schedules[index], ...updates };
            localStorage.setItem('schedules', JSON.stringify(schedules));
            return schedules[index];
        }
        return null;
    },

    deleteSchedule(id) {
        const schedules = this.getSchedules();
        const filtered = schedules.filter(s => s.id !== id);
        localStorage.setItem('schedules', JSON.stringify(filtered));
        return true;
    },

    // ===== GRADES =====
    getGrades() {
        return JSON.parse(localStorage.getItem('grades') || '[]');
    },

    getGradeById(id) {
        const grades = this.getGrades();
        return grades.find(g => g.id === id);
    },

    getGradesByStudent(studentId) {
        const grades = this.getGrades();
        return grades.filter(g => g.studentId === studentId);
    },

    getGradesByClass(className) {
        const grades = this.getGrades();
        return grades.filter(g => g.className === className);
    },

    getGradesBySubject(subjectId) {
        const grades = this.getGrades();
        return grades.filter(g => g.subjectId === subjectId);
    },

    addGrade(grade) {
        const grades = this.getGrades();
        grade.id = Date.now().toString();
        grade.createdAt = new Date().toISOString();
        grades.push(grade);
        localStorage.setItem('grades', JSON.stringify(grades));
        return grade;
    },

    updateGrade(id, updates) {
        const grades = this.getGrades();
        const index = grades.findIndex(g => g.id === id);
        if (index !== -1) {
            grades[index] = { ...grades[index], ...updates, updatedAt: new Date().toISOString() };
            localStorage.setItem('grades', JSON.stringify(grades));
            return grades[index];
        }
        return null;
    },

    deleteGrade(id) {
        const grades = this.getGrades();
        const filtered = grades.filter(g => g.id !== id);
        localStorage.setItem('grades', JSON.stringify(filtered));
        return true;
    },

    // ===== ATTENDANCE =====
    getAttendance() {
        return JSON.parse(localStorage.getItem('attendance') || '[]');
    },

    getAttendanceById(id) {
        const attendance = this.getAttendance();
        return attendance.find(a => a.id === id);
    },

    getAttendanceByStudent(studentId) {
        const attendance = this.getAttendance();
        return attendance.filter(a => a.studentId === studentId);
    },

    getAttendanceByClass(className) {
        const attendance = this.getAttendance();
        return attendance.filter(a => a.className === className);
    },

    getAttendanceByDate(date) {
        const attendance = this.getAttendance();
        return attendance.filter(a => a.date === date);
    },

    addAttendance(record) {
        const attendance = this.getAttendance();
        record.id = Date.now().toString();
        record.createdAt = new Date().toISOString();
        attendance.push(record);
        localStorage.setItem('attendance', JSON.stringify(attendance));
        return record;
    },

    updateAttendance(id, updates) {
        const attendance = this.getAttendance();
        const index = attendance.findIndex(a => a.id === id);
        if (index !== -1) {
            attendance[index] = { ...attendance[index], ...updates };
            localStorage.setItem('attendance', JSON.stringify(attendance));
            return attendance[index];
        }
        return null;
    },

    deleteAttendance(id) {
        const attendance = this.getAttendance();
        const filtered = attendance.filter(a => a.id !== id);
        localStorage.setItem('attendance', JSON.stringify(filtered));
        return true;
    },

    // ===== ASSIGNMENTS =====
    getAssignments() {
        return JSON.parse(localStorage.getItem('assignments') || '[]');
    },

    getAssignmentById(id) {
        const assignments = this.getAssignments();
        return assignments.find(a => a.id === id);
    },

    getAssignmentsByClass(className) {
        const assignments = this.getAssignments();
        return assignments.filter(a => a.className === className);
    },

    getAssignmentsBySubject(subjectId) {
        const assignments = this.getAssignments();
        return assignments.filter(a => a.subjectId === subjectId);
    },

    addAssignment(assignment) {
        const assignments = this.getAssignments();
        assignment.id = Date.now().toString();
        assignment.createdAt = new Date().toISOString();
        assignment.submissions = assignment.submissions || [];
        assignments.push(assignment);
        localStorage.setItem('assignments', JSON.stringify(assignments));
        return assignment;
    },

    updateAssignment(id, updates) {
        const assignments = this.getAssignments();
        const index = assignments.findIndex(a => a.id === id);
        if (index !== -1) {
            assignments[index] = { ...assignments[index], ...updates, updatedAt: new Date().toISOString() };
            localStorage.setItem('assignments', JSON.stringify(assignments));
            return assignments[index];
        }
        return null;
    },

    deleteAssignment(id) {
        const assignments = this.getAssignments();
        const filtered = assignments.filter(a => a.id !== id);
        localStorage.setItem('assignments', JSON.stringify(filtered));
        return true;
    },

    addAssignmentSubmission(assignmentId, submission) {
        const assignments = this.getAssignments();
        const assignment = assignments.find(a => a.id === assignmentId);
        if (assignment) {
            submission.id = Date.now().toString();
            submission.submittedAt = new Date().toISOString();
            assignment.submissions.push(submission);
            localStorage.setItem('assignments', JSON.stringify(assignments));
            return submission;
        }
        return null;
    },

    // ===== ANNOUNCEMENTS =====
    getAnnouncements() {
        return JSON.parse(localStorage.getItem('announcements') || '[]');
    },

    getAnnouncementById(id) {
        const announcements = this.getAnnouncements();
        return announcements.find(a => a.id === id);
    },

    addAnnouncement(announcement) {
        const announcements = this.getAnnouncements();
        announcement.id = Date.now().toString();
        announcement.createdAt = new Date().toISOString();
        announcements.push(announcement);
        localStorage.setItem('announcements', JSON.stringify(announcements));
        return announcement;
    },

    updateAnnouncement(id, updates) {
        const announcements = this.getAnnouncements();
        const index = announcements.findIndex(a => a.id === id);
        if (index !== -1) {
            announcements[index] = { ...announcements[index], ...updates, updatedAt: new Date().toISOString() };
            localStorage.setItem('announcements', JSON.stringify(announcements));
            return announcements[index];
        }
        return null;
    },

    deleteAnnouncement(id) {
        const announcements = this.getAnnouncements();
        const filtered = announcements.filter(a => a.id !== id);
        localStorage.setItem('announcements', JSON.stringify(filtered));
        return true;
    },

    // ===== MESSAGES =====
    getMessages() {
        return JSON.parse(localStorage.getItem('messages') || '[]');
    },

    getMessageById(id) {
        const messages = this.getMessages();
        return messages.find(m => m.id === id);
    },

    getMessagesByUser(userId) {
        const messages = this.getMessages();
        return messages.filter(m => m.senderId === userId || m.recipientId === userId);
    },

    addMessage(message) {
        const messages = this.getMessages();
        message.id = Date.now().toString();
        message.sentAt = new Date().toISOString();
        message.read = false;
        messages.push(message);
        localStorage.setItem('messages', JSON.stringify(messages));
        return message;
    },

    markMessageAsRead(id) {
        const messages = this.getMessages();
        const index = messages.findIndex(m => m.id === id);
        if (index !== -1) {
            messages[index].read = true;
            messages[index].readAt = new Date().toISOString();
            localStorage.setItem('messages', JSON.stringify(messages));
            return messages[index];
        }
        return null;
    },

    deleteMessage(id) {
        const messages = this.getMessages();
        const filtered = messages.filter(m => m.id !== id);
        localStorage.setItem('messages', JSON.stringify(filtered));
        return true;
    },

    // ===== LOGS =====
    addLog(activity) {
        const logs = JSON.parse(localStorage.getItem('logs') || '[]');
        activity.id = Date.now().toString();
        activity.timestamp = new Date().toISOString();
        logs.push(activity);
        // Keep only last 1000 logs
        if (logs.length > 1000) {
            logs.shift();
        }
        localStorage.setItem('logs', JSON.stringify(logs));
        return activity;
    },

    getLogs(limit = 100) {
        const logs = JSON.parse(localStorage.getItem('logs') || '[]');
        return logs.slice(-limit).reverse();
    },

    // ===== DEFAULT DATA =====
    defaultStudents: [
        {
            id: '1',
            nisn: '0098765432',
            password: 'password123',
            name: 'Budi Santoso',
            class: 'XII IPA 1',
            gender: 'Laki-laki',
            phone: '082156789012',
            email: 'budi@student.sch.id',
            parentName: 'Santoso Wijaya',
            parentPhone: '082145678901',
            address: 'Jl. Merdeka No. 123',
            dateOfBirth: '2006-05-15',
            status: 'Aktif',
            role: 'student',
            createdAt: new Date().toISOString()
        },
        {
            id: '2',
            nisn: '0087654321',
            password: 'password123',
            name: 'Siti Nurhaliza',
            class: 'XII IPS 2',
            gender: 'Perempuan',
            phone: '081234567890',
            email: 'siti@student.sch.id',
            parentName: 'Haliza Rahman',
            parentPhone: '081223456789',
            address: 'Jl. Sudirman No. 456',
            dateOfBirth: '2006-03-20',
            status: 'Aktif',
            role: 'student',
            createdAt: new Date().toISOString()
        }
    ],

    defaultTeachers: [
        {
            id: '1',
            nip: '123456789',
            password: 'guru123',
            name: 'Drs. Ahmad Priyono',
            subject: 'Matematika',
            phone: '081987654321',
            email: 'ahmad.priyono@sch.id',
            status: 'Aktif',
            qualification: 'S1 Pendidikan Matematika',
            experience: '15 Tahun',
            role: 'teacher',
            createdAt: new Date().toISOString()
        },
        {
            id: '2',
            nip: '987654321',
            password: 'guru123',
            name: 'Ibu Srika Dewi, S.Pd',
            subject: 'Bahasa Indonesia',
            phone: '081876543210',
            email: 'srika.dewi@sch.id',
            status: 'Aktif',
            qualification: 'S1 Pendidikan Bahasa Indonesia',
            experience: '12 Tahun',
            role: 'teacher',
            createdAt: new Date().toISOString()
        }
    ],

    defaultAdmins: [
        {
            id: '1',
            username: 'admin',
            password: 'admin123',
            name: 'Sistem Administrator',
            position: 'Admin Tata Usaha',
            phone: '081765432109',
            email: 'admin@sch.id',
            role: 'admin',
            createdAt: new Date().toISOString()
        }
    ],

    defaultClasses: [
        {
            id: '1',
            name: 'XII IPA 1',
            headmasterId: '1',
            headmasterName: 'Drs. Budi Santoso',
            room: '12 IPA 1',
            totalStudents: 35,
            academicYear: '2024/2025',
            status: 'Aktif',
            createdAt: new Date().toISOString()
        },
        {
            id: '2',
            name: 'XII IPA 2',
            headmasterId: '2',
            headmasterName: 'Ibu Sri Rahayu',
            room: '12 IPA 2',
            totalStudents: 36,
            academicYear: '2024/2025',
            status: 'Aktif',
            createdAt: new Date().toISOString()
        },
        {
            id: '3',
            name: 'XII IPS 1',
            headmasterId: '3',
            headmasterName: 'Drs. Ahmad Wijaya',
            room: '12 IPS 1',
            totalStudents: 34,
            academicYear: '2024/2025',
            status: 'Aktif',
            createdAt: new Date().toISOString()
        }
    ],

    defaultSubjects: [
        { id: '1', code: 'MAT', name: 'Matematika', creditHours: 4, createdAt: new Date().toISOString() },
        { id: '2', code: 'BI', name: 'Bahasa Indonesia', creditHours: 3, createdAt: new Date().toISOString() },
        { id: '3', code: 'BIG', name: 'Bahasa Inggris', creditHours: 3, createdAt: new Date().toISOString() },
        { id: '4', code: 'FIS', name: 'Fisika', creditHours: 4, createdAt: new Date().toISOString() },
        { id: '5', code: 'KIM', name: 'Kimia', creditHours: 4, createdAt: new Date().toISOString() },
        { id: '6', code: 'BIO', name: 'Biologi', creditHours: 4, createdAt: new Date().toISOString() }
    ],

    defaultSchedules: [
        {
            id: '1',
            day: 'Senin',
            startTime: '08:00',
            endTime: '09:00',
            className: 'XII IPA 1',
            subjectId: '1',
            subjectName: 'Matematika',
            teacherId: '1',
            teacherName: 'Drs. Ahmad Priyono',
            room: '12 IPA 1',
            createdAt: new Date().toISOString()
        },
        {
            id: '2',
            day: 'Senin',
            startTime: '09:00',
            endTime: '10:00',
            className: 'XII IPA 1',
            subjectId: '2',
            subjectName: 'Bahasa Indonesia',
            teacherId: '2',
            teacherName: 'Ibu Srika Dewi, S.Pd',
            room: '12 IPA 1',
            createdAt: new Date().toISOString()
        }
    ],

    defaultGrades: [
        {
            id: '1',
            studentId: '1',
            studentName: 'Budi Santoso',
            className: 'XII IPA 1',
            subjectId: '1',
            subjectName: 'Matematika',
            uh: 85,
            uts: 88,
            uas: 90,
            assignment: 87,
            finalGrade: 87.5,
            grade: 'A',
            createdAt: new Date().toISOString()
        },
        {
            id: '2',
            studentId: '1',
            studentName: 'Budi Santoso',
            className: 'XII IPA 1',
            subjectId: '2',
            subjectName: 'Bahasa Indonesia',
            uh: 82,
            uts: 85,
            uas: 84,
            assignment: 86,
            finalGrade: 84.25,
            grade: 'B+',
            createdAt: new Date().toISOString()
        }
    ],

    defaultAttendance: [
        {
            id: '1',
            studentId: '1',
            studentName: 'Budi Santoso',
            className: 'XII IPA 1',
            date: new Date().toISOString().split('T')[0],
            status: 'Hadir',
            notes: '',
            createdAt: new Date().toISOString()
        },
        {
            id: '2',
            studentId: '2',
            studentName: 'Siti Nurhaliza',
            className: 'XII IPS 2',
            date: new Date().toISOString().split('T')[0],
            status: 'Hadir',
            notes: '',
            createdAt: new Date().toISOString()
        }
    ],

    defaultAssignments: [
        {
            id: '1',
            className: 'XII IPA 1',
            subjectId: '1',
            subjectName: 'Matematika',
            teacherId: '1',
            teacherName: 'Drs. Ahmad Priyono',
            title: 'Soal Integral hal 45-50',
            description: 'Kerjakan semua soal integral dengan menunjukkan langkah-langkah',
            dueDate: new Date(Date.now() + 3*24*60*60*1000).toISOString().split('T')[0],
            status: 'Aktif',
            submissions: [],
            createdAt: new Date().toISOString()
        }
    ],

    defaultAnnouncements: [
        {
            id: '1',
            title: 'Libur Nasional',
            content: 'Libur nasional akan diterapkan mulai tanggal 15 Desember sampai 22 Desember 2024.',
            author: 'Kepala Sekolah',
            audience: 'Semua',
            priority: 'Tinggi',
            createdAt: new Date().toISOString()
        },
        {
            id: '2',
            title: 'Pengumpulan Tugas Ditunda',
            content: 'Pengumpulan tugas Matematika untuk kelas XII ditunda hingga Jumat pukul 17:00.',
            author: 'Drs. Ahmad Priyono',
            audience: 'Siswa',
            priority: 'Normal',
            createdAt: new Date().toISOString()
        }
    ],

    defaultMessages: [
        {
            id: '1',
            senderId: 'teacher-1',
            senderName: 'Drs. Ahmad Priyono',
            senderRole: 'teacher',
            recipientId: 'student-1',
            recipientName: 'Budi Santoso',
            recipientRole: 'student',
            subject: 'Tugas Matematika',
            message: 'Tolong segera kerjakan tugas integral yang sudah diberikan',
            sentAt: new Date().toISOString(),
            read: false
        }
    ]
};

// Initialize database on load
document.addEventListener('DOMContentLoaded', function() {
    Database.init();
});
