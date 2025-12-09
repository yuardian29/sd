// api-connector.js
// Connector untuk call backend API yang sudah di-deploy di cloud
// Digunakan oleh frontend untuk CRUD operations ke Couchbase via backend server

class ApiConnector {
  constructor() {
    // API Base URL - dari environment atau default localhost
    // Di Netlify: Set environment variable REACT_APP_API_URL
    // Format: https://your-backend.onrender.com atau http://localhost:3000
    
    this.API_BASE = this.getApiUrl();
    this.timeout = 10000; // 10 detik timeout
    
    console.log('🔌 ApiConnector initialized');
    console.log('📍 API Base URL:', this.API_BASE);
  }

  // Deteksi API URL berdasarkan environment
  getApiUrl() {
    // Production (Netlify)
    if (typeof process !== 'undefined' && process.env.REACT_APP_API_URL) {
      return process.env.REACT_APP_API_URL;
    }

    // Development (localhost)
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      return 'http://localhost:3000';
    }

    // Fallback
    return window.location.origin;
  }

  // ========================
  // HELPER METHODS
  // ========================

  async fetchWithTimeout(url, options = {}) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal
      });
      clearTimeout(timeout);
      return response;
    } catch (error) {
      clearTimeout(timeout);
      throw error;
    }
  }

  // ========================
  // HEALTH CHECK
  // ========================

  async checkHealth() {
    try {
      const response = await this.fetchWithTimeout(`${this.API_BASE}/api/health`);
      const data = await response.json();
      console.log('✅ Backend health:', data);
      return { status: 'ok', data: data };
    } catch (error) {
      console.error('❌ Backend error:', error.message);
      return { status: 'error', error: error.message };
    }
  }

  // ========================
  // STUDENT OPERATIONS
  // ========================

  // Get all students
  async getStudents(filters = {}) {
    try {
      let url = `${this.API_BASE}/api/students`;
      
      // Add query parameters jika ada filters
      if (Object.keys(filters).length > 0) {
        const params = new URLSearchParams(filters);
        url += `?${params}`;
      }

      const response = await this.fetchWithTimeout(url);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();
      console.log('✅ Students retrieved:', data);
      return data;
    } catch (error) {
      console.error('❌ Error fetching students:', error.message);
      return { status: 'error', message: error.message, data: [] };
    }
  }

  // Add new student
  async addStudent(studentData) {
    try {
      const response = await this.fetchWithTimeout(`${this.API_BASE}/api/students`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(studentData)
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();
      console.log('✅ Student added:', data);
      return data;
    } catch (error) {
      console.error('❌ Error adding student:', error.message);
      return { status: 'error', message: error.message };
    }
  }

  // Get student by NISN
  async getStudent(nisn) {
    try {
      const response = await this.fetchWithTimeout(`${this.API_BASE}/api/students/${nisn}`);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();
      console.log('✅ Student retrieved:', data);
      return data;
    } catch (error) {
      console.error('❌ Error fetching student:', error.message);
      return { status: 'error', message: error.message };
    }
  }

  // Update student
  async updateStudent(nisn, studentData) {
    try {
      const response = await this.fetchWithTimeout(`${this.API_BASE}/api/students/${nisn}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(studentData)
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();
      console.log('✅ Student updated:', data);
      return data;
    } catch (error) {
      console.error('❌ Error updating student:', error.message);
      return { status: 'error', message: error.message };
    }
  }

  // Delete student
  async deleteStudent(nisn) {
    try {
      const response = await this.fetchWithTimeout(`${this.API_BASE}/api/students/${nisn}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();
      console.log('✅ Student deleted:', data);
      return data;
    } catch (error) {
      console.error('❌ Error deleting student:', error.message);
      return { status: 'error', message: error.message };
    }
  }

  // ========================
  // TEACHER OPERATIONS
  // ========================

  // Get all teachers
  async getTeachers(filters = {}) {
    try {
      let url = `${this.API_BASE}/api/teachers`;

      if (Object.keys(filters).length > 0) {
        const params = new URLSearchParams(filters);
        url += `?${params}`;
      }

      const response = await this.fetchWithTimeout(url);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();
      console.log('✅ Teachers retrieved:', data);
      return data;
    } catch (error) {
      console.error('❌ Error fetching teachers:', error.message);
      return { status: 'error', message: error.message, data: [] };
    }
  }

  // Add new teacher
  async addTeacher(teacherData) {
    try {
      const response = await this.fetchWithTimeout(`${this.API_BASE}/api/teachers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(teacherData)
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();
      console.log('✅ Teacher added:', data);
      return data;
    } catch (error) {
      console.error('❌ Error adding teacher:', error.message);
      return { status: 'error', message: error.message };
    }
  }

  // Get teacher by NIP
  async getTeacher(nip) {
    try {
      const response = await this.fetchWithTimeout(`${this.API_BASE}/api/teachers/${nip}`);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();
      console.log('✅ Teacher retrieved:', data);
      return data;
    } catch (error) {
      console.error('❌ Error fetching teacher:', error.message);
      return { status: 'error', message: error.message };
    }
  }

  // Update teacher
  async updateTeacher(nip, teacherData) {
    try {
      const response = await this.fetchWithTimeout(`${this.API_BASE}/api/teachers/${nip}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(teacherData)
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();
      console.log('✅ Teacher updated:', data);
      return data;
    } catch (error) {
      console.error('❌ Error updating teacher:', error.message);
      return { status: 'error', message: error.message };
    }
  }

  // Delete teacher
  async deleteTeacher(nip) {
    try {
      const response = await this.fetchWithTimeout(`${this.API_BASE}/api/teachers/${nip}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();
      console.log('✅ Teacher deleted:', data);
      return data;
    } catch (error) {
      console.error('❌ Error deleting teacher:', error.message);
      return { status: 'error', message: error.message };
    }
  }

  // ========================
  // CLASSES OPERATIONS
  // ========================

  async getClasses() {
    try {
      const response = await this.fetchWithTimeout(`${this.API_BASE}/api/classes`);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error('❌ Error fetching classes:', error.message);
      return { status: 'error', message: error.message, data: [] };
    }
  }

  async addClass(classData) {
    try {
      const response = await this.fetchWithTimeout(`${this.API_BASE}/api/classes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(classData)
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error('❌ Error adding class:', error.message);
      return { status: 'error', message: error.message };
    }
  }

  // ========================
  // SUBJECTS OPERATIONS
  // ========================

  async getSubjects() {
    try {
      const response = await this.fetchWithTimeout(`${this.API_BASE}/api/subjects`);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error('❌ Error fetching subjects:', error.message);
      return { status: 'error', message: error.message, data: [] };
    }
  }

  async addSubject(subjectData) {
    try {
      const response = await this.fetchWithTimeout(`${this.API_BASE}/api/subjects`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(subjectData)
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error('❌ Error adding subject:', error.message);
      return { status: 'error', message: error.message };
    }
  }

  // ========================
  // GRADES OPERATIONS
  // ========================

  async getGrades(filters = {}) {
    try {
      let url = `${this.API_BASE}/api/grades`;
      if (Object.keys(filters).length > 0) {
        const params = new URLSearchParams(filters);
        url += `?${params}`;
      }
      const response = await this.fetchWithTimeout(url);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error('❌ Error fetching grades:', error.message);
      return { status: 'error', message: error.message, data: [] };
    }
  }

  async addGrade(gradeData) {
    try {
      const response = await this.fetchWithTimeout(`${this.API_BASE}/api/grades`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(gradeData)
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error('❌ Error adding grade:', error.message);
      return { status: 'error', message: error.message };
    }
  }

  async updateGrade(gradeId, gradeData) {
    try {
      const response = await this.fetchWithTimeout(`${this.API_BASE}/api/grades/${gradeId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(gradeData)
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error('❌ Error updating grade:', error.message);
      return { status: 'error', message: error.message };
    }
  }

  // ========================
  // ATTENDANCE OPERATIONS
  // ========================

  async getAttendance(filters = {}) {
    try {
      let url = `${this.API_BASE}/api/attendance`;
      if (Object.keys(filters).length > 0) {
        const params = new URLSearchParams(filters);
        url += `?${params}`;
      }
      const response = await this.fetchWithTimeout(url);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error('❌ Error fetching attendance:', error.message);
      return { status: 'error', message: error.message, data: [] };
    }
  }

  async addAttendance(attendanceData) {
    try {
      const response = await this.fetchWithTimeout(`${this.API_BASE}/api/attendance`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(attendanceData)
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error('❌ Error adding attendance:', error.message);
      return { status: 'error', message: error.message };
    }
  }

  // ========================
  // UTILITY METHODS
  // ========================

  // Batch update students
  async batchUpdateStudents(updates) {
    try {
      const promises = updates.map(({ nisn, data }) =>
        this.updateStudent(nisn, data)
      );
      const results = await Promise.all(promises);
      return { status: 'success', data: results };
    } catch (error) {
      console.error('❌ Error in batch update:', error.message);
      return { status: 'error', message: error.message };
    }
  }

  // Batch delete students
  async batchDeleteStudents(nisns) {
    try {
      const promises = nisns.map(nisn => this.deleteStudent(nisn));
      const results = await Promise.all(promises);
      return { status: 'success', count: results.length };
    } catch (error) {
      console.error('❌ Error in batch delete:', error.message);
      return { status: 'error', message: error.message };
    }
  }

  // Get statistics
  async getStatistics() {
    try {
      const response = await this.fetchWithTimeout(`${this.API_BASE}/api/statistics`);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error('❌ Error fetching statistics:', error.message);
      return { status: 'error', message: error.message };
    }
  }

  // Search across all data
  async search(query) {
    try {
      const response = await this.fetchWithTimeout(
        `${this.API_BASE}/api/search?q=${encodeURIComponent(query)}`
      );
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error('❌ Error searching:', error.message);
      return { status: 'error', message: error.message, data: [] };
    }
  }
}

// Singleton instance
const apiConnector = new ApiConnector();

// Export untuk Node.js (jika diperlukan)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ApiConnector;
}
