import MemoryRepository from '../repository/memoryRepository';
import Logger from '..';

test('El repositorio guarda y devuelve mensajes correctamente', () => {
  const memoryRepo = new MemoryRepository();
  const loggerPrueba = new Logger(memoryRepo);
  const mensajes = memoryRepo.getAll();
  loggerPrueba.error('Mensaje de error')
  expect(mensajes).toContain('[error]Mensaje de error');
});

test('El repositorio guarda y devuelve mensajes correctamente', () => {
  const memoryRepo = new MemoryRepository();
  const loggerPrueba = new Logger(memoryRepo);
  const mensajes = memoryRepo.getAll();
  loggerPrueba.log('Mensaje de log')
  expect(mensajes).toContain('[log]Mensaje de log');
});
test('El repositorio guarda y devuelve mensajes correctamente', () => {
  const memoryRepo = new MemoryRepository();
  const loggerPrueba = new Logger(memoryRepo);
  const mensajes = memoryRepo.getAll();
  loggerPrueba.trace('Mensaje de trace')
  expect(mensajes).toContain('[trace]Mensaje de trace');
});
test('El repositorio guarda y devuelve mensajes correctamente', () => {
  const memoryRepo = new MemoryRepository();
  const loggerPrueba = new Logger(memoryRepo);
  const mensajes = memoryRepo.getAll();
  loggerPrueba.warning('Mensaje de warning')
  expect(mensajes).toContain('[warning]Mensaje de warning');
});
test('El repositorio guarda y devuelve mensajes correctamente', () => {
  const memoryRepo = new MemoryRepository();
  const loggerPrueba = new Logger(memoryRepo);
  const mensajes = memoryRepo.getAll();
  loggerPrueba.debug('Mensaje de debug')
  expect(mensajes).toContain('[debug]Mensaje de debug');
});