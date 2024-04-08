import MemoryRepository from '../repository/memoryRepository';

test('El repositorio guarda y devuelve mensajes correctamente', () => {
  const memoryRepo = new MemoryRepository();

  memoryRepo.save('Mensaje de prueba');

  const mensajes = memoryRepo.getAll();

  expect(mensajes).toContain('Mensaje de prueba');
});

test('El repositorio no contiene mensajes al inicio', () => {
  const memoryRepo = new MemoryRepository();

  const mensajes = memoryRepo.getAll();

  expect(mensajes).toHaveLength(0);
});
