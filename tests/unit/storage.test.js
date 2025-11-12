const storage = require('../../src/services/storage');

beforeEach(() => {
  storage.reset();
  storage.seed();
});

test('should not allow duplicate course title', () => {
  storage.create('courses', { title: 'Math', teacher: 'John' });
  const result = storage.create('courses', {
    title: 'Math',
    teacher: 'Someone',
  });
  expect(result.error).toBe('Course title must be unique');
});

test('should list seeded students', () => {
  const students = storage.list('students');
  expect(students.length).toBe(3);
  expect(students[0].name).toBe('Alice');
});

test('should create a new student', () => {
  const result = storage.create('students', {
    name: 'David',
    email: 'david@example.com',
  });
  expect(result.name).toBe('David');
  expect(storage.list('students').length).toBe(4);
});

test('should not allow duplicate student email', () => {
  const result = storage.create('students', {
    name: 'Eve',
    email: 'alice@example.com',
  });
  expect(result.error).toBe('Email must be unique');
});

test('should delete a student', () => {
  const students = storage.list('students');
  const result = storage.remove('students', students[0].id);
  expect(result).toBe(true);
});

test('should allow more than 3 students in a course', () => {
  const students = storage.list('students');
  const course = storage.list('courses')[0];
  storage.create('students', { name: 'Extra', email: 'extra@example.com' });
  storage.create('students', { name: 'Extra2', email: 'extra2@example.com' });
  storage.enroll(students[0].id, course.id);
  storage.enroll(students[1].id, course.id);
  storage.enroll(students[2].id, course.id);
  const result = storage.enroll(4, course.id);
  expect(result.error).toBe('Course is full');
});

// New tests
describe('storage.remove', () => {
  beforeEach(() => {
    storage.reset();
    storage.seed();
  });

  test('should return error when deleting a student enrolled in a course', () => {
    // Enroll Alice (id=1) into Math (id=1)
    storage.enroll(1, 1);

    const result = storage.remove('students', 1);
    // Test spécifique demandé :
    expect(result.error).toBe('Cannot delete student: enrolled in a course');
  });

  test('should return error when deleting a course with enrolled students', () => {
    storage.enroll(1, 1);

    const result = storage.remove('courses', 1);
    expect(result.error).toBe('Cannot delete course: students are enrolled');
  });

  test('should return false when trying to remove a non-existent student', () => {
    const result = storage.remove('students', 999);
    expect(result).toBe(false);
  });

  test('should successfully remove a course with no enrollments', () => {
    const result = storage.remove('courses', 2);
    expect(result).toBe(true);
  });
});

describe('storage.enroll', () => {
  beforeEach(() => {
    storage.reset();
    storage.seed();
  });

  test('should enroll a student successfully', () => {
    // S'assurer que l'étudiant 1 et le cours 1 existent
    const result = storage.enroll(2, 2);
    expect(result.success).toBe(true);
  });

  test('should return error if course does not exist', () => {
    const result = storage.enroll(1, 999);
    expect(result.error).toBe('Course not found');
  });

  test('should return error if student does not exist', () => {
    const result = storage.enroll(999, 1);
    expect(result.error).toBe('Student not found');
  });

  test('should not allow a student to enroll twice in the same course', () => {
    storage.enroll(1, 1);
    const result = storage.enroll(1, 1);
    // Test spécifique demandé :
    expect(result.error).toBe('Student already enrolled in this course');
  });

  test('should return error when course is full (max 3 students)', () => {
    // Créer un 4ème étudiant pour le test
    storage.create('students', { name: 'Extra', email: 'extra@example.com' }); // id = 4

    // Inscrire les 3 étudiants existants
    storage.enroll(1, 1);
    storage.enroll(2, 1);
    storage.enroll(3, 1);

    // Tenter d'inscrire le 4ème étudiant
    const result = storage.enroll(4, 1);
    expect(result.error).toBe('Course is full');
  });
});

describe('storage.unenroll', () => {
  beforeEach(() => {
    storage.reset();
    storage.seed();
  });

  test('should unenroll a student successfully', () => {
    storage.enroll(1, 1);
    const result = storage.unenroll(1, 1);
    expect(result.success).toBe(true);
  });

  test('should return error if enrollment not found', () => {
    const result = storage.unenroll(999, 1);
    expect(result.error).toBe('Enrollment not found');
  });

  test('should return error when unenrolling a student not in the course', () => {
    storage.enroll(1, 1);

    const result = storage.unenroll(4, 1);
    expect(result.error).toBe('Enrollment not found');
  });
});
