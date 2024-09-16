import { Injectable, inject } from '@angular/core';

// * Firebase.
import {
	CollectionReference,
	DocumentData,
	DocumentReference,
	FieldValue,
	Firestore,
	QuerySnapshot,
	WithFieldValue,
	addDoc,
	collection,
	deleteDoc,
	doc,
	getDoc,
	getDocs,
	serverTimestamp,
	setDoc
} from '@angular/fire/firestore';

// * RxJs.
import { Observable, from, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CoreService {
	private readonly _store: Firestore = inject(Firestore);

	public get serverTimestamp(): () => FieldValue {
		return serverTimestamp;
	}

	// Get Multiple Documents.
	public getDocuments<T>(col: string): Observable<(T & { id: string })[]> {
		const REF: CollectionReference<DocumentData, DocumentData> = this._getCollectionRef(col);
		return from(getDocs(REF)).pipe(
			map((querySnapshot: QuerySnapshot<DocumentData>) =>
				querySnapshot.docs.map((doc) => ({
					...(doc.data() as T),
					id: doc.id
				}))
			)
		);
	}

	// Get Single Document.
	public getDocument<T>(col: string, id: string): Observable<(T & { id: string }) | null> {
		const REF: DocumentReference<DocumentData, DocumentData> = this._getDocumentRef(col, id);
		return from(getDoc(REF)).pipe(map((doc) => (doc.exists() ? { ...(doc.data() as T), id: doc.id } : null)));
	}

	// Add Document (Usa addDoc para agregar un nuevo documento).
	public postDocument<T extends WithFieldValue<DocumentData>>(col: string, data: T): Observable<DocumentReference<DocumentData>> {
		const REF: CollectionReference<DocumentData, DocumentData> = this._getCollectionRef(col);
		return from(addDoc(REF, data));
	}

	// Replace or Add Document (Usa setDoc para agregar o reemplazar un documento completo).
	public putDocument<T extends WithFieldValue<DocumentData>>(col: string, id: string, data: T): Observable<void> {
		const REF: DocumentReference<DocumentData, DocumentData> = this._getDocumentRef(col, id);
		return from(setDoc(REF, data));
	}

	// Delete Document.
	public deleteDocument(col: string, id: string): Observable<void> {
		const REF: DocumentReference<DocumentData, DocumentData> = this._getDocumentRef(col, id);
		return from(deleteDoc(REF));
	}

	// Obtiene una referencia a la colección.
	private _getCollectionRef(col: string): CollectionReference<DocumentData> {
		return collection(this._store, col);
	}

	// Obtiene una referencia a un documento.
	private _getDocumentRef(col: string, id: string): DocumentReference<DocumentData> {
		return doc(this._store, col, id);
	}
}
