import { Note } from '../models/noteModel';
import { logger } from '../utils/logger';

export class NoteController {
    private note: Note;

    constructor(note: Note) {
        this.note = note;
    }

    getAllNotes() {
        logger.debug('Getting all notes');
        return this.note.data;
    }

    getNoteByIndex(index: number) {
        logger.debug(`Getting note at index ${index}`);
        return this.note.data[index];
    }

    createNote(data: string) {
        logger.info(`Creating new note: ${data}`);
        this.note.data.push(data);
        return this.note.data;
    }

    updateNote(index: number, data: string) {
        logger.info(`Updating note at index ${index}: ${data}`);
        this.note.data[index] = data;
        return this.note.data;
    }

    deleteNote(index: number) {
        logger.info(`Deleting note at index ${index}`);
        this.note.data.splice(index, 1);
        return this.note.data;
    }
}