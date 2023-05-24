import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
	static async getInitialProps(ctx) {
		const initialProps = await Document.getInitialProps(ctx);
		return { ...initialProps };
	}

	render() {
		return (
			<Html>
				<Head>
					<link
						rel='shortcut icon'
						type='image/x-icon'
						href='http://localhost:3000/images/ai-logo.png'
					/>
					<meta
						name='viewport'
						content='width=device-width,minimum-scale=1, initial-scale=1'
					/>
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;
