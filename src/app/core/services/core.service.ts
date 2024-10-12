import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';

export interface IResponse<T> {
  documents: IDocument<T>[]
}

interface IDocument<T> {
  name: string
  fields: T;
  createTime: string
  updateTime: string
}

export interface IProductFields {
  title: IString;
  description: IString;
  price: INumber;
}

// interface INull {
//   nullValue: null
// }

interface IString {
  stringValue: string
}

// interface IDate {
//   timestampValue: string
// }

// interface IBoolean {
//   booleanValue: boolean
// }

interface INumber {
  integerValue: string
}

export interface IProduct {
  id: string;
  title: string;
  description: string;
  price: number;
  create: Date;
  update: Date | null;
}

@Injectable({ providedIn: 'root' })
export class CoreService {
	private readonly http: HttpClient = inject(HttpClient);
	private readonly headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

	public get(): Observable<IProduct[]> {
		return this.http
			.get<IResponse<IProductFields>>(`https://firestore.googleapis.com/v1/projects/sisorg-interview/databases/(default)/documents/products`, { headers: this.headers })
			.pipe(
				map((res: IResponse<IProductFields>) =>
					res.documents.map((doc) => ({
						id: doc.name.split('/').pop() || '',
						title: doc.fields.title.stringValue,
						description: doc.fields.description.stringValue,
						price: Number(doc.fields.price.integerValue),
						create: new Date(doc.createTime),
						update: doc.updateTime ? new Date(doc.updateTime) : null
					}))
				),
			);
	}
}
