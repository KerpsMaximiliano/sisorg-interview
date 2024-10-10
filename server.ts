import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine } from '@angular/ssr';
import express, { Express } from 'express';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import bootstrap from './src/main.server';

export function app(): express.Express {
	const SERVER: Express = express();
	const SERVER_FOLDER: string = dirname(fileURLToPath(import.meta.url));
	const BROWSER_FOLDER: string = resolve(SERVER_FOLDER, '../browser');
	const HTML: string = join(SERVER_FOLDER, 'index.server.html');

	const COMMON_ENGINE: CommonEngine = new CommonEngine();

	SERVER.set('view engine', 'html');
	SERVER.set('views', BROWSER_FOLDER);
	SERVER.get('*.*', express.static(BROWSER_FOLDER, { maxAge: '1y' }));
	SERVER.get('*', (req, res, next) => {
		const { protocol: PROTOCOL, originalUrl: ORIGINAL_URL, baseUrl: BASE_URL, headers: HEADERS } = req;

		COMMON_ENGINE.render({
			bootstrap,
			documentFilePath: HTML,
			url: `${PROTOCOL}://${HEADERS.host}${ORIGINAL_URL}`,
			publicPath: BROWSER_FOLDER,
			providers: [{ provide: APP_BASE_HREF, useValue: BASE_URL }]
		})
			.then((html) => res.send(html))
			.catch((err) => next(err));
	});

	return SERVER;
}

function run(): void {
	const PORT: string | 4000 = process.env['PORT'] || 4000;
	const SERVER: express.Express = app();

	SERVER.listen(PORT, () => console.log(`Node Express server listening on http://localhost:${PORT}`));
}

run();
