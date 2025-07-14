import { describe, expect, it } from 'bun:test';
import { Elysia } from 'elysia';
import { Note } from '../models/noteModel';
import { NoteController } from '../controllers/noteController';
import { noteRouter } from '../routes/noteRoutes';

const apiVersion = process.env.API_VERSION || 'v1';
const app = new Elysia({ prefix: `/${apiVersion}/notes` }).use(noteRouter);

describe('get all notes', () => {
  it('should return all notes', async () => { 
    const response = await app
      .handle(new Request(`http://localhost/${apiVersion}/notes`, { method: 'GET' }))
      .then((res) => res.json());
    expect(response).toEqual(['Moonhalo']);
  });
});

describe('created new note', () => {
  it('should create a note', async () => { 
    const response = await app
      .handle(
        new Request(`http://localhost/${apiVersion}/notes`, {
          method: 'POST',
          body: JSON.stringify({ data: 'Test Note' }),
          headers: { 'Content-Type': 'application/json' },
        })
      )
      .then((res) => res.json());
    expect(response).toEqual(['Moonhalo', 'Test Note']);
  });
});

describe('get note by index', () => {
  it('should return note at index 0', async () => { 
    const response = await app
      .handle(new Request(`http://localhost/${apiVersion}/notes/0`, { method: 'GET' }))
      .then((res) => res.text());
    expect(response).toEqual('Moonhalo');
  });
});

describe('update note by index', () => {
  it('should update note at index 0', async () => { 
    const response = await app
      .handle(
        new Request(`http://localhost/${apiVersion}/notes/0`, {
          method: 'PUT',
          body: JSON.stringify({ data: 'Updated Note' }),
          headers: { 'Content-Type': 'application/json' },
        })
      )
      .then((res) => res.json());
    expect(response).toEqual(['Updated Note', 'Test Note']);
  });
});

describe('delete note by index', () => {
  it('should delete note at index 0', async () => { 
    const response = await app
      .handle(new Request(`http://localhost/${apiVersion}/notes/0`, { method: 'DELETE' }))
      .then((res) => res.json());
    expect(response).toEqual(['Test Note']);
  });
});