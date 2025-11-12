const request = require('supertest');
const app = require('../../src/app');
const storage = require('../../src/services/storage');

describe('Student-Course API integration', () => {
  beforeEach(() => {
    require('../../src/services/storage').reset();
    require('../../src/services/storage').seed();
  });

  test('GET /students should return seeded students', async () => {
    const res = await request(app).get('/students');
    expect(res.statusCode).toBe(200);
    expect(res.body.students.length).toBe(3);
    expect(res.body.students[0].name).toBe('Alice');
  });

  test('POST /students should create a new student', async () => {
    const res = await request(app)
      .post('/students')
      .send({ name: 'David', email: 'david@example.com' });
    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe('David');
  });

  test('POST /students should not allow duplicate email', async () => {
    const res = await request(app)
      .post('/students')
      .send({ name: 'Eve', email: 'alice@example.com' });
    expect(res.statusCode).toBe(400);
  });

  test('DELETE /courses/:id should delete a course even if students are enrolled', async () => {
    const courses = await request(app).get('/courses');
    const courseId = courses.body.courses[0].id;
    await request(app).post(`/courses/${courseId}/students/1`);
    const res = await request(app).delete(`/courses/${courseId}`);
    expect(res.statusCode).toBe(400);
  });

  describe('Student details and updates', () => {
    test('GET /students/:id should return a student and their courses', async () => {
      const res = await request(app).get('/students/1');
      expect(res.statusCode).toBe(200);
      expect(res.body.student).toBeDefined();
      expect(res.body.student.id).toBe(1);
      expect(Array.isArray(res.body.courses)).toBe(true);
    });

    test('GET /students/:id should return 404 if student does not exist', async () => {
      const res = await request(app).get('/students/999');
      expect(res.statusCode).toBe(404);
      expect(res.body.error).toBe('Student not found');
    });

    test('PUT /students/:id should update student name and email', async () => {
      const res = await request(app)
        .put('/students/1')
        .send({ name: 'Alice Updated', email: 'alice_updated@example.com' });

      expect(res.statusCode).toBe(200);
      expect(res.body.name).toBe('Alice Updated');
      expect(res.body.email).toBe('alice_updated@example.com');
    });

    test('PUT /students/:id should not allow duplicate email', async () => {
      const res = await request(app).put('/students/2').send({ email: 'alice@example.com' });
      expect(res.statusCode).toBe(400);
      expect(res.body.error).toBe('Email must be unique');
    });

    test('PUT /students/:id should return 404 if student not found', async () => {
      const res = await request(app).put('/students/999').send({ name: 'Ghost' });
      expect(res.statusCode).toBe(404);
      expect(res.body.error).toBe('Student not found');
    });

    test('DELETE /students/:id should delete a student', async () => {
      const res = await request(app).delete('/students/2');
      expect(res.statusCode).toBe(204);
    });

    test('DELETE /students/:id should return 404 if student not found', async () => {
      const res = await request(app).delete('/students/999');
      expect(res.statusCode).toBe(404);
      expect(res.body.error).toBe('Student not found');
    });
  });

  describe('Course management', () => {
    test('GET /courses/:id should return a course and its students', async () => {
      const res = await request(app).get('/courses/1');
      expect(res.statusCode).toBe(200);
      expect(res.body.course).toBeDefined();
      expect(res.body.course.id).toBe(1);
      expect(Array.isArray(res.body.students)).toBe(true);
    });

    test('GET /courses/:id should return 404 if course not found', async () => {
      const res = await request(app).get('/courses/999');
      expect(res.statusCode).toBe(404);
      expect(res.body.error).toBe('Course not found');
    });

    test('POST /courses should create a new course', async () => {
      const res = await request(app)
        .post('/courses')
        .send({ title: 'New Course', teacher: 'Dr. Who' });
      expect(res.statusCode).toBe(201);
      expect(res.body.title).toBe('New Course');
      expect(res.body.teacher).toBe('Dr. Who');
    });

    test('POST /courses should return 400 if title or teacher missing', async () => {
      const res = await request(app).post('/courses').send({ title: '' });
      expect(res.statusCode).toBe(400);
      expect(res.body.error).toBe('title and teacher required');
    });

    test('PUT /courses/:id should update title and teacher', async () => {
      const res = await request(app)
        .put('/courses/1')
        .send({ title: 'Updated Course', teacher: 'Prof. Xavier' });
      expect(res.statusCode).toBe(200);
      expect(res.body.title).toBe('Updated Course');
      expect(res.body.teacher).toBe('Prof. Xavier');
    });

    test('PUT /courses/:id should return 404 if course not found', async () => {
      const res = await request(app).put('/courses/999').send({ title: 'Nonexistent' });
      expect(res.statusCode).toBe(404);
      expect(res.body.error).toBe('Course not found');
    });

    test('PUT /courses/:id should not allow duplicate course title', async () => {
      const res = await request(app).put('/courses/2').send({ title: 'Math' });
      expect(res.statusCode).toBe(400);
      expect(res.body.error).toBe('Course title must be unique');
    });

    // Nouveau bloc pour DELETE /courses/:courseId/students/:studentId
    describe('DELETE /courses/:courseId/students/:studentId', () => {
      test('should unenroll a student successfully', async () => {
        await request(app).post('/courses/1/students/1');
        const res = await request(app).delete('/courses/1/students/1');
        expect(res.statusCode).toBe(204);
        expect(res.text).toBe('');
      });

      test('should return 404 if student not enrolled', async () => {
        const res = await request(app).delete('/courses/1/students/2');
        expect(res.statusCode).toBe(404);
        expect(res.body.error).toBe('Enrollment not found');
      });

      test('should return 404 if course does not exist', async () => {
        const res = await request(app).delete('/courses/999/students/1');
        expect(res.statusCode).toBe(404);
        expect(res.body.error).toBe('Enrollment not found');
      });
    });
  });
  describe('App initialization and middleware', () => {
    beforeEach(() => {
      storage.reset();
    });

    test('storage.seed() should initialize students and courses', () => {
      storage.seed();

      const students = storage.list('students');
      const courses = storage.list('courses');

      // Vérifie qu'il y a bien des étudiants et des cours
      expect(students.length).toBeGreaterThan(0);
      expect(courses.length).toBeGreaterThan(0);

      // Vérifie des valeurs précises
      expect(students[0].name).toBe('Alice');
      expect(students[0].email).toBe('alice@example.com');
      expect(courses[0].title).toBe('Math');
      expect(courses[0].teacher).toBe('Mr. Smith');
    });

    test('routes /students and /courses should be mounted', async () => {
      // On teste que les routes renvoient bien quelque chose
      const studentsRes = await request(app).get('/students');
      expect(studentsRes.statusCode).toBe(200);
      expect(Array.isArray(studentsRes.body.students)).toBe(true);

      const coursesRes = await request(app).get('/courses');
      expect(coursesRes.statusCode).toBe(200);
      expect(Array.isArray(coursesRes.body.courses)).toBe(true);
    });

    test('should return 404 for unknown routes', async () => {
      const res = await request(app).get('/non-existent-route');
      expect(res.statusCode).toBe(404);
      expect(res.body).toEqual({ error: 'Not Found' });
    });
  });
});
